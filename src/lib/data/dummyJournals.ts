// src/lib/data/dummyJournals.ts
import { Journal } from '../types/journal';

// Helper untuk membuat timestamps yang konsisten
const createDate = (daysAgo: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
};

export const dummyJournals: Journal[] = [
  // Daily Activity Journals
  {
    id: 'da-001',
    title: 'Hari Pertama Magang: Pengenalan Lingkungan Kerja',
    summary:
      'Pengalaman pertama mengikuti program magang di Arsip Nasional RI dengan pengenalan lingkungan kerja dan tim.',
    content: `
# Hari Pertama Magang: Pengenalan Lingkungan Kerja

Hari ini adalah hari pertama saya mengikuti program Merdeka Belajar Kampus Merdeka (MBKM) di Arsip Nasional Republik Indonesia. Kesan pertama sangat positif, dengan sambutan hangat dari seluruh tim.

## Aktivitas Hari Ini
- Pengenalan struktur organisasi ANRI
- Tour fasilitas dan lingkungan kerja
- Perkenalan dengan anggota tim Unit Pengolahan Arsip
- Penjelasan mengenai agenda dan target selama program magang

## Yang Saya Pelajari
Saya mendapatkan pemahaman awal tentang proses pengarsipan digital dan bagaimana ANRI bekerja untuk melestarikan dokumen bersejarah. Ternyata ada banyak teknik dan standar dalam pengarsipan yang belum saya ketahui sebelumnya.

## Refleksi
Hari pertama ini membuat saya semakin yakin bahwa program MBKM di ANRI akan memberikan pengalaman belajar yang berharga, terutama dalam bidang manajemen informasi dan pengarsipan digital yang relevan dengan jurusan saya.
    `,
    date: createDate(30),
    publishDate: createDate(29),
    category: 'daily-activity',
    location: 'Arsip Nasional RI, Jakarta',
    authorId: 'user1',
    authorName: 'Budi Santoso',
    authorImage: '/images/semua_gambar/author_testing.png',
    media: [
      { url: '/images/semua_gambar/testing.jpg', caption: 'Foto bersama tim ANRI' },
      { url: '/images/semua_gambar/media_testing.png', caption: 'Ruang kerja di ANRI' },
    ],
    status: 'published',
    createdAt: createDate(29),
    updatedAt: createDate(29),
  },
  {
    id: 'da-002',
    title: 'Mengikuti Workshop Digitalisasi Arsip',
    summary:
      'Pembelajaran tentang teknologi dan standar dalam proses digitalisasi arsip bersejarah.',
    content: `
# Workshop Digitalisasi Arsip

Hari ini saya berkesempatan mengikuti workshop digitalisasi arsip yang difasilitasi oleh tim IT ANRI. Workshop ini sangat informatif dan hands-on.

## Materi Workshop
- Standar metadata untuk arsip digital
- Teknik scanning dokumen bersejarah
- Proses OCR (Optical Character Recognition)
- Penyimpanan dan preservasi digital jangka panjang

## Praktik yang Dilakukan
Secara langsung saya mencoba proses digitalisasi dokumen lama, mulai dari scanning hingga input metadata. Tantangannya adalah memastikan kualitas hasil scan tetap baik sementara dokumen asli tidak rusak dalam proses tersebut.

## Insight Baru
Ternyata digitalisasi arsip bukan sekadar proses scan dokumen, tapi juga melibatkan banyak aspek teknis dan standarisasi untuk memastikan arsip digital dapat diakses dalam jangka panjang.
    `,
    date: createDate(25),
    publishDate: createDate(24),
    category: 'daily-activity',
    location: 'Laboratorium Digital ANRI, Jakarta',
    authorId: 'user1',
    authorName: 'Budi Santoso',
    authorImage: '/api/placeholder/150/150',
    media: [
      { url: '/api/placeholder/640/480', caption: 'Proses scanning dokumen' },
      { url: '/api/placeholder/640/480', caption: 'Hasil digitalisasi arsip' },
    ],
    status: 'published',
    createdAt: createDate(24),
    updatedAt: createDate(24),
  },

  {
    id: 'da-003',
    title: 'Pengarsipan Dokumen Fisik: Hari Intensif',
    summary: 'Menelusuri proses klasifikasi dan penyimpanan arsip fisik selama sehari penuh.',
    content: `# Pengarsipan Dokumen Fisik: Hari Intensif\n\nKegiatan hari ini difokuskan pada pengarsipan dokumen cetak dengan sistem klasifikasi ANRI. Saya mempelajari bagaimana kode klasifikasi digunakan dan bagaimana penanganan arsip dilakukan dengan hati-hati.`,
    date: createDate(20),
    publishDate: createDate(19),
    category: 'daily-activity',
    location: 'Ruang Arsip Fisik ANRI, Jakarta',
    authorId: 'user2',
    authorName: 'Anisa Wijayanti',
    authorImage: '/api/placeholder/150/150',
    media: [{ url: '/api/placeholder/640/480', caption: 'Rak arsip fisik ANRI' }],
    status: 'published',
    createdAt: createDate(19),
    updatedAt: createDate(19),
  },

  // Weekly Reflection Journals
  {
    id: 'wr-001',
    title: 'Refleksi Minggu Pertama: Adaptasi dan Pembelajaran',
    summary:
      'Merefleksikan pengalaman, tantangan, dan pembelajaran selama minggu pertama program MBKM di ANRI.',
    content: `
# Refleksi Minggu Pertama: Adaptasi dan Pembelajaran

Minggu pertama program MBKM di Arsip Nasional RI telah memberikan banyak pengalaman dan pembelajaran berharga. Berikut refleksi dari minggu pertama ini:

## Highlights Minggu Ini
- Pengenalan dengan sistem pengarsipan nasional
- Workshop digitalisasi arsip
- Diskusi dengan pakar kearsipan
- Observasi proses preservasi arsip fisik

## Tantangan yang Dihadapi
Adaptasi dengan terminologi teknis dalam bidang kearsipan menjadi tantangan tersendiri. Banyak istilah dan konsep yang baru bagi saya sebagai mahasiswa Teknik Informatika. Selain itu, protokol penanganan dokumen bersejarah juga memerlukan ketelitian dan kehati-hatian yang tinggi.

## Pembelajaran Utama
Saya belajar bahwa preservasi informasi memiliki nilai yang sangat penting bagi keberlangsungan pengetahuan dan sejarah bangsa. Teknologi memang berperan penting, namun pemahaman konteks historis dan prinsip pengarsipan tetap menjadi fondasi utama.

## Rencana Pengembangan
Untuk minggu depan, saya berencana untuk lebih mendalami aspek teknis dari sistem manajemen arsip digital dan memahami bagaimana teknologi big data dapat diaplikasikan dalam pengarsipan nasional.
    `,
    date: createDate(23),
    publishDate: createDate(22),
    category: 'weekly-reflection',
    authorId: 'user2',
    authorName: 'Anisa Wijayanti',
    authorImage: '/api/placeholder/150/150',
    media: [{ url: '/api/placeholder/640/480', caption: 'Kegiatan selama minggu pertama' }],
    status: 'published',
    createdAt: createDate(22),
    updatedAt: createDate(21),
  },
  {
    id: 'wr-002',
    title: 'Refleksi Minggu Ketiga: Pendalaman Sistem Pengarsipan Digital',
    summary:
      'Evaluasi perkembangan dalam memahami sistem pengarsipan digital ANRI dan aplikasinya.',
    content: `
# Refleksi Minggu Ketiga: Pendalaman Sistem Pengarsipan Digital

Memasuki minggu ketiga program MBKM di ANRI, saya merasakan perkembangan signifikan dalam pemahaman saya tentang sistem pengarsipan digital.

## Progress Pembelajaran
- Memahami alur kerja lengkap sistem SIKN (Sistem Informasi Kearsipan Nasional)
- Berpartisipasi dalam proyek migrasi data arsip lama ke format baru
- Belajar tentang standar internasional dalam pengarsipan digital
- Menganalisis kebutuhan user dalam mengakses arsip digital

## Tantangan Minggu Ini
Kompleksitas integrasi sistem lama dengan teknologi baru menjadi tantangan utama. Ada trade-off antara mempertahankan kompatibilitas dengan sistem lama dan mengadopsi fitur-fitur baru yang lebih efisien.

## Insight Penting
Standardisasi menjadi kunci dalam pengarsipan skala nasional. Tanpa standar yang konsisten, arsip digital akan sulit dikelola dan diakses dalam jangka panjang, terutama dengan cepatnya perubahan teknologi.

## Target Minggu Depan
Saya akan fokus mempelajari aspek keamanan dalam sistem pengarsipan digital dan bagaimana teknologi blockchain dapat dimanfaatkan untuk menjamin otentisitas arsip digital.
    `,
    date: createDate(9),
    publishDate: createDate(8),
    category: 'weekly-reflection',
    authorId: 'user2',
    authorName: 'Anisa Wijayanti',
    authorImage: '/api/placeholder/150/150',
    media: [
      { url: '/api/placeholder/640/480', caption: 'Diagram sistem SIKN' },
      { url: '/api/placeholder/640/480', caption: 'Workshop migrasi data' },
    ],
    status: 'published',
    createdAt: createDate(8),
    updatedAt: createDate(8),
  },

  {
    id: 'wr-003',
    title: 'Refleksi Minggu Keempat: Kolaborasi Antar Departemen',
    summary: 'Refleksi tentang pentingnya koordinasi lintas tim dalam pengelolaan arsip digital.',
    content: `# Refleksi Minggu Keempat: Kolaborasi Antar Departemen\n\nMinggu ini penuh dengan koordinasi lintas divisi. Saya belajar bahwa keberhasilan pengelolaan arsip digital tidak hanya bergantung pada tim IT, tapi juga melibatkan unit konten, legal, dan metadata.`,
    date: createDate(6),
    publishDate: createDate(5),
    category: 'weekly-reflection',
    location: 'ANRI, Jakarta',
    authorId: 'user1',
    authorName: 'Budi Santoso',
    authorImage: '/api/placeholder/150/150',
    media: [{ url: '/api/placeholder/640/480', caption: 'Diskusi antar departemen' }],
    status: 'published',
    createdAt: createDate(5),
    updatedAt: createDate(5),
  },

  // Project Update Journals
  {
    id: 'pu-001',
    title: 'Proyek Visualisasi Data Arsip Kolonial: Tahap Analisis',
    summary:
      'Update progres proyek visualisasi data arsip era kolonial dan analisis kebutuhan user.',
    content: `
# Proyek Visualisasi Data Arsip Kolonial: Tahap Analisis

Sebagai bagian dari program MBKM di ANRI, saya terlibat dalam proyek visualisasi data arsip era kolonial Belanda. Berikut update dari tahap analisis proyek:

## Deskripsi Proyek
Proyek ini bertujuan untuk memvisualisasikan data dari koleksi arsip era kolonial (1800-1945) dalam bentuk dashboard interaktif yang memudahkan peneliti dan masyarakat umum mengakses dan memahami informasi historis.

## Progress Saat Ini
- Completed: Identifikasi dan kategorisasi data arsip kolonial
- Completed: Analisis kebutuhan pengguna melalui wawancara dengan 5 sejarawan
- In Progress: Pemodelan data untuk sistem visualisasi
- In Progress: Prototyping awal interface dashboard

## Tantangan Teknis
- Inkonsistensi format data dari sumber arsip yang berbeda
- Kebutuhan untuk menampilkan konteks historis bersamaan dengan data
- Memastikan akurasi dalam representasi informasi sensitif

## Langkah Selanjutnya
- Finalisasi model data dan struktur database
- Pengembangan prototype dashboard dengan D3.js
- User testing dengan kelompok sejarawan dan arkeolog

## Timeline
- Mid-project review: 2 minggu lagi
- Alpha version dashboard: 4 minggu lagi
- Final delivery: 8 minggu lagi
    `,
    date: createDate(15),
    publishDate: createDate(14),
    category: 'project-update',
    location: 'Divisi IT ANRI, Jakarta',
    authorId: 'user3',
    authorName: 'Dimas Prayoga',
    authorImage: '/api/placeholder/150/150',
    media: [
      { url: '/api/placeholder/640/480', caption: 'Mockup dashboard visualisasi' },
      { url: '/api/placeholder/640/480', caption: 'Sample data arsip kolonial' },
    ],
    status: 'published',
    createdAt: createDate(14),
    updatedAt: createDate(14),
  },
  {
    id: 'pu-002',
    title: 'Implementasi Database untuk Katalogisasi Arsip Audio',
    summary:
      'Progress pengembangan sistem database untuk pengelolaan dan katalogisasi arsip rekaman audio sejarah.',
    content: `
# Implementasi Database untuk Katalogisasi Arsip Audio

Proyek pengembangan database untuk koleksi arsip audio ANRI telah memasuki tahap implementasi. Berikut laporan kemajuan proyek:

## Objektif Proyek
Mengembangkan sistem database komprehensif untuk mengelola koleksi rekaman audio bersejarah, termasuk pidato tokoh nasional, rekaman sidang bersejarah, dan wawancara saksi sejarah.

## Milestone Tercapai
- Penyusunan skema database yang mengikuti standar Dublin Core dan METS
- Implementasi sistem tagging dan klasifikasi audio berdasarkan periode sejarah
- Pengembangan API untuk integrasi dengan sistem katalog utama ANRI
- Migrasi 30% data dari sistem lama ke struktur database baru

## Technical Details
Sistem database menggunakan MongoDB untuk fleksibilitas skema, dengan layer API menggunakan Express.js. Penyimpanan file audio menggunakan object storage yang terintegrasi dengan sistem backup.

Feature highlights:
- Full-text search pada transkrip audio
- Filtering berdasarkan timeline sejarah
- Tagging otomatis menggunakan NLP
- Version control untuk metadata

## Next Steps
- Melanjutkan migrasi data (target: 100% dalam 3 minggu)
- Pengembangan interface admin untuk pengelolaan koleksi
- Implementasi sistem quality control untuk verifikasi metadata
- User testing dengan tim arsiparis audio

## Lessons Learned
Memahami kompleksitas metadata untuk arsip audio jauh lebih menantang dibanding arsip teks. Aspek teknis seperti kualitas audio, format, dan preservasi membutuhkan pendekatan khusus dalam desain database.
    `,
    date: createDate(5),
    publishDate: createDate(4),
    category: 'project-update',
    location: 'Divisi IT ANRI, Jakarta',
    authorId: 'user3',
    authorName: 'Dimas Prayoga',
    authorImage: '/api/placeholder/150/150',
    media: [
      { url: '/api/placeholder/640/480', caption: 'Struktur database arsip audio' },
      { url: '/api/placeholder/640/480', caption: 'Interface katalogisasi' },
    ],
    status: 'published',
    createdAt: createDate(4),
    updatedAt: createDate(3),
  },

  {
    id: 'pu-003',
    title: 'Uji Coba Sistem Pencarian Arsip Berbasis AI',
    summary: 'Update proyek eksperimen pencarian arsip dengan natural language processing.',
    content: `# Uji Coba Sistem Pencarian Arsip Berbasis AI\n\nKami mengembangkan sistem pencarian arsip berbasis pertanyaan alami. User bisa mengetikkan pertanyaan dan sistem mencarikan dokumen terkait. Kami menggunakan NLP dengan model bahasa lokal.`,
    date: createDate(10),
    publishDate: createDate(9),
    category: 'project-update',
    location: 'Lab AI Arsip, Jakarta',
    authorId: 'user3',
    authorName: 'Dimas Prayoga',
    authorImage: '/api/placeholder/150/150',
    media: [
      { url: '/api/placeholder/640/480', caption: 'Demo sistem pencarian AI' },
      { url: '/api/placeholder/640/480', caption: 'Contoh hasil query AI' },
    ],
    status: 'published',
    createdAt: createDate(9),
    updatedAt: createDate(9),
  },
];

