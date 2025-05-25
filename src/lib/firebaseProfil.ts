// src/lib/firebaseProfile.ts
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp,
  writeBatch,
  getDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * TYPE DEFINITIONS
 */

export interface ProfileFirebase {
  id: string;
  nama: string;
  peran: 'Mahasiswa' | 'Pembimbing Kampus' | 'Mentor BAST ANRI';
  foto?: string;
  asalInstitusi?: string;
  prodi?: string;
  angkatan?: string;
  unit?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Angkatan {
  id: string;
  tahun: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Prodi {
  id: string;
  nama: string;
  kode?: string;
  fakultas?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Unit {
  id: string;
  nama: string;
  kode?: string;
  deskripsi?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MasterData {
  angkatanList: string[];
  prodiList: string[];
  unitList: string[];
}

// Cloudinary response type
export interface CloudinaryResponse {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  original_filename: string;
}

/**
 * CONSTANTS
 */

// Collections
const PROFILES_COLLECTION = 'profiles';
const ANGKATAN_COLLECTION = 'angkatan';
const PRODI_COLLECTION = 'prodi';
const UNIT_COLLECTION = 'unit';

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

/**
 * PROFILE CRUD OPERATIONS
 */

// Get all profiles
export const getAllProfiles = async (): Promise<ProfileFirebase[]> => {
  try {
    const q = query(collection(db, PROFILES_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as ProfileFirebase[];
  } catch (error) {
    console.error('Error getting profiles:', error);
    throw new Error('Failed to fetch profiles');
  }
};

// Get profile by ID
export const getProfileById = async (id: string): Promise<ProfileFirebase | null> => {
  try {
    const docRef = doc(db, PROFILES_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate() || new Date(),
        updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
      } as ProfileFirebase;
    }

    return null;
  } catch (error) {
    console.error('Error getting profile:', error);
    throw new Error('Failed to fetch profile');
  }
};

// Create new profile
export const createProfile = async (
  profileData: Omit<ProfileFirebase, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, PROFILES_COLLECTION), {
      ...profileData,
      createdAt: now,
      updatedAt: now,
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating profile:', error);
    throw new Error('Failed to create profile');
  }
};

// Update profile
export const updateProfile = async (
  id: string,
  profileData: Partial<ProfileFirebase>
): Promise<void> => {
  try {
    const docRef = doc(db, PROFILES_COLLECTION, id);
    const updateData = {
      ...profileData,
      updatedAt: Timestamp.now(),
    };

    // Remove id, createdAt from update data
    delete updateData.id;
    delete updateData.createdAt;

    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile');
  }
};

// Delete profile
export const deleteProfile = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, PROFILES_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw new Error('Failed to delete profile');
  }
};

// Bulk delete profiles
export const bulkDeleteProfiles = async (ids: string[]): Promise<void> => {
  try {
    const batch = writeBatch(db);

    ids.forEach(id => {
      const docRef = doc(db, PROFILES_COLLECTION, id);
      batch.delete(docRef);
    });

    await batch.commit();
  } catch (error) {
    console.error('Error bulk deleting profiles:', error);
    throw new Error('Failed to delete profiles');
  }
};

// Get profiles by role
export const getProfilesByRole = async (
  role: ProfileFirebase['peran']
): Promise<ProfileFirebase[]> => {
  try {
    const q = query(
      collection(db, PROFILES_COLLECTION),
      where('peran', '==', role),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as ProfileFirebase[];
  } catch (error) {
    console.error('Error getting profiles by role:', error);
    throw new Error('Failed to fetch profiles by role');
  }
};

/**
 * ANGKATAN CRUD OPERATIONS
 */

// Get all angkatan
export const getAllAngkatan = async (): Promise<Angkatan[]> => {
  try {
    const q = query(
      collection(db, ANGKATAN_COLLECTION),
      where('isActive', '==', true),
      orderBy('tahun', 'desc')
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Angkatan[];
  } catch (error) {
    console.error('Error getting angkatan:', error);
    throw new Error('Failed to fetch angkatan');
  }
};

// Create angkatan
export const createAngkatan = async (tahun: string): Promise<string> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, ANGKATAN_COLLECTION), {
      tahun,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating angkatan:', error);
    throw new Error('Failed to create angkatan');
  }
};

// Get all angkatan (including inactive)
export const getAllAngkatanWithInactive = async (): Promise<Angkatan[]> => {
  try {
    const q = query(collection(db, ANGKATAN_COLLECTION), orderBy('tahun', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Angkatan[];
  } catch (error) {
    console.error('Error getting all angkatan:', error);
    throw new Error('Failed to fetch all angkatan');
  }
};

// Get angkatan by ID
export const getAngkatanById = async (id: string): Promise<Angkatan | null> => {
  try {
    const docRef = doc(db, ANGKATAN_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate() || new Date(),
        updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
      } as Angkatan;
    }

    return null;
  } catch (error) {
    console.error('Error getting angkatan:', error);
    throw new Error('Failed to fetch angkatan');
  }
};

// Update angkatan
export const updateAngkatan = async (
  id: string,
  angkatanData: Partial<Omit<Angkatan, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> => {
  try {
    const docRef = doc(db, ANGKATAN_COLLECTION, id);
    const updateData = {
      ...angkatanData,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating angkatan:', error);
    throw new Error('Failed to update angkatan');
  }
};

// Delete angkatan (hard delete)
export const deleteAngkatan = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, ANGKATAN_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting angkatan:', error);
    throw new Error('Failed to delete angkatan');
  }
};

// Deactivate angkatan (soft delete)
export const deactivateAngkatan = async (id: string): Promise<void> => {
  try {
    await updateAngkatan(id, { isActive: false });
  } catch (error) {
    console.error('Error deactivating angkatan:', error);
    throw new Error('Failed to deactivate angkatan');
  }
};

// Activate angkatan
export const activateAngkatan = async (id: string): Promise<void> => {
  try {
    await updateAngkatan(id, { isActive: true });
  } catch (error) {
    console.error('Error activating angkatan:', error);
    throw new Error('Failed to activate angkatan');
  }
};

// Bulk delete angkatan
export const bulkDeleteAngkatan = async (ids: string[]): Promise<void> => {
  try {
    const batch = writeBatch(db);

    ids.forEach(id => {
      const docRef = doc(db, ANGKATAN_COLLECTION, id);
      batch.delete(docRef);
    });

    await batch.commit();
  } catch (error) {
    console.error('Error bulk deleting angkatan:', error);
    throw new Error('Failed to delete angkatan');
  }
};

// Check if angkatan exists by tahun
export const checkAngkatanExists = async (tahun: string, excludeId?: string): Promise<boolean> => {
  try {
    let q = query(collection(db, ANGKATAN_COLLECTION), where('tahun', '==', tahun));
    const querySnapshot = await getDocs(q);

    if (excludeId) {
      return querySnapshot.docs.some(doc => doc.id !== excludeId);
    }

    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking angkatan exists:', error);
    throw new Error('Failed to check angkatan existence');
  }
};

/**
 * PRODI CRUD OPERATIONS
 */

// Get all prodi
export const getAllProdi = async (): Promise<Prodi[]> => {
  try {
    const q = query(
      collection(db, PRODI_COLLECTION),
      where('isActive', '==', true),
      orderBy('nama', 'asc')
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Prodi[];
  } catch (error) {
    console.error('Error getting prodi:', error);
    throw new Error('Failed to fetch prodi');
  }
};

// Create prodi
export const createProdi = async (
  nama: string,
  kode?: string,
  fakultas?: string
): Promise<string> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, PRODI_COLLECTION), {
      nama,
      kode: kode || '',
      fakultas: fakultas || '',
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating prodi:', error);
    throw new Error('Failed to create prodi');
  }
};

// Get all prodi (including inactive)
export const getAllProdiWithInactive = async (): Promise<Prodi[]> => {
  try {
    const q = query(collection(db, PRODI_COLLECTION), orderBy('nama', 'asc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Prodi[];
  } catch (error) {
    console.error('Error getting all prodi:', error);
    throw new Error('Failed to fetch all prodi');
  }
};

// Get prodi by ID
export const getProdiById = async (id: string): Promise<Prodi | null> => {
  try {
    const docRef = doc(db, PRODI_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate() || new Date(),
        updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
      } as Prodi;
    }

    return null;
  } catch (error) {
    console.error('Error getting prodi:', error);
    throw new Error('Failed to fetch prodi');
  }
};

// Update prodi
export const updateProdi = async (
  id: string,
  prodiData: Partial<Omit<Prodi, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> => {
  try {
    const docRef = doc(db, PRODI_COLLECTION, id);
    const updateData = {
      ...prodiData,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating prodi:', error);
    throw new Error('Failed to update prodi');
  }
};

// Delete prodi (hard delete)
export const deleteProdi = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, PRODI_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting prodi:', error);
    throw new Error('Failed to delete prodi');
  }
};

// Deactivate prodi (soft delete)
export const deactivateProdi = async (id: string): Promise<void> => {
  try {
    await updateProdi(id, { isActive: false });
  } catch (error) {
    console.error('Error deactivating prodi:', error);
    throw new Error('Failed to deactivate prodi');
  }
};

// Activate prodi
export const activateProdi = async (id: string): Promise<void> => {
  try {
    await updateProdi(id, { isActive: true });
  } catch (error) {
    console.error('Error activating prodi:', error);
    throw new Error('Failed to activate prodi');
  }
};

// Bulk delete prodi
export const bulkDeleteProdi = async (ids: string[]): Promise<void> => {
  try {
    const batch = writeBatch(db);

    ids.forEach(id => {
      const docRef = doc(db, PRODI_COLLECTION, id);
      batch.delete(docRef);
    });

    await batch.commit();
  } catch (error) {
    console.error('Error bulk deleting prodi:', error);
    throw new Error('Failed to delete prodi');
  }
};

// Search prodi by name
export const searchProdiByName = async (searchTerm: string): Promise<Prodi[]> => {
  try {
    const q = query(
      collection(db, PRODI_COLLECTION),
      where('isActive', '==', true),
      orderBy('nama', 'asc')
    );
    const querySnapshot = await getDocs(q);

    const allProdi = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Prodi[];

    // Filter by search term (case insensitive)
    return allProdi.filter(
      prodi =>
        prodi.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prodi.kode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prodi.fakultas?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching prodi:', error);
    throw new Error('Failed to search prodi');
  }
};

// Check if prodi exists by name
export const checkProdiExists = async (nama: string, excludeId?: string): Promise<boolean> => {
  try {
    const q = query(collection(db, PRODI_COLLECTION), where('nama', '==', nama));
    const querySnapshot = await getDocs(q);

    if (excludeId) {
      return querySnapshot.docs.some(doc => doc.id !== excludeId);
    }

    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking prodi exists:', error);
    throw new Error('Failed to check prodi existence');
  }
};

/**
 * UNIT CRUD OPERATIONS
 */

// Get all unit
export const getAllUnit = async (): Promise<Unit[]> => {
  try {
    const q = query(
      collection(db, UNIT_COLLECTION),
      where('isActive', '==', true),
      orderBy('nama', 'asc')
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Unit[];
  } catch (error) {
    console.error('Error getting unit:', error);
    throw new Error('Failed to fetch unit');
  }
};

// Create unit
export const createUnit = async (
  nama: string,
  kode?: string,
  deskripsi?: string
): Promise<string> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, UNIT_COLLECTION), {
      nama,
      kode: kode || '',
      deskripsi: deskripsi || '',
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating unit:', error);
    throw new Error('Failed to create unit');
  }
};

// Get all unit (including inactive)
export const getAllUnitWithInactive = async (): Promise<Unit[]> => {
  try {
    const q = query(collection(db, UNIT_COLLECTION), orderBy('nama', 'asc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Unit[];
  } catch (error) {
    console.error('Error getting all unit:', error);
    throw new Error('Failed to fetch all unit');
  }
};

// Get unit by ID
export const getUnitById = async (id: string): Promise<Unit | null> => {
  try {
    const docRef = doc(db, UNIT_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate() || new Date(),
        updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
      } as Unit;
    }

    return null;
  } catch (error) {
    console.error('Error getting unit:', error);
    throw new Error('Failed to fetch unit');
  }
};

// Update unit
export const updateUnit = async (
  id: string,
  unitData: Partial<Omit<Unit, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> => {
  try {
    const docRef = doc(db, UNIT_COLLECTION, id);
    const updateData = {
      ...unitData,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating unit:', error);
    throw new Error('Failed to update unit');
  }
};

// Delete unit (hard delete)
export const deleteUnit = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, UNIT_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting unit:', error);
    throw new Error('Failed to delete unit');
  }
};

// Deactivate unit (soft delete)
export const deactivateUnit = async (id: string): Promise<void> => {
  try {
    await updateUnit(id, { isActive: false });
  } catch (error) {
    console.error('Error deactivating unit:', error);
    throw new Error('Failed to deactivate unit');
  }
};

// Activate unit
export const activateUnit = async (id: string): Promise<void> => {
  try {
    await updateUnit(id, { isActive: true });
  } catch (error) {
    console.error('Error activating unit:', error);
    throw new Error('Failed to activate unit');
  }
};

// Bulk delete unit
export const bulkDeleteUnit = async (ids: string[]): Promise<void> => {
  try {
    const batch = writeBatch(db);

    ids.forEach(id => {
      const docRef = doc(db, UNIT_COLLECTION, id);
      batch.delete(docRef);
    });

    await batch.commit();
  } catch (error) {
    console.error('Error bulk deleting unit:', error);
    throw new Error('Failed to delete unit');
  }
};

// Search unit by name
export const searchUnitByName = async (searchTerm: string): Promise<Unit[]> => {
  try {
    const q = query(
      collection(db, UNIT_COLLECTION),
      where('isActive', '==', true),
      orderBy('nama', 'asc')
    );
    const querySnapshot = await getDocs(q);

    const allUnit = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Unit[];

    // Filter by search term (case insensitive)
    return allUnit.filter(
      unit =>
        unit.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.kode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.deskripsi?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching unit:', error);
    throw new Error('Failed to search unit');
  }
};

// Check if unit exists by name
export const checkUnitExists = async (nama: string, excludeId?: string): Promise<boolean> => {
  try {
    const q = query(collection(db, UNIT_COLLECTION), where('nama', '==', nama));
    const querySnapshot = await getDocs(q);

    if (excludeId) {
      return querySnapshot.docs.some(doc => doc.id !== excludeId);
    }

    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking unit exists:', error);
    throw new Error('Failed to check unit existence');
  }
};

/**
 * MASTER DATA
 */

// Get all master data
export const getMasterData = async (): Promise<MasterData> => {
  try {
    const [angkatanData, prodiData, unitData] = await Promise.all([
      getAllAngkatan(),
      getAllProdi(),
      getAllUnit(),
    ]);

    return {
      angkatanList: angkatanData.map(item => item.tahun),
      prodiList: prodiData.map(item => item.nama),
      unitList: unitData.map(item => item.nama),
    };
  } catch (error) {
    console.error('Error getting master data:', error);
    throw new Error('Failed to fetch master data');
  }
};

// Get enhanced master data with full objects
export const getEnhancedMasterData = async () => {
  try {
    const [angkatanData, prodiData, unitData] = await Promise.all([
      getAllAngkatan(),
      getAllProdi(),
      getAllUnit(),
    ]);

    return {
      angkatan: angkatanData,
      prodi: prodiData,
      unit: unitData,
      // Legacy format for backward compatibility
      angkatanList: angkatanData.map(item => item.tahun),
      prodiList: prodiData.map(item => item.nama),
      unitList: unitData.map(item => item.nama),
    };
  } catch (error) {
    console.error('Error getting enhanced master data:', error);
    throw new Error('Failed to fetch enhanced master data');
  }
};

// Get master data statistics
export const getMasterDataStats = async () => {
  try {
    const [allAngkatan, allProdi, allUnit] = await Promise.all([
      getAllAngkatanWithInactive(),
      getAllProdiWithInactive(),
      getAllUnitWithInactive(),
    ]);

    return {
      angkatan: {
        total: allAngkatan.length,
        active: allAngkatan.filter(item => item.isActive).length,
        inactive: allAngkatan.filter(item => !item.isActive).length,
      },
      prodi: {
        total: allProdi.length,
        active: allProdi.filter(item => item.isActive).length,
        inactive: allProdi.filter(item => !item.isActive).length,
      },
      unit: {
        total: allUnit.length,
        active: allUnit.filter(item => item.isActive).length,
        inactive: allUnit.filter(item => !item.isActive).length,
      },
    };
  } catch (error) {
    console.error('Error getting master data stats:', error);
    throw new Error('Failed to fetch master data statistics');
  }
};

/**
 * CLOUDINARY IMAGE UPLOAD
 */

// Upload image to Cloudinary
export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  try {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      throw new Error('Cloudinary configuration is missing');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'profiles'); // Optional: organize images in folders

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data: CloudinaryResponse = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

// Delete image from Cloudinary (optional)
export const deleteImageFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    if (!CLOUDINARY_CLOUD_NAME) {
      throw new Error('Cloudinary configuration is missing');
    }

    // Note: For security reasons, you should implement this on the server-side
    // This is just for reference
    console.log('Delete image with public_id:', publicId);
    // Implementation would require server-side API route
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  }
};

/**
 * UTILITY FUNCTIONS
 */

// Initialize master data (run once to populate database)
export const initializeMasterData = async (): Promise<void> => {
  try {
    const batch = writeBatch(db);
    const now = Timestamp.now();

    // Initialize Angkatan
    const angkatanList = ['2022', '2023', '2024', '2025'];
    angkatanList.forEach(tahun => {
      const docRef = doc(collection(db, ANGKATAN_COLLECTION));
      batch.set(docRef, {
        tahun,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });
    });

    // Initialize Prodi
    const prodiList = [
      'Manajemen Informatika',
      'Ilmu Komunikasi',
      'Sejarah',
      'Bahasa Inggris',
      'Teknik Mesin',
      'Biologi',
    ];
    prodiList.forEach(nama => {
      const docRef = doc(collection(db, PRODI_COLLECTION));
      batch.set(docRef, {
        nama,
        kode: '',
        fakultas: '',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });
    });

    // Initialize Unit
    const unitList = [
      'Bidang Pembinaan dan Pengembangan Kearsipan',
      'Bidang Informasi dan Layanan Kearsipan',
      'Bidang Pengelolaan Arsip Statis',
      'Sekretariat',
      'Unit Pelaksana Teknis',
    ];
    unitList.forEach(nama => {
      const docRef = doc(collection(db, UNIT_COLLECTION));
      batch.set(docRef, {
        nama,
        kode: '',
        deskripsi: '',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });
    });

    await batch.commit();
    console.log('Master data initialized successfully');
  } catch (error) {
    console.error('Error initializing master data:', error);
    throw new Error('Failed to initialize master data');
  }
};
