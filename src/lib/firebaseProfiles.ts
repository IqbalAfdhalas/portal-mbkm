// src/lib/firebaseProfiles.ts
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';

// Interface untuk Firebase (dengan Timestamp)
export interface ProfileFirebase {
  nama: string;
  peran: 'Pembimbing Kampus' | 'Mentor BAST ANRI' | 'Mahasiswa';
  foto: string | null;
  asalInstitusi?: string;
  prodi?:
    | 'Manajemen Informatika'
    | 'Ilmu Komunikasi'
    | 'Sejarah'
    | 'Bahasa Inggris'
    | 'Tehnik Mesin'
    | 'Biologi';
  angkatan?: '2024' | '2025';
  unit?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Interface untuk client (dengan Date)
export interface ProfileClient {
  id: string;
  nama: string;
  peran: 'Pembimbing Kampus' | 'Mentor BAST ANRI' | 'Mahasiswa';
  foto: string | null;
  asalInstitusi?: string;
  prodi?:
    | 'Manajemen Informatika'
    | 'Ilmu Komunikasi'
    | 'Sejarah'
    | 'Bahasa Inggris'
    | 'Tehnik Mesin'
    | 'Biologi';
  angkatan?: '2024' | '2025';
  unit?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Input interface untuk create/update
export interface ProfileInput {
  nama: string;
  peran: 'Pembimbing Kampus' | 'Mentor BAST ANRI' | 'Mahasiswa';
  foto?: string | null;
  asalInstitusi?: string;
  prodi?:
    | 'Manajemen Informatika'
    | 'Ilmu Komunikasi'
    | 'Sejarah'
    | 'Bahasa Inggris'
    | 'Tehnik Mesin'
    | 'Biologi';
  angkatan?: '2024' | '2025';
  unit?: string;
}

const COLLECTION_NAME = 'profiles';

// Utility: Convert Firebase doc to Client format
const convertFirebaseToClient = (id: string, data: ProfileFirebase): ProfileClient => {
  return {
    id,
    ...data,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  };
};

// Utility: Generate avatar URL
export const generateAvatarUrl = (nama: string): string => {
  const cleanName = nama.trim();
  const encodedName = encodeURIComponent(cleanName);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&size=200`;
};

// GET ALL PROFILES
export const getAllProfiles = async (): Promise<ProfileClient[]> => {
  try {
    const profilesRef = collection(db, COLLECTION_NAME);
    const q = query(profilesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const profiles: ProfileClient[] = [];
    querySnapshot.forEach(doc => {
      const data = doc.data() as ProfileFirebase;
      profiles.push(convertFirebaseToClient(doc.id, data));
    });

    return profiles;
  } catch (error) {
    console.error('Error getting profiles:', error);
    throw new Error('Failed to fetch profiles');
  }
};

// GET PROFILE BY ID
export const getProfileById = async (id: string): Promise<ProfileClient | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as ProfileFirebase;
      return convertFirebaseToClient(docSnap.id, data);
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting profile:', error);
    throw new Error('Failed to fetch profile');
  }
};

// CREATE PROFILE
export const createProfile = async (profileData: ProfileInput): Promise<string> => {
  try {
    const now = Timestamp.now();

    // Generate avatar jika foto tidak ada
    const foto = profileData.foto || generateAvatarUrl(profileData.nama);

    const newProfile: ProfileFirebase = {
      ...profileData,
      foto,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), newProfile);
    return docRef.id;
  } catch (error) {
    console.error('Error creating profile:', error);
    throw new Error('Failed to create profile');
  }
};

// UPDATE PROFILE
export const updateProfile = async (
  id: string,
  profileData: Partial<ProfileInput>
): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);

    // Generate avatar jika foto diset null dan nama ada
    let updateData: Partial<ProfileFirebase> = {
      ...profileData,
      updatedAt: Timestamp.now(),
    };

    if (profileData.foto === null && profileData.nama) {
      updateData.foto = generateAvatarUrl(profileData.nama);
    } else if (profileData.foto === null) {
      // Jika foto diset null tapi nama tidak ada, ambil nama dari database
      const existingDoc = await getDoc(docRef);
      if (existingDoc.exists()) {
        const existingData = existingDoc.data() as ProfileFirebase;
        updateData.foto = generateAvatarUrl(existingData.nama);
      }
    }

    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile');
  }
};

// DELETE SINGLE PROFILE
export const deleteProfile = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw new Error('Failed to delete profile');
  }
};

// DELETE MULTIPLE PROFILES
export const deleteMultipleProfiles = async (ids: string[]): Promise<void> => {
  try {
    const batch = writeBatch(db);

    ids.forEach(id => {
      const docRef = doc(db, COLLECTION_NAME, id);
      batch.delete(docRef);
    });

    await batch.commit();
  } catch (error) {
    console.error('Error deleting multiple profiles:', error);
    throw new Error('Failed to delete profiles');
  }
};

// MIGRATE DUMMY DATA (untuk testing - jalankan sekali)
export const migrateDummyData = async (dummyData: any[]): Promise<void> => {
  try {
    const batch = writeBatch(db);
    const now = Timestamp.now();

    dummyData.forEach(profile => {
      const docRef = doc(collection(db, COLLECTION_NAME));

      // Buat object dengan field yang required
      const profileData: any = {
        nama: profile.nama,
        peran: profile.peran,
        foto: profile.foto || generateAvatarUrl(profile.nama),
        createdAt: now,
        updatedAt: now,
      };

      // Hanya tambahkan field optional jika tidak undefined/null
      if (profile.asalInstitusi !== undefined && profile.asalInstitusi !== null) {
        profileData.asalInstitusi = profile.asalInstitusi;
      }
      if (profile.prodi !== undefined && profile.prodi !== null) {
        profileData.prodi = profile.prodi;
      }
      if (profile.angkatan !== undefined && profile.angkatan !== null) {
        profileData.angkatan = profile.angkatan;
      }
      if (profile.unit !== undefined && profile.unit !== null) {
        profileData.unit = profile.unit;
      }

      batch.set(docRef, profileData);
    });

    await batch.commit();
    console.log('Dummy data migrated successfully!');
  } catch (error) {
    console.error('Error migrating dummy data:', error);
    throw new Error('Failed to migrate dummy data');
  }
};

// UTILITY: Check Firebase connection
export const testFirebaseConnection = async (): Promise<boolean> => {
  try {
    const profilesRef = collection(db, COLLECTION_NAME);
    await getDocs(profilesRef);
    return true;
  } catch (error) {
    console.error('Firebase connection failed:', error);
    return false;
  }
};
