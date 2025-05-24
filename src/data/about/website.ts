//src/data/about/website.ts

import { AccordionItem } from './mbkm';

export interface WebsiteData {
  headerTitle: string;
  headerDescription: string;
  imageUrl: string;
  accordionItems: AccordionItem[];
  tags?: string[];
  features?: { title: string; description: string }[];
}

export const websiteData: WebsiteData = {
  headerTitle: 'Website MBKM BAST ANRI',
  headerDescription:
    'Sebuah platform digital hasil kolaborasi mahasiswa USK Unggul yang berfungsi sebagai media dokumentasi kegiatan MBKM di lingkungan Balai Arsip Statis dan Tsunami (BAST) ANRI.',
  imageUrl: '/images/Tentang/Tentang Website/website-screenshot.png',
  tags: ['Kolaborasi Mahasiswa', 'MBKM 2025', 'USK Unggul', 'BAST ANRI', 'MBKM Project'],
  features: [
    {
      title: 'Profil Peserta & Pembimbing',
      description: 'Informasi mahasiswa, pembimbing, dan mentor MBKM secara publik.',
    },
    {
      title: 'Galeri Dokumentasi',
      description: 'Kumpulan foto, dan dokumentasi kegiatan MBKM BAST ANRI.',
    },
    {
      title: 'Pojok MBKM',
      description: 'Publikasi jurnal kegiatan mahasiswa selama program berlangsung.',
    },
    {
      title: 'Informasi Program',
      description: 'Detail program, jenis kegiatan, unit terlibat, dan panduan pelaksanaan.',
    },
    {
      title: 'Desain Responsif & Dark Mode',
      description: 'Antarmuka nyaman di semua perangkat dengan fitur mode gelap.',
    },
    {
      title: 'Navigasi Interaktif',
      description: 'Navigasi halus antar section dan halaman detail program.',
    },
  ],
  accordionItems: [
    {
      id: 'latar-belakang',
      title: 'Latar Belakang',
      isOpen: true,
      content: `
    <div class="mb-4">
      <p class="mb-4 text-justify leading-relaxed">
        Website ini dikembangkan sebagai bagian dari penyelesaian <strong>proyek akhir</strong> dalam program <strong>magang</strong> di <strong>Balai Arsip Statis dan Tsunami (BAST) ANRI</strong> yang dilaksanakan pada periode <strong>18 Februari hingga 2 Juni 2025</strong>. Proyek ini melibatkan total <strong>14 mahasiswa</strong>, yang terdiri dari <strong>7 mahasiswa Manajemen Informatika</strong> dan <strong>7 mahasiswa Ilmu Komunikasi</strong>. Mahasiswa Manajemen Informatika berperan dalam <strong>perancangan dan pengembangan sistem website</strong>, sementara mahasiswa Ilmu Komunikasi bertanggung jawab dalam <strong>penyusunan konten informasi</strong> yang disajikan pada platform ini.
      </p>
      <p class="mb-4 text-justify leading-relaxed">
        Website ini difokuskan sebagai <strong>portal informasi</strong> yang akan diintegrasikan ke dalam <strong>situs resmi BAST ANRI</strong>. Fungsinya adalah menyampaikan informasi secara <strong>interaktif dan menarik</strong> terkait program <strong>Merdeka Belajar Kampus Merdeka (MBKM)</strong> di lingkungan BAST ANRI. Platform ini <strong>tidak digunakan untuk pendaftaran atau pengelolaan dokumen</strong>, melainkan sebagai <strong>sarana penyampaian informasi</strong> yang mudah diakses oleh mahasiswa, dosen, maupun pihak internal ANRI. Website ini diharapkan dapat menjadi bagian dari <strong>inisiatif digitalisasi informasi</strong> sekaligus menjadi <strong>kontribusi nyata peserta magang</strong> dalam mendukung kegiatan MBKM.
      </p>
    </div>
  `,
    },

    {
      id: 'tujuan-website',
      title: 'Tujuan Website',
      content: `
    <div class="mb-4">
      <p class="mb-3">Website MBKM BAST ANRI dikembangkan dengan tujuan utama sebagai media informasi resmi terkait pelaksanaan program Merdeka Belajar Kampus Merdeka di lingkungan BAST ANRI.</p>
      
      <ul class="list-disc pl-5 space-y-2">
        <li><span class="font-semibold">Pusat Informasi MBKM</span> - Menyediakan informasi lengkap tentang program MBKM di BAST ANRI, termasuk profil kegiatan, jadwal pelaksanaan, dan ketentuan program.</li>
        <li><span class="font-semibold">Publikasi Kegiatan</span> - Menampilkan dokumentasi dan laporan kegiatan MBKM secara terbuka untuk publik dan civitas akademika.</li>
        <li><span class="font-semibold">Media Sosialisasi</span> - Menjadi sarana untuk memperkenalkan program MBKM di BAST ANRI kepada mahasiswa, dosen pembimbing, serta pihak eksternal.</li>
        <li><span class="font-semibold">Referensi Mahasiswa</span> - Memberikan gambaran umum tentang bentuk kegiatan, manfaat, dan pengalaman para peserta program MBKM sebelumnya.</li>
        <li><span class="font-semibold">Transparansi Program</span> - Memberikan akses informasi yang mudah diakses mengenai program MBKM untuk mendukung keterbukaan informasi publik.</li>
      </ul>
    </div>
  `,
      isOpen: false,
    },

    {
      id: 'manfaat-website',
      title: 'Manfaat Website',
      content: `
    <div class="mb-4">
      <p class="mb-3">Portal MBKM BAST ANRI dirancang sebagai media informatif yang menyajikan berbagai informasi seputar program MBKM di lingkungan BAST ANRI.</p>
      
      <div class="space-y-4">
        <div class="border-l-4 border-blue-500 pl-4">
          <p class="font-semibold mb-2">Untuk Mahasiswa MBKM:</p>
          <ul class="list-disc pl-5 space-y-1 text-sm">
            <li>Mengenal program, unit kerja, dan aktivitas yang tersedia di BAST ANRI</li>
            <li>Melihat dokumentasi kegiatan secara terbuka dan transparan</li>
            <li>Mengetahui profil pembimbing dan mentor</li>
            <li>Referensi sebelum atau selama mengikuti program</li>
          </ul>
        </div>
        
        <div class="border-l-4 border-green-500 pl-4">
          <p class="font-semibold mb-2">Untuk Pembimbing & Mentor:</p>
          <ul class="list-disc pl-5 space-y-1 text-sm">
            <li>Media untuk menampilkan kegiatan bimbingan dan capaian mahasiswa</li>
            <li>Memperkenalkan peran dan kontribusi unit masing-masing</li>
            <li>Mendokumentasikan keterlibatan dalam program MBKM</li>
          </ul>
        </div>
        
        <div class="border-l-4 border-purple-500 pl-4">
          <p class="font-semibold mb-2">Untuk BAST ANRI:</p>
          <ul class="list-disc pl-5 space-y-1 text-sm">
            <li>Media publikasi kegiatan MBKM secara resmi</li>
            <li>Portal informasi untuk publik, mitra, dan calon peserta</li>
            <li>Alat dokumentasi program yang rapi dan mudah diakses</li>
            <li>Meningkatkan citra dan visibilitas institusi</li>
          </ul>
        </div>
        
        <div class="border-l-4 border-orange-500 pl-4">
          <p class="font-semibold mb-2">Untuk Perguruan Tinggi & Publik Umum:</p>
          <ul class="list-disc pl-5 space-y-1 text-sm">
            <li>Mengetahui aktivitas mahasiswa selama menjalani program</li>
            <li>Referensi bagi kampus atau instansi yang ingin bekerja sama</li>
            <li>Akses informasi tanpa perlu login atau mendaftar</li>
            <li>Media edukatif terkait praktik pengelolaan arsip dan program magang</li>
          </ul>
        </div>
      </div>

      <div class="mt-6 text-sm italic text-gray-600 dark:text-gray-400">
        Catatan: Portal ini tidak digunakan untuk pendaftaran, upload dokumen, atau keperluan administratif lainnya.
      </div>
    </div>
  `,
      isOpen: false,
    },
  ],
};

export const rawFeatures = [
  {
    title: 'Dashboard Interaktif',
    description:
      'Panel kontrol dengan visualisasi data yang informatif untuk monitoring kegiatan dan status dokumen secara real-time',
  },
  {
    title: 'Manajemen Dokumen BAST',
    description:
      'Sistem digital untuk upload, validasi, dan tracking dokumen Berita Acara Serah Terima dengan workflow yang terstruktur',
  },
  {
    title: 'Tracking Progress Peserta',
    description:
      'Monitoring komprehensif terhadap progres individual setiap peserta MBKM dengan milestone dan evaluasi berkala',
  },
  {
    title: 'Resource Center Kearsipan',
    description:
      'Perpustakaan digital berisi materi pembelajaran, panduan praktis, dan knowledge base bidang kearsipan',
  },
];
