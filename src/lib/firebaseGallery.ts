// src/lib/firebaseGallery.ts - FIXED VERSION
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
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';
import type { GalleryImage } from '@/data/gallery/galeryData';

// Extended interface for Firestore document - UPDATED WITH VIEWS
export interface GalleryImageDoc extends Omit<GalleryImage, 'id'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  cloudinaryPublicId?: string;
  viewCount: number; // Total view count
  lastViewedAt?: Timestamp; // Last time someone viewed this image
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
 * STEP 2: INCREMENT VIEW COUNT FUNCTION
 * Fungsi untuk menambah view count dengan session-based protection
 *
 * FIX: Memastikan imageId valid dan berbentuk string yang benar
 */
export const incrementViewCount = async (
  imageId: string
): Promise<{ success: boolean; viewCount?: number; message?: string }> => {
  try {
    // Validate imageId
    if (!imageId || typeof imageId !== 'string' || imageId.trim() === '') {
      throw new Error('Image ID tidak valid');
    }

    console.log('Incrementing view count for imageId:', imageId);

    // 1. Check apakah user sudah pernah view image ini dalam session ini
    const viewedImages = getViewedImagesFromSession();

    if (viewedImages.includes(imageId)) {
      console.log(`Image ${imageId} sudah pernah dilihat dalam session ini`);
      return {
        success: false,
        message: 'Image sudah pernah dilihat dalam session ini',
      };
    }

    // 2. Get reference ke document - FIX: Pastikan reference benar
    const docRef = doc(db, COLLECTION_NAME, imageId);
    console.log('Document reference created for:', docRef.path);

    // 3. Check apakah document ada
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.error(`Document with ID ${imageId} tidak ditemukan`);
      throw new Error('Image tidak ditemukan');
    }

    console.log('Document exists, current data:', docSnap.data());

    // 4. Update view count di Firestore menggunakan increment
    await updateDoc(docRef, {
      viewCount: increment(1), // Atomic increment operation
      lastViewedAt: serverTimestamp(), // Update waktu terakhir dilihat
    });

    console.log('View count incremented successfully');

    // 5. Get updated document untuk mendapatkan view count terbaru
    const updatedDoc = await getDoc(docRef);
    const updatedData = updatedDoc.data() as GalleryImageDoc;
    const newViewCount = updatedData.viewCount;

    // 6. Simpan ke session storage bahwa user sudah view image ini
    addImageToViewedSession(imageId);

    console.log(
      `Successfully incremented view count for image ${imageId}. New count: ${newViewCount}`
    );

    return {
      success: true,
      viewCount: newViewCount,
      message: 'View count berhasil ditambah',
    };
  } catch (error) {
    console.error('Error incrementing view count:', error);
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
    // Check apakah kita di browser environment
    if (typeof window === 'undefined') {
      return [];
    }

    const stored = sessionStorage.getItem(VIEWED_IMAGES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading viewed images from session:', error);
    return [];
  }
};

/**
 * Helper function: Add image ID ke session storage
 */
const addImageToViewedSession = (imageId: string): void => {
  try {
    // Check apakah kita di browser environment
    if (typeof window === 'undefined') {
      return;
    }

    const viewedImages = getViewedImagesFromSession();

    // Tambah image ID jika belum ada
    if (!viewedImages.includes(imageId)) {
      viewedImages.push(imageId);
      sessionStorage.setItem(VIEWED_IMAGES_KEY, JSON.stringify(viewedImages));
    }
  } catch (error) {
    console.error('Error saving viewed image to session:', error);
  }
};

/**
 * Helper function: Clear viewed images dari session (optional, untuk testing)
 */
export const clearViewedImagesSession = (): void => {
  try {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(VIEWED_IMAGES_KEY);
      console.log('Cleared viewed images session');
    }
  } catch (error) {
    console.error('Error clearing viewed images session:', error);
  }
};

/**
 * Helper function: Get viewed images count untuk current session (optional, untuk debugging)
 */
export const getViewedImagesCount = (): number => {
  return getViewedImagesFromSession().length;
};

/**
 * Get all gallery items from Firestore - UPDATED TO INCLUDE VIEWS
 * FIX: Pastikan collection reference benar
 */
