'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Unit data dengan penambahan Unit Tata Usaha
const units = [
  {
    id: 'akuisisi',
    title: 'Unit Akuisisi Arsip',
    description: 'Unit yang bertanggung jawab untuk melakukan pengumpulan dan penyeleksian arsip dari berbagai sumber untuk kemudian dikelola di dalam sistem kearsipan BAST ANRI.',
    activities: [
      'Survei dan identifikasi arsip yang akan diakuisisi',
      'Penilaian dan seleksi arsip berdasarkan nilai gunanya',
      'Pendokumentasian proses serah terima arsip',
      'Pembuatan berita acara serah terima arsip',
      'Transportasi arsip ke BAST ANRI dengan protokol keamanan',
      'Pemeriksaan kelengkapan arsip yang diterima'
    ],
    skills: [
      'Kemampuan analitis dalam menilai arsip',
      'Pemahaman prosedur administrasi',
      'Kemampuan komunikasi dengan penyerah arsip',
      'Pengetahuan dasar tentang preservation',
      'Kemampuan penggunaan sistem manajemen arsip'
    ],
    image: '/images/program-aktivitas.jpg',
    icon: '/images/icons/activity.svg',
    color: 'from-yellow-500/20 to-yellow-600/20',
    borderColor: 'border-yellow-500',
  },
  {
    id: 'pengolahan',
    title: 'Unit Pengolahan Arsip',
    description: 'Unit yang bertugas untuk mengorganisasikan, mengklasifikasikan, dan memberikan deskripsi pada arsip sehingga mudah ditemukan kembali ketika dibutuhkan.',
    activities: [
      'Pemilahan dan pengelompokan arsip berdasarkan skema klasifikasi',
      'Pendeskripsian arsip sesuai standar kearsipan',
      'Pembuatan inventaris, daftar, dan guide arsip',
      'Pemberian nomor identifikasi unik pada setiap arsip',
      'Indeksasi arsip untuk kemudahan pencarian',
      'Digitalisasi arsip untuk preservasi dan akses'
    ],
    skills: [
      'Ketelitian dalam pengklasifikasian',
      'Pemahaman metadata dan standar deskripsi arsip',
      'Kemampuan penggunaan perangkat lunak pengolahan arsip',
      'Pengetahuan tentang sejarah dan konteks arsip',
      'Keterampilan digitalisasi dokumen'
    ],
    image: '/images/program-aktivitas.jpg',
    icon: '/images/icons/activity.svg',
    color: 'from-blue-500/20 to-blue-600/20',
    borderColor: 'border-blue-500',
  },
  {
    id: 'preservasi',
    title: 'Unit Preservasi Arsip',
    description: 'Unit yang fokus pada pelestarian fisik dan konten arsip untuk menjamin ketersediaan informasi dalam jangka panjang dan pencegahan kerusakan arsip.',
    activities: [
      'Pengaturan suhu dan kelembaban ruang penyimpanan',
      'Pembersihan dan perawatan berkala arsip',
      'Restorasi arsip rusak atau rentan',
      'Penilaian kondisi dan risiko kerusakan arsip',
      'Implementasi strategi preservasi digital',
      'Migrasi format arsip untuk keberlanjutan akses'
    ],
    skills: [
      'Pengetahuan tentang bahan dan teknologi preservasi',
      'Kemampuan identifikasi risiko kerusakan',
      'Teknik konservasi dan restorasi dokumen',
      'Pemahaman preservasi digital dan migrasi data',
      'Keterampilan penggunaan alat preservasi'
    ],
    image: '/images/program-aktivitas.jpg',
    icon: '/images/icons/activity.svg',
    color: 'from-green-500/20 to-green-600/20',
    borderColor: 'border-green-500',
  },
  {
    id: 'pelayanan',
    title: 'Unit Pelayanan Arsip',
    description: 'Unit yang memberikan layanan akses arsip kepada pengguna, baik dari kalangan peneliti, mahasiswa, maupun masyarakat umum yang membutuhkan informasi dari arsip.',
    activities: [
      'Layanan penelusuran arsip bagi pengguna',
      'Penyediaan sarana akses arsip (fisik dan digital)',
      'Pendampingan peneliti dalam menggunakan arsip',
      'Peminjaman dan pengembalian arsip',
      'Penyelenggaraan pameran dan edukasi kearsipan',
      'Pengumpulan feedback pengguna untuk evaluasi layanan'
    ],
    skills: [
      'Kemampuan komunikasi dan pelayanan prima',
      'Pengetahuan tentang koleksi arsip secara komprehensif',
      'Keterampilan penelusuran cepat arsip',
      'Literasi digital untuk akses arsip elektronik',
      'Kemampuan presentasi dan edukasi publik'
    ],
    image: '/images/program-aktivitas.jpg',
    icon: '/images/icons/activity.svg',
    color: 'from-purple-500/20 to-purple-600/20',
    borderColor: 'border-purple-500',
  },
  {
    id: 'tata-usaha',
    title: 'Unit Tata Usaha',
    description: 'Unit yang mengelola administrasi, dokumentasi dan pengelolaan surat-menyurat serta mendukung operasional harian BAST ANRI untuk memastikan kelancaran fungsi organisasi.',
    activities: [
      'Pengelolaan surat masuk dan keluar',
      'Administrasi keuangan dan anggaran',
      'Pengelolaan inventaris barang milik negara',
      'Administrasi kepegawaian dan pengelolaan SDM',
      'Penyusunan laporan kegiatan dan kinerja unit',
      'Koordinasi kegiatan antar unit dalam BAST ANRI'
    ],
    skills: [
      'Keterampilan administrasi dan tata naskah dinas',
      'Manajemen waktu dan prioritas pekerjaan',
      'Pemahaman sistem penganggaran dan keuangan',
      'Kemampuan penggunaan aplikasi perkantoran',
      'Koordinasi dan komunikasi antar unit'
    ],
    image: '/images/program-aktivitas.jpg',
    icon: '/images/icons/activity.svg',
    color: 'from-red-500/20 to-red-600/20',
    borderColor: 'border-red-500',
  }
];

