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
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';
import type { GalleryImage } from '@/data/gallery/galeryData';

// Extended interface for Firestore document
export interface GalleryImageDoc extends Omit<GalleryImage, 'id'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  cloudinaryPublicId?: string;
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

/**
 * Get all gallery items from Firestore
 */
export const getGalleryItems = async (): Promise<GalleryImage[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const items: GalleryImage[] = [];
    querySnapshot.forEach(doc => {
      const data = doc.data() as GalleryImageDoc;
      items.push({
        id: doc.id, // FIXED: Keep as string, don't convert to integer
        src: data.src,
        title: data.title,
        caption: data.caption,
        category: data.category,
        year: data.year,
        date: data.date,
      });
    });

    return items;
  } catch (error) {
    console.error('Error getting gallery items:', error);
    throw new Error('Failed to fetch gallery items');
  }
};

/**
 * Get single gallery item by ID
 */
export const getGalleryItemById = async (id: string): Promise<GalleryImage | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as GalleryImageDoc;
      return {
        id: docSnap.id, // FIXED: Keep as string
        src: data.src,
        title: data.title,
        caption: data.caption,
        category: data.category,
        year: data.year,
        date: data.date,
      };
    }

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
 * Add new gallery item
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

    // Prepare document data
    const docData: GalleryImageDoc & { cloudinaryPublicId?: string } = {
      src: imageUrl,
      cloudinaryPublicId: publicId,
      title: data.title,
      caption: data.caption || '',
      category: data.category,
      year: data.year,
      date: data.date,
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
    };

    // Add to Firestore
    await addDoc(collection(db, COLLECTION_NAME), docData);
  } catch (error) {
    console.error('Error adding gallery item:', error);
    throw new Error('Failed to add gallery item');
  }
};

/**
 * Update existing gallery item
 */
export const updateGalleryItem = async (id: string, data: GalleryFormData): Promise<void> => {
  try {
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
  } catch (error) {
    console.error('Error updating gallery item:', error);
    throw new Error('Failed to update gallery item');
  }
};

/**
 * Delete gallery item - IMPROVED VERSION
 */
export const deleteGalleryItem = async (id: string): Promise<void> => {
  console.log('Starting delete process for ID:', id);

  try {
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
