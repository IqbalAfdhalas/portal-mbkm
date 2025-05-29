// src/lib/firebaseGallery.ts - OPTIMIZED VERSION
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
  getDoc,
  increment,
  limit,
  startAfter,
  getCountFromServer,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';
import type { GalleryImage } from '@/data/gallery/galeryData';
import { performanceCache, CACHE_KEYS, CACHE_TTL } from './utils/performanceCache';
import { firebaseOptimization } from './utils/firebaseOptimization';

// Pagination interfaces
interface PaginationOptions {
  limit: number;
  startAfter?: string; // document ID for cursor
  orderBy?: 'createdAt' | 'viewCount' | 'title';
  orderDirection?: 'asc' | 'desc';
}

interface PaginatedResult<T> {
  items: T[];
  hasMore: boolean;
  nextCursor?: string;
  totalCount?: number;
}

// Extended interface for Firestore document - WITH VIEWS
export interface GalleryImageDoc extends Omit<GalleryImage, 'id'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  cloudinaryPublicId?: string;
  viewCount: number;
  lastViewedAt?: Timestamp;
}

// Interface for form data
export interface GalleryFormData {
  title: string;
  caption?: string;
  category: string;
  year: string;
  date: string;
  image?: File;
}

const COLLECTION_NAME = 'gallery';
const CATEGORY_COLLECTION = 'galleryCategories';
const YEAR_COLLECTION = 'galleryYears';

// Session storage key untuk tracking viewed images
const VIEWED_IMAGES_KEY = 'gallery_viewed_images';

/**
 * OPTIMIZED: INCREMENT VIEW COUNT FUNCTION
 * Session-based protection dengan error handling yang lebih baik
 */
export const incrementViewCount = async (
  imageId: string
): Promise<{ success: boolean; viewCount?: number; message?: string }> => {
  const metricsId = performanceCache.startMetrics(`incrementViewCount_${imageId}`);

  try {
    // Validate imageId
    if (!imageId || typeof imageId !== 'string' || imageId.trim() === '') {
      throw new Error('Image ID tidak valid');
    }

    console.log('🔢 [ViewCount] Incrementing for imageId:', imageId);

    // 1. Check session-based protection
    const viewedImages = getViewedImagesFromSession();
    if (viewedImages.includes(imageId)) {
      console.log(`👀 [ViewCount] Already viewed in session: ${imageId}`);
      performanceCache.endMetrics(`incrementViewCount_${imageId}`, true);
      return {
        success: false,
        message: 'Image sudah pernah dilihat dalam session ini',
      };
    }

    // 2. Warm up connection dan get document reference
    await firebaseOptimization.warmupConnection();
    const docRef = doc(db, COLLECTION_NAME, imageId);

    // 3. Verify document exists
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('Image tidak ditemukan');
    }

    // 4. Atomic increment operation
    await updateDoc(docRef, {
      viewCount: increment(1),
      lastViewedAt: serverTimestamp(),
    });

    // 5. Get updated view count
    const updatedDoc = await getDoc(docRef);
    const updatedData = updatedDoc.data() as GalleryImageDoc;
    const newViewCount = updatedData.viewCount;

    // 6. Update session tracking
    addImageToViewedSession(imageId);

    // 7. Invalidate related cache
    performanceCache.invalidate(CACHE_KEYS.GALLERY_BY_ID(imageId));
    performanceCache.invalidate(CACHE_KEYS.GALLERY_ITEMS);

    console.log(`✅ [ViewCount] Successfully incremented: ${imageId} -> ${newViewCount}`);
    performanceCache.endMetrics(`incrementViewCount_${imageId}`, false);

    return {
      success: true,
      viewCount: newViewCount,
      message: 'View count berhasil ditambah',
    };
  } catch (error) {
    console.error('❌ [ViewCount] Error:', error);
    performanceCache.endMetrics(`incrementViewCount_${imageId}`, false);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Gagal menambah view count',
    };
  }
};

/**
 * Helper function: Get viewed images dari session storage
 */
