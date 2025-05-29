// src/hooks/useGalleryPagination.ts
import { useState, useCallback, useEffect } from 'react';
import { getGalleryItemsPaginated } from '@/lib/firebaseGallery';
import type { GalleryImage } from '@/data/gallery/galeryData';

interface UseGalleryPaginationOptions {
  itemsPerPage?: number;
  orderBy?: 'createdAt' | 'viewCount' | 'title';
  orderDirection?: 'asc' | 'desc';
}

interface UseGalleryPaginationReturn {
  items: GalleryImage[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  loading: boolean;
  error: string | null;
  goToPage: (page: number) => Promise<void>;
  nextPage: () => Promise<void>;
  prevPage: () => Promise<void>;
  refresh: () => Promise<void>;
  setItemsPerPage: (count: number) => void;
  itemsPerPage: number;
}

export const useGalleryPagination = (
  options: UseGalleryPaginationOptions = {}
): UseGalleryPaginationReturn => {
  const {
    itemsPerPage: initialItemsPerPage = 20,
    orderBy = 'createdAt',
    orderDirection = 'desc',
  } = options;

  const [items, setItems] = useState<GalleryImage[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPageState] = useState(initialItemsPerPage);
  const [pageCache, setPageCache] = useState<
    Map<number, { items: GalleryImage[]; cursor?: string }>
  >(new Map());

  // Calculate cursor for page
  const calculateCursor = useCallback(
    (page: number): string | undefined => {
      if (page === 1) return undefined;

      // Try to get cursor from cache
      const cachedPage = pageCache.get(page - 1);
      if (cachedPage && cachedPage.items.length > 0) {
        return cachedPage.items[cachedPage.items.length - 1].id;
      }

      return undefined;
    },
    [pageCache]
  );

  // Load specific page
  const loadPage = useCallback(
    async (page: number) => {
      console.log(`📖 [Pagination] Loading page ${page}`);
      setLoading(true);
      setError(null);

      try {
        const cursor = calculateCursor(page);

        const result = await getGalleryItemsPaginated({
          limit: itemsPerPage,
          startAfter: cursor,
          orderBy,
          orderDirection,
        });

        setItems(result.items);
        setTotalItems(result.totalCount || 0);
        setTotalPages(Math.ceil((result.totalCount || 0) / itemsPerPage));

        // Cache this page
        setPageCache(
          prev =>
            new Map(
              prev.set(page, {
                items: result.items,
                cursor: result.nextCursor,
              })
            )
        );

        console.log(`✅ [Pagination] Loaded page ${page} with ${result.items.length} items`);
      } catch (err) {
        console.error('❌ [Pagination] Load error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load page');
      } finally {
        setLoading(false);
      }
    },
    [itemsPerPage, orderBy, orderDirection, calculateCursor]
  );

  // Go to specific page
  const goToPage = useCallback(
    async (page: number) => {
      if (page < 1 || (totalPages > 0 && page > totalPages) || page === currentPage) {
        return;
      }

      setCurrentPage(page);
      await loadPage(page);
    },
    [currentPage, totalPages, loadPage]
  );

  // Next page
  const nextPage = useCallback(async () => {
    if (currentPage < totalPages) {
      await goToPage(currentPage + 1);
    }
  }, [currentPage, totalPages, goToPage]);

  // Previous page
  const prevPage = useCallback(async () => {
    if (currentPage > 1) {
      await goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  // Refresh current page
  const refresh = useCallback(async () => {
    console.log('🔄 [Pagination] Refreshing...');
    setPageCache(new Map()); // Clear cache
    await loadPage(currentPage);
  }, [currentPage, loadPage]);

  // Set items per page
  const setItemsPerPage = useCallback(
    (count: number) => {
      if (count !== itemsPerPage) {
        setItemsPerPageState(count);
        setPageCache(new Map()); // Clear cache when changing page size
        setCurrentPage(1); // Reset to first page
      }
    },
    [itemsPerPage]
  );

  // Load initial page
  useEffect(() => {
    if (items.length === 0) {
      loadPage(1);
    }
  }, [loadPage, items.length]);

  // Reload when items per page changes
  useEffect(() => {
    if (currentPage === 1) {
      loadPage(1);
    }
  }, [itemsPerPage, loadPage, currentPage]);

  return {
    items,
    currentPage,
    totalPages,
    totalItems,
    loading,
    error,
    goToPage,
    nextPage,
    prevPage,
    refresh,
    setItemsPerPage,
    itemsPerPage,
  };
};