// Data authors
export const authors = [
  {
    id: 'user1',
    name: 'Budi Santoso',
    position: 'Mahasiswa Magang - Teknik Informatika',
    university: 'Universitas Indonesia',
    image: '/images/semua_gambar/author_testing.png',
    bio: 'Mahasiswa Teknik Informatika semester 6 dengan minat di bidang pengembangan web dan pengelolaan data.',
  },
  {
    id: 'user2',
    name: 'Anisa Wijayanti',
    position: 'Mahasiswa Magang - Ilmu Perpustakaan',
    university: 'Universitas Gadjah Mada',
    image: '/api/placeholder/150/150',
    bio: 'Mahasiswa Ilmu Perpustakaan dengan fokus pada digital library dan preservasi informasi digital.',
  },
  {
    id: 'user3',
    name: 'Dimas Prayoga',
    position: 'Mahasiswa Magang - Sistem Informasi',
    university: 'Institut Teknologi Bandung',
    image: '/api/placeholder/150/150',
    bio: 'Mahasiswa Sistem Informasi dengan pengalaman dalam pengembangan database dan visualisasi data.',
  },
  {
    id: 'user4',
    name: 'Siti Rahmawati',
    position: 'Mahasiswa Magang - Ilmu Sejarah',
    university: 'Universitas Negeri Malang',
    image: '/api/placeholder/150/150',
    bio: 'Fokus pada historiografi digital dan pelestarian narasi sejarah lokal.',
  },
];

