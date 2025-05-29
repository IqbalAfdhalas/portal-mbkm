// hooks/useJournalViews.ts
'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { incrementJournalViews, getJournalById } from '@/lib/firebaseJournals';
import { ViewsOperationResult } from '@/lib/types/journal';

interface UseJournalViewsProps {
  journalId: string;
  initialViews?: number;
  enableSpamPrevention?: boolean;
}

interface UseJournalViewsReturn {
  views: number;
  isIncrementing: boolean;
  error: string | null;
  incrementView: () => Promise<void>;
  refreshViews: () => Promise<void>;
  hasIncrementedInSession: boolean;
}

// Helper to get/set session storage for spam prevention
const getSessionKey = (journalId: string) => `journal_views_${journalId}`;

const hasViewedInSession = (journalId: string): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const sessionKey = getSessionKey(journalId);
    return sessionStorage.getItem(sessionKey) === 'true';
  } catch {
    return false;
  }
};

const markViewedInSession = (journalId: string): void => {
  if (typeof window === 'undefined') return;
  try {
    const sessionKey = getSessionKey(journalId);
    sessionStorage.setItem(sessionKey, 'true');
  } catch {
    // Silently fail if sessionStorage is not available
  }
};

export const useJournalViews = ({
  journalId,
  initialViews = 0,
  enableSpamPrevention = true,
}: UseJournalViewsProps): UseJournalViewsReturn => {
  const [views, setViews] = useState<number>(initialViews);
  const [isIncrementing, setIsIncrementing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasIncrementedInSession, setHasIncrementedInSession] = useState<boolean>(false);

  // Ref to prevent multiple simultaneous increments
  const incrementingRef = useRef<boolean>(false);

  // Check session on mount
  useEffect(() => {
    if (enableSpamPrevention) {
      setHasIncrementedInSession(hasViewedInSession(journalId));
    }
  }, [journalId, enableSpamPrevention]);

  // Sync initial views when prop changes
  useEffect(() => {
    setViews(initialViews);
  }, [initialViews]);

  /**
   * Increment view count with optimistic update
   */
  const incrementView = useCallback(async (): Promise<void> => {
    // Prevent multiple simultaneous calls
    if (incrementingRef.current) {
      console.log('🚫 [Views] Already incrementing, skipping...');
      return;
    }

    // Check spam prevention
    if (enableSpamPrevention && hasViewedInSession(journalId)) {
      console.log('🚫 [Views] Already viewed in this session, skipping increment');
      return;
    }

    // Validate journal ID
    if (!journalId || journalId.trim() === '') {
      setError('Invalid journal ID');
      return;
    }

    incrementingRef.current = true;
    setIsIncrementing(true);
    setError(null);

    try {
      console.log(`👁️ [Views] Incrementing views for journal: ${journalId}`);

      // Optimistic update - increment UI immediately
      const optimisticViews = views + 1;
      setViews(optimisticViews);

      // Call Firebase function
      const result: ViewsOperationResult = await incrementJournalViews(journalId);

      if (result.success) {
        // Update with actual count from server if available
        if (result.newViewsCount !== undefined) {
          setViews(result.newViewsCount);
        }

        // Mark as viewed in session
        if (enableSpamPrevention) {
          markViewedInSession(journalId);
          setHasIncrementedInSession(true);
        }

        console.log(`✅ [Views] Successfully incremented views for ${journalId}`);
      } else {
        // Revert optimistic update on failure
        setViews(views);
        setError(result.error || 'Failed to increment views');
        console.error('❌ [Views] Failed to increment views:', result.error);
      }
    } catch (err) {
      // Revert optimistic update on error
      setViews(views);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('❌ [Views] Error incrementing views:', err);
    } finally {
      setIsIncrementing(false);
      incrementingRef.current = false;
    }
  }, [journalId, views, enableSpamPrevention]);

  /**
   * Refresh views count from server
   */
  const refreshViews = useCallback(async (): Promise<void> => {
    if (!journalId || journalId.trim() === '') {
      setError('Invalid journal ID');
      return;
    }

    try {
      console.log(`🔄 [Views] Refreshing views for journal: ${journalId}`);
      setError(null);

      const journal = await getJournalById(journalId);
      if (journal) {
        setViews(journal.views || 0);
        console.log(`✅ [Views] Views refreshed: ${journal.views}`);
      } else {
        console.warn(`⚠️ [Views] Journal not found: ${journalId}`);
        setError('Journal not found');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh views';
      setError(errorMessage);
      console.error('❌ [Views] Error refreshing views:', err);
    }
  }, [journalId]);

  return {
    views,
    isIncrementing,
    error,
    incrementView,
    refreshViews,
    hasIncrementedInSession,
  };
};

// ========================================
// ADDITIONAL HOOKS FOR SPECIFIC USE CASES
// ========================================

/**
 * Hook for popular journals
 */
export const usePopularJournals = (limit: number = 10) => {
  const [popularJournals, setPopularJournals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPopularJournals = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Import the function dynamically to avoid circular dependencies
        const { getPopularJournals } = await import('@/lib/firebaseJournals');
        const result = await getPopularJournals(limit);

        setPopularJournals(result.journals);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load popular journals';
        setError(errorMessage);
        console.error('❌ [Popular Journals] Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPopularJournals();
  }, [limit]);

  return {
    popularJournals,
    isLoading,
    error,
  };
};

/**
 * Auto-increment views hook for page components
 * Automatically increments view when component mounts
 */
export const useAutoIncrementViews = (
  journalId: string,
  initialViews?: number,
  options?: {
    enableSpamPrevention?: boolean;
    autoIncrement?: boolean;
    delay?: number; // Delay before auto increment (ms)
  }
) => {
  const {
    enableSpamPrevention = true,
    autoIncrement = true,
    delay = 1000, // Default 1 second delay
  } = options || {};

  const viewsHook = useJournalViews({
    journalId,
    initialViews,
    enableSpamPrevention,
  });

  // Auto increment on mount with delay
  const { incrementView, ...otherViewsHook } = useJournalViews({
    journalId,
    initialViews,
    enableSpamPrevention,
  });

  // Auto increment on mount with delay
  useEffect(() => {
    if (!autoIncrement || !journalId) return;

    const timeoutId = setTimeout(() => {
      incrementView();
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [journalId, autoIncrement, delay, incrementView]);

  return {
    incrementView,
    ...otherViewsHook,
  };
};
