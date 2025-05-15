'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Unit data
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
  }
];

const AktivitasUnitPage = () => {
  const [activeUnit, setActiveUnit] = useState(units[0]);

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
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary/95 to-primary-light/95 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/images/program-aktivitas.jpg" 
            alt="Aktivitas Unit Background" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Link href="/#program" className="inline-flex items-center text-blue-200 hover:text-white mb-4 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Program
              </Link>
              
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Aktivitas Unit BAST ANRI
              </h1>
              
              <p className="text-lg text-blue-100 max-w-xl">
                Program MBKM di Balai Arsip Statis dan Tsunami ANRI menawarkan pengalaman belajar yang komprehensif melalui berbagai unit kerja dengan fungsi spesifik dalam pengelolaan arsip.
              </p>
            </div>
            
            <div className="md:w-1/3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Image src="/images/icons/activity.svg" alt="Aktivitas Unit" width={30} height={30} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold">Program MBKM</h3>
                    <p className="text-sm text-blue-100">Aktivitas Unit BAST ANRI</p>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>4 Unit Kerja Spesifik</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Pengalaman Praktis Kearsipan</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Pendampingan Ahli Arsiparis</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Sertifikasi Kompetensi</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unit Tabs */}
      <section className="py-8 bg-gray-50 dark:bg-dark-surface border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-nowrap overflow-x-auto space-x-2 py-2 -mx-4 px-4 md:justify-center md:flex-wrap md:space-x-4">
            {units.map((unit) => (
              <button
                key={unit.id}
                onClick={() => setActiveUnit(unit)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all ${
                  activeUnit.id === unit.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {unit.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Unit Detail */}
      <section className="py-16 bg-white dark:bg-dark-default">
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
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mr-4 bg-gradient-to-br ${activeUnit.color}`}>
                  <Image src={activeUnit.icon} alt={activeUnit.title} width={32} height={32} />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary dark:text-white">{activeUnit.title}</h2>
              </div>
              
              <div className={`h-1 w-20 ${activeUnit.borderColor.replace('border-', 'bg-')} mb-6`}></div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{activeUnit.description}</p>
              
              <h3 className="text-xl font-heading font-bold text-primary dark:text-white mb-4">Aktivitas Pembelajaran</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {activeUnit.activities.map((activity, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="flex items-start"
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full ${activeUnit.borderColor.replace('border-', 'bg-')} flex items-center justify-center text-white mr-3`}>
                      {index + 1}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{activity}</p>
                  </motion.div>
                ))}
              </div>
              
              <h3 className="text-xl font-heading font-bold text-primary dark:text-white mb-4">Keterampilan yang Dipelajari</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeUnit.skills.map((skill, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="flex items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                  >
                    <svg className={`w-5 h-5 mr-2 ${activeUnit.borderColor.replace('border-', 'text-')}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Right Column - Images & CTA */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="relative h-60 md:h-80 rounded-xl overflow-hidden mb-6">
                  <Image 
                    src={activeUnit.image} 
                    alt={activeUnit.title} 
                    fill 
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${activeUnit.color} opacity-60`}></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-bold">{activeUnit.title}</h3>
                    <p className="text-white/80 text-sm">Balai Arsip Statis dan Tsunami ANRI</p>
                  </div>
                </div>
                
                {/* Info Box */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
                  <h4 className="font-heading font-bold text-primary dark:text-white mb-4">Informasi Program</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Durasi: 1 Semester (6 Bulan)</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Kapasitas: 8-10 Mahasiswa per Unit</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">SKS Konversi: 20 SKS</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Pembimbing: Arsiparis Senior</span>
                    </li>
                  </ul>
                </div>
                
                {/* CTA */}
                <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-6">
                  <h4 className="font-heading font-bold text-primary dark:text-blue-400 mb-4">Tertarik bergabung?</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Daftar sekarang untuk program MBKM di BAST ANRI dan dapatkan pengalaman praktis berharga di bidang kearsipan!
                  </p>
                  <button className="w-full bg-primary hover:bg-primary-light text-white py-3 px-6 rounded-lg transition-colors duration-300 font-medium flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                    Daftar Program
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary dark:text-white mb-4">
              Alur Pembelajaran di {activeUnit.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Berikut adalah tahapan pembelajaran yang akan kamu dapatkan selama mengikuti program MBKM di unit ini.
            </p>
          </div>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700 transform md:translate-x-px"></div>
              
              {/* Timeline Items */}
              {[
                {
                  title: 'Pengenalan dan Orientasi',
                  duration: 'Minggu 1-2',
                  description: 'Pengenalan tentang BAST ANRI, struktur organisasi, tugas pokok dan fungsi unit kerja, serta orientasi sistem kearsipan yang digunakan.',
                  icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6'
                },
                {
                  title: 'Observasi dan Pendampingan',
                  duration: 'Minggu 3-6',
                  description: 'Mengamati dan mendampingi arsiparis dalam melaksanakan tugas rutinnya, serta mempelajari prosedur operasional standar yang diterapkan.',
                  icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                },
                {
                  title: 'Praktik Terbimbing',
                  duration: 'Minggu 7-16',
                  description: 'Melaksanakan tugas kearsipan dengan bimbingan arsiparis, mulai dari tugas sederhana hingga kompleks secara bertahap.',
                  icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                },
                {
                  title: 'Proyek Mandiri',
                  duration: 'Minggu 17-22',
                  description: 'Mengerjakan proyek kearsipan secara mandiri dengan supervisi minimal, menerapkan semua pengetahuan yang telah dipelajari sebelumnya.',
                  icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
                },
                {
                  title: 'Evaluasi dan Presentasi',
                  duration: 'Minggu 23-24',
                  description: 'Evaluasi hasil belajar, penyusunan laporan akhir, dan presentasi hasil proyek mandiri kepada pihak BAST ANRI dan Universitas.',
                  icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="relative mb-12"
                >
                  <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                    {/* Timeline icon */}
                    <div className="absolute left-0 md:left-1/2 -ml-3 md:-ml-4 z-10 transform md:-translate-x-px">
                      <div className={`w-8 h-8 rounded-full border-4 border-white dark:border-gray-800 ${activeUnit.borderColor.replace('border-', 'bg-')} flex items-center justify-center shadow-lg`}>
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ml-8 md:ml-0 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${activeUnit.borderColor} ${activeUnit.color} mb-2`}>
                          {item.duration}
                        </span>
                        <h3 className="text-lg font-heading font-bold text-primary dark:text-white mb-2">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white dark:bg-dark-default">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary dark:text-white mb-4">
              Testimoni Mahasiswa
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Pengalaman mahasiswa yang telah menjalani program MBKM di BAST ANRI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
 {
    name: 'Putri Ramadani',
    university: 'Universitas Indonesia',
    quote: 'Program MBKM di Unit Pengolahan Arsip memberikan saya pengalaman berharga dalam mengelola dokumen sejarah. Banyak teori di kampus yang baru saya pahami saat praktik langsung di BAST ANRI.',
    image: '/images/testimonial-1.jpg',
    program: 'Semester Ganjil 2023'
  },
  {
    name: 'Arief Budiman',
    university: 'Universitas Gadjah Mada',
    quote: 'Bekerja dengan arsiparis senior di sini sangat membuka wawasan. Saya belajar banyak tentang metode preservasi arsip yang belum pernah saya tahu sebelumnya. Sangat direkomendasikan!',
    image: '/images/testimonial-2.jpg',
    program: 'Semester Genap 2022'
  },
  {
    name: 'Dinda Permata',
    university: 'Universitas Padjadjaran',
    quote: 'Yang paling berkesan adalah proyek mandiri di akhir program. Saya merasa sangat puas bisa menerapkan semua ilmu yang dipelajari untuk menghasilkan sistem klasifikasi arsip digital.',
    image: '/images/testimonial-3.jpg',
    program: 'Semester Ganjil 2023'
  }
].map((testimonial, index) => (
  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4">
          <Image 
            src={testimonial.image} 
            alt={testimonial.name} 
            width={48} 
            height={48} 
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-heading font-bold text-primary dark:text-white">{testimonial.name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.university}</p>
        </div>
      </div>
      
      <blockquote className="italic text-gray-700 dark:text-gray-300 mb-4">
        "{testimonial.quote}"
      </blockquote>
      
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span>{testimonial.program}</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  </div>
))}</div>
          
          <div className="mt-10 text-center">
            <button className="inline-flex items-center text-primary dark:text-blue-400 hover:text-primary-light dark:hover:text-blue-300 font-medium transition-colors">
              Lihat lebih banyak testimonial
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary dark:text-white mb-4">
              Pertanyaan Umum
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Temukan jawaban atas pertanyaan yang sering diajukan tentang program MBKM di BAST ANRI.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {[
              {
                question: 'Apakah program MBKM di BAST ANRI tersedia untuk semua jurusan?',
                answer: 'Program MBKM di BAST ANRI terbuka untuk mahasiswa dari berbagai jurusan, dengan prioritas pada jurusan Ilmu Perpustakaan, Kearsipan, Sejarah, Humaniora, Sistem Informasi, dan Teknologi Informasi. Namun, mahasiswa dari jurusan lain juga dapat mendaftar selama memiliki minat yang kuat di bidang pengelolaan arsip.'
              },
              {
                question: 'Bagaimana proses seleksi untuk program ini?',
                answer: 'Proses seleksi meliputi beberapa tahap: 1) Seleksi administrasi berdasarkan kelengkapan dokumen, 2) Tes tertulis online untuk mengukur pemahaman dasar tentang kearsipan, 3) Wawancara untuk menilai motivasi dan kesesuaian dengan program, dan 4) Pengumuman hasil seleksi. Seluruh proses dilakukan secara transparan dengan kriteria yang jelas.'
              },
              {
                question: 'Berapa SKS yang bisa dikonversi dari program ini?',
                answer: 'Program MBKM di BAST ANRI dapat dikonversi hingga 20 SKS sesuai dengan kurikulum universitas asal. Konversi SKS ini telah disesuaikan dengan capaian pembelajaran yang dihasilkan dari kegiatan di masing-masing unit kerja. Mahasiswa akan mendapatkan rekomendasi konversi mata kuliah dari BAST ANRI yang dapat disesuaikan oleh program studi masing-masing.'
              },
              {
                question: 'Apakah disediakan akomodasi selama program berlangsung?',
                answer: 'BAST ANRI tidak menyediakan akomodasi untuk peserta program. Namun, tersedia bantuan transportasi harian dan tunjangan makan selama pelaksanaan program. Tim BAST ANRI juga dapat memberikan informasi dan rekomendasi mengenai pilihan akomodasi yang terjangkau di sekitar lokasi kegiatan.'
              },
              {
                question: 'Apakah ada sertifikasi khusus yang bisa didapatkan?',
                answer: 'Ya, selain sertifikat partisipasi program MBKM, peserta berkesempatan mendapatkan sertifikasi kompetensi di bidang pengelolaan arsip yang dikeluarkan oleh Lembaga Sertifikasi Profesi (LSP) Arsiparis. Sertifikasi ini diakui secara nasional dan menjadi nilai tambah dalam portofolio profesional.'
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="mb-6"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                  <details className="group">
                    <summary className="flex justify-between items-center p-6 cursor-pointer">
                      <h3 className="font-heading font-medium text-lg text-gray-800 dark:text-white">{item.question}</h3>
                      <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                        <svg className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0 transition-opacity duration-200 text-primary dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <svg className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100 transition-opacity duration-200 text-primary dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
                    </div>
                  </details>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link href="/faq" className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-primary dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              Lihat semua FAQ
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Pendaftaran CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
              Siap untuk Bergabung dengan Program MBKM di BAST ANRI?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Jangan lewatkan kesempatan berharga untuk mengembangkan keahlian kearsipan dalam lingkungan profesional dengan bimbingan ahli arsiparis berpengalaman.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/daftar" className="px-8 py-3 bg-white text-primary hover:bg-blue-50 rounded-lg font-medium transition-colors shadow-lg">
                Daftar Sekarang
              </Link>
              <Link href="/kontak" className="px-8 py-3 border border-white/30 hover:bg-white/10 rounded-lg font-medium transition-colors">
                Hubungi Kami
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">20+</div>
                <div className="text-blue-100">Universitas Mitra</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">4</div>
                <div className="text-blue-100">Unit Kerja Spesialis</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">50+</div>
                <div className="text-blue-100">Alumni Program</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">20</div>
                <div className="text-blue-100">SKS Konversi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Programs Section */}
      <section className="py-16 bg-white dark:bg-dark-default">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary dark:text-white mb-4">
              Program MBKM Lainnya
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Jelajahi program MBKM lainnya yang tersedia di Balai Arsip Statis dan Tsunami ANRI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Program Magang',
                description: 'Program magang intensif dengan fokus pada pengembangan keterampilan praktis dalam pengelolaan arsip dan dokumen.',
                icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                link: '/program/magang'
              },
              {
                title: 'Penelitian Kearsipan',
                description: 'Program penelitian kolaboratif yang menggabungkan riset akademis dengan penerapan praktis dalam bidang kearsipan.',
                icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
                link: '/program/penelitian'
              },
              {
                title: 'Pengabdian Masyarakat',
                description: 'Program yang berfokus pada penerapan ilmu kearsipan untuk penyelesaian masalah di masyarakat dan institusi publik.',
                icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
                link: '/program/pengabdian'
              }
            ].map((program, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={program.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary dark:text-white mb-2">{program.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{program.description}</p>
                  <Link href={program.link} className="inline-flex items-center text-primary dark:text-blue-400 hover:text-primary-light dark:hover:text-blue-300 font-medium transition-colors">
                    Pelajari lebih lanjut
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer component would be here */}
    </>
  );
};

export default AktivitasUnitPage;