export const getGalleryItems = async (): Promise<GalleryImage[]> => {
  try {
    console.log('Fetching gallery items from collection:', COLLECTION_NAME);

    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    console.log('Query executed, document count:', querySnapshot.size);

    const items: GalleryImage[] = [];
    querySnapshot.forEach(docSnap => {
      const data = docSnap.data() as GalleryImageDoc;
      console.log('Processing document:', docSnap.id, data);

      items.push({
        id: docSnap.id, // FIX: Pastikan ID dari Firestore document
        src: data.src,
        title: data.title,
        caption: data.caption,
        category: data.category,
        year: data.year,
        date: data.date,
        viewCount: data.viewCount || 0, // Include view count, default to 0
      });
    });

    console.log('Successfully fetched gallery items:', items.length);
    return items;
  } catch (error) {
    console.error('Error getting gallery items:', error);
    throw new Error('Failed to fetch gallery items');
  }
};

/**
 * Get single gallery item by ID - UPDATED TO INCLUDE VIEWS
 * FIX: Validasi imageId dan pastikan document reference benar
 */
export const getGalleryItemById = async (id: string): Promise<GalleryImage | null> => {
  try {
    // Validate ID
    if (!id || typeof id !== 'string' || id.trim() === '') {
      throw new Error('Invalid gallery item ID');
    }

    console.log('Fetching gallery item by ID:', id);

    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as GalleryImageDoc;
      console.log('Gallery item found:', data);

      return {
        id: docSnap.id,
        src: data.src,
        title: data.title,
        caption: data.caption,
        category: data.category,
        year: data.year,
        date: data.date,
        viewCount: data.viewCount || 0, // Include view count
      };
    }

    console.log('Gallery item not found for ID:', id);
    return null;
  } catch (error) {
    console.error('Error getting gallery item by ID:', error);
    throw new Error('Failed to fetch gallery item');
  }
};

/**
 * Upload image to Cloudinary
 */
export const uploadImage = async (file: File): Promise<{ url: string; publicId: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string);

  console.log('Cloudinary Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  console.log('Upload Preset:', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!res.ok) {
    const errorData = await res.text();
    console.error('Cloudinary upload error:', errorData);
    throw new Error('Upload ke Cloudinary gagal');
  }

  const data = await res.json();
  return {
    url: data.secure_url,
    publicId: data.public_id,
  };
};

/**
 * Delete image from Cloudinary - IMPROVED ERROR HANDLING
 */
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    console.log('Attempting to delete from Cloudinary:', publicId);

    const res = await fetch('/api/delete-cloudinary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicId }),
    });

    const data = await res.json();
    console.log('Cloudinary delete response:', data);

    if (!res.ok) {
      console.error('Cloudinary delete error:', data);
      throw new Error(data.message || 'Failed to delete image from Cloudinary');
    }

    console.log('Successfully deleted from Cloudinary:', publicId);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    // Re-throw the error so it can be handled by the caller
    throw error;
  }
};

/**
 * Add new gallery item - UPDATED TO INCLUDE INITIAL VIEW COUNT
 */
export const addGalleryItem = async (data: GalleryFormData): Promise<void> => {
  try {
    let imageUrl = '';
    let publicId = '';

    // Upload image if provided
    if (data.image) {
      const uploadResult = await uploadImage(data.image);
      imageUrl = uploadResult.url;
      publicId = uploadResult.publicId;
    }

    // Prepare document data - UPDATED WITH VIEW COUNT
    const docData: GalleryImageDoc & { cloudinaryPublicId?: string } = {
      src: imageUrl,
      cloudinaryPublicId: publicId,
      title: data.title,
      caption: data.caption || '',
      category: data.category,
      year: data.year,
      date: data.date,
      viewCount: 0, // Initialize view count to 0
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
    };

    console.log('Adding new gallery item:', docData);

    // Add to Firestore
    const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);
    console.log('Gallery item added with ID:', docRef.id);
  } catch (error) {
    console.error('Error adding gallery item:', error);
    throw new Error('Failed to add gallery item');
  }
};

/**
 * Update existing gallery item
 * FIX: Validasi ID dan pastikan document reference benar
 */
