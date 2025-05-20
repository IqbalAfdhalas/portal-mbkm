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
    'Platform digital yang dikembangkan sebagai proyek kolaboratif mahasiswa MBKM untuk mendukung dan memfasilitasi program Merdeka Belajar Kampus Merdeka di Badan Arsip dan Perpustakaan Daerah.',
  imageUrl: '/images/website-screenshot.png',
  tags: ['Next.js', 'React', 'Tailwind CSS', 'PostgreSQL', 'MBKM Project'],
  features: [
    {
      title: 'Portal Informasi Program',
      description:
        'Menampilkan informasi lengkap seputar program MBKM di BAST ANRI, termasuk jenis kegiatan, unit-unit terlibat, dan dokumentasi sebelumnya.',
    },
    {
      title: 'Profil Peserta & Pembimbing',
      description:
        'Menyajikan informasi ringkas tentang mahasiswa peserta, dosen pembimbing, serta mentor dari BAST ANRI secara publik dan terstruktur.',
    },
    {
      title: 'Galeri Dokumentasi',
      description:
        'Berisi kumpulan foto dan catatan kegiatan sebagai dokumentasi visual selama program berlangsung.',
    },
    {
      title: 'Desain Responsif',
      description:
        'Antarmuka website yang ramah di berbagai perangkat — dari desktop hingga smartphone — untuk kenyamanan akses informasi.',
    },
    {
      title: 'Forum Diskusi & Interaksi',
      description:
        'Ruang terbuka untuk diskusi seputar pengalaman, pertanyaan umum, dan interaksi antar peserta atau pembimbing (opsional).',
    },
    {
      title: 'Tanpa Fitur Administratif',
      description:
        'Portal ini tidak digunakan untuk upload dokumen, pendaftaran program, atau kegiatan administratif lainnya — fokus sepenuhnya pada fungsi informatif.',
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
          <p class="mb-3">Website MBKM BAST ANRI dikembangkan dengan tujuan utama sebagai berikut:</p>
          
          <ul class="list-disc pl-5 space-y-2">
            <li><span class="font-semibold">Digitalisasi Proses Administrasi</span> - Mengubah proses manual menjadi digital untuk efisiensi pengelolaan dokumen BAST dan laporan kegiatan.</li>
            <li><span class="font-semibold">Pusat Informasi Terpadu</span> - Menyediakan informasi lengkap tentang program MBKM di BAST ANRI, termasuk panduan, jadwal, dan persyaratan.</li>
            <li><span class="font-semibold">Monitoring dan Evaluasi</span> - Memfasilitasi pemantauan progres peserta dan evaluasi kinerja secara real-time dengan visualisasi data.</li>
            <li><span class="font-semibold">Kolaborasi dan Komunikasi</span> - Menjembatani komunikasi antara mahasiswa, dosen pembimbing, dan pembimbing lapangan.</li>
            <li><span class="font-semibold">Dokumentasi dan Arsip Digital</span> - Menyimpan dan mengelola dokumentasi kegiatan program untuk referensi masa depan.</li>
            <li><span class="font-semibold">Peningkatan Kualitas Program</span> - Menyediakan data dan insights untuk perbaikan berkelanjutan program MBKM.</li>
          </ul>
        </div>
      `,
      isOpen: false,
    },

    {
      id: 'teknologi',
      title: 'Teknologi yang Digunakan',
      content: `
    <div class="mb-4">
      <p class="mb-3">Website ini dibangun menggunakan teknologi modern berbasis React & Next.js, dengan fokus pada performa, keamanan, dan kemudahan pengelolaan konten:</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="border rounded-lg p-4">
          <h4 class="font-semibold mb-2 text-blue-600">Frontend</h4>
          <ul class="text-sm space-y-1">
            <li>• Next.js 14</li>
            <li>• React 18</li>
            <li>• TypeScript</li>
            <li>• Tailwind CSS</li>
            <li>• Next Themes</li>
          </ul>
        </div>
        
        <div class="border rounded-lg p-4">
          <h4 class="font-semibold mb-2 text-green-600">Library & UI</h4>
          <ul class="text-sm space-y-1">
            <li>• Framer Motion</li>
            <li>• React Hook Form</li>
            <li>• React Hot Toast</li>
            <li>• React Markdown</li>
            <li>• Swiper.js</li>
          </ul>
        </div>
        
        <div class="border rounded-lg p-4">
          <h4 class="font-semibold mb-2 text-purple-600">Backend & Infrastruktur</h4>
          <ul class="text-sm space-y-1">
            <li>• Firebase (Auth, Firestore, Storage)</li>
            <li>• Vercel Hosting</li>
            <li>• GitHub Actions</li>
            <li>• Prettier + ESLint</li>
            <li>• SSL/HTTPS</li>
          </ul>
        </div>
      </div>
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

// Tim pengembang yang sebenarnya
export const developmentTeam = [
  {
    name: 'Ahmad Fauzan Rizky',
    role: 'Project Manager & Backend Developer',
    program: 'Manajemen Informatika',
    avatar: '/images/team/fauzan.jpg',
    responsibilities: ['Koordinasi tim', 'Arsitektur sistem', 'API Development'],
  },
  {
    name: 'Siti Nurhaliza',
    role: 'Frontend Lead & UI/UX Designer',
    program: 'Manajemen Informatika',
    avatar: '/images/team/nurhaliza.jpg',
    responsibilities: ['Design system', 'Component development', 'User experience'],
  },
  {
    name: 'Budi Santoso Wibowo',
    role: 'Full Stack Developer',
    program: 'Manajemen Informatika',
    avatar: '/images/team/budi.jpg',
    responsibilities: ['Database design', 'Authentication system', 'Integration testing'],
  },
  {
    name: 'Indira Sari Dewi',
    role: 'Frontend Developer',
    program: 'Manajemen Informatika',
    avatar: '/images/team/indira.jpg',
    responsibilities: ['Component development', 'Responsive design', 'Accessibility'],
  },
  {
    name: 'Rahman Hidayat',
    role: 'DevOps & Security Specialist',
    program: 'Manajemen Informatika',
    avatar: '/images/team/rahman.jpg',
    responsibilities: [
      'Deployment automation',
      'Security implementation',
      'Performance optimization',
    ],
  },
  {
    name: 'Anisa Putri Maharani',
    role: 'QA Engineer & Tester',
    program: 'Manajemen Informatika',
    avatar: '/images/team/anisa.jpg',
    responsibilities: ['Test automation', 'Quality assurance', 'Bug tracking'],
  },
  {
    name: 'Dimas Prasetyo',
    role: 'Database Administrator',
    program: 'Manajemen Informatika',
    avatar: '/images/team/dimas.jpg',
    responsibilities: ['Database optimization', 'Data migration', 'Backup strategy'],
  },
  {
    name: 'Rizki Amelia Putri',
    role: 'Content Manager & Writer',
    program: 'Ilmu Komunikasi',
    avatar: '/images/team/rizki.jpg',
    responsibilities: ['Content strategy', 'Copywriting', 'SEO optimization'],
  },
  {
    name: 'Muhammad Iqbal',
    role: 'Digital Marketing Specialist',
    program: 'Ilmu Komunikasi',
    avatar: '/images/team/iqbal.jpg',
    responsibilities: ['Social media strategy', 'Marketing campaigns', 'Analytics'],
  },
  {
    name: 'Sari Wulandari',
    role: 'Content Creator & Graphic Designer',
    program: 'Ilmu Komunikasi',
    avatar: '/images/team/sari.jpg',
    responsibilities: ['Visual content', 'Infographic design', 'Brand identity'],
  },
  {
    name: 'Arief Budiman',
    role: 'Video Producer & Editor',
    program: 'Ilmu Komunikasi',
    avatar: '/images/team/arief.jpg',
    responsibilities: ['Video production', 'Tutorial creation', 'Multimedia content'],
  },
  {
    name: 'Nina Kartika Sari',
    role: 'Communication Strategist',
    program: 'Ilmu Komunikasi',
    avatar: '/images/team/nina.jpg',
    responsibilities: ['Communication planning', 'Stakeholder engagement', 'Public relations'],
  },
  {
    name: 'Fajar Kurniawan',
    role: 'Social Media Manager',
    program: 'Ilmu Komunikasi',
    avatar: '/images/team/fajar.jpg',
    responsibilities: ['Social media management', 'Community building', 'Content scheduling'],
  },
  {
    name: 'Dewi Lestari',
    role: 'Documentation Specialist',
    program: 'Ilmu Komunikasi',
    avatar: '/images/team/dewi.jpg',
    responsibilities: ['Process documentation', 'User guides', 'Knowledge management'],
  },
];
