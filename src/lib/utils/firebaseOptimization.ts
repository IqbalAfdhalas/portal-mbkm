// src/lib/utils/firebaseOptimization.ts
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { performanceCache } from './performanceCache';

interface ConnectionStatus {
  isWarmedUp: boolean;
  lastWarmup: number;
  warmupDuration?: number;
}

class FirebaseOptimization {
  private connectionStatus: ConnectionStatus = {
    isWarmedUp: false,
    lastWarmup: 0,
  };

  /**
   * Warm up Firebase connection dengan query kecil
   */
  async warmupConnection(): Promise<void> {
    if (this.isConnectionWarm()) {
      console.log('🔥 [Firebase] Connection already warm');
      return;
    }

    const startTime = performance.now();
    console.log('🏃 [Firebase] Warming up connection...');

    try {
      // Test connection dengan query minimal
      const testQuery = query(collection(db, 'gallery'), limit(1));
      await getDocs(testQuery);

      const duration = performance.now() - startTime;
      this.connectionStatus = {
        isWarmedUp: true,
        lastWarmup: Date.now(),
        warmupDuration: duration,
      };

      console.log(`🔥 [Firebase] Connection warmed up in ${duration.toFixed(2)}ms`);
    } catch (error) {
      console.error('❌ [Firebase] Warmup failed:', error);
      throw error;
    }
  }

  /**
   * Check if connection is still warm (valid for 10 minutes)
   */
  private isConnectionWarm(): boolean {
    const warmupExpiry = 10 * 60 * 1000; // 10 minutes
    return (
      this.connectionStatus.isWarmedUp &&
      Date.now() - this.connectionStatus.lastWarmup < warmupExpiry
    );
  }

  /**
   * Execute multiple Firebase queries in parallel
   */
  async executeParallel<T extends Record<string, () => Promise<any>>>(
    queries: T
  ): Promise<{ [K in keyof T]: Awaited<ReturnType<T[K]>> }> {
    const startTime = performance.now();
    const queryNames = Object.keys(queries);

    console.log(`🚀 [Firebase] Starting ${queryNames.length} parallel queries:`, queryNames);

    try {
      // Ensure connection is warm
      await this.warmupConnection();

      // Execute all queries in parallel
      const promises = Object.entries(queries).map(async ([key, queryFn]) => {
        const queryStart = performance.now();
        try {
          const result = await queryFn();
          const queryDuration = performance.now() - queryStart;
          console.log(`✅ [Firebase] Query "${key}" completed in ${queryDuration.toFixed(2)}ms`);
          return [key, result];
        } catch (error) {
          const queryDuration = performance.now() - queryStart;
          console.error(
            `❌ [Firebase] Query "${key}" failed in ${queryDuration.toFixed(2)}ms:`,
            error
          );
          throw error;
        }
      });

      const results = await Promise.all(promises);
      const totalDuration = performance.now() - startTime;

      // Convert results back to object
      const resultObject = results.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as any) as { [K in keyof T]: Awaited<ReturnType<T[K]>> };

      console.log(
        `🎉 [Firebase] All ${queryNames.length} queries completed in ${totalDuration.toFixed(2)}ms`
      );
      return resultObject;
    } catch (error) {
      const totalDuration = performance.now() - startTime;
      console.error(
        `💥 [Firebase] Parallel execution failed after ${totalDuration.toFixed(2)}ms:`,
        error
      );
      throw error;
    }
  }

  /**
   * Execute queries with progressive loading (high priority first)
   */
  async executeProgressive<T>(
    queries: Array<{
      key: string;
      priority: 'high' | 'medium' | 'low';
      queryFn: () => Promise<any>;
      onComplete?: (key: string, data: any) => void;
    }>
  ): Promise<Record<string, any>> {
    console.log('📊 [Firebase] Starting progressive loading...');

    // Warm up connection first
    await this.warmupConnection();

    const results: Record<string, any> = {};

    // Sort by priority
    const sortedQueries = queries.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    // Group by priority
    const highPriority = sortedQueries.filter(q => q.priority === 'high');
    const mediumPriority = sortedQueries.filter(q => q.priority === 'medium');
    const lowPriority = sortedQueries.filter(q => q.priority === 'low');

    // Execute high priority queries first (parallel within same priority)
    if (highPriority.length > 0) {
      console.log(
        '🔴 [Firebase] Loading high priority queries:',
        highPriority.map(q => q.key)
      );
      await this.executeQueriesInBatch(highPriority, results);
    }

    // Execute medium priority queries
    if (mediumPriority.length > 0) {
      console.log(
        '🟡 [Firebase] Loading medium priority queries:',
        mediumPriority.map(q => q.key)
      );
      await this.executeQueriesInBatch(mediumPriority, results);
    }

    // Execute low priority queries
    if (lowPriority.length > 0) {
      console.log(
        '🟢 [Firebase] Loading low priority queries:',
        lowPriority.map(q => q.key)
      );
      await this.executeQueriesInBatch(lowPriority, results);
    }

    console.log('✨ [Firebase] Progressive loading completed');
    return results;
  }

  /**
   * Execute a batch of queries in parallel
   */
  private async executeQueriesInBatch(
    queries: Array<{
      key: string;
      queryFn: () => Promise<any>;
      onComplete?: (key: string, data: any) => void;
    }>,
    results: Record<string, any>
  ): Promise<void> {
    const promises = queries.map(async ({ key, queryFn, onComplete }) => {
      const startTime = performance.now();
      try {
        const data = await queryFn();
        const duration = performance.now() - startTime;

        results[key] = data;

        // Call completion callback if provided
        if (onComplete) {
          onComplete(key, data);
        }

        console.log(`✅ [Firebase] "${key}" loaded in ${duration.toFixed(2)}ms`);
      } catch (error) {
        const duration = performance.now() - startTime;
        console.error(`❌ [Firebase] "${key}" failed in ${duration.toFixed(2)}ms:`, error);
        throw error;
      }
    });

    await Promise.all(promises);
  }

  /**
   * Get connection status for debugging
   */
  getConnectionStatus(): ConnectionStatus {
    return { ...this.connectionStatus };
  }

  /**
   * Force connection reset (for testing)
   */
  resetConnection(): void {
    this.connectionStatus = {
      isWarmedUp: false,
      lastWarmup: 0,
    };
    console.log('🔄 [Firebase] Connection status reset');
  }
}

// Singleton instance
export const firebaseOptimization = new FirebaseOptimization();

// Auto warmup on module load (only in browser)
if (typeof window !== 'undefined') {
  // Warmup after a short delay to not block initial page load
  setTimeout(() => {
    firebaseOptimization.warmupConnection().catch(error => {
      console.warn('⚠️ [Firebase] Auto-warmup failed:', error);
    });
  }, 1000);
}

export default firebaseOptimization;
