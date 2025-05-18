//src/data/about/collaboration.ts

import { AccordionItem } from './mbkm';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';

export interface CollaborationData {
  headerTitle: string;
  headerDescription: string;
  headerImageSrc: string;
  tags: string[];
  stats: {
    value: string;
    label: string;
  }[];
  accordionItems: AccordionItem[];
  externalLink: {
    url: string;
    label: string;
  };
  overviewContent: string;
  partners: {
    name: string;
    logo: string;
    category: string;
  }[];
  programs: {
    title: string;
    description: string;
    type: string;
  }[];
  testimonials: {
    name: string;
    university: string;
    program: string;
    quote: string;
    image: string;
  }[];
  contactInfo: {
    label: string;
    value: string;
    icon: any;
  }[];
  address: {
    street: string;
    city: string;
    zipCode: string;
    province: string;
  };
  mapEmbedUrl: string;
}

export const collaborationData: CollaborationData = {
  headerTitle: 'Kolaborasi MBKM x BAST ANRI',
  headerDescription:
    'Kerjasama strategis antara program MBKM dan BAST ANRI untuk mengembangkan kompetensi mahasiswa di bidang kearsipan.',
  headerImageSrc: '/images/collaboration-illustration.svg',
  tags: ['Kearsipan', 'Digitalisasi', 'Praktik Kerja', 'Penelitian', 'Tata Naskah'],
  stats: [
    { value: '50+', label: 'Perguruan Tinggi Mitra' },
    { value: '200+', label: 'Alumni Program' },
    { value: '15', label: 'Kota Pelaksanaan' },
    { value: '4', label: 'Tahun Berjalan' },
  ],
  accordionItems: [
    {
      id: 'latar-belakang',
      title: 'Latar Belakang Kolaborasi',
      content: `
        <div class="mb-4">
          <p class="mb-3">Kolaborasi antara Merdeka Belajar Kampus Merdeka (MBKM) dan Badan Arsip Statis dan Tata Naskah (BAST) ANRI berawal dari kesadaran akan pentingnya pengembangan kompetensi mahasiswa di bidang kearsipan dan tata naskah yang semakin relevan di era digital.</p>
          
          <p class="mb-3">Dalam era informasi digital saat ini, keahlian dalam pengelolaan arsip dan dokumen elektronik menjadi sangat penting. Namun, masih terdapat kesenjangan antara kebutuhan industri dan kemampuan lulusan perguruan tinggi dalam bidang ini. Kolaborasi ini hadir sebagai jawaban atas tantangan tersebut.</p>
          
          <p>Melalui kolaborasi ini, BAST ANRI menyediakan platform bagi mahasiswa untuk mendapatkan pengalaman praktis di bidang kearsipan, sementara program MBKM memberikan kerangka kerja dan pengakuan akademis atas pengalaman tersebut. Ini menciptakan sinergi yang saling menguntungkan bagi semua pihak yang terlibat.</p>
        </div>
      `,
      isOpen: true,
    },
    {
      id: 'visi-misi',
      title: 'Visi & Misi Program',
      content: `
        <div class="mb-4">
          <h3 class="font-semibold mb-2">Visi</h3>
          <p class="mb-3">Menjadi program kolaborasi unggulan yang mencetak tenaga profesional di bidang kearsipan dan tata naskah yang kompeten, inovatif, dan siap menghadapi tantangan di era digital.</p>
          
          <h3 class="font-semibold mb-2">Misi</h3>
          <ol class="list-decimal pl-5 space-y-2">
            <li>Memfasilitasi transfer pengetahuan dan keterampilan praktis di bidang kearsipan dan tata naskah kepada mahasiswa</li>
            <li>Mengembangkan kurikulum dan program pelatihan yang relevan dengan kebutuhan industri di bidang kearsipan</li>
            <li>Membangun jejaring kerjasama antara perguruan tinggi dan BAST ANRI untuk pengembangan sistem kearsipan nasional</li>
            <li>Mendorong inovasi dan penelitian di bidang kearsipan dan tata naskah</li>
            <li>Meningkatkan kesadaran akan pentingnya pengelolaan arsip yang baik di kalangan mahasiswa dan masyarakat</li>
          </ol>
        </div>
      `,
      isOpen: false,
    },
    {
      id: 'nilai-program',
      title: 'Nilai-nilai Program',
      content: `
        <div class="mb-4">
          <p class="mb-3">Program kolaborasi MBKM x BAST ANRI dilandasi oleh nilai-nilai sebagai berikut:</p>
          
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Profesionalisme</strong> - Mengedepankan standar kinerja tinggi dan etika profesional dalam semua aspek program</li>
            <li><strong>Inovasi</strong> - Terbuka terhadap ide-ide baru dan pendekatan kreatif dalam pengelolaan arsip dan tata naskah</li>
            <li><strong>Integritas</strong> - Menjunjung tinggi kejujuran, transparansi, dan akuntabilitas dalam setiap kegiatan</li>
            <li><strong>Kolaborasi</strong> - Membangun kerjasama yang saling menguntungkan antara semua pemangku kepentingan</li>
            <li><strong>Keberlanjutan</strong> - Mengembangkan sistem dan praktik kearsipan yang berkelanjutan dan berwawasan lingkungan</li>
            <li><strong>Keberagaman</strong> - Menghargai keberagaman perspektif, latar belakang, dan ide</li>
          </ul>
        </div>
      `,
      isOpen: false,
    },
    {
      id: 'manfaat-program',
      title: 'Manfaat Program',
      content: `
        <div class="mb-4">
          <h3 class="font-semibold mb-2">Bagi Mahasiswa</h3>
          <ul class="list-disc pl-5 space-y-1 mb-3">
            <li>Memperoleh pengalaman praktis di bidang kearsipan dan tata naskah</li>
            <li>Mengembangkan kompetensi yang relevan dengan kebutuhan industri</li>
            <li>Mendapatkan pengakuan akademis (konversi SKS) untuk kegiatan di luar kampus</li>
            <li>Membangun jaringan profesional di bidang kearsipan</li>
            <li>Meningkatkan daya saing di pasar kerja</li>
          </ul>
          
          <h3 class="font-semibold mb-2">Bagi Perguruan Tinggi</h3>
          <ul class="list-disc pl-5 space-y-1 mb-3">
            <li>Memperluas jaringan kerjasama dengan institusi pemerintah</li>
            <li>Meningkatkan relevansi kurikulum dengan kebutuhan dunia kerja</li>
            <li>Mengembangkan metode pembelajaran berbasis pengalaman</li>
            <li>Meningkatkan kualitas lulusan</li>
          </ul>
          
          <h3 class="font-semibold mb-2">Bagi BAST ANRI</h3>
          <ul class="list-disc pl-5 space-y-1">
            <li>Mendapatkan kontribusi ide dan perspektif baru dari mahasiswa</li>
            <li>Membangun pipeline talent untuk rekrutmen di masa depan</li>
            <li>Memperluas jangkauan sosialisasi pentingnya kearsipan</li>
            <li>Mendapatkan dukungan untuk proyek-proyek inovasi di bidang kearsipan</li>
          </ul>
        </div>
      `,
      isOpen: false,
    },
  ],

  externalLink: {
    url: 'https://anri.go.id/kolaborasi-mbkm',
    label: 'Daftar Program Kolaborasi',
  },
  overviewContent: `
    <p>Program Kolaborasi MBKM x BAST ANRI menawarkan pendekatan terintegrasi antara pembelajaran teoritis di kampus dengan pengalaman praktis di lingkungan kearsipan nasional.</p>
    
    <p>Melalui program ini, mahasiswa berkesempatan untuk terlibat langsung dalam pengelolaan arsip nasional, digitalisasi dokumen bersejarah, pengembangan sistem kearsipan modern, dan berbagai kegiatan profesional lainnya di bawah bimbingan tenaga ahli ANRI.</p>
    
    <p>Program ini juga memungkinkan mahasiswa untuk mendapatkan pengakuan formal atas kegiatan pembelajaran di luar kampus dalam bentuk konversi SKS sesuai dengan kebijakan MBKM, sehingga mahasiswa tetap dapat menyelesaikan studi tepat waktu sambil mendapatkan pengalaman berharga di bidang kearsipan.</p>
    
    <p>Kolaborasi ini tidak hanya bermanfaat bagi mahasiswa, tetapi juga bagi perguruan tinggi dan BAST ANRI. Perguruan tinggi dapat memperkuat kurikulum dengan perspektif praktis dari dunia kerja, sementara BAST ANRI mendapatkan ide-ide segar dan dukungan untuk proyek-proyek inovasi mereka.</p>
  `,
  partners: [
    {
      name: 'Universitas Indonesia',
      logo: 'ui.png',
      category: 'Perguruan Tinggi',
    },
    {
      name: 'Universitas Gadjah Mada',
      logo: 'ugm.png',
      category: 'Perguruan Tinggi',
    },
    {
      name: 'Institut Teknologi Bandung',
      logo: 'itb.png',
      category: 'Perguruan Tinggi',
    },
    {
      name: 'Universitas Airlangga',
      logo: 'unair.png',
      category: 'Perguruan Tinggi',
    },
    {
      name: 'Universitas Padjadjaran',
      logo: 'unpad.png',
      category: 'Perguruan Tinggi',
    },
    {
      name: 'Universitas Diponegoro',
      logo: 'undip.png',
      category: 'Perguruan Tinggi',
    },
    {
      name: 'Perpustakaan Nasional',
      logo: 'perpusnas.png',
      category: 'Lembaga Pemerintah',
    },
    {
      name: 'Kementerian Pendidikan',
      logo: 'kemendikbud.png',
      category: 'Kementerian',
    },
  ],
  programs: [
    {
      title: 'Digitalisasi Arsip Nasional',
      description:
        'Program alih media arsip fisik ke bentuk digital dengan standardisasi metadata internasional',
      type: 'Magang',
    },
    {
      title: 'Konservasi Dokumen Bersejarah',
      description:
        'Praktek kerja dalam preservasi dan konservasi dokumen-dokumen bersejarah dengan teknologi modern',
      type: 'Praktek Kerja',
    },
    {
      title: 'Pengembangan Sistem Kearsipan',
      description: 'Riset dan pengembangan sistem pengelolaan arsip digital yang terintegrasi',
      type: 'Riset',
    },
    {
      title: 'Sosialisasi Kearsipan',
      description: 'Program edukasi publik tentang pentingnya arsip dan cara pengelolaannya',
      type: 'Proyek',
    },
    {
      title: 'Manajemen Data Kearsipan',
      description: 'Implementasi big data dan analitik dalam pengelolaan data kearsipan nasional',
      type: 'Magang',
    },
  ],
  testimonials: [
    {
      name: 'Dinda Prasetya',
      university: 'Universitas Indonesia',
      program: 'Digitalisasi Arsip',
      quote:
        'Program kolaborasi MBKM x BAST ANRI membuka wawasan saya tentang pentingnya preservasi warisan sejarah melalui teknologi digital. Pengalaman praktek langsung sangat berharga bagi karir saya.',
      image: '/images/testimonials/dinda.jpg',
    },
    {
      name: 'Fadli Rahman',
      university: 'Institut Teknologi Bandung',
      program: 'Pengembangan Sistem',
      quote:
        'Saya berkesempatan mengembangkan sistem database kearsipan dengan teknologi terkini. Mentor dari ANRI sangat membantu dan suportif dalam memberikan bimbingan praktis.',
      image: '/images/testimonials/fadli.jpg',
    },
    {
      name: 'Putri Anindita',
      university: 'Universitas Gadjah Mada',
      program: 'Konservasi Dokumen',
      quote:
        'Bekerja dengan dokumen berusia ratusan tahun adalah pengalaman yang tidak ternilai. Program ini mengajarkan saya teknik konservasi yang tidak didapatkan di perkuliahan biasa.',
      image: '/images/testimonials/putri.jpg',
    },
    {
      name: 'Bayu Wicaksono',
      university: 'Universitas Padjadjaran',
      program: 'Sosialisasi Kearsipan',
      quote:
        'Program ini mengajarkan saya bagaimana mengkomunikasikan pentingnya kearsipan kepada masyarakat umum. Keterampilan komunikasi yang saya peroleh sangat bermanfaat.',
      image: '/images/testimonials/bayu.jpg',
    },
  ],
  contactInfo: [
    {
      label: 'Email',
      value: 'kolaborasi.mbkm@anri.go.id',
      icon: Mail,
    },
    {
      label: 'Telepon',
      value: '(021) 7805851 ext. 404',
      icon: Phone,
    },
    {
      label: 'Jam Kerja',
      value: 'Senin - Jumat, 08.00 - 16.00 WIB',
      icon: Clock,
    },
    {
      label: 'Divisi',
      value: 'Direktorat Kerjasama dan Pengembangan Kearsipan',
      icon: MapPin,
    },
  ],
  address: {
    street: 'Jl. Ampera Raya No. 7',
    city: 'Jakarta Selatan',
    zipCode: '12560',
    province: 'DKI Jakarta',
  },
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0673008743!2d106.82788491476916!3d-6.255233295471988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3c5c2b5d967%3A0x728b9312e5b6bea0!2sArsip%20Nasional%20Republik%20Indonesia!5e0!3m2!1sen!2sid!4v1621512321777!5m2!1sen!2sid',
};

export const rawFeatures = [
  {
    title: 'Praktek Kerja',
    description: 'Kesempatan praktek kerja di ANRI dengan mentor berkualitas',
  },
  {
    title: 'Digitalisasi Arsip',
    description: 'Terlibat dalam proyek preservasi nasional',
  },
  {
    title: 'Riset Kearsipan',
    description: 'Kolaborasi penelitian di bidang kearsipan',
  },
  {
    title: 'Webinar & Workshop',
    description: 'Mengikuti pelatihan profesional bidang kearsipan',
  },
];