const getViewedImagesFromSession = (): string[] => {
  try {
    if (typeof window === 'undefined') return [];

    const stored = sessionStorage.getItem(VIEWED_IMAGES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('❌ [ViewCount] Session read error:', error);
    return [];
  }
};

/**
 * Helper function: Add image ID ke session storage
 */
const addImageToViewedSession = (imageId: string): void => {
  try {
    if (typeof window === 'undefined') return;

    const viewedImages = getViewedImagesFromSession();
    if (!viewedImages.includes(imageId)) {
      viewedImages.push(imageId);
      sessionStorage.setItem(VIEWED_IMAGES_KEY, JSON.stringify(viewedImages));
    }
  } catch (error) {
    console.error('❌ [ViewCount] Session write error:', error);
  }
};

/**
 * PAGINATION: Get paginated gallery items for traditional pagination (admin)
 */
export const getGalleryItemsPaginated = async (
  options: PaginationOptions
): Promise<PaginatedResult<GalleryImage>> => {
  const metricsId = performanceCache.startMetrics('getGalleryItemsPaginated');

  try {
    console.log('📖 [Pagination] Fetching page with options:', options);
    await firebaseOptimization.warmupConnection();

    // Build base query
    let q = query(
      collection(db, COLLECTION_NAME),
      orderBy(options.orderBy || 'createdAt', options.orderDirection || 'desc'),
      limit(options.limit)
    );

    // Add cursor if provided
    if (options.startAfter) {
      const startAfterDoc = await getDoc(doc(db, COLLECTION_NAME, options.startAfter));
      if (startAfterDoc.exists()) {
        q = query(
          collection(db, COLLECTION_NAME),
          orderBy(options.orderBy || 'createdAt', options.orderDirection || 'desc'),
          startAfter(startAfterDoc),
          limit(options.limit)
        );
      }
    }

    // Execute query
    const querySnapshot = await getDocs(q);
    const items: GalleryImage[] = [];

    querySnapshot.forEach(docSnap => {
      const data = docSnap.data() as GalleryImageDoc;
      items.push({
        id: docSnap.id,
        src: data.src,
        title: data.title,
        caption: data.caption,
        category: data.category,
        year: data.year,
        date: data.date,
        viewCount: data.viewCount || 0,
      });
    });

    // Check if there are more items
    const hasMore = items.length === options.limit;
    const nextCursor = hasMore && items.length > 0 ? items[items.length - 1].id : undefined;

    // Get total count for admin pagination
    const countQuery = query(collection(db, COLLECTION_NAME));
    const countSnapshot = await getCountFromServer(countQuery);
    const totalCount = countSnapshot.data().count;

    console.log(`✅ [Pagination] Fetched ${items.length} items, hasMore: ${hasMore}`);
    performanceCache.endMetrics('getGalleryItemsPaginated', false);

    return {
      items,
      hasMore,
      nextCursor,
      totalCount,
    };
  } catch (error) {
    console.error('❌ [Pagination] Error:', error);
    performanceCache.endMetrics('getGalleryItemsPaginated', false);
    throw error;
  }
};

/**
 * PAGINATION: Get gallery items for infinite scroll (public)
 */
export const getGalleryItemsInfinite = async (
  cursor?: string,
  limitNum: number = 12
): Promise<PaginatedResult<GalleryImage>> => {
  const metricsId = performanceCache.startMetrics('getGalleryItemsInfinite');

  try {
    console.log(`🔄 [InfiniteScroll] Loading batch, cursor: ${cursor}, limit: ${limitNum}`);
    await firebaseOptimization.warmupConnection();

    // Build query
    let q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'), limit(limitNum));

    // Add cursor if provided
    if (cursor) {
      const startAfterDoc = await getDoc(doc(db, COLLECTION_NAME, cursor));
      if (startAfterDoc.exists()) {
        q = query(
          collection(db, COLLECTION_NAME),
          orderBy('createdAt', 'desc'),
          startAfter(startAfterDoc),
          limit(limitNum)
        );
      }
    }

    // Execute query
    const querySnapshot = await getDocs(q);
    const items: GalleryImage[] = [];

    querySnapshot.forEach(docSnap => {
      const data = docSnap.data() as GalleryImageDoc;
      items.push({
        id: docSnap.id,
        src: data.src,
        title: data.title,
        caption: data.caption,
        category: data.category,
        year: data.year,
        date: data.date,
        viewCount: data.viewCount || 0,
      });
    });

    const hasMore = items.length === limitNum;
    const nextCursor = hasMore && items.length > 0 ? items[items.length - 1].id : undefined;

    console.log(`✅ [InfiniteScroll] Fetched ${items.length} items, hasMore: ${hasMore}`);
    performanceCache.endMetrics('getGalleryItemsInfinite', false);

    return {
      items,
      hasMore,
      nextCursor,
    };
  } catch (error) {
    console.error('❌ [InfiniteScroll] Error:', error);
    performanceCache.endMetrics('getGalleryItemsInfinite', false);
    throw error;
  }
};

/**
 * OPTIMIZED: Get all gallery items with progressive loading
 */
export const getGalleryItems = async (): Promise<GalleryImage[]> => {
  return performanceCache.cachedFetch(
    CACHE_KEYS.GALLERY_ITEMS,
    async () => {
      console.log('📸 [Gallery] Fetching items from Firestore');

      // Warm up connection first
      await firebaseOptimization.warmupConnection();

      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const items: GalleryImage[] = [];
      querySnapshot.forEach(docSnap => {
        const data = docSnap.data() as GalleryImageDoc;
        items.push({
          id: docSnap.id,
          src: data.src,
          title: data.title,
          caption: data.caption,
          category: data.category,
          year: data.year,
          date: data.date,
          viewCount: data.viewCount || 0,
        });
      });

      console.log(`✅ [Gallery] Fetched ${items.length} items`);
      return items;
    },
    CACHE_TTL.MEDIUM
  );
};

/**
 * OPTIMIZED: Get gallery data with parallel loading
 */
export const getGalleryDataParallel = async (): Promise<{
  items: GalleryImage[];
  categories: string[];
  years: string[];
}> => {
  return firebaseOptimization.executeParallel({
    items: () => getGalleryItems(),
    categories: () => getAvailableCategories(),
    years: () => getAvailableYears(),
  });
};

/**
 * OPTIMIZED: Get gallery data with progressive loading
 */
export const getGalleryDataProgressive = async (
  onProgress?: (key: string, data: any) => void
): Promise<{
  items: GalleryImage[];
  categories: string[];
  years: string[];
}> => {
  const result = await firebaseOptimization.executeProgressive([
    {
      key: 'items',
      priority: 'high',
      queryFn: () => getGalleryItems(),
      onComplete: onProgress,
    },
    {
      key: 'categories',
      priority: 'medium',
      queryFn: () => getAvailableCategories(),
      onComplete: onProgress,
    },
    {
      key: 'years',
      priority: 'low',
      queryFn: () => getAvailableYears(),
      onComplete: onProgress,
    },
  ]);

  return {
    items: result.items,
    categories: result.categories,
    years: result.years,
  };
};

/**
 * OPTIMIZED: Get single gallery item by ID
 */
export const getGalleryItemById = async (id: string): Promise<GalleryImage | null> => {
  if (!id || typeof id !== 'string' || id.trim() === '') {
    throw new Error('Invalid gallery item ID');
  }

  return performanceCache.cachedFetch(
    CACHE_KEYS.GALLERY_BY_ID(id),
    async () => {
      console.log(`🔍 [Gallery] Fetching item by ID: ${id}`);

      // Warm up connection
      await firebaseOptimization.warmupConnection();

      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as GalleryImageDoc;
        return {
          id: docSnap.id,
          src: data.src,
          title: data.title,
          caption: data.caption,
          category: data.category,
          year: data.year,
          date: data.date,
          viewCount: data.viewCount || 0,
        };
      }

      console.log(`❌ [Gallery] Item not found: ${id}`);
      return null;
    },
    CACHE_TTL.LONG
  );
};

