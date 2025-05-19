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
  headerTitle: 'Tentang Website MBKM BAST ANRI',
  headerDescription:
    'Portal digital yang dirancang untuk mendukung dan memfasilitasi program MBKM di BAST ANRI.',
  imageUrl: '/images/website-screenshot.jpg',
  accordionItems: [
    {
      id: 'tujuan-website',
      title: 'Tujuan Website',
      content: `
        <div class="mb-4">
          <p class="mb-3">Website MBKM BAST ANRI dikembangkan dengan tujuan utama sebagai berikut:</p>
          
          <ul class="list-disc pl-5 space-y-2">
            <li><span class="font-semibold">Pusat Informasi</span> - Menyediakan informasi terpadu tentang program MBKM di BAST ANRI, termasuk persyaratan, jadwal, dan proses pendaftaran.</li>
            <li><span class="font-semibold">Fasilitasi Pendaftaran</span> - Menyediakan platform untuk pendaftaran online bagi mahasiswa yang berminat mengikuti program.</li>
            <li><span class="font-semibold">Manajemen Program</span> - Memfasilitasi pengelolaan program, termasuk seleksi peserta, monitoring aktivitas, dan evaluasi hasil.</li>
            <li><span class="font-semibold">Berbagi Pengetahuan</span> - Menjadi ruang untuk berbagi pengetahuan, pengalaman, dan praktik terbaik di bidang kearsipan.</li>
            <li><span class="font-semibold">Membangun Komunitas</span> - Membangun komunitas mahasiswa, alumni, mentor, dan dosen yang terlibat dalam program MBKM BAST ANRI.</li>
          </ul>
        </div>
      `,
      isOpen: true,
    },
    {
      id: 'fitur-utama',
      title: 'Fitur Utama',
      content: `
        <div class="mb-4">
          <p class="mb-3">Website MBKM BAST ANRI dilengkapi dengan berbagai fitur yang dirancang untuk memberikan pengalaman pengguna yang optimal:</p>
          
          <ul class="list-disc pl-5 space-y-2">
            <li><span class="font-semibold">Portal Informasi</span> - Menyediakan informasi lengkap tentang program, persyaratan, benefit, dan FAQ.</li>
            <li><span class="font-semibold">Sistem Pendaftaran Online</span> - Formulir pendaftaran online dengan upload dokumen dan tracking status aplikasi.</li>
            <li><span class="font-semibold">Sistem Login</span> - Area terproteksi untuk peserta, mentor, dan admin dengan dashboard sesuai peran masing-masing.</li>
            <li><span class="font-semibold">Learning Management System</span> - Platform untuk mengakses materi pembelajaran, tugas, dan evaluasi.</li>
            <li><span class="font-semibold">Monitoring dan Evaluasi</span> - Fitur untuk monitoring progress peserta, penilaian kinerja, dan evaluasi program.</li>
            <li><span class="font-semibold">Resource Center</span> - Perpustakaan digital yang berisi materi referensi, template dokumen, dan panduan praktis.</li>
            <li><span class="font-semibold">Forum Diskusi</span> - Ruang untuk diskusi dan berbagi pengalaman antar peserta, mentor, dan alumni.</li>
            <li><span class="font-semibold">Gallery</span> - Dokumentasi kegiatan program dalam bentuk foto dan video.</li>
            <li><span class="font-semibold">Testimoni</span> - Cerita pengalaman dari alumni dan peserta aktif program.</li>
            <li><span class="font-semibold">News & Events</span> - Informasi terkini seputar program dan kegiatan yang akan datang.</li>
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
          <p class="mb-3">Website MBKM BAST ANRI memberikan berbagai manfaat bagi semua pihak yang terlibat dalam program:</p>
          
          <div class="mb-4">
            <p class="font-semibold mb-2">Bagi Mahasiswa:</p>
            <ul class="list-disc pl-5 space-y-2">
              <li>Akses mudah ke informasi program dan persyaratan</li>
              <li>Proses pendaftaran yang efisien dan transparan</li>
              <li>Akses ke materi pembelajaran dan sumber daya pendukung</li>
              <li>Kemudahan dalam melihat progress dan evaluasi kinerja</li>
              <li>Kesempatan untuk berinteraksi dengan peserta lain dan mentor</li>
            </ul>
          </div>
          
          <div class="mb-4">
            <p class="font-semibold mb-2">Bagi Dosen Pembimbing:</p>
            <ul class="list-disc pl-5 space-y-2">
              <li>Kemudahan dalam memonitor aktivitas dan progress mahasiswa</li>
              <li>Platform untuk memberikan feedback dan evaluasi</li>
              <li>Akses ke dokumen dan laporan yang diperlukan untuk penilaian</li>
              <li>Sarana komunikasi dengan mahasiswa dan mentor di BAST ANRI</li>
            </ul>
          </div>
          
          <div class="mb-4">
            <p class="font-semibold mb-2">Bagi BAST ANRI:</p>
            <ul class="list-disc pl-5 space-y-2">
              <li>Efisiensi dalam mengelola program dan seleksi peserta</li>
              <li>Platform untuk menyebarluaskan informasi dan pengetahuan kearsipan</li>
              <li>Sistem terpadu untuk monitoring dan evaluasi program</li>
              <li>Media untuk mempromosikan kegiatan dan capaian program</li>
            </ul>
          </div>
          
          <div>
            <p class="font-semibold mb-2">Bagi Perguruan Tinggi:</p>
            <ul class="list-disc pl-5 space-y-2">
              <li>Kemudahan dalam mengakses informasi program dan kegiatan</li>
              <li>Transparansi dalam proses seleksi dan evaluasi mahasiswa</li>
              <li>Platform untuk memantau keterlibatan mahasiswa dalam program</li>
              <li>Sarana untuk menjalin kerjasama yang lebih erat dengan BAST ANRI</li>
            </ul>
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
    description: 'Tampilan informasi yang mudah dipahami dan responsif',
  },
  {
    title: 'Manajemen Dokumen',
    description: 'Pengelolaan dokumen MBKM dengan sistem yang terintegrasi',
  },
  {
    title: 'Tracking Progres',
    description: 'Pemantauan langsung status dokumen dan proses persetujuan',
  },
  {
    title: 'Notifikasi Realtime',
    description: 'Pemberitahuan untuk setiap perubahan status dokumen',
  },
];
