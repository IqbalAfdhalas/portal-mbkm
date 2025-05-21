// src/constants/profileData.ts

export interface ProfileType {
  id: string;
  nama: string;
  peran: 'Pembimbing Kampus' | 'Mentor BAST ANRI' | 'Mahasiswa';
  foto: string;
  asalInstitusi?: string;
  prodi?: 'ManajemenInformatika' | 'IlmuKomunikasi' | 'Sejarah' | 'BahasaInggris' | 'TehnikMesin';
  angkatan?: '2024' | '2025';
  unit?: string;
}

export const profileData: ProfileType[] = [
  // Pembimbing Kampus
  {
    id: 'pk001',
    nama: 'Dr. Anisa Wijayanti, M.Hum.',
    peran: 'Pembimbing Kampus',
    foto: '/images/ilustrasiPROFIL1.png',
    asalInstitusi: 'Universitas Indonesia',
    prodi: 'ManajemenInformatika',
  },
  {
    id: 'pk002',
    nama: 'Prof. Bambang Sulistyo, M.A.',
    peran: 'Pembimbing Kampus',
    foto: '/images/ilustrasiPROFIL.png',
    asalInstitusi: 'Universitas Gadjah Mada',
    prodi: 'ManajemenInformatika',
  },
  {
    id: 'pk003',
    nama: 'Dr. Diana Rahmawati, M.I.Kom.',
    peran: 'Pembimbing Kampus',
    foto: '/images/ilustrasiPROFIL1.png',
    asalInstitusi: 'Universitas Padjadjaran',
    prodi: 'IlmuKomunikasi',
  },
  {
    id: 'pk004',
    nama: 'Dr. Eko Saputra, M.T.I.',
    peran: 'Pembimbing Kampus',
    foto: '/images/ilustrasiPROFIL.png',
    asalInstitusi: 'Universitas Airlangga',
    prodi: 'ManajemenInformatika',
  },
  {
    id: 'pk005',
    nama: 'Dr. Fina Nurhasanah, M.I.P.',
    peran: 'Pembimbing Kampus',
    foto: '/images/ilustrasiPROFIL1.png',
    asalInstitusi: 'Institut Teknologi Bandung',
    prodi: 'TehnikMesin',
  },

  // Mentor BAST ANRI
  {
    id: 'mn001',
    nama: 'Gunawan Prakoso, S.I.P., M.A.',
    peran: 'Mentor BAST ANRI',
    foto: '/images/ilustrasiPROFIL.png',
    unit: 'Pengolahan',
  },
  {
    id: 'mn002',
    nama: 'Hana Permatasari, S.Kom., M.Arch.',
    peran: 'Mentor BAST ANRI',
    foto: '/images/ilustrasiPROFIL1.png',
    unit: 'Preservasi',
  },
  {
    id: 'mn003',
    nama: 'Irfan Setiawan, S.I.P., M.M.',
    peran: 'Mentor BAST ANRI',
    foto: '/images/ilustrasiPROFIL.png',
    unit: 'Akuisisi',
  },
  {
    id: 'mn004',
    nama: 'Jasmine Kusumawardhani, S.I.Kom., M.Ds.',
    peran: 'Mentor BAST ANRI',
    foto: '/images/ilustrasiPROFIL1.png',
    unit: 'Pelayanan',
  },
  {
    id: 'mn005',
    nama: 'Kurniawan Adi, S.Kom., M.T.I.',
    peran: 'Mentor BAST ANRI',
    foto: '/images/ilustrasiPROFIL.png',
    unit: 'Tata Usaha',
  },

  // Mahasiswa
  {
    id: 'mhs001',
    nama: 'Laila Mufidah',
    peran: 'Mahasiswa',
    foto: '/images/ilustrasiPROFIL1.png',
    asalInstitusi: 'Universitas Indonesia',
    prodi: 'Sejarah',
    angkatan: '2024',
  },
  {
    id: 'mhs002',
    nama: 'Muhammad Daffa',
    peran: 'Mahasiswa',
    foto: '/images/ilustrasiPROFIL.png',
    asalInstitusi: 'Universitas Gadjah Mada',
    prodi: 'ManajemenInformatika',
    angkatan: '2025',
  },
  {
    id: 'mhs003',
    nama: 'Nabila Putri',
    peran: 'Mahasiswa',
    foto: '/images/ilustrasiPROFIL1.png',
    asalInstitusi: 'Universitas Padjadjaran',
    prodi: 'IlmuKomunikasi',
    angkatan: '2025',
  },
  {
    id: 'mhs004',
    nama: 'Olivia Sanjaya',
    peran: 'Mahasiswa',
    foto: '/images/ilustrasiPROFIL1.png',
    asalInstitusi: 'Universitas Airlangga',
    prodi: 'BahasaInggris',
    angkatan: '2024',
  },

  {
    id: 'mhs005',
    nama: 'Putra Ramadhan',
    peran: 'Mahasiswa',
    foto: '/images/ilustrasiPROFIL.png',
    asalInstitusi: 'Institut Teknologi Bandung',
    prodi: 'ManajemenInformatika',
    angkatan: '2025',
  },
  {
    id: 'mhs006',
    nama: 'Qori Aulia',
    peran: 'Mahasiswa',
    foto: '/images/ilustrasiPROFIL.png',
    asalInstitusi: 'Universitas Diponegoro',
    prodi: 'Sejarah',
    angkatan: '2024',
  },
  {
    id: 'mhs007',
    nama: 'Rizky Ramadhan',
    peran: 'Mahasiswa',
    foto: '/images/ilustrasiPROFIL.png',
    asalInstitusi: 'Universitas Hasanuddin',
    prodi: 'ManajemenInformatika',
    angkatan: '2025',
  },
  {
    id: 'mhs008',
    nama: 'Sari Indah',
    peran: 'Mahasiswa',
    foto: '/images/ilustrasiPROFIL1.png',
    asalInstitusi: 'Universitas Brawijaya',
    prodi: 'BahasaInggris',
    angkatan: '2024',
  },

  // Angkatan 2024
  {
    id: 'mhs009',
    nama: 'Arrajula Tsaqufa',
    peran: 'Mahasiswa',
    foto: '/images/testing.jpg',
    asalInstitusi: 'Universitas Syiah kuala',
    prodi: 'IlmuKomunikasi',
    angkatan: '2025',
  },
  {
    id: 'mhs010',
    nama: 'Utari Wulandari',
    peran: 'Mahasiswa',
    foto: '/images/ilustrasiPROFIL1.png',
    asalInstitusi: 'Universitas Indonesia',
    prodi: 'TehnikMesin',
    angkatan: '2024',
  },
  {
    id: 'mhs011',
    nama: 'Vino Aditya',
    peran: 'Mahasiswa',
    foto: '/images/ilustrasiPROFIL.png',
    asalInstitusi: 'Institut Teknologi Sepuluh Nopember',
    prodi: 'ManajemenInformatika',
    angkatan: '2025',
  },
  {
    id: 'mhs012',
    nama: 'Winda Sari',
    peran: 'Mahasiswa',
    foto: '/images/ilustrasiPROFIL1.png',
    asalInstitusi: 'Universitas Gadjah Mada',
    prodi: 'IlmuKomunikasi',
    angkatan: '2024',
  },
  {
    id: 'mhs013',
    nama: 'Xavier Putra',
    peran: 'Mahasiswa',
    foto: '/images/ilustrasiPROFIL.png',
    asalInstitusi: 'Universitas Padjadjaran',
    prodi: 'ManajemenInformatika',
    angkatan: '2024',
  },
  {
    id: 'mhs014',
    nama: 'Yasmin Aulia',
    peran: 'Mahasiswa',
    foto: '/images/ilustrasiPROFIL1.png',
    asalInstitusi: 'Universitas Airlangga',
    prodi: 'TehnikMesin',
    angkatan: '2024',
  },
  {
    id: 'mhs015',
    nama: 'Zahra Putri',
    peran: 'Mahasiswa',
    foto: '/images/ilustrasiPROFIL1.png',
    asalInstitusi: 'Institut Teknologi Bandung',
    prodi: 'IlmuKomunikasi',
    angkatan: '2024',
  },
];