/**
 * OPTIMIZED: Upload image to Cloudinary dengan retry mechanism
 */
export const uploadImage = async (
  file: File,
  maxRetries: number = 3
): Promise<{ url: string; publicId: string }> => {
  const metricsId = performanceCache.startMetrics('uploadImage');

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`☁️ [Upload] Attempt ${attempt}/${maxRetries}`);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Upload failed: ${errorData}`);
      }

      const data = await res.json();
      console.log(`✅ [Upload] Success on attempt ${attempt}`);
      performanceCache.endMetrics('uploadImage', false);

      return {
        url: data.secure_url,
        publicId: data.public_id,
      };
    } catch (error) {
      console.error(`❌ [Upload] Attempt ${attempt} failed:`, error);

      if (attempt === maxRetries) {
        performanceCache.endMetrics('uploadImage', false);
        throw new Error(`Upload gagal setelah ${maxRetries} percobaan`);
      }

      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  throw new Error('Upload failed unexpectedly');
};

/**
 * OPTIMIZED: Delete image from Cloudinary
 */
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  const metricsId = performanceCache.startMetrics('deleteFromCloudinary');

  try {
    console.log(`🗑️ [Cloudinary] Deleting: ${publicId}`);

    const res = await fetch('/api/delete-cloudinary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicId }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to delete image from Cloudinary');
    }

    console.log(`✅ [Cloudinary] Deleted: ${publicId}`);
    performanceCache.endMetrics('deleteFromCloudinary', false);
  } catch (error) {
    console.error('❌ [Cloudinary] Delete error:', error);
    performanceCache.endMetrics('deleteFromCloudinary', false);
    throw error;
  }
};

/**
 * OPTIMIZED: Add new gallery item dengan cache invalidation
 */
export const addGalleryItem = async (data: GalleryFormData): Promise<void> => {
  const metricsId = performanceCache.startMetrics('addGalleryItem');

  try {
    let imageUrl = '';
    let publicId = '';

    // Upload image if provided
    if (data.image) {
      const uploadResult = await uploadImage(data.image);
      imageUrl = uploadResult.url;
      publicId = uploadResult.publicId;
    }

    // Warm up connection
    await firebaseOptimization.warmupConnection();

    // Prepare document data
    const docData: GalleryImageDoc & { cloudinaryPublicId?: string } = {
      src: imageUrl,
      cloudinaryPublicId: publicId,
      title: data.title,
      caption: data.caption || '',
      category: data.category,
      year: data.year,
      date: data.date,
      viewCount: 0,
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
    };

    console.log('➕ [Gallery] Adding new item:', data.title);

    // Add to Firestore
    const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);

    // Invalidate related cache
    performanceCache.invalidate(CACHE_KEYS.GALLERY_ITEMS);

    console.log(`✅ [Gallery] Added with ID: ${docRef.id}`);
    performanceCache.endMetrics('addGalleryItem', false);
  } catch (error) {
    console.error('❌ [Gallery] Add error:', error);
    performanceCache.endMetrics('addGalleryItem', false);
    throw new Error('Failed to add gallery item');
  }
};

/**
 * OPTIMIZED: Update existing gallery item
 */
export const updateGalleryItem = async (id: string, data: GalleryFormData): Promise<void> => {
  const metricsId = performanceCache.startMetrics('updateGalleryItem');

  try {
    if (!id || typeof id !== 'string' || id.trim() === '') {
      throw new Error('Invalid gallery item ID');
    }

    console.log(`✏️ [Gallery] Updating item: ${id}`);

    // Warm up connection
    await firebaseOptimization.warmupConnection();

    const docRef = doc(db, COLLECTION_NAME, id);

    let updateData: Partial<GalleryImageDoc> = {
      title: data.title,
      caption: data.caption || '',
      category: data.category,
      year: data.year,
      date: data.date,
      updatedAt: serverTimestamp() as Timestamp,
    };

    // Upload new image if provided
    if (data.image) {
      const uploadResult = await uploadImage(data.image);
      updateData.src = uploadResult.url;
      updateData.cloudinaryPublicId = uploadResult.publicId;
    }

    // Update document
    await updateDoc(docRef, updateData);

    // Invalidate related cache
    performanceCache.invalidate(CACHE_KEYS.GALLERY_ITEMS);
    performanceCache.invalidate(CACHE_KEYS.GALLERY_BY_ID(id));

    console.log(`✅ [Gallery] Updated: ${id}`);
    performanceCache.endMetrics('updateGalleryItem', false);
  } catch (error) {
    console.error('❌ [Gallery] Update error:', error);
    performanceCache.endMetrics('updateGalleryItem', false);
    throw new Error('Failed to update gallery item');
  }
};

/**
 * OPTIMIZED: Delete gallery item dengan proper cleanup
 */
export const deleteGalleryItem = async (id: string): Promise<void> => {
  const metricsId = performanceCache.startMetrics('deleteGalleryItem');

  try {
    if (!id || typeof id !== 'string' || id.trim() === '') {
      throw new Error('Invalid gallery item ID');
    }

    console.log(`🗑️ [Gallery] Deleting item: ${id}`);

    // Warm up connection
    await firebaseOptimization.warmupConnection();

    // Get document first to get cloudinary public ID
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Document not found');
    }

    const data = docSnap.data() as GalleryImageDoc & { cloudinaryPublicId?: string };
    const cloudinaryPublicId = data.cloudinaryPublicId;

    // Delete from Firestore first
    await deleteDoc(docRef);
    console.log('✅ [Gallery] Deleted from Firestore');

    // Delete image from Cloudinary if exists
    if (cloudinaryPublicId) {
      try {
        await deleteFromCloudinary(cloudinaryPublicId);
        console.log('✅ [Gallery] Deleted from Cloudinary');
      } catch (cloudinaryError) {
        console.error(
          '⚠️ [Gallery] Cloudinary deletion failed (Firestore succeeded):',
          cloudinaryError
        );
        // Don't throw - Firestore deletion succeeded
      }
    }

    // Invalidate related cache
    performanceCache.invalidate(CACHE_KEYS.GALLERY_ITEMS);
    performanceCache.invalidate(CACHE_KEYS.GALLERY_BY_ID(id));

    console.log(`✅ [Gallery] Delete completed: ${id}`);
    performanceCache.endMetrics('deleteGalleryItem', false);
  } catch (error) {
    console.error('❌ [Gallery] Delete error:', error);
    performanceCache.endMetrics('deleteGalleryItem', false);
    throw new Error(
      `Failed to delete gallery item: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

