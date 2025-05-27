// src/hooks/useViewCounter.ts - UPDATED VERSION
import { useState, useEffect, useCallback } from 'react';
import { incrementViewCount } from '@/lib/firebaseGallery';

interface UseViewCounterReturn {
  viewCount: number;
  isLoading: boolean;
  error: string | null;
  incrementView: () => Promise<void>;
  hasViewed: boolean;
  isValidId: boolean; // New: untuk check apakah ID valid
}

interface UseViewCounterOptions {
  imageId: string | undefined | null; // Allow undefined/null
  initialViewCount?: number;
  autoIncrement?: boolean;
  delay?: number;
}

/**
 * Custom hook untuk handle view counter logic dengan validasi ID yang lebih robust
 */
export const useViewCounter = ({
  imageId,
  initialViewCount = 0,
  autoIncrement = false,
  delay = 1000,
}: UseViewCounterOptions): UseViewCounterReturn => {
  // State management
  const [viewCount, setViewCount] = useState<number>(initialViewCount);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasViewed, setHasViewed] = useState<boolean>(false);

  // Validasi imageId
  const isValidId = Boolean(imageId && typeof imageId === 'string' && imageId.trim() !== '');

  // Log untuk debugging
  useEffect(() => {
    console.log('useViewCounter - imageId:', imageId, 'type:', typeof imageId, 'valid:', isValidId);
  }, [imageId, isValidId]);

  // Check apakah image sudah pernah dilihat di session ini
  const checkIfViewed = useCallback((): boolean => {
    if (!isValidId) return false;

    try {
      if (typeof window === 'undefined') return false;

      const viewedImages = sessionStorage.getItem('gallery_viewed_images');
      if (!viewedImages) return false;

      const parsedImages: string[] = JSON.parse(viewedImages);
      return parsedImages.includes(imageId as string);
    } catch (error) {
      console.error('Error checking viewed status:', error);
      return false;
    }
  }, [imageId, isValidId]);

  // Function untuk increment view count
  const incrementView = useCallback(async (): Promise<void> => {
    // Validasi ID sebelum melakukan increment
    if (!isValidId) {
      console.warn('Cannot increment view: Invalid image ID', imageId);
      setError('Image ID tidak valid');
      return;
    }

    // Jika sudah pernah dilihat, skip
    if (hasViewed) {
      console.log(`Image ${imageId} sudah pernah dilihat dalam session ini`);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(`Attempting to increment view for image: ${imageId}`);

      const result = await incrementViewCount(imageId as string);

      if (result.success && result.viewCount !== undefined) {
        setViewCount(result.viewCount);
        setHasViewed(true);
        console.log(`Successfully incremented view count to: ${result.viewCount}`);
      } else {
        // Jika gagal karena sudah pernah dilihat, update state tapi jangan show error
        if (result.message?.includes('sudah pernah dilihat')) {
          setHasViewed(true);
        } else {
          setError(result.message || 'Gagal menambah view count');
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan';
      setError(errorMessage);
      console.error('Error in incrementView:', error);
    } finally {
      setIsLoading(false);
    }
  }, [imageId, hasViewed, isValidId]);

  // Effect untuk check initial viewed status
  useEffect(() => {
    if (!isValidId) return;

    const isViewed = checkIfViewed();
    setHasViewed(isViewed);

    if (isViewed) {
      console.log(`Image ${imageId} sudah pernah dilihat sebelumnya dalam session ini`);
    }
  }, [imageId, checkIfViewed, isValidId]);

  // Effect untuk auto increment (jika enabled dan ID valid)
  useEffect(() => {
    if (!autoIncrement || !isValidId || hasViewed) {
      if (!isValidId && autoIncrement) {
        console.warn('Auto increment skipped: Invalid image ID', imageId);
      }
      return;
    }

    console.log(`Setting up auto increment timer for ${imageId} with delay ${delay}ms`);

    const timer = setTimeout(() => {
      incrementView();
    }, delay);

    return () => {
      clearTimeout(timer);
      console.log(`Auto increment timer cleared for ${imageId}`);
    };
  }, [autoIncrement, delay, hasViewed, incrementView, isValidId, imageId]);

  // Update view count jika initialViewCount berubah
  useEffect(() => {
    setViewCount(initialViewCount);
  }, [initialViewCount]);

  // Clear error jika imageId menjadi valid
  useEffect(() => {
    if (isValidId && error === 'Image ID tidak valid') {
      setError(null);
    }
  }, [isValidId, error]);

  return {
    viewCount,
    isLoading,
    error,
    incrementView,
    hasViewed,
    isValidId,
  };
};

/**
 * Simplified hook untuk kasus yang hanya butuh auto increment
 * Dengan built-in validation
 */
export const useAutoViewCounter = (
  imageId: string | undefined | null,
  initialViewCount: number = 0
) => {
  return useViewCounter({
    imageId,
    initialViewCount,
    autoIncrement: true,
    delay: 2000, // 2 detik delay
  });
};

/**
 * Hook untuk manual increment (untuk button click, etc)
 * Dengan built-in validation
 */
export const useManualViewCounter = (
  imageId: string | undefined | null,
  initialViewCount: number = 0
) => {
  return useViewCounter({
    imageId,
    initialViewCount,
    autoIncrement: false,
  });
};
