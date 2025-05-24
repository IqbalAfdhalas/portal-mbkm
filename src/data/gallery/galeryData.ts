// src/data/gallery/galeryData.ts

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  caption?: string;
  category: string;
  year: string;
  date: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: '/images/semua_gambar/galeri1.jpg',
    title: 'Kegiatan Pengelompokan dan Klasifikasi Arsip di Ruang Akuisisi',
    caption:
      'Proses pengelompokan arsip berdasarkan jenis dan tahun oleh mahasiswa MBKM di ruang akuisisi sebelum tahap penyimpanan ke dalam boks arsip.',
    category: 'Activity',
    year: '2025',
    date: '20 Maret 2025',
  },
  {
    id: 2,
    src: '/images/semua_gambar/galeri2.jpg',
    title: 'Black Friday - Kegiatan Olahraga Badminton',
    caption:
      'Mahasiswa MBKM BAST ANRI berfoto bersama seusai bermain badminton dalam rangka kegiatan olahraga santai di akhir pekan. Kegiatan ini jadi momen refreshing sekaligus mempererat kebersamaan antar peserta.',
    category: 'Activity',
    year: '2025',
    date: '11 Apr 2025',
  },
  {
    id: 3,
    src: '/images/semua_gambar/galeri3.jpg',
    title: 'Pameran Mini Arsip Bencana Alam di BAST',
    caption:
      'Dokumentasi kegiatan pameran mini arsip di BAST yang menampilkan koleksi foto, dokumen, dan catatan penting pasca bencana di Aceh. Diselenggarakan pada 22 Mei 2025.',
    category: 'Education',
    year: '2025',
    date: '22 Mei 2025',
  },
  {
    id: 4,
    src: '/images/semua_gambar/galeri4.jpg',
    title: 'Belajar Mitigasi Bencana Bareng Anak-anak di BAST',
    caption:
      'Kegiatan edukasi kebencanaan yang diadakan di Mini Theater BAST pada 8 Mei 2025. Acara ini melibatkan anak-anak dalam sesi interaktif tentang kesiapsiagaan menghadapi bencana.',
    category: 'Event',
    year: '2025',
    date: '8 Mei 2025',
  },
  {
    id: 5,
    src: '/images/semua_gambar/galeri5.jpg',
    title: 'Pameran Terbuka Arsip Tsunami',
    category: 'Event',
    year: '2024',
    date: '11 November 2024',
  },
  {
    id: 6,
    src: '/images/semua_gambar/galeri6.jpg',
    title: 'Mahasiswa MBKM Sedang Menjelaskan',
    category: 'Event',
    year: '2024',
    date: '11 November 2024',
  },
  {
    id: 7,
    src: '/images/semua_gambar/galeri7.jpg',
    title: 'Foto Bersama Penyelenggara',
    category: 'Event',
    year: '2024',
    date: '11 November 2024',
  },
  {
    id: 8,
    src: '/images/semua_gambar/galeri8.jpg',
    title: 'Pemaparan Sejarah',
    category: 'Event',
    year: '2024',
    date: '11 November 2024',
  },
  {
    id: 9,
    src: '/images/semua_gambar/galeri9.jpg',
    title: 'Ketertarikan dari Pengunjung',
    category: 'Event',
    year: '2024',
    date: '11 November 2024',
  },
  {
    id: 10,
    src: '/images/semua_gambar/galeri10.jpg',
    title: 'Interaksi Bersama Pengunjung',
    category: 'Event',
    year: '2024',
    date: '11 November 2024',
  },
];

// Helper functions for filtering and organizing data
export const getCategories = (): string[] => {
  const categories = Array.from(new Set(galleryImages.map(image => image.category)));
  return ['all', ...categories.sort()];
};

export const getYears = (): string[] => {
  const years = Array.from(new Set(galleryImages.map(image => image.year)));
  return ['all', ...years.sort().reverse()];
};

export const filterImages = (
  category: string = 'all',
  year: string = 'all',
  searchQuery: string = ''
): GalleryImage[] => {
  return galleryImages.filter(image => {
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

export const getImageById = (id: number): GalleryImage | undefined => {
  return galleryImages.find(image => image.id === id);
};

export const getImagesByCategory = (category: string): GalleryImage[] => {
  return galleryImages.filter(image => image.category === category);
};

export const getImagesByYear = (year: string): GalleryImage[] => {
  return galleryImages.filter(image => image.year === year);
};

export default galleryImages;