// Data link program aktivitas
  
const programLinks = [
  {
    title: 'Kunjungan ke dalam BAST ANRI',
    url: '/sections-program/kunjungan-ke-dalam-bast-anri',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
  },
  {
    title: 'Kunjungan ke luar BAST ANRI',
    url: '/sections-program/kunjungan-ke-luar-bast-anri',
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
  },
  {
    title: 'Daily Activity',
    url: '/sections-program/daily-activity',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
  },
  {
    title: 'Pameran',
    url: '/sections-program/pameran-arsip',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
  }

];

const AktivitasUnitPage = () => {
  const [activeUnit, setActiveUnit] = useState(units[0]);
  const scrollContainerRef = useRef(null);

  // Auto scroll effect
  useEffect(() => {
  const scrollContainer = scrollContainerRef.current;
  if (!scrollContainer) return;

  const scrollSpeed = 0.5; // pixels per millisecond
  let animationFrameId: number;
  let lastTimestamp: number | null = null;
  let isPaused = false;

  const autoScroll = (timestamp: number) => {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    if (!isPaused && scrollContainer) {
      scrollContainer.scrollLeft += scrollSpeed * deltaTime;

      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 10) {
        scrollContainer.scrollLeft = 0;
      }
    }

    animationFrameId = requestAnimationFrame(autoScroll);
  };

  animationFrameId = requestAnimationFrame(autoScroll);

  const handleMouseEnter = () => {
    isPaused = true;
  };

  const handleMouseLeave = () => {
    isPaused = false;
    lastTimestamp = null;
  };

  scrollContainer.addEventListener('mouseenter', handleMouseEnter);
  scrollContainer.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    cancelAnimationFrame(animationFrameId);
    scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
    scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
  };
}, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      {/* Hero Banner - Desain Direvisi */}
      <section className="relative bg-gradient-to-r from-primary/90 to-primary-light/90 text-white">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image 
            src="/images/program-aktivitas.jpg" 
            alt="Aktivitas Unit Background" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="max-w-5xl mx-auto">
            <Link href="/#program" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke Program
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Unit Kerja BAST ANRI
            </h1>
            
            <p className="text-lg text-blue-100 max-w-3xl mb-6">
              Balai Arsip Statis dan Tsunami ANRI memiliki berbagai unit kerja dengan fungsi spesifik dalam pengelolaan arsip. Setiap unit memiliki fokus dan keahlian tersendiri dalam melestarikan dan mengelola arsip nasional.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {units.map((unit) => (
                <button
                  key={unit.id}
                  onClick={() => setActiveUnit(unit)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    activeUnit.id === unit.id
                    ? 'bg-white text-primary shadow-md'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                >
                  {unit.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Unit Detail - Desain Direvisi */}
      <section className="py-12 bg-white dark:bg-dark-default">
        <div className="container mx-auto px-4">
          <motion.div
            key={activeUnit.id}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left Column - Unit Description */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className={`w-full mb-6 rounded-xl overflow-hidden relative h-60`}>
                <Image 
                  src={activeUnit.image} 
                  alt={activeUnit.title} 
                  fill 
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-tr ${activeUnit.color} opacity-70`}></div>
                <div className="absolute inset-0 flex items-center p-8">
                  <div className="flex items-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 bg-white/90 shadow-lg`}>
                      <Image src={activeUnit.icon} alt={activeUnit.title} width={32} height={32} />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">{activeUnit.title}</h2>
                      <div className={`h-1 w-20 bg-white mt-2`}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{activeUnit.description}</p>
              
              <h3 className="text-xl font-heading font-bold text-primary dark:text-white mb-4">Aktivitas Unit</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                {activeUnit.activities.map((activity, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className={`bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 ${activeUnit.borderColor}`}
                  >
                    <p className="text-gray-700 dark:text-gray-300">{activity}</p>
                  </motion.div>
                ))}
              </div>
              
              <h3 className="text-xl font-heading font-bold text-primary dark:text-white mb-4">Keterampilan yang Akan Dipelajari</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {activeUnit.skills.map((skill, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="flex items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                  >
                    <svg className={`w-5 h-5 mr-3 ${activeUnit.borderColor.replace('border-', 'text-')}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Right Column - Timeline */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 sticky top-24">
                <h3 className="text-xl font-heading font-bold text-primary dark:text-white mb-4">Tahapan Kerja</h3>
                
                <div className="relative pl-8 space-y-6 before:absolute before:top-2 before:bottom-0 before:left-[10px] before:w-[2px] before:bg-gray-200 dark:before:bg-gray-700">
                  {[
                    {
                      title: 'Persiapan',
                      description: 'Mempersiapkan berbagai kebutuhan dan perencanaan untuk aktivitas unit sesuai dengan SOP yang telah ditetapkan.',
                      icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6'
                    },
                    {
                      title: 'Implementasi',
                      description: 'Melaksanakan tugas dan aktivitas utama unit dengan mengikuti prosedur standar dan best practice kearsipan.',
                      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                    },
                    {
                      title: 'Evaluasi',
                      description: 'Melakukan penilaian terhadap hasil kerja untuk memastikan kualitas dan kesesuaian dengan standar yang ditetapkan.',
                      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    },
                    {
                      title: 'Pelaporan',
                      description: 'Menyusun dan menyampaikan laporan kegiatan sebagai bentuk akuntabilitas dan dokumentasi aktivitas.',
                      icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                    },
                    {
                      title: 'Pengembangan',
                      description: 'Mengidentifikasi area perbaikan dan melakukan inovasi untuk peningkatan kualitas layanan kearsipan.',
                      icon: 'M13 10V3L4 14h7v7l9-11h-7z'
                    }
                  ].map((step, index) => (
                    <div key={index} className="relative">
                      <div className={`absolute -left-8 w-6 h-6 rounded-full ${activeUnit.borderColor.replace('border-', 'bg-')} flex items-center justify-center shadow-md`}>
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                        </svg>
                      </div>
                      <h4 className="font-heading font-bold text-gray-800 dark:text-white mb-2">{step.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Program Links Scrollable Section */}
      <section className="py-12 bg-gray-50 dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary dark:text-white mb-4">
              Program MBKM BAST ANRI
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Berikut adalah program MBKM yang tersedia di Balai Arsip Statis dan Tsunami ANRI
            </p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Scrollable container for program links */}
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-4 py-4 px-2 hide-scrollbar"
              style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {programLinks.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.url}
                  className="flex-shrink-0 min-w-[260px] bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-primary dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 dark:text-white">{link.title}</h3>
                      <div className="flex items-center mt-1 text-primary dark:text-blue-400 text-sm">
                        <span>Lihat Program</span>
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Custom CSS to hide scrollbar */}
          <style jsx global>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>
      </section>
    </>
  );
};

export default AktivitasUnitPage;