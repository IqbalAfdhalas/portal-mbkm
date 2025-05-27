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
  limit,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
import { firebaseOptimization } from './utils/firebaseOptimization';
import { performanceCache, CACHE_KEYS, CACHE_TTL } from './utils/performanceCache';

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

// GET ALL PROFILES (Optimized with caching)
export const getAllProfiles = async (): Promise<ProfileClient[]> => {
  const cacheKey = CACHE_KEYS.PROFILES_ALL;

  return performanceCache.cachedFetch(
    cacheKey,
    async () => {
      console.log('🔄 [Profiles] Fetching all profiles from Firebase...');

      // Ensure Firebase connection is warmed up
      await firebaseOptimization.warmupConnection();

      const profilesRef = collection(db, COLLECTION_NAME);
      const q = query(profilesRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const profiles: ProfileClient[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data() as ProfileFirebase;
        profiles.push(convertFirebaseToClient(doc.id, data));
      });

      console.log(`✅ [Profiles] Fetched ${profiles.length} profiles`);
      return profiles;
    },
    CACHE_TTL.MEDIUM
  );
};

// GET PROFILE BY ID (Optimized with caching)
export const getProfileById = async (id: string): Promise<ProfileClient | null> => {
  const cacheKey = CACHE_KEYS.PROFILE_BY_ID(id);

  return performanceCache.cachedFetch(
    cacheKey,
    async () => {
      console.log(`🔄 [Profiles] Fetching profile ${id} from Firebase...`);

      // Ensure Firebase connection is warmed up
      await firebaseOptimization.warmupConnection();

      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as ProfileFirebase;
        const profile = convertFirebaseToClient(docSnap.id, data);
        console.log(`✅ [Profiles] Profile ${id} found`);
        return profile;
      } else {
        console.log(`❌ [Profiles] Profile ${id} not found`);
        return null;
      }
    },
    CACHE_TTL.MEDIUM
  );
};

// GET PROFILES BY ROLE (New optimized function)
export const getProfilesByRole = async (role: ProfileClient['peran']): Promise<ProfileClient[]> => {
  const cacheKey = `profiles_by_role_${role.toLowerCase().replace(/\s+/g, '_')}`;

  return performanceCache.cachedFetch(
    cacheKey,
    async () => {
      console.log(`🔄 [Profiles] Fetching profiles with role: ${role}`);

      // Get all profiles and filter by role (more cache-efficient than separate queries)
      const allProfiles = await getAllProfiles();
      const filteredProfiles = allProfiles.filter(profile => profile.peran === role);

      console.log(`✅ [Profiles] Found ${filteredProfiles.length} profiles with role: ${role}`);
      return filteredProfiles;
    },
    CACHE_TTL.MEDIUM
  );
};

// BULK GET PROFILES (New optimized function for multiple IDs)
export const getProfilesByIds = async (ids: string[]): Promise<ProfileClient[]> => {
  if (ids.length === 0) return [];

  console.log(`🔄 [Profiles] Bulk fetching ${ids.length} profiles...`);

  // Use parallel execution for multiple profile queries
  const queries = ids.reduce(
    (acc, id) => {
      acc[id] = () => getProfileById(id);
      return acc;
    },
    {} as Record<string, () => Promise<ProfileClient | null>>
  );

  const results = await firebaseOptimization.executeParallel(queries);

  // Filter out null results and return array
  const profiles = Object.values(results).filter(
    (profile): profile is ProfileClient => profile !== null
  );

  console.log(
    `✅ [Profiles] Bulk fetch completed: ${profiles.length}/${ids.length} profiles found`
  );
  return profiles;
};

