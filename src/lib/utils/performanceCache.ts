// src/lib/utils/performanceCache.ts
interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

interface PerformanceMetrics {
  startTime: number;
  endTime?: number;
  duration?: number;
  operation: string;
  cacheHit?: boolean;
}

class PerformanceCache {
  private cache = new Map<string, CacheItem<any>>();
  private metrics: PerformanceMetrics[] = [];
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes

  /**
   * Start performance monitoring
   */
  startMetrics(operation: string): string {
    const id = `${operation}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.metrics.push({
      startTime: performance.now(),
      operation: `${operation} (ID: ${id})`,
    });
    console.log(`🏁 [Performance] Started: ${operation}`);
    return id;
  }

  /**
   * End performance monitoring
   */
  endMetrics(operation: string, cacheHit: boolean = false): void {
    const metric = this.metrics.find(m => m.operation.includes(operation));
    if (metric && !metric.endTime) {
      metric.endTime = performance.now();
      metric.duration = metric.endTime - metric.startTime;
      metric.cacheHit = cacheHit;

      const emoji = cacheHit ? '⚡' : '🔄';
      const source = cacheHit ? 'CACHE' : 'FIREBASE';
      console.log(
        `${emoji} [Performance] ${metric.operation} completed in ${metric.duration.toFixed(2)}ms (${source})`
      );
    }
  }

  /**
   * Set cache with TTL
   */
  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    const expiry = Date.now() + ttl;
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry,
    });
    console.log(`💾 [Cache] Stored: ${key} (TTL: ${ttl / 1000}s)`);
  }

  /**
   * Get from cache if not expired
   */
  get<T>(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) {
      console.log(`❌ [Cache] Miss: ${key}`);
      return null;
    }

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      console.log(`⏰ [Cache] Expired: ${key}`);
      return null;
    }

    console.log(
      `✅ [Cache] Hit: ${key} (age: ${((Date.now() - item.timestamp) / 1000).toFixed(1)}s)`
    );
    return item.data;
  }

  /**
   * Get all cache keys
   */
  getAllKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Clear expired cache entries
   */
  cleanup(): void {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      console.log(`🧹 [Cache] Cleaned ${cleaned} expired entries`);
    }
  }

  /**
   * Clear specific cache entry
   */
  invalidate(key: string): void {
    if (this.cache.delete(key)) {
      console.log(`🗑️ [Cache] Invalidated: ${key}`);
    }
  }

  /**
   * Clear all cache
   */
  clear(): void {
    const size = this.cache.size;
    this.cache.clear();
    console.log(`🧨 [Cache] Cleared all entries (${size} items)`);
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const now = Date.now();
    const entries = Array.from(this.cache.entries());
    const valid = entries.filter(([, item]) => now <= item.expiry);
    const expired = entries.length - valid.length;

    return {
      total: entries.length,
      valid: valid.length,
      expired,
      metrics: this.metrics.slice(-10), // Last 10 operations
    };
  }

  /**
   * Generic cached fetch function
   */
  async cachedFetch<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl: number = this.defaultTTL
  ): Promise<T> {
    // Try to get from cache first
    const cached = this.get<T>(key);
    if (cached !== null) {
      this.endMetrics(key, true);
      return cached;
    }

    // If not in cache, fetch from source
    const metricsId = this.startMetrics(key);
    try {
      const data = await fetchFn();
      this.set(key, data, ttl);
      this.endMetrics(key, false);
      return data;
    } catch (error) {
      this.endMetrics(key, false);
      throw error;
    }
  }
}

// Singleton instance
export const performanceCache = new PerformanceCache();

// Auto cleanup every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(
    () => {
      performanceCache.cleanup();
    },
    5 * 60 * 1000
  );
}

// Cache keys constants
export const CACHE_KEYS = {
  GALLERY_ITEMS: 'gallery_items',
  GALLERY_CATEGORIES: 'gallery_categories',
  GALLERY_YEARS: 'gallery_years',
  JOURNALS_ALL: 'journals_all',
  AUTHORS_ALL: 'authors_all',
  PROFILES_ALL: 'profiles_all',
  POPULAR_JOURNALS: 'popular_journals',
  JOURNAL_BY_ID: (id: string) => `journal_${id}`,
  GALLERY_BY_ID: (id: string) => `gallery_${id}`,
  PROFILE_BY_ID: (id: string) => `profile_${id}`,
  JOURNAL_VIEWS: (id: string) => `journal_views_${id}`,
  RELATED_JOURNALS: (id: string, category: string) => `related_${id}_${category}`,
} as const;

// TTL constants (in milliseconds)
export const CACHE_TTL = {
  SHORT: 2 * 60 * 1000, // 2 minutes - for frequently changing data
  MEDIUM: 5 * 60 * 1000, // 5 minutes - default
  LONG: 10 * 60 * 1000, // 10 minutes - for relatively stable data
  VERY_LONG: 30 * 60 * 1000, // 30 minutes - for rarely changing data
} as const;

export default performanceCache;