/**
 * OPTIMIZED: Get available categories dengan caching
 */
export const getAvailableCategories = async (): Promise<string[]> => {
  return performanceCache.cachedFetch(
    CACHE_KEYS.GALLERY_CATEGORIES,
    async () => {
      console.log('📂 [Categories] Fetching from Firestore');

      await firebaseOptimization.warmupConnection();

      const querySnapshot = await getDocs(collection(db, CATEGORY_COLLECTION));
      const categories: string[] = [];

      querySnapshot.forEach(doc => {
        categories.push(doc.data().name);
      });

      const result = categories.length > 0 ? categories.sort() : ['Activity', 'Event', 'Education'];
      console.log(`✅ [Categories] Fetched: ${result.length} categories`);
      return result;
    },
    CACHE_TTL.LONG
  );
};

/**
 * OPTIMIZED: Get available years dengan caching
 */
export const getAvailableYears = async (): Promise<string[]> => {
  return performanceCache.cachedFetch(
    CACHE_KEYS.GALLERY_YEARS,
    async () => {
      console.log('📅 [Years] Fetching from Firestore');

      await firebaseOptimization.warmupConnection();

      const querySnapshot = await getDocs(collection(db, YEAR_COLLECTION));
      const years: string[] = [];

      querySnapshot.forEach(doc => {
        years.push(doc.data().name);
      });

      let result: string[];
      if (years.length > 0) {
        result = years.sort().reverse();
      } else {
        const currentYear = new Date().getFullYear();
        result = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());
      }

      console.log(`✅ [Years] Fetched: ${result.length} years`);
      return result;
    },
    CACHE_TTL.LONG
  );
};

