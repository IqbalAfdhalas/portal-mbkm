// src/lib/firebaseGallery.ts
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
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
        id: parseInt(doc.id) || Date.now(), // Convert to number or use timestamp
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
 * Upload image to Firebase Storage
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

  if (!res.ok) throw new Error('Upload ke Cloudinary gagal');

  const data = await res.json();
  return {
    url: data.secure_url,
    publicId: data.public_id,
  };
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
 * Delete gallery item
 */

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('api_key', process.env.CLOUDINARY_API_KEY as string);
    formData.append('api_secret', process.env.CLOUDINARY_API_SECRET as string);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await res.json();

    if (result.result !== 'ok') {
      throw new Error('Failed to delete image from Cloudinary');
    }
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
  }
};

export const deleteGalleryItem = async (id: string, cloudinaryPublicId?: string): Promise<void> => {
  try {
    // Delete from Firestore
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);

    // Delete image from Cloudinary if exists
    if (cloudinaryPublicId) {
      await deleteFromCloudinary(cloudinaryPublicId);
    }
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    throw new Error('Failed to delete gallery item');
  }
};

/**
 * Helper function to extract storage path from URL
 */
const getStoragePathFromUrl = (url: string): string => {
  try {
    const decodedUrl = decodeURIComponent(url);
    const matches = decodedUrl.match(/\/o\/(.+?)\?/);
    return matches ? matches[1] : '';
  } catch (error) {
    console.error('Error extracting storage path:', error);
    return '';
  }
};

/**
 * Get available categories from existing items
 */
export const getAvailableCategories = async (): Promise<string[]> => {
  try {
    const items = await getGalleryItems();
    const categories = Array.from(new Set(items.map(item => item.category)));
    return categories.sort();
  } catch (error) {
    console.error('Error getting categories:', error);
    return ['Activity', 'Event', 'Education']; // Fallback categories
  }
};

/**
 * Get available years from existing items
 */
export const getAvailableYears = async (): Promise<string[]> => {
  try {
    const items = await getGalleryItems();
    const years = Array.from(new Set(items.map(item => item.year)));
    return years.sort().reverse();
  } catch (error) {
    console.error('Error getting years:', error);
    const currentYear = new Date().getFullYear();
    return [currentYear.toString(), (currentYear - 1).toString()]; // Fallback years
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
