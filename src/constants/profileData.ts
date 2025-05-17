// src/constants/profileData.ts

export interface ProfileType {
  id: string;
  nama: string;
  peran: 'Pembimbing Kampus' | 'Mentor BAST ANRI' | 'Mahasiswa';
  foto: string;
  asalInstitusi?: string;
  prodi?: 'MI' | 'IK' | 'Arsip' | 'Perpustakaan';
  angkatan?: '2022' | '2023' | '2024';
  email?: string;
  telepon?: string;
  bidangKeahlian?: string[];
  proyek?: string[];
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  github?: string;
  bioSingkat?: string;
}

export const profileData: ProfileType[] = [
  // Pembimbing Kampus
  {
    id: 'pk001',
    nama: 'Dr. Anisa Wijayanti, M.Hum.',
    peran: 'Pembimbing Kampus',
    foto: '/images/profiles/anisa-wijayanti.jpg',
    asalInstitusi: 'Universitas Indonesia',
    bidangKeahlian: ['Kearsipan Digital', 'Manajemen Dokumen', 'Preservasi Digital'],
    email: 'anisa.wijayanti@ui.ac.id',
    telepon: '081234567890',
    linkedin: 'anisa-wijayanti',
    bioSingkat: 'Pakar manajemen arsip dengan pengalaman 15 tahun dalam bidang kearsipan digital.'
  },
  {
    id: 'pk002',
    nama: 'Prof. Bambang Sulistyo, M.A.',
    peran: 'Pembimbing Kampus',
    foto: '/images/profiles/bambang-sulistyo.jpg',
    asalInstitusi: 'Universitas Gadjah Mada',
    bidangKeahlian: ['Sistem Informasi Kearsipan', 'Big Data', 'Arsip Elektronik'],
    email: 'bambang.sulistyo@ugm.ac.id',
    telepon: '081234567891',
    linkedin: 'bambang-sulistyo',
    bioSingkat: 'Profesor di bidang sistem informasi kearsipan dengan fokus pada pengembangan aplikasi arsip digital.'
  },
  {
    id: 'pk003',
    nama: 'Dr. Diana Rahmawati, M.I.Kom.',
    peran: 'Pembimbing Kampus',
    foto: '/images/profiles/diana-rahmawati.jpg',
    asalInstitusi: 'Universitas Padjadjaran',
    bidangKeahlian: ['Komunikasi Organisasi', 'Manajemen Informasi', 'Kehumasan'],
    email: 'diana.rahmawati@unpad.ac.id',
    telepon: '081234567892',
    linkedin: 'diana-rahmawati',
    bioSingkat: 'Dosen senior bidang ilmu komunikasi dengan spesialisasi manajemen informasi organisasi.'
  },
  {
    id: 'pk004',
    nama: 'Dr. Eko Saputra, M.T.I.',
    peran: 'Pembimbing Kampus',
    foto: '/images/profiles/eko-saputra.jpg',
    asalInstitusi: 'Universitas Airlangga',
    bidangKeahlian: ['Basis Data', 'Pemrograman Web', 'Informatika Kearsipan'],
    email: 'eko.saputra@unair.ac.id',
    telepon: '081234567893',
    linkedin: 'eko-saputra',
    github: 'ekosaputra',
    bioSingkat: 'Peneliti dan pengembang aplikasi sistem kearsipan berbasis web dengan fokus pada aksesibilitas.'
  },
  {
    id: 'pk005',
    nama: 'Dr. Fina Nurhasanah, M.I.P.',
    peran: 'Pembimbing Kampus',
    foto: '/images/profiles/fina-nurhasanah.jpg',
    asalInstitusi: 'Institut Teknologi Bandung',
    bidangKeahlian: ['Perpustakaan Digital', 'Information Retrieval', 'Metadata'],
    email: 'fina.nurhasanah@itb.ac.id',
    telepon: '081234567894',
    linkedin: 'fina-nurhasanah',
    bioSingkat: 'Pakar perpustakaan digital dengan keahlian dalam sistem temu kembali informasi dan manajemen metadata.'
  },
  
  // Mentor BAST ANRI
  {
    id: 'mn001',
    nama: 'Gunawan Prakoso, S.I.P., M.A.',
    peran: 'Mentor BAST ANRI',
    foto: '/images/profiles/gunawan-prakoso.jpg',
    bidangKeahlian: ['Pengelolaan Arsip Statis', 'Digitalisasi Arsip', 'Preservasi Arsip'],
    email: 'gunawan.prakoso@anri.go.id',
    telepon: '081234567895',
    linkedin: 'gunawan-prakoso',
    bioSingkat: 'Kepala bidang Pengelolaan Arsip Statis dengan pengalaman lebih dari 12 tahun di ANRI.'
  },
  {
    id: 'mn002',
    nama: 'Hana Permatasari, S.Kom., M.Arch.',
    peran: 'Mentor BAST ANRI',
    foto: '/images/profiles/hana-permatasari.jpg',
    bidangKeahlian: ['Sistem Informasi Arsip', 'Pengembangan Aplikasi', 'UX/UI Design'],
    email: 'hana.permatasari@anri.go.id',
    telepon: '081234567896',
    linkedin: 'hana-permatasari',
    github: 'hanapermatasari',
    bioSingkat: 'Pengembang aplikasi dan sistem kearsipan digital di BAST ANRI dengan fokus pada pengalaman pengguna.'
  },
  {
    id: 'mn003',
    nama: 'Irfan Setiawan, S.I.P., M.M.',
    peran: 'Mentor BAST ANRI',
    foto: '/images/profiles/irfan-setiawan.jpg',
    bidangKeahlian: ['Manajemen Arsip', 'Kebijakan Kearsipan', 'Tata Kelola Dokumen'],
    email: 'irfan.setiawan@anri.go.id',
    telepon: '081234567897',
    linkedin: 'irfan-setiawan',
    bioSingkat: 'Praktisi arsip dengan spesialisasi pada penyusunan kebijakan dan standar kearsipan nasional.'
  },
  {
    id: 'mn004',
    nama: 'Jasmine Kusumawardhani, S.I.Kom., M.Ds.',
    peran: 'Mentor BAST ANRI',
    foto: '/images/profiles/jasmine-kusumawardhani.jpg',
    bidangKeahlian: ['Kehumasan Arsip', 'Komunikasi Visual', 'Publikasi'],
    email: 'jasmine.kusumawardhani@anri.go.id',
    telepon: '081234567898',
    linkedin: 'jasmine-kusumawardhani',
    instagram: 'jasmine_kusumawardhani',
    bioSingkat: 'Spesialis komunikasi visual dan publikasi di bidang kearsipan dengan fokus pada penyebarluasan informasi arsip.'
  },
  {
    id: 'mn005',
    nama: 'Kurniawan Adi, S.Kom., M.T.I.',
    peran: 'Mentor BAST ANRI',
    foto: '/images/profiles/kurniawan-adi.jpg',
    bidangKeahlian: ['Keamanan Data', 'Sistem Informasi', 'Arsitektur IT'],
    email: 'kurniawan.adi@anri.go.id',
    telepon: '081234567899',
    linkedin: 'kurniawan-adi',
    github: 'kurniawanadi',
    bioSingkat: 'Ahli keamanan data dengan pengalaman 10 tahun dalam pengelolaan sistem informasi kearsipan.'
  },
  
  // Mahasiswa
  // Angkatan 2022
  {
    id: 'mhs001',
    nama: 'Laila Mufidah',
    peran: 'Mahasiswa',
    foto: '/images/profiles/laila-mufidah.jpg',
    asalInstitusi: 'Universitas Indonesia',
    prodi: 'Arsip',
    angkatan: '2022',
    email: 'laila.mufidah@ui.ac.id',
    telepon: '081234567900',
    proyek: ['Digitalisasi Arsip Foto Sejarah', 'Pengembangan SOP Arsip Digital'],
    instagram: 'laila_mufidah',
    linkedin: 'laila-mufidah',
    bioSingkat: 'Mahasiswa aktif dengan minat pada preservasi arsip foto dan dokumen bersejarah.'
  },
  {
    id: 'mhs002',
    nama: 'Muhammad Daffa',
    peran: 'Mahasiswa',
    foto: '/images/profiles/muhammad-daffa.jpg',
    asalInstitusi: 'Universitas Gadjah Mada',
    prodi: 'MI',
    angkatan: '2022',
    email: 'muhammad.daffa@mail.ugm.ac.id',
    telepon: '081234567901',
    proyek: ['Pengembangan Aplikasi Temu Kembali Arsip', 'Sistem Klasifikasi Arsip Otomatis'],
    github: 'mdaffa',
    linkedin: 'muhammad-daffa',
    bioSingkat: 'Fokus pada pengembangan aplikasi berbasis web untuk sistem kearsipan modern.'
  },
  {
    id: 'mhs003',
    nama: 'Nabila Putri',
    peran: 'Mahasiswa',
    foto: '/images/profiles/nabila-putri.jpg',
    asalInstitusi: 'Universitas Padjadjaran',
    prodi: 'IK',
    angkatan: '2022',
    email: 'nabila.putri19@unpad.ac.id',
    telepon: '081234567902',
    proyek: ['Strategi Komunikasi Kearsipan', 'Media Sosial untuk Edukasi Arsip'],
    instagram: 'nabilaputri_',
    linkedin: 'nabila-putri',
    bioSingkat: 'Mahasiswa ilmu komunikasi dengan minat pada strategi kehumasan dan publikasi arsip.'
  },
  {
    id: 'mhs004',
    nama: 'Olivia Sanjaya',
    peran: 'Mahasiswa',
    foto: '/images/profiles/olivia-sanjaya.jpg',
    asalInstitusi: 'Universitas Airlangga',
    prodi: 'Perpustakaan',
    angkatan: '2022',
    email: 'olivia.sanjaya@fib.unair.ac.id',
    telepon: '081234567903',
    proyek: ['Katalogisasi Arsip Digital', 'Integrasi Sistem Perpustakaan dan Kearsipan'],
    linkedin: 'olivia-sanjaya',
    bioSingkat: 'Tertarik pada pengintegrasian sistem perpustakaan dan arsip untuk kemudahan akses informasi.'
  },
  
  // Angkatan 2023
  {
    id: 'mhs005',
    nama: 'Putra Ramadhan',
    peran: 'Mahasiswa',
    foto: '/images/profiles/putra-ramadhan.jpg',
    asalInstitusi: 'Institut Teknologi Bandung',
    prodi: 'MI',
    angkatan: '2023',
    email: 'putra.ramadhan@students.itb.ac.id',
    telepon: '081234567904',
    proyek: ['Aplikasi Mobile untuk Akses Arsip', 'Pengembangan API Kearsipan'],
    github: 'putraramadhan',
    linkedin: 'putra-ramadhan',
    bioSingkat: 'Pengembang aplikasi mobile dengan minat pada teknologi untuk kemudahan akses arsip digital.'
  },
  {
    id: 'mhs006',
    nama: 'Qori Aulia',
    peran: 'Mahasiswa',
    foto: '/images/profiles/qori-aulia.jpg',
    asalInstitusi: 'Universitas Diponegoro',
    prodi: 'Arsip',
    angkatan: '2023',
    email: 'qori.aulia@students.undip.ac.id',
    telepon: '081234567905',
    proyek: ['Preservasi Arsip Audio Visual', 'Standarisasi Metadata Arsip'],
    linkedin: 'qori-aulia',
    instagram: 'qori_aulia',
    bioSingkat: 'Spesialisasi dalam preservasi dan metadata arsip audio visual dengan pendekatan standar internasional.'
  },
  {
    id: 'mhs007',
    nama: 'Rizky Ramadhan',
    peran: 'Mahasiswa',
    foto: '/images/profiles/rizky-ramadhan.jpg',
    asalInstitusi: 'Universitas Hasanuddin',
    prodi: 'MI',
    angkatan: '2023',
    email: 'rizky.ramadhan@unhas.ac.id',
    telepon: '081234567906',
    proyek: ['Pengembangan Database Arsip', 'Implementasi Blockchain untuk Kearsipan'],
    github: 'rizkyram',
    linkedin: 'rizky-ramadhan',
    bioSingkat: 'Meneliti potensi teknologi blockchain untuk autentikasi dan keamanan arsip digital.'
  },
  {
    id: 'mhs008',
    nama: 'Sari Indah',
    peran: 'Mahasiswa',
    foto: '/images/profiles/sari-indah.jpg',
    asalInstitusi: 'Universitas Brawijaya',
    prodi: 'Perpustakaan',
    angkatan: '2023',
    email: 'sari.indah@ub.ac.id',
    telepon: '081234567907',
    proyek: ['Literasi Kearsipan di Perpustakaan', 'Pengembangan Training Kearsipan'],
    instagram: 'sariindah_',
    linkedin: 'sari-indah',
    bioSingkat: 'Fokus pada program literasi kearsipan dan pengembangan materi edukasi arsip untuk masyarakat umum.'
  },
  
  // Angkatan 2024
  {
    id: 'mhs009',
    nama: 'Taufiq Hidayat',
    peran: 'Mahasiswa',
    foto: '/images/profiles/taufiq-hidayat.jpg',
    asalInstitusi: 'Universitas Sebelas Maret',
    prodi: 'IK',
    angkatan: '2024',
    email: 'taufiq.hidayat@student.uns.ac.id',
    telepon: '081234567908',
    proyek: ['Kampanye Kesadaran Kearsipan', 'Podcast Sejarah Indonesia'],
    instagram: 'taufiq_hidayat',
    twitter: 'taufiqhidayat',
    linkedin: 'taufiq-hidayat',
    bioSingkat: 'Content creator yang fokus pada penyebarluasan informasi kearsipan melalui media sosial dan podcast.'
  },
  {
    id: 'mhs010',
    nama: 'Utari Wulandari',
    peran: 'Mahasiswa',
    foto: '/images/profiles/utari-wulandari.jpg',
    asalInstitusi: 'Universitas Indonesia',
    prodi: 'Arsip',
    angkatan: '2024',
    email: 'utari.wulandari@ui.ac.id',
    telepon: '081234567909',
    proyek: ['Analisis Nilai Guna Arsip', 'Pengembangan Jadwal Retensi Arsip Digital'],
    linkedin: 'utari-wulandari',
    bioSingkat: 'Tertarik pada aspek legal dan administratif pengelolaan arsip digital dengan fokus pada aturan retensi.'
  },
  {
    id: 'mhs011',
    nama: 'Vino Aditya',
    peran: 'Mahasiswa',
    foto: '/images/profiles/vino-aditya.jpg',
    asalInstitusi: 'Institut Teknologi Sepuluh Nopember',
    prodi: 'MI',
    angkatan: '2024',
    email: 'vino.aditya@its.ac.id',
    telepon: '081234567910',
    proyek: ['Arsitektur Sistem Kearsipan', 'Pengembangan Dashboard Analytics Arsip'],
    github: 'vinoaditya',
    linkedin: 'vino-aditya',
    bioSingkat: 'Pengembang full-stack dengan spesialisasi pada visualisasi data dan analitik sistem kearsipan.'
  },
  {
    id: 'mhs012',
    nama: 'Winda Sari',
    peran: 'Mahasiswa',
    foto: '/images/profiles/winda-sari.jpg',
    asalInstitusi: 'Universitas Gadjah Mada',
    prodi: 'IK',
    angkatan: '2024',
    email: 'winda.sari@mail.ugm.ac.id',
    telepon: '081234567911',
    proyek: ['UX Research Aplikasi Arsip', 'Pengembangan Konten Edukasi Kearsipan'],
    instagram: 'winda_sari',
    linkedin: 'winda-sari',
    bioSingkat: 'UX researcher dengan fokus pada pengembangan antarmuka pengguna yang ramah untuk aplikasi kearsipan.'
  },
  {
    id: 'mhs013',
    nama: 'Xavier Putra',
    peran: 'Mahasiswa',
    foto: '/images/profiles/xavier-putra.jpg',
    asalInstitusi: 'Universitas Padjadjaran',
    prodi: 'MI',
    angkatan: '2024',
    email: 'xavier.putra21@unpad.ac.id',
    telepon: '081234567912',
    proyek: ['Pengembangan Chatbot Arsip', 'Implementasi AI untuk Klasifikasi Arsip'],
    github: 'xavierputra',
    linkedin: 'xavier-putra',
    bioSingkat: 'Peneliti teknologi AI dan machine learning untuk otomatisasi proses klasifikasi dan temu kembali arsip.'
  },
  {
    id: 'mhs014',
    nama: 'Yasmin Aulia',
    peran: 'Mahasiswa',
    foto: '/images/profiles/yasmin-aulia.jpg',
    asalInstitusi: 'Universitas Airlangga',
    prodi: 'Perpustakaan',
    angkatan: '2024',
    email: 'yasmin.aulia@fib.unair.ac.id',
    telepon: '081234567913',
    proyek: ['Integrasi Koleksi Digital', 'Pengembangan Skema Metadata Terpadu'],
    linkedin: 'yasmin-aulia',
    instagram: 'yasmin_aulia',
    bioSingkat: 'Fokus pada pengembangan sistem terpadu antara perpustakaan digital dan arsip elektronik.'
  },
  {
    id: 'mhs015',
    nama: 'Zahra Putri',
    peran: 'Mahasiswa',
    foto: '/images/profiles/zahra-putri.jpg',
    asalInstitusi: 'Institut Teknologi Bandung',
    prodi: 'IK',
    angkatan: '2024',
    email: 'zahra.putri@students.itb.ac.id',
    telepon: '081234567914',
    proyek: ['Visualisasi Data Arsip', 'Pengembangan Infografis Kearsipan'],
    instagram: 'zahraputri_',
    linkedin: 'zahra-putri',
    bioSingkat: 'Desainer komunikasi visual dengan keahlian dalam visualisasi data dan infografis untuk kearsipan.'
  }
];