// CREATE PROFILE (Optimized with cache invalidation)
export const createProfile = async (profileData: ProfileInput): Promise<string> => {
  try {
    console.log('🔄 [Profiles] Creating new profile...');

    // Ensure Firebase connection is warmed up
    await firebaseOptimization.warmupConnection();

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

    // Invalidate relevant caches
    performanceCache.invalidate(CACHE_KEYS.PROFILES_ALL);
    performanceCache.invalidate(
      `profiles_by_role_${profileData.peran.toLowerCase().replace(/\s+/g, '_')}`
    );

    console.log(`✅ [Profiles] Profile created with ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('❌ [Profiles] Error creating profile:', error);
    throw new Error('Failed to create profile');
  }
};

// UPDATE PROFILE (Optimized with cache invalidation)
export const updateProfile = async (
  id: string,
  profileData: Partial<ProfileInput>
): Promise<void> => {
  try {
    console.log(`🔄 [Profiles] Updating profile ${id}...`);

    // Ensure Firebase connection is warmed up
    await firebaseOptimization.warmupConnection();

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

    // Invalidate relevant caches
    performanceCache.invalidate(CACHE_KEYS.PROFILES_ALL);
    performanceCache.invalidate(CACHE_KEYS.PROFILE_BY_ID(id));

    // If role is being updated, invalidate role-based caches
    if (profileData.peran) {
      performanceCache.invalidate(
        `profiles_by_role_${profileData.peran.toLowerCase().replace(/\s+/g, '_')}`
      );
    }

    console.log(`✅ [Profiles] Profile ${id} updated successfully`);
  } catch (error) {
    console.error(`❌ [Profiles] Error updating profile ${id}:`, error);
    throw new Error('Failed to update profile');
  }
};

// DELETE SINGLE PROFILE (Optimized with cache invalidation)
export const deleteProfile = async (id: string): Promise<void> => {
  try {
    console.log(`🔄 [Profiles] Deleting profile ${id}...`);

    // Get profile data before deletion for cache invalidation
    const profile = await getProfileById(id);

    // Ensure Firebase connection is warmed up
    await firebaseOptimization.warmupConnection();

    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);

    // Invalidate relevant caches
    performanceCache.invalidate(CACHE_KEYS.PROFILES_ALL);
    performanceCache.invalidate(CACHE_KEYS.PROFILE_BY_ID(id));

    if (profile) {
      performanceCache.invalidate(
        `profiles_by_role_${profile.peran.toLowerCase().replace(/\s+/g, '_')}`
      );
    }

    console.log(`✅ [Profiles] Profile ${id} deleted successfully`);
  } catch (error) {
    console.error(`❌ [Profiles] Error deleting profile ${id}:`, error);
    throw new Error('Failed to delete profile');
  }
};

// DELETE MULTIPLE PROFILES (Optimized with batch operations and cache invalidation)
export const deleteMultipleProfiles = async (ids: string[]): Promise<void> => {
  if (ids.length === 0) return;

  try {
    console.log(`🔄 [Profiles] Bulk deleting ${ids.length} profiles...`);

    // Get profile data before deletion for cache invalidation
    const profiles = await getProfilesByIds(ids);
    const affectedRoles = new Set(profiles.map(p => p.peran));

    // Ensure Firebase connection is warmed up
    await firebaseOptimization.warmupConnection();

    const batch = writeBatch(db);

    ids.forEach(id => {
      const docRef = doc(db, COLLECTION_NAME, id);
      batch.delete(docRef);
    });

    await batch.commit();

    // Invalidate relevant caches
    performanceCache.invalidate(CACHE_KEYS.PROFILES_ALL);

    // Invalidate individual profile caches
    ids.forEach(id => {
      performanceCache.invalidate(CACHE_KEYS.PROFILE_BY_ID(id));
    });

    // Invalidate role-based caches
    affectedRoles.forEach(role => {
      performanceCache.invalidate(`profiles_by_role_${role.toLowerCase().replace(/\s+/g, '_')}`);
    });

    console.log(`✅ [Profiles] ${ids.length} profiles deleted successfully`);
  } catch (error) {
    console.error(`❌ [Profiles] Error deleting multiple profiles:`, error);
    throw new Error('Failed to delete profiles');
  }
};

// LOAD PROFILES WITH PROGRESSIVE LOADING (New optimized function)
export const loadProfilesProgressive = async (
  onUpdate?: (
    data: Partial<{
      recent: ProfileClient[];
      byRole: Record<string, ProfileClient[]>;
      all: ProfileClient[];
    }>
  ) => void
): Promise<{
  recent: ProfileClient[];
  byRole: Record<string, ProfileClient[]>;
  all: ProfileClient[];
}> => {
  console.log('🚀 [Profiles] Starting progressive profile loading...');

  const results = await firebaseOptimization.executeProgressive([
    {
      key: 'recent_profiles',
      priority: 'high',
      queryFn: async () => {
        const profilesRef = collection(db, COLLECTION_NAME);
        const q = query(profilesRef, orderBy('createdAt', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);

        const profiles: ProfileClient[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data() as ProfileFirebase;
          profiles.push(convertFirebaseToClient(doc.id, data));
        });

        return profiles;
      },
      onComplete: (key, data) => {
        if (onUpdate) {
          onUpdate({ recent: data });
        }
      },
    },
    {
      key: 'all_profiles',
      priority: 'medium',
      queryFn: () => getAllProfiles(),
      onComplete: (key, data) => {
        if (onUpdate) {
          onUpdate({ all: data });
        }
      },
    },
    {
      key: 'profiles_by_role',
      priority: 'low',
      queryFn: async () => {
        const allProfiles = await getAllProfiles();
        const byRole: Record<string, ProfileClient[]> = {};

        allProfiles.forEach(profile => {
          if (!byRole[profile.peran]) {
            byRole[profile.peran] = [];
          }
          byRole[profile.peran].push(profile);
        });

        return byRole;
      },
      onComplete: (key, data) => {
        if (onUpdate) {
          onUpdate({ byRole: data });
        }
      },
    },
  ]);

  return {
    recent: results.recent_profiles,
    all: results.all_profiles,
    byRole: results.profiles_by_role,
  };
};

// MIGRATE DUMMY DATA (untuk testing - dengan optimasi batch)
export const migrateDummyData = async (dummyData: any[]): Promise<void> => {
  try {
    console.log(`🔄 [Profiles] Migrating ${dummyData.length} dummy profiles...`);

    // Ensure Firebase connection is warmed up
    await firebaseOptimization.warmupConnection();

    // Process in batches of 500 (Firestore batch limit)
    const batchSize = 500;
    const batches = [];

    for (let i = 0; i < dummyData.length; i += batchSize) {
      const batchData = dummyData.slice(i, i + batchSize);
      batches.push(batchData);
    }

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = writeBatch(db);
      const now = Timestamp.now();

      batches[batchIndex].forEach(profile => {
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
      console.log(`✅ [Profiles] Batch ${batchIndex + 1}/${batches.length} migrated`);
    }

    // Clear all caches after migration
    performanceCache.clear();

    console.log('🎉 [Profiles] Dummy data migration completed successfully!');
  } catch (error) {
    console.error('❌ [Profiles] Error migrating dummy data:', error);
    throw new Error('Failed to migrate dummy data');
  }
};

// UTILITY: Check Firebase connection (Enhanced with optimization)
export const testFirebaseConnection = async (): Promise<boolean> => {
  try {
    console.log('🔄 [Profiles] Testing Firebase connection...');

    // Use warmup connection which includes connection test
    await firebaseOptimization.warmupConnection();

    // Additional test with profiles collection
    const profilesRef = collection(db, COLLECTION_NAME);
    const testQuery = query(profilesRef, limit(1));
    await getDocs(testQuery);

    console.log('✅ [Profiles] Firebase connection test successful');
    return true;
  } catch (error) {
    console.error('❌ [Profiles] Firebase connection test failed:', error);
    return false;
  }
};

// UTILITY: Get performance stats
export const getProfilesPerformanceStats = () => {
  return {
    cache: performanceCache.getStats(),
    firebase: firebaseOptimization.getConnectionStatus(),
  };
};

// UTILITY: Clear all profile caches (for debugging/testing)
export const clearProfilesCache = () => {
  performanceCache.invalidate(CACHE_KEYS.PROFILES_ALL);

  // Clear role-based caches
  const roles = ['Pembimbing Kampus', 'Mentor BAST ANRI', 'Mahasiswa'];
  roles.forEach(role => {
    performanceCache.invalidate(`profiles_by_role_${role.toLowerCase().replace(/\s+/g, '_')}`);
  });

  console.log('🧹 [Profiles] All profile caches cleared');
};
