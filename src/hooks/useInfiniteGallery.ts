// src/hooks/useInfiniteGallery.ts
import { useState, useCallback, useEffect } from 'react';
import { getGalleryItemsInfinite } from '@/lib/firebaseGallery';
import type { GalleryImage } from '@/data/gallery/galeryData';

interface UseInfiniteGalleryReturn {
  items: GalleryImage[];
  loading: boolean;
  hasMore: boolean;
  error: string | null;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  isInitialLoading: boolean;
}

export const useInfiniteGallery = (batchSize: number = 12): UseInfiniteGalleryReturn => {
  const [items, setItems] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Load more items
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    console.log('🔄 [InfiniteGallery] Loading more items...');
    setLoading(true);
    setError(null);

    try {
      const result = await getGalleryItemsInfinite(cursor, batchSize);

      // Add a small delay to make the loading feel more natural
      await new Promise(resolve => setTimeout(resolve, 500));

      // Filter out duplicate items based on ID to prevent duplicate keys
      setItems(prev => {
        const existingIds = new Set(prev.map(item => item.id));
        const newItems = result.items.filter(item => !existingIds.has(item.id));
        return [...prev, ...newItems];
      });

      setHasMore(result.hasMore);
      setCursor(result.nextCursor);

      console.log(`✅ [InfiniteGallery] Loaded ${result.items.length} more items`);
    } catch (err) {
      console.error('❌ [InfiniteGallery] Load error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load more items');
    } finally {
      setLoading(false);
      setIsInitialLoading(false);
    }
  }, [cursor, batchSize, loading, hasMore]);

  // Refresh/reload from beginning
  const refresh = useCallback(async () => {
    console.log('🔄 [InfiniteGallery] Refreshing...');
    setItems([]);
    setCursor(undefined);
    setHasMore(true);
    setError(null);
    setIsInitialLoading(true);

    try {
      const result = await getGalleryItemsInfinite(undefined, batchSize);

      // Remove duplicates just in case
      const uniqueItems = result.items.filter(
        (item, index, self) => index === self.findIndex(t => t.id === item.id)
      );
      setItems(uniqueItems);
      setHasMore(result.hasMore);
      setCursor(result.nextCursor);

      console.log(`✅ [InfiniteGallery] Refreshed with ${result.items.length} items`);
    } catch (err) {
      console.error('❌ [InfiniteGallery] Refresh error:', err);
      setError(err instanceof Error ? err.message : 'Failed to refresh');
    } finally {
      setIsInitialLoading(false);
    }
  }, [batchSize]);

  // Load initial items on mount
  useEffect(() => {
    if (items.length === 0 && isInitialLoading) {
      loadMore();
    }
  }, [loadMore, items.length, isInitialLoading]);

  return {
    items,
    loading,
    hasMore,
    error,
    loadMore,
    refresh,
    isInitialLoading,
  };
};