/**
 * OPTIMIZED: Add category dengan cache invalidation
 */
export const addCategory = async (name: string): Promise<void> => {
  try {
    await firebaseOptimization.warmupConnection();

    await addDoc(collection(db, CATEGORY_COLLECTION), {
      name,
      createdAt: serverTimestamp(),
    });

    // Invalidate categories cache
    performanceCache.invalidate(CACHE_KEYS.GALLERY_CATEGORIES);
    console.log(`✅ [Categories] Added: ${name}`);
  } catch (error) {
    console.error('❌ [Categories] Add error:', error);
    throw new Error('Failed to add category');
  }
};

/**
 * OPTIMIZED: Delete category dengan cache invalidation
 */
export const deleteCategory = async (name: string): Promise<void> => {
  try {
    await firebaseOptimization.warmupConnection();

    const q = query(collection(db, CATEGORY_COLLECTION), where('name', '==', name));
    const querySnapshot = await getDocs(q);

    const deletePromises = querySnapshot.docs.map(docSnap => deleteDoc(docSnap.ref));
    await Promise.all(deletePromises);

    // Invalidate categories cache
    performanceCache.invalidate(CACHE_KEYS.GALLERY_CATEGORIES);
    console.log(`✅ [Categories] Deleted: ${name}`);
  } catch (error) {
    console.error('❌ [Categories] Delete error:', error);
    throw new Error('Failed to delete category');
  }
};

