// src/data/kenali-kami/profileData.ts

export interface ProfileType {
  id: string;
  nama: string;
  peran: 'Pembimbing Kampus' | 'Mentor BAST ANRI' | 'Mahasiswa';
  foto: string;
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

// Data array kosong - siap untuk diisi dari database
export const profileData: ProfileType[] = [];

// Fungsi helper untuk validasi data profil
export const validateProfile = (profile: Partial<ProfileType>): boolean => {
  if (!profile.id || !profile.nama || !profile.peran || !profile.foto) {
    return false;
  }

  const validPeran = ['Pembimbing Kampus', 'Mentor BAST ANRI', 'Mahasiswa'];
  if (!validPeran.includes(profile.peran)) {
    return false;
  }

  if (profile.prodi) {
    const validProdi = [
      'Manajemen Informatika',
      'Ilmu Komunikasi',
      'Sejarah',
      'Bahasa Inggris',
      'Tehnik Mesin',
      'Biologi',
    ];
    if (!validProdi.includes(profile.prodi)) {
      return false;
    }
  }

  if (profile.angkatan) {
    const validAngkatan = ['2024', '2025'];
    if (!validAngkatan.includes(profile.angkatan)) {
      return false;
    }
  }

  return true;
};

// Fungsi helper untuk filter berdasarkan peran
export const getProfilesByRole = (
  profiles: ProfileType[],
  role: ProfileType['peran']
): ProfileType[] => {
  return profiles.filter(profile => profile.peran === role);
};

// Fungsi helper untuk filter berdasarkan prodi
export const getProfilesByProdi = (profiles: ProfileType[], prodi: string): ProfileType[] => {
  return profiles.filter(profile => profile.prodi === prodi);
};

// Fungsi helper untuk filter berdasarkan angkatan
export const getProfilesByAngkatan = (profiles: ProfileType[], angkatan: string): ProfileType[] => {
  return profiles.filter(profile => profile.angkatan === angkatan);
};

// Fungsi helper untuk mencari profil berdasarkan ID
export const getProfileById = (profiles: ProfileType[], id: string): ProfileType | undefined => {
  return profiles.find(profile => profile.id === id);
};

// Fungsi helper untuk mencari profil berdasarkan nama
export const searchProfilesByName = (
  profiles: ProfileType[],
  searchTerm: string
): ProfileType[] => {
  return profiles.filter(profile => profile.nama.toLowerCase().includes(searchTerm.toLowerCase()));
};