export const updateGalleryItem = async (id: string, data: GalleryFormData): Promise<void> => {
  try {
    // Validate ID
    if (!id || typeof id !== 'string' || id.trim() === '') {
      throw new Error('Invalid gallery item ID');
    }

    console.log('Updating gallery item with ID:', id);

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

    console.log('Update data:', updateData);

    // Update document
    await updateDoc(docRef, updateData);
    console.log('Gallery item updated successfully');
  } catch (error) {
    console.error('Error updating gallery item:', error);
    throw new Error('Failed to update gallery item');
  }
};

/**
 * Delete gallery item - IMPROVED VERSION
 * FIX: Validasi ID dan pastikan document reference benar
 */
export const deleteGalleryItem = async (id: string): Promise<void> => {
  console.log('Starting delete process for ID:', id);

  try {
    // Validate ID
    if (!id || typeof id !== 'string' || id.trim() === '') {
      throw new Error('Invalid gallery item ID');
    }

    // Get document first to get cloudinary public ID
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Document not found');
    }

    const data = docSnap.data() as GalleryImageDoc & { cloudinaryPublicId?: string };
    const cloudinaryPublicId = data.cloudinaryPublicId;

    console.log('Document data:', data);
    console.log('Cloudinary Public ID:', cloudinaryPublicId);

    // Delete from Firestore first
    await deleteDoc(docRef);
    console.log('Successfully deleted from Firestore');

    // Delete image from Cloudinary if exists
    if (cloudinaryPublicId) {
      try {
        await deleteFromCloudinary(cloudinaryPublicId);
        console.log('Successfully deleted from Cloudinary');
      } catch (cloudinaryError) {
        console.error(
          'Failed to delete from Cloudinary, but Firestore deletion succeeded:',
          cloudinaryError
        );
        // Don't throw here - Firestore deletion was successful
        // You might want to log this for manual cleanup later
      }
    } else {
      console.warn('No Cloudinary Public ID found, skipping Cloudinary deletion');
    }
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    throw new Error(
      `Failed to delete gallery item: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

/**
 * Add new category
 */
export const addCategory = async (name: string): Promise<void> => {
  try {
    await addDoc(collection(db, CATEGORY_COLLECTION), {
      name,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error adding category:', error);
    throw new Error('Failed to add category');
  }
};

/**
 * Delete category from Firestore
 */
export const deleteCategory = async (name: string): Promise<void> => {
  try {
    const q = query(collection(db, CATEGORY_COLLECTION), where('name', '==', name));
    const querySnapshot = await getDocs(q);

    const deletePromises = querySnapshot.docs.map(docSnap => deleteDoc(docSnap.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw new Error('Failed to delete category');
  }
};

/**
 * Get available categories from Firestore
 */
export const getAvailableCategories = async (): Promise<string[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, CATEGORY_COLLECTION));
    const categories: string[] = [];

    querySnapshot.forEach(doc => {
      categories.push(doc.data().name);
    });

    return categories.length > 0 ? categories.sort() : ['Activity', 'Event', 'Education'];
  } catch (error) {
    console.error('Error getting categories:', error);
    return ['Activity', 'Event', 'Education'];
  }
};

/**
 * Add new year
 */
export const addYear = async (name: string): Promise<void> => {
  try {
    await addDoc(collection(db, YEAR_COLLECTION), {
      name,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error adding year:', error);
    throw new Error('Failed to add year');
  }
};

/**
 * Delete year from Firestore
 */
export const deleteYear = async (name: string): Promise<void> => {
  try {
    const q = query(collection(db, YEAR_COLLECTION), where('name', '==', name));
    const querySnapshot = await getDocs(q);

    const deletePromises = querySnapshot.docs.map(docSnap => deleteDoc(docSnap.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting year:', error);
    throw new Error('Failed to delete year');
  }
};

/**
 * Get available years from Firestore
 */
export const getAvailableYears = async (): Promise<string[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, YEAR_COLLECTION));
    const years: string[] = [];

    querySnapshot.forEach(doc => {
      years.push(doc.data().name);
    });

    if (years.length > 0) {
      return years.sort().reverse();
    } else {
      // Return default years if no years in database
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());
    }
  } catch (error) {
    console.error('Error getting years:', error);
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());
  }
};

/**
 * Validate image file
 */
export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Format file tidak didukung. Gunakan JPEG, PNG, atau WebP.',
    };
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
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
 * Filter gallery items
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
