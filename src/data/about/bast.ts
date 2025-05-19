//src/data/about/bast.ts

import { AccordionItem } from './mbkm';

export interface BASTData {
  headerTitle: string;
  headerDescription: string;
  headerImageSrc: string;
  accordionItems: AccordionItem[];
  externalLink: {
    url: string;
    label: string;
  };
  // Tambahan properti yang dibutuhkan oleh BASTContent.tsx
  features: {
    title: string;
    description: string;
    bgColor?: string;
  }[];
  overviewContent: string;
  timeline: {
    period: string;
    title: string;
    description: string;
  }[];
  functions: {
    title: string;
    description: string;
  }[];
  collections: {
    title: string;
    description: string;
  }[];
  structureItems: {
    title: string;
    detail: string;
  }[];
  tags: string[];
  stats: {
    value: string;
    label: string;
  }[];
}

export const bastData: BASTData = {
  headerTitle: 'Badan Arsip Statis dan Tata Naskah (BAST) ANRI',
  headerDescription:
    'Lembaga pemerintah yang bertugas melaksanakan pembangunan nasional di bidang kearsipan.',
  headerImageSrc: '/images/bast-anri-building.jpg',
  accordionItems: [
    {
      id: 'profil-bast',
      title: 'Profil BAST ANRI',
      content: `
        <div class="mb-4">
          <p class="mb-3">Badan Arsip Statis dan Tata Naskah (BAST) Arsip Nasional Republik Indonesia (ANRI) merupakan lembaga pemerintah non-kementerian yang bertanggung jawab langsung kepada Presiden. ANRI dibentuk berdasarkan Undang-Undang Nomor 43 Tahun 2009 tentang Kearsipan.</p>
          <p class="mb-3">BAST ANRI memiliki peran strategis dalam menyelamatkan, melestarikan, dan memanfaatkan arsip sebagai memori kolektif bangsa. Lembaga ini juga berperan dalam mengelola arsip sebagai bukti akuntabilitas pemerintahan dan pembangunan serta sebagai bahan pertanggungjawaban kepada generasi yang akan datang.</p>
          <p>Dalam menjalankan fungsinya, BAST ANRI bekerja sama dengan berbagai instansi pemerintah, institusi pendidikan, dan lembaga swasta untuk mengembangkan sistem kearsipan nasional yang terstandarisasi dan terintegrasi.</p>
        </div>
      `,
      isOpen: true,
    },
    {
      id: 'visi-misi',
      title: 'Visi & Misi',
      content: `
        <div class="mb-4">
          <div class="mb-4">
            <h3 class="font-semibold text-lg mb-2">Visi</h3>
            <p class="mb-3">Menjadi lembaga kearsipan pembina yang handal dan terpercaya dengan memberikan layanan prima kearsipan dalam penyelenggaraan sistem kearsipan nasional untuk mewujudkan good governance dan masyarakat Indonesia yang sadar arsip.</p>
          </div>
          
          <div>
            <h3 class="font-semibold text-lg mb-2">Misi</h3>
            <ol class="list-decimal pl-5 space-y-2">
              <li>Memberdayakan arsip sebagai tulang punggung manajemen pemerintahan dan pembangunan</li>
              <li>Memberdayakan arsip sebagai bukti akuntabilitas kinerja organisasi</li>
              <li>Memberdayakan arsip sebagai alat bukti yang sah</li>
              <li>Melestarikan arsip sebagai memori kolektif bangsa</li>
              <li>Memberikan akses arsip kepada publik untuk kepentingan pemerintahan, pembangunan, penelitian, dan ilmu pengetahuan untuk kesejahteraan rakyat sesuai peraturan perundang-undangan dan kaidah-kaidah kearsipan</li>
              <li>Membina dan mengembangkan Sistem Kearsipan Nasional untuk menjaga keutuhan Negara Kesatuan Republik Indonesia</li>
            </ol>
          </div>
        </div>
      `,
      isOpen: false,
    },
    {
      id: 'tugas-fungsi',
      title: 'Tugas & Fungsi',
      content: `
        <div class="mb-4">
          <div class="mb-4">
            <h3 class="font-semibold text-lg mb-2">Tugas</h3>
            <p class="mb-3">BAST ANRI mempunyai tugas melaksanakan tugas pemerintahan di bidang kearsipan sesuai dengan ketentuan peraturan perundang-undangan yang berlaku.</p>
          </div>
          
          <div>
            <h3 class="font-semibold text-lg mb-2">Fungsi</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>Perumusan kebijakan nasional di bidang kearsipan</li>
              <li>Pembinaan kearsipan terhadap Lembaga Negara, Perusahaan, BUMN, BUMD, Pemerintah Daerah, Perguruan Tinggi Negeri, dan kearsipan masyarakat</li>
              <li>Pengelolaan arsip statis yang berskala nasional yang diserahkan oleh Lembaga Negara, Perusahaan, BUMN, BUMD, Pemerintah Daerah, Perguruan Tinggi Negeri, dan kearsipan masyarakat</li>
              <li>Perlindungan, penyelamatan, dan pengelolaan arsip statis hasil akuisisi yang berskala nasional</li>
              <li>Koordinasi penyelenggaraan kearsipan nasional</li>
              <li>Penyelenggaraan sistem dan jaringan informasi kearsipan nasional</li>
              <li>Perumusan kebijakan pelestarian dan pemanfaatan naskah sumber arsip</li>
              <li>Pelaksanaan penelitian dan pengkajian serta pengembangan sistem kearsipan</li>
              <li>Penyelenggaraan pendidikan dan pelatihan kearsipan</li>
              <li>Penyusunan program, evaluasi dan penyusunan laporan</li>
              <li>Pelaksanaan administrasi umum kearsipan nasional</li>
            </ul>
          </div>
        </div>
      `,
      isOpen: false,
    },
  ],
  externalLink: {
    url: 'https://anri.go.id/',
    label: 'Kunjungi Website Resmi ANRI',
  },
  // Properti tambahan yang dibutuhkan oleh BASTContent.tsx
  features: [
    {
      title: 'Akuisisi Arsip',
      description: 'Mengelola proses perolehan arsip dari pencipta arsip sesuai ketentuan.',
    },
    {
      title: 'Pengolahan Arsip',
      description: 'Melakukan penataan, pencatatan, dan pengelolaan arsip agar mudah diakses.',
    },
    {
      title: 'Preservasi Arsip',
      description:
        'Menjaga kondisi fisik arsip agar tetap lestari dan dapat digunakan jangka panjang.',
    },
    {
      title: 'Pelayanan Publik',
      description: 'Melayani kebutuhan informasi masyarakat berbasis arsip secara optimal.',
    },
    {
      title: 'Tata Usaha',
      description: 'Menunjang kegiatan operasional dengan pengelolaan administrasi yang efisien.',
    },
  ],
  overviewContent: `
    <div class="space-y-4">
      <p>BAST ANRI sebagai lembaga kearsipan nasional memiliki tanggung jawab dalam menyimpan, mengelola, dan mengamankan arsip negara yang memiliki nilai sejarah penting. Lembaga ini menjadi salah satu pilar penting dalam pelestarian memori kolektif bangsa Indonesia.</p>
      <p>Fungsi utama BAST ANRI tidak hanya berfokus pada penyimpanan arsip statis tetapi juga meliputi manajemen arsip dinamis, pembinaan kearsipan, penelitian kearsipan, dan pengembangan sumber daya manusia di bidang kearsipan. Sebagai lembaga yang mengatur tata kelola kearsipan nasional, BAST ANRI juga bertanggung jawab dalam merumuskan kebijakan dan standar dalam pengolahan arsip.</p>
      <p>Arsip-arsip yang dikelola oleh ANRI meliputi dokumen-dokumen penting dari masa kolonial hingga era modern, termasuk naskah-naskah kuno, dokumen sejarah kemerdekaan, arsip kenegaraan, dan arsip-arsip penting lainnya yang memiliki nilai historis tinggi.</p>
      <p>Melalui layanan publiknya, BAST ANRI juga menyediakan akses bagi masyarakat untuk menelusuri dan memanfaatkan arsip-arsip tersebut untuk kepentingan penelitian, pendidikan, atau keperluan resmi lainnya. Layanan ini menjadi salah satu bentuk kontribusi ANRI dalam pengembangan ilmu pengetahuan dan pemahaman sejarah bangsa.</p>
    </div>
  `,
  timeline: [
    {
      period: '1892-1942',
      title: 'Landsarchief',
      description:
        'Berdirinya Landsarchief (Arsip Negeri) pada masa pemerintahan Hindia Belanda sebagai cikal bakal lembaga kearsipan di Indonesia.',
    },
    {
      period: '1942-1945',
      title: 'Kobunsjokan',
      description:
        'Perubahan nama menjadi Kobunsjokan pada masa pendudukan Jepang dengan sedikit perubahan fungsi dan pengelolaan.',
    },
    {
      period: '1945-1967',
      title: 'Arsip Negara RI',
      description:
        'Setelah kemerdekaan, lembaga ini berganti nama menjadi Arsip Negara Republik Indonesia dan mulai melakukan pengumpulan arsip-arsip kolonial dan arsip kemerdekaan.',
    },
    {
      period: '1967-2009',
      title: 'ANRI',
      description:
        'Perubahan nama menjadi Arsip Nasional Republik Indonesia (ANRI) dan mulai menjalankan fungsi sebagai lembaga kearsipan nasional secara penuh.',
    },
    {
      period: '2009-sekarang',
      title: 'BAST ANRI',
      description:
        'Penguatan kelembagaan dan reorganisasi menjadi Badan Arsip Statis dan Tata Naskah ANRI berdasarkan UU No. 43 Tahun 2009 tentang Kearsipan.',
    },
  ],
  functions: [
    {
      title: 'Pengelolaan Arsip Statis',
      description:
        'Melakukan akuisisi, pengolahan, preservasi, dan penyediaan akses terhadap arsip statis yang memiliki nilai guna kesejarahan.',
    },
    {
      title: 'Pembinaan Kearsipan',
      description:
        'Melakukan pembinaan kearsipan terhadap lembaga negara, pemerintah daerah, perguruan tinggi negeri, BUMN/BUMD, dan masyarakat.',
    },
    {
      title: 'Pengembangan SDM Kearsipan',
      description:
        'Menyelenggarakan pendidikan dan pelatihan kearsipan untuk meningkatkan kompetensi SDM pengelola arsip.',
    },
    {
      title: 'Penyelamatan Arsip',
      description:
        'Melakukan perlindungan dan penyelamatan arsip dari bencana alam, bencana sosial, maupun tindak pidana terkait arsip.',
    },
    {
      title: 'Penelitian dan Pengembangan',
      description:
        'Melaksanakan penelitian dan pengembangan sistem kearsipan untuk meningkatkan kualitas pengelolaan arsip.',
    },
    {
      title: 'Pengawasan Kearsipan',
      description:
        'Melakukan pengawasan kearsipan terhadap pelaksanaan kearsipan di seluruh wilayah Indonesia.',
    },
  ],
  collections: [
    {
      title: 'Arsip VOC',
      description:
        'Koleksi arsip dari masa Vereenigde Oost-Indische Compagnie (VOC) yang mencakup periode 1602-1799.',
    },
    {
      title: 'Arsip Hindia Belanda',
      description:
        'Koleksi arsip dari periode pemerintahan Hindia Belanda tahun 1800-1942 yang meliputi berbagai aspek pemerintahan kolonial.',
    },
    {
      title: 'Arsip Kemerdekaan',
      description:
        'Dokumen-dokumen penting terkait proklamasi kemerdekaan dan pembentukan negara Republik Indonesia.',
    },
    {
      title: 'Arsip Kenegaraan',
      description: 'Arsip dari lembaga-lembaga negara yang memiliki nilai guna kesejarahan tinggi.',
    },
  ],
  structureItems: [
    {
      title: 'Kepala',
      detail: 'Memimpin BAST ANRI dalam menjalankan tugas dan fungsinya.',
    },
    {
      title: 'Sekretariat Utama',
      detail:
        'Mengkoordinasikan perencanaan, pembinaan, dan pengendalian terhadap program, administrasi, dan sumber daya.',
    },
    {
      title: 'Deputi Bidang Pembinaan Kearsipan',
      detail: 'Merumuskan dan melaksanakan kebijakan di bidang pembinaan kearsipan.',
    },
    {
      title: 'Deputi Bidang Konservasi Arsip',
      detail: 'Merumuskan dan melaksanakan kebijakan di bidang konservasi arsip.',
    },
    {
      title: 'Deputi Bidang Informasi dan Pengembangan Sistem Kearsipan',
      detail:
        'Merumuskan dan melaksanakan kebijakan di bidang informasi dan pengembangan sistem kearsipan.',
    },
    {
      title: 'Inspektorat',
      detail: 'Melaksanakan pengawasan intern di lingkungan ANRI.',
    },
  ],
  tags: [
    'Kearsipan Nasional',
    'Preservasi Dokumen',
    'Sejarah Indonesia',
    'Pengelolaan Arsip',
    'Lembaga Pemerintah',
  ],
  stats: [
    {
      value: '1892',
      label: 'Tahun Berdiri',
    },
    {
      value: '15 TB+',
      label: 'Data Digital',
    },
    {
      value: '10 Juta+',
      label: 'Koleksi Arsip',
    },
    {
      value: '34',
      label: 'Jaringan Provinsi',
    },
  ],
};