// Helper function untuk mengambil journal dengan filter
export const getFilteredJournals = (
  category?: 'daily-activity' | 'weekly-reflection' | 'project-update',
  searchQuery?: string,
  authorId?: string
): Journal[] => {
  return dummyJournals.filter(journal => {
    // Filter by category
    if (category && journal.category !== category) {
      return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const inTitle = journal.title.toLowerCase().includes(query);
      const inSummary = journal.summary.toLowerCase().includes(query);
      const inContent = journal.content.toLowerCase().includes(query);
      const inAuthor = journal.authorName.toLowerCase().includes(query);

      if (!(inTitle || inSummary || inContent || inAuthor)) {
        return false;
      }
    }

    // Filter by author
    if (authorId && journal.authorId !== authorId) {
      return false;
    }

    return true;
  });
};

// Helper function untuk mendapatkan journal berdasarkan ID
export const getJournalById = (id: string): Journal | undefined => {
  return dummyJournals.find(journal => journal.id === id);
};

// Helper function untuk mendapatkan author berdasarkan ID
export const getAuthorById = (id: string) => {
  return authors.find(author => author.id === id);
};

export function getRelatedJournals(currentId: string, category: string, limit: number = 3) {
  return dummyJournals
    .filter(journal => journal.category === category && journal.id !== currentId)
    .slice(0, limit);
}
