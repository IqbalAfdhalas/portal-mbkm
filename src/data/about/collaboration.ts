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
  overviewContent?: string;
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
  headerImageSrc: '/images/collaboration-illustration.png',
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
    <div class="mb-4 text-justify">
      <p class="mb-3"><strong>Jumat, 22 Oktober 2021</strong><br>
        Perjanjian hitam di atas putih antara <strong>BAST ANRI</strong> dan <strong>Universitas Syiah Kuala (USK)</strong> menjadi tonggak awal ikatan kerja sama yang bertujuan untuk meningkatkan kualitas pendidikan kearsipan. Kerja sama ini mencakup pengembangan pusat studi arsip kebencanaan/arsip tsunami, serta sistem dan sumber daya manusia (SDM) kearsipan di lingkungan USK.
      </p>

      <p class="mb-3">Terdapat sejumlah poin kesepakatan yang selaras dengan semangat <em>Merdeka Belajar Kampus Merdeka (MBKM)</em>, di antaranya:</p>

      <ul class="list-disc pl-5 space-y-2 mb-4">
        <li><strong>Pasal 2</strong> — <em>"Ruang lingkup kerja sama mencakup pengembangan program vokasi, pusat studi, dan digitalisasi arsip"</em>, yang mendukung pelaksanaan kegiatan MBKM seperti magang, riset, proyek independen, serta pembelajaran kolaboratif lintas institusi.</li>
        <li><strong>Pasal 4</strong> — <em>"Pembentukan Program Studi Vokasi D-IV Kearsipan"</em>, menjadi bagian dari skema pengembangan kurikulum MBKM yang memungkinkan mahasiswa mengambil pembelajaran lintas program studi dan memperoleh pengalaman praktis di lapangan.</li>
        <li><strong>Pasal 7 dan 8</strong> — <em>"Pelatihan, workshop, dan penelitian"</em>, membuka peluang bagi mahasiswa dan dosen untuk terlibat aktif dalam kegiatan MBKM seperti pelatihan wirausaha, proyek desa, hingga riset terapan.</li>
      </ul>

      <p class="mb-3"><strong>Selasa, 13 Juni 2023</strong><br>
        Pandangan tersebut terus berkembang hingga USK kembali melakukan perundingan tindak lanjut atas <em>Memorandum of Understanding (MoU)</em> dan <em>Perjanjian Kerja Sama (PKS)</em> dengan pihak BAST ANRI.
      </p>

      <p class="mb-3">Pertemuan ini dihadiri oleh:</p>
      <ul class="list-disc pl-5 space-y-1 mb-4">
        <li>Prof. Agussabti – Wakil Rektor I USK</li>
        <li>Prof. Nasaruddin – Direktur Direktorat Pendidikan dan Pembelajaran</li>
        <li>Prof. Muhammad Syukri – Direktur MBKM</li>
        <li>Elly Sufriadi – Koordinator MBKM</li>
      </ul>

      <p class="mb-3">Pembahasan difokuskan pada pengembangan pusat studi arsip kebencanaan/tsunami, pembentukan program vokasi bidang kearsipan, penyelenggaraan lembaga kearsipan perguruan tinggi, serta pengembangan dan pembinaan SDM di bidang kearsipan.</p>

      <p class="mb-3">Sebagai hasil dari pertemuan tersebut, disepakati bahwa <strong>BAST ANRI siap menerima mahasiswa MBKM dari USK</strong>. Ini menjadi bagian dari upaya pengembangan SDM mahasiswa serta peningkatan literasi kearsipan di masyarakat luas.</p>

      <p><strong>Kesepakatan ini mulai direalisasikan pada Senin, 19 Februari 2024.</strong></p>
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
      title: 'Digitalisasi Arsip',
      description:
        'Program alih media arsip fisik ke bentuk digital dengan standardisasi metadata internasional',
      type: 'Kegiatan 1',
    },
    {
      title: 'Klasifikasi Arsip',
      description: 'Menyusun daftar arsip berdasarkan jenis, kategori, dan nilai informasi arsip.',
      type: 'Kegiatan 2',
    },
    {
      title: 'Re-boxing Arsip',
      description: 'Memindahkan arsip ke box baru sesuai standar preservasi dan pencatatan ulang.',
      type: 'Kegiatan 3',
    },
    {
      title: 'Edukasi Kearsipan',
      description: 'Program edukasi publik tentang pentingnya arsip dan cara pengelolaannya',
      type: 'Kegiatan 4',
    },
    {
      title: 'Manajemen Data Kearsipan',
      description:
        'Menyesuaikan data arsip fisik dan digital agar selaras dan terdokumentasi baik.',
      type: 'Kegiatan 5',
    },
  ],
  testimonials: [
    {
      name: 'Budi Setiawan',
      university: 'Universitas Indonesia',
      program: 'Magang di Telkom Indonesia',
      quote:
        'Program MBKM membuka pintu karir saya di industri telekomunikasi. Pengalaman magang di Telkom Indonesia memberikan saya keterampilan praktis yang tidak saya dapatkan di kampus.',
      image: '/images/testing.jpg',
    },
    {
      name: 'Anisa Rahma',
      university: 'Universitas Gadjah Mada',
      program: 'Penelitian di LIPI',
      quote:
        'Saya berkesempatan untuk terlibat dalam penelitian riil dengan ilmuwan ternama. Pengalaman ini memperkuat minat saya di bidang penelitian dan mengembangkan cara berpikir kritis.',
      image: '/images/testing.jpg',
    },
    {
      name: 'Dian Permata',
      university: 'Institut Teknologi Bandung',
      program: 'Wirausaha',
      quote:
        'MBKM memberikan saya modal dan mentoring untuk memulai startup saya sendiri. Kini bisnis saya berkembang dan bahkan mempekerjakan lulusan baru dari kampus saya.',
      image: '/images/testing.jpg',
    },
    {
      name: 'Reza Mahendra',
      university: 'Universitas Diponegoro',
      program: 'Proyek Desa',
      quote:
        'Program Proyek Desa mengajarkan saya bagaimana menerapkan ilmu teknik untuk menyelesaikan masalah nyata masyarakat. Pengalaman ini sangat berharga dan mengubah perspektif saya.',
      image: '/images/testing.jpg',
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
