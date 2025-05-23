//src/data/about/mbkm.ts

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  isOpen?: boolean;
}

export interface MBKMData {
  headerTitle: string;
  headerDescription: string;
  headerImageSrc: string;
  tags: string[];
  stats?: {
    value: string;
    label: string;
  }[];
  accordionItems: AccordionItem[];
  externalLink: {
    url: string;
    label: string;
  };
  features: {
    title: string;
    description: string;
    bgColor?: string;
  }[];
  overviewContent?: string;
  benefits: {
    title: string;
    description: string;
  }[];
  timeline: {
    period: string;
    title: string;
    description: string;
  }[];
  partners: {
    name: string;
    logo: string;
    category: string;
  }[];
}

export const mbkmData: MBKMData = {
  headerTitle: 'MBKM USK UNGGUL',
  headerDescription:
    'Program pendidikan yang memberikan kebebasan dan otonomi kepada kampus dan mahasiswa untuk mengembangkan potensi sesuai minat dan bakat.',
  headerImageSrc: '/images/Tentang/MBKM/ilustrasiMBKM.png',
  tags: ['Pendidikan', 'Magang', 'Penelitian', 'Wirausaha', 'Pengalaman Industri'],

  // Tambahkan ini
  features: [
    {
      title: 'Magang Industri',
      description: 'Kesempatan magang di perusahaan terkemuka dengan proyek nyata',
    },
    {
      title: 'Penelitian',
      description: 'Kolaborasi dengan peneliti untuk proyek inovatif',
    },
    {
      title: 'Proyek Desa',
      description: 'Menyelesaikan masalah nyata di masyarakat',
    },
    {
      title: 'Wirausaha',
      description: 'Mentoring dan pendanaan untuk startup mahasiswa',
    },
  ],

  accordionItems: [
    {
      id: 'latar-belakang',
      title: 'Latar Belakang Program',
      content: `
<div class="mb-4 text-justify">
  <p class="mb-3">
    <strong>Merdeka Belajar – Kampus Merdeka (MBKM)</strong> merupakan kebijakan strategis dari 
    <strong>Kemendikbudristek</strong> yang memberikan ruang bagi Mahasiswa untuk belajar di luar program studi, baik di dalam 
    maupun di luar kampus. Di <strong>Universitas Syiah Kuala (USK)</strong>, MBKM menjadi salah satu langkah nyata menuju 
    <em>USK Unggul</em>, dengan menekankan penguatan kompetensi, relevansi pembelajaran, dan kesiapan Mahasiswa menghadapi dunia kerja nyata.
  </p>

  <p class="mb-3">
    Melalui MBKM, Mahasiswa USK diberi kesempatan untuk terjun langsung ke dunia kerja dan masyarakat melalui berbagai program, 
    seperti <em>magang</em>, <em>proyek kemanusiaan</em>, <em>studi independen</em>, dan <em>pertukaran pelajar</em>. 
    Program ini menjadi wadah pembelajaran kontekstual yang mempertemukan teori dengan praktik. Mahasiswa tidak hanya diasah 
    dari sisi akademik, tetapi juga dalam mentalitas, kemampuan beradaptasi, serta keterampilan pengambilan keputusan di lapangan.
  </p>

  <p class="mb-3">
    Inisiatif ini sejalan dengan komitmen USK untuk mencetak lulusan unggul, berdaya saing tinggi, dan mampu menjawab 
    tantangan global. Dengan mendorong Mahasiswa keluar dari zona nyaman dan menghadapi pengalaman belajar nyata, 
    MBKM menjadi pondasi penting dalam membentuk karakter, pola pikir kritis, dan kompetensi profesional Mahasiswa USK.
  </p>

  <h4 class="font-semibold mb-2">🔍 Mengapa MBKM Penting?</h4>
  <ul class="list-disc pl-5 space-y-2 mb-4 text-sm">
    <li><strong>Mengatasi kesenjangan teori dan praktik</strong> — Mahasiswa bisa langsung menghadapi tantangan dunia kerja.</li>
    <li><strong>Mengikuti perkembangan industri</strong> — Dunia kerja terus berubah, dan Mahasiswa harus siap beradaptasi.</li>
    <li><strong>Memberikan fleksibilitas kurikulum</strong> — Mahasiswa bisa mengeksplorasi lintas bidang sesuai minat dan bakat.</li>
    <li><strong>Mendorong pengembangan soft skill</strong> — Seperti kepemimpinan, komunikasi, dan manajemen waktu di lingkungan nyata.</li>
    <li><strong>Membangun koneksi profesional</strong> — Mahasiswa mendapat kesempatan menjalin relasi dengan praktisi, institusi, dan dunia usaha.</li>
  </ul>

  <p class="mb-3">
    Dengan pendekatan ini, diharapkan Mahasiswa USK tidak hanya unggul dalam aspek akademik, tetapi juga mampu tampil 
    sebagai pribadi yang adaptif, visioner, dan siap berkontribusi bagi masyarakat serta pembangunan bangsa di masa depan.
  </p>
</div>
`,
      isOpen: true,
    },
    {
      id: 'tujuan-program',
      title: 'Tujuan Program',
      content: `
        <div class="mb-4">
          <p class="mb-3">Program MBKM memiliki beberapa tujuan utama, antara lain:</p>
          
          <ul class="list-disc pl-5 space-y-2">
            <li>Mendorong mahasiswa untuk menguasai berbagai keilmuan yang berguna untuk memasuki dunia kerja</li>
            <li>Memberikan kesempatan bagi mahasiswa untuk belajar dan mengembangkan diri melalui aktivitas di luar kelas perkuliahan</li>
            <li>Memfasilitasi mahasiswa untuk mengembangkan potensi sesuai dengan minat dan bakat</li>
            <li>Menyiapkan lulusan yang siap kerja dan memiliki kompetensi yang sesuai dengan kebutuhan industri</li>
            <li>Mengurangi kesenjangan antara teori yang dipelajari di kampus dengan praktik di dunia kerja</li>
            <li>Mengembangkan kerja sama antara perguruan tinggi dengan dunia usaha, dunia industri, dan dunia kerja</li>
          </ul>
        </div>
      `,
      isOpen: false,
    },
    {
      id: 'mekanisme-umum',
      title: 'Mekanisme Umum',
      content: `
        <div class="mb-4">
          <p class="mb-3">Mekanisme Umum Program MBKM meliputi:</p>
          
          <ol class="list-decimal pl-5 space-y-3">
            
            <li>
              <p class="font-semibold">Konversi SKS</p>
              <p class="mt-1">Kegiatan pembelajaran di luar kampus dapat diakui sebagai SKS dengan sistem konversi yang telah ditentukan.</p>
            </li>
            
            <li>
              <p class="font-semibold">Kerjasama dengan Mitra</p>
              <p class="mt-1">Perguruan tinggi menjalin kerjasama dengan berbagai mitra seperti perusahaan, organisasi nirlaba, institusi pemerintah, dan lain-lain untuk menyediakan tempat bagi mahasiswa melakukan kegiatan MBKM.</p>
            </li>
            
            <li>
              <p class="font-semibold">Pendampingan</p>
              <p class="mt-1">Mahasiswa yang mengikuti program MBKM akan mendapatkan pendampingan dari dosen pembimbing dan mentor dari tempat kegiatan.</p>
            </li>
            
            <li>
              <p class="font-semibold">Evaluasi dan Penilaian</p>
              <p class="mt-1">Setiap kegiatan MBKM akan dievaluasi dan dinilai berdasarkan kriteria yang telah ditetapkan oleh perguruan tinggi dan mitra.</p>
            </li>
          </ol>
        </div>
      `,
      isOpen: false,
    },
    {
      id: 'faqs',
      title: 'Pertanyaan Umum',
      content: `
<div class="space-y-4">
  <ul class="space-y-4 list-none">
    <li>
      <p class="font-semibold">❓ Bagaimana cara mendaftar program MBKM?</p>
      <p class="ml-5 mt-1">– Pendaftaran dilakukan melalui platform resmi 
        <a href="https://mbkmunggul.usk.ac.id/" target="_blank" class="text-blue-600 hover:underline">kampusmerdeka.kemdikbud.go.id</a>, 
        menggunakan akun terdaftar, dan mengikuti ketentuan dari program studi masing-masing.
      </p>
    </li>

    <li>
      <p class="font-semibold">❓ Apakah semua mahasiswa dapat mengikuti program MBKM?</p>
      <p class="ml-5 mt-1">– Program ini terbuka untuk Mahasiswa Sarjana atau Diploma yang sudah menyelesaikan semester pertama 
        dan memenuhi persyaratan dari kampus asal.
      </p>
    </li>

    <li>
      <p class="font-semibold">❓ Berapa banyak SKS yang dapat dikonversi melalui program MBKM?</p>
      <p class="ml-5 mt-1">– Mahasiswa dapat mengambil kegiatan pembelajaran di luar kampus sebanyak satu semester, setara 
        <strong>18–22 SKS</strong>, sesuai kebijakan kampus dan program yang diikuti.
      </p>
    </li>
  </ul>
</div>
`,
      isOpen: false,
    },
  ],
  externalLink: {
    url: 'https://mbkmunggul.usk.ac.id/',
    label: 'Kunjungi Website Resmi MBKM',
  },

  benefits: [
    {
      title: 'Pengalaman Praktis',
      description:
        'Mahasiswa mendapatkan pengalaman praktis di dunia kerja nyata yang tidak bisa didapatkan di ruang kuliah',
    },
    {
      title: 'Jaringan Profesional',
      description:
        'Kesempatan membangun jaringan dengan profesional di industri yang dapat membuka peluang karir di masa depan',
    },
    {
      title: 'Pengembangan Soft Skills',
      description:
        'Mengembangkan keterampilan komunikasi, kerja tim, pemecahan masalah, dan kepemimpinan',
    },
    {
      title: 'Portofolio Proyek',
      description:
        'Membangun portofolio proyek nyata yang dapat ditunjukkan kepada calon pemberi kerja',
    },
    {
      title: 'Eksplorasi Minat',
      description:
        'Kesempatan untuk mengeksplorasi bidang minat sebelum benar-benar terjun ke dunia kerja',
    },
    {
      title: 'Persiapan Karir',
      description:
        'Meningkatkan kesiapan kerja dan meningkatkan kemungkinan mendapatkan pekerjaan setelah lulus',
    },
  ],
  timeline: [
    {
      period: 'Langkah 1',
      title: 'Pendaftaran Program',
      description: 'Mahasiswa mendaftar melalui platform MBKM dan memilih program yang diminati',
    },
    {
      period: 'Langkah 2',
      title: 'Seleksi dan Penempatan',
      description: 'Proses seleksi oleh perguruan tinggi dan mitra industri',
    },
    {
      period: 'Langkah 3',
      title: 'Serah Terima Mahasiswa MBKM di BAST ANRI',
      description: 'Pelaksanaan Serah Terima Mahasiswa MBKM dengan pendampingan dosen dan mentor',
    },
    {
      period: 'Langkah 4',
      title: 'Evaluasi Tengah Program',
      description: 'Evaluasi pelaksanaan program dan penyesuaian jika diperlukan',
    },
    {
      period: 'Langkah 5',
      title: 'Penilaian Proyek Akhir',
      description: ' Penilaian proyek akhir mahasiswa mbkm di BAST ANRI',
    },
    {
      period: 'Langkah 6',
      title: 'Penjemputan Kembali Mahasiswa MBKM',
      description: 'Dosen pembimbing menjemput kembali mahasiswa-nya ke kampus',
    },
  ],
  partners: [
    {
      name: 'Telkom Indonesia',
      logo: 'telkom.png',
      category: 'Teknologi',
    },
    {
      name: 'Bank Mandiri',
      logo: 'mandiri.png',
      category: 'Perbankan',
    },
    {
      name: 'Bukalapak',
      logo: 'bukalapak.png',
      category: 'E-Commerce',
    },
    {
      name: 'Gojek',
      logo: 'gojek.png',
      category: 'Teknologi',
    },
    {
      name: 'Tokopedia',
      logo: 'tokopedia.png',
      category: 'E-Commerce',
    },
    {
      name: 'Unilever',
      logo: 'unilever.png',
      category: 'FMCG',
    },
    {
      name: 'BNI',
      logo: 'bni.png',
      category: 'Perbankan',
    },
    {
      name: 'Microsoft Indonesia',
      logo: 'microsoft.png',
      category: 'Teknologi',
    },
  ],
};