/**
 * OPTIMIZED: Add year dengan cache invalidation
 */
export const addYear = async (name: string): Promise<void> => {
  try {
    await firebaseOptimization.warmupConnection();

    await addDoc(collection(db, YEAR_COLLECTION), {
      name,
      createdAt: serverTimestamp(),
    });

    // Invalidate years cache
    performanceCache.invalidate(CACHE_KEYS.GALLERY_YEARS);
    console.log(`✅ [Years] Added: ${name}`);
  } catch (error) {
    console.error('❌ [Years] Add error:', error);
    throw new Error('Failed to add year');
  }
};

/**
 * OPTIMIZED: Delete year dengan cache invalidation
 */
export const deleteYear = async (name: string): Promise<void> => {
  try {
    await firebaseOptimization.warmupConnection();

    const q = query(collection(db, YEAR_COLLECTION), where('name', '==', name));
    const querySnapshot = await getDocs(q);

    const deletePromises = querySnapshot.docs.map(docSnap => deleteDoc(docSnap.ref));
    await Promise.all(deletePromises);

    // Invalidate years cache
    performanceCache.invalidate(CACHE_KEYS.GALLERY_YEARS);
    console.log(`✅ [Years] Deleted: ${name}`);
  } catch (error) {
    console.error('❌ [Years] Delete error:', error);
    throw new Error('Failed to delete year');
  }
};

// ===== HELPER FUNCTIONS =====

/**
 * Session management functions - exported for external use
 */
export const clearViewedImagesSession = (): void => {
  try {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(VIEWED_IMAGES_KEY);
      console.log('🧹 [ViewCount] Session cleared');
    }
  } catch (error) {
    console.error('❌ [ViewCount] Session clear error:', error);
  }
};

export const getViewedImagesCount = (): number => {
  return getViewedImagesFromSession().length;
};

/**
 * Validate image file
 */
export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Format file tidak didukung. Gunakan JPEG, PNG, atau WebP.',
    };
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'Ukuran file terlalu besar. Maksimal 5MB.',
    };
  }

  return { isValid: true };
};

/**
 * Convert File to base64 for preview
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

/**
 * Filter gallery items - CLIENT SIDE UTILITY
 */
export const filterGalleryItems = (
  items: GalleryImage[],
  category: string = 'all',
  year: string = 'all',
  searchQuery: string = ''
): GalleryImage[] => {
  return items.filter(image => {
    const matchesCategory = category === 'all' || image.category === category;
    const matchesYear = year === 'all' || image.year === year;
    const matchesSearch =
      searchQuery === '' ||
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (image.caption && image.caption.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesYear && matchesSearch;
  });
};

// ===== UTILITY FUNCTIONS FOR DEBUGGING =====

/**
 * Get performance statistics
 */
export const getPerformanceStats = () => {
  return {
    cache: performanceCache.getStats(),
    firebase: firebaseOptimization.getConnectionStatus(),
  };
};

/**
 * Force clear all cache (for development/debugging)
 */
export const clearAllCache = () => {
  performanceCache.clear();
  console.log('🧨 [Debug] All cache cleared');
};

/**
 * Reset Firebase connection (for development/debugging)
 */
export const resetFirebaseConnection = () => {
  firebaseOptimization.resetConnection();
  console.log('🔄 [Debug] Firebase connection reset');
};
