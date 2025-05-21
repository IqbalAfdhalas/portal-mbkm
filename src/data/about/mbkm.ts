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
  stats: {
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
  headerTitle: 'Merdeka Belajar Kampus Merdeka (MBKM)',
  headerDescription:
    'Program pendidikan yang memberikan kebebasan dan otonomi kepada kampus dan mahasiswa untuk mengembangkan potensi sesuai minat dan bakat.',
  headerImageSrc: '/images/ilustrasiMBKM.png',
  tags: ['Pendidikan', 'Magang', 'Penelitian', 'Wirausaha', 'Pengalaman Industri'],
  stats: [
    { value: '400+', label: 'Perguruan Tinggi' },
    { value: '8', label: 'Bentuk Kegiatan' },
    { value: '20-40', label: 'SKS Konversi' },
    { value: '500+', label: 'Mitra Industri' },
  ],

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
        Program <em>Merdeka Belajar – Kampus Merdeka (MBKM)</em> merupakan inisiatif transformasional dari 
        <strong>Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi (Kemendikbudristek)</strong> 
        yang bertujuan membuka ruang belajar seluas-luasnya bagi Mahasiswa — tidak hanya terbatas di ruang kelas, 
        tetapi juga di dunia nyata yang lebih dinamis dan kompleks.
      </p>

      <p class="mb-3">
        Gagasan <strong>MBKM</strong> lahir dari kesadaran bahwa sistem pendidikan tinggi di Indonesia perlu beradaptasi 
        dengan perubahan zaman. Dunia kerja terus berkembang, sementara pembelajaran di kampus kerap belum sepenuhnya 
        membekali Mahasiswa dengan pengalaman praktis dan keterampilan kontekstual yang dibutuhkan.
      </p>

      <p class="mb-3">
        Program ini hadir untuk menjembatani kesenjangan tersebut, dengan membuka jalur pembelajaran alternatif 
        yang lebih fleksibel dan aplikatif.
      </p>

      <h4 class="font-semibold mb-2">🔎 Mengapa MBKM Diperlukan?</h4>
      <ul class="list-disc pl-5 space-y-2 mb-4 text-sm">
        <li><strong>Kesenjangan antara teori dan praktik</strong> — Lulusan sering kali belum siap menghadapi tantangan kerja nyata karena terbatasnya pengalaman di luar kampus.</li>
        <li><strong>Perubahan dunia kerja yang cepat</strong> — Perkembangan teknologi dan industri menuntut pembaruan kompetensi secara terus-menerus.</li>
        <li><strong>Kurikulum yang terlalu kaku</strong> — Mahasiswa cenderung terikat pada jalur studi sempit, sehingga tidak leluasa mengeksplorasi potensi lintas bidang.</li>
        <li><strong>Minimnya ruang eksplorasi mandiri</strong> — Sistem belajar konvensional belum sepenuhnya memberi ruang untuk pengembangan karakter, kreativitas, dan inisiatif.</li>
        <li><strong>Kurangnya koneksi ke dunia profesional</strong> — Banyak Mahasiswa belum memiliki akses langsung untuk membangun jejaring dengan praktisi industri atau lembaga profesional.</li>
      </ul>

      <p>
        Melalui <strong>MBKM</strong>, Mahasiswa diajak untuk keluar dari zona nyaman, menghadapi dinamika lapangan secara langsung, 
        dan mempersiapkan diri menghadapi dunia kerja secara lebih matang — bukan hanya secara akademik, tetapi juga secara mental dan sosial.
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
              <p class="font-semibold">Delapan Bentuk Kegiatan Pembelajaran</p>
              <p class="mt-1">Mahasiswa memiliki kesempatan untuk mengikuti kegiatan pembelajaran di luar program studi seperti magang, proyek di desa, pertukaran pelajar, penelitian, wirausaha, studi independen, proyek kemanusiaan, dan kegiatan mengajar di sekolah.</p>
            </li>
            
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
        <div class="mb-4">
          <div class="mb-4">
            <p class="font-semibold">Bagaimana cara mendaftar program MBKM?</p>
            <p class="mt-1">Pendaftaran dilakukan melalui platform MBKM resmi Kemendikbud di <a href="https://kampusmerdeka.kemdikbud.go.id/" class="text-blue-600 hover:underline">https://kampusmerdeka.kemdikbud.go.id/</a> dengan menggunakan akun yang terdaftar, serta menyesuaikan kembali dengan ketentuan dari prodi masing-masing.</p>
          </div>
          
          <div class="mb-4">
            <p class="font-semibold">Apakah semua mahasiswa dapat mengikuti program MBKM?</p>
            <p class="mt-1">Program MBKM terbuka untuk semua mahasiswa program sarjana atau diploma yang telah menyelesaikan semester pertama dan memenuhi persyaratan yang ditentukan oleh perguruan tinggi masing-masing.</p>
          </div>
          
          <div>
            <p class="font-semibold">Berapa banyak SKS yang dapat dikonversi melalui program MBKM?</p>
            <p class="mt-1">Mahasiswa dapat mengambil dan diakui SKS kegiatan pembelajaran di luar kampus sebanyak satu semester atau setara dengan 18 ~ 22 SKS.</p>
          </div>
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
