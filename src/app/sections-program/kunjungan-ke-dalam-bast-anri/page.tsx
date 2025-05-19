// src/app/sections-program/kunjungan-ke-dalam-bast-anri/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';

const KunjunganKedalamDetail = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<number | null>(0);
  const handleImageClick = (src: string) => setPreviewImage(src);
  const closeModal = () => setPreviewImage(null);
  const toggleSection = (index: number) => setActiveSection(activeSection === index ? null : index);

  useEffect(() => {
    setIsLoaded(true);
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const program = {
    title: 'Kunjungan ke Dalam BAST ANRI',
    subtitle: 'Yuk, Intip Serunya Jelajah Arsip di Dalam BAST ANRI!',
    description:
      'Program ini terbuka untuk sekolah, universitas, atau organisasi yang ingin mengenal lebih dekat dunia kearsipan. Dalam kunjungan ini, peserta akan diajak keliling BAST ANRI, melihat langsung ruang-ruang arsip, mengenal proses pengelolaan arsip, dan ngobrol langsung dengan para arsiparis. Cocok buat yang penasaran dunia arsip dari balik layar!',
    icon: '/images/Kunjungan ke Dalam BAST ANRI.png',
    color: 'indigo-500',
    video: '/images/WhatsApp Video 2025-05-17 at 22.03.11_8ea9712d.mp4',
    programDetails:
      'Program kunjungan ini dirancang untuk memberikan pengalaman menyeluruh tentang dunia kearsipan. Pengunjung akan mendapatkan pemahaman yang lebih baik tentang bagaimana arsip dikelola, disimpan, dan dimanfaatkan untuk kepentingan penelitian dan sejarah.',
    activities:
      'Selama kunjungan, peserta akan diajak berkeliling ke berbagai fasilitas BAST ANRI, mengikuti simulasi pengarsipan sederhana, dan mendapatkan penjelasan langsung dari para arsiparis profesional yang bekerja di sini. Ini adalah kesempatan emas untuk melihat dari dekat bagaimana arsip nasional dikelola.',
    tourSections: [
      {
        name: 'Tur Ruang Arsip',
        description:
          'Peserta diajak keliling ruang penyimpanan arsip dan mengenal jenis-jenis arsip yang dikelola. Ruang penyimpanan dirancang khusus dengan teknologi pengaturan suhu dan kelembaban untuk memastikan arsip tetap awet.',
        icon: '/images/icons/archive-room.svg',
        highlights: [
          'Melihat ruang penyimpanan dengan teknologi preservasi modern',
          'Mengenal berbagai jenis arsip dari berbagai periode sejarah',
          'Mempelajari sistem penomoran dan penyimpanan arsip',
          'Memahami protokol keamanan arsip negara',
        ],
        image: '/images/tour-archive-room.jpg',
      },
      {
        name: 'Simulasi Pengarsipan',
        description:
          'Belajar praktik sederhana bagaimana arsip disusun dan dicatat dengan benar. Peserta akan mendapatkan pengalaman hands-on dalam proses pengarsipan yang sesungguhnya.',
        icon: '/images/icons/archiving-simulation.svg',
        highlights: [
          'Praktek pencatatan metadata arsip',
          'Belajar teknik pengelompokan dokumen',
          'Mencoba alat dan material pengarsipan',
          'Memahami prinsip dasar preservasi dokumen',
        ],
        image: '/images/tour-simulation.jpg',
      },
      {
        name: 'Pengenalan Unit & Fungsi',
        description:
          'Mengenal langsung peran tiap unit kerja dalam proses pengelolaan arsip. Peserta akan mendapatkan pemahaman komprehensif tentang alur kerja dan struktur organisasi di BAST ANRI.',
        icon: '/images/icons/unit-introduction.svg',
        highlights: [
          'Mempelajari struktur organisasi BAST ANRI',
          'Memahami alur kerja antar unit',
          'Mengenal fungsi spesifik tiap unit',
          'Mengidentifikasi keterkaitan antar unit dalam sistem kearsipan',
        ],
        image: '/images/tour-units.jpg',
      },
      {
        name: 'Interaksi dengan Arsiparis',
        description:
          'Bisa tanya-jawab langsung dengan staf profesional yang mengelola arsip sehari-hari. Ini adalah kesempatan untuk mendapatkan wawasan dari para ahli yang telah berpengalaman di bidang kearsipan.',
        icon: '/images/icons/archivist-interaction.svg',
        highlights: [
          'Diskusi dengan para ahli kearsipan',
          'Bertanya tentang karir di dunia arsip',
          'Mendengar pengalaman dan cerita menarik',
          'Mendapat tips pengelolaan arsip pribadi',
        ],
        image: '/images/tour-interaction.jpg',
      },
    ],
    benefits: [
      {
        title: 'Wawasan Komprehensif',
        description: 'Mendapatkan pemahaman menyeluruh tentang sistem kearsipan nasional',
      },
      {
        title: 'Pengalaman Langsung',
        description: 'Melihat dan berinteraksi dengan proses kerja nyata di institusi kearsipan',
      },
      {
        title: 'Inspirasi Karir',
        description: 'Mengenal ragam profesi dan jalur karir di bidang kearsipan',
      },
      {
        title: 'Apresiasi Sejarah',
        description: 'Menumbuhkan kesadaran tentang pentingnya preservasi arsip sebagai warisan sejarah',
      },
      {
        title: 'Pendidikan Interaktif',
        description: 'Belajar dengan cara yang menyenangkan dan berkesan melalui pengalaman langsung',
      },
    ],
    gallery: [
      {
        src: '/images/8a009479-7725-4447-96e4-72ddba3b799a.jpg',
        caption: 'Rombongan pengunjung sedang mengikuti tur',
      },
      {
        src: '/images/hero-illustration.png',
        caption: 'Simulasi pengarsipan dengan pengunjung',
      },
      {
        src: '/images/8a009479-7725-4447-96e4-72ddba3b799a.jpg',
        caption: 'Diskusi interaktif dengan arsiparis',
      },
      {
        src: '/images/hero-illustration.png',
        caption: 'Kunjungan ke ruang penyimpanan arsip',
      },
    ],
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-0 pb-12">
      {/* Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-400 text-white py-32 px-4">
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/20"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [Math.random() * 30, -Math.random() * 30],
                x: [Math.random() * 30, -Math.random() * 30],
                scale: [1, Math.random() * 0.3 + 0.8, 1],
              }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: Math.random() * 8 + 5,
              }}
            />
          ))}
        </div>

        {/* SVG Decoration */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="absolute w-full h-full"
            viewBox="0 0 800 600"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50,300 Q200,100 400,300 T750,300"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <path
              d="M50,350 Q200,550 400,350 T750,350"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <circle cx="400" cy="300" r="8" fill="white" />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Icon Program */}
            <div className="bg-white/20 p-3 w-fit rounded-full mb-6 mx-auto">
              <Image src={program.icon} alt={program.title} width={180} height={180} />
            </div>

            {/* Judul dengan styling yang lebih menarik */}
            <div className="relative inline-block mb-6">
              <h1 className="text-5xl md:text-6xl font-bold relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                {program.title}
              </h1>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full opacity-70 blur-sm"></div>
            </div>

            {/* Subjudul dengan styling yang lebih menarik */}
            <div className="relative inline-block px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
              <p className="text-xl md:text-2xl italic bg-gradient-to-r from-indigo-200 to-white bg-clip-text text-transparent font-medium">
                {program.subtitle}
              </p>
              <div className="absolute -inset-px bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg opacity-20 blur-sm -z-10"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/4 -left-10 w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 opacity-20 blur-md"></div>
            <div className="absolute bottom-1/3 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 opacity-20 blur-md"></div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Content - Description */}
          <div className="lg:col-span-2">
            <motion.div
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8"
            >
              <h2 className="text-2xl font-heading font-bold text-primary dark:text-indigo-400 mb-4">
                Deskripsi Program
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {program.description}
              </p>

              <div className="h-1 w-20 bg-indigo-500 rounded-full mb-6"></div>

              <h3 className="text-xl font-heading font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Manfaat Program
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {program.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mt-0.5">
                      <svg
                        className="w-4 h-4 text-indigo-600 dark:text-indigo-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
              variants={fadeInUp}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-indigo-500 mb-8`}
            >
              <div className="flex flex-col md:flex-row md:items-center mb-6">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center shadow-lg p-4">
                    <svg
                      className="w-8 h-8 text-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-primary dark:text-white">
                    Kunjungan ke Dalam BAST ANRI
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    {program.programDetails}
                  </p>
                </div>
              </div>

              <div className="w-full rounded-lg overflow-hidden mb-6">
                <div className="relative w-full pb-[56.25%] bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <video
                    src={program.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>

              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                Apa yang Akan Anda Alami:
              </h4>

              <p className="text-gray-700 dark:text-gray-300 mb-6">{program.activities}</p>

              <div className="mt-8">
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                  Bagian-Bagian Kunjungan:
                </h4>

                <div className="space-y-2 mt-4">
                  {program.tourSections.map((section, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSection(idx)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-3">
                            {idx + 1}
                          </div>
                          <span className="font-medium text-gray-800 dark:text-gray-200">
                            {section.name}
                          </span>
                        </div>
                        <svg
                          className={`w-5 h-5 text-gray-500 transition-transform ${
                            activeSection === idx ? 'transform rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {activeSection === idx && (
                        <div className="p-4 bg-white dark:bg-gray-800">
                          <div className="flex flex-col md:flex-row">
                            <div className="relative w-full md:w-1/3 h-48 md:h-auto flex-shrink-0 overflow-hidden rounded-lg mb-4 md:mb-0 md:mr-4">
                              <Image
                                src={section.image}
                                alt={section.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            </div>
                            <div className="flex-grow">
                              <p className="text-gray-700 dark:text-gray-300 mb-4">
                                {section.description}
                              </p>
                              <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                                Highlight {section.name}:
                              </h5>
                              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
                                {section.highlights.map((highlight, hlIdx) => (
                                  <li key={hlIdx}>{highlight}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 relative">
            <div className="sticky top-24">
              {/* Program Lainnya Section - Dengan Ikon Representatif */}
              <motion.div
                initial="hidden"
                animate={isLoaded ? 'visible' : 'hidden'}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6"
              >
                <h3 className="text-xl font-heading font-bold text-primary dark:text-white mb-4">
                  Program Lainnya
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Aktivitas Unit',
                      color: 'yellow-500',
                      slug: 'aktivitas-unit',
                    },
                    {
                      title: 'Kunjungan ke Luar BAST ANRI',
                      color: 'red-500',
                      slug: 'kunjungan-ke-luar-bast-anri',
                    },
                    {
                      title: 'Daily Activity',
                      color: 'pink-500',
                      slug: 'daily-activity',
                    },
                    {
                      title: 'Pameran Arsip',
                      color: 'orange-500',
                      slug: 'pameran-arsip',
                    },
                  ].map((otherProgram, index) => (
                    <Link
                      key={index}
                      href={`/sections-program/${otherProgram.slug}`}
                      className={`flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-${otherProgram.color} hover:bg-${otherProgram.color}/5 transition-all duration-300 group`}
                    >
                      {/* Ikon sesuai dengan tema program */}
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full bg-${otherProgram.color}/20 flex items-center justify-center mr-3`}
                      >
                        {index === 0 && (
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                        {index === 1 && (
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 8L22 12L18 16"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 12H22"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 7H5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 17H5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 7V17"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        {index === 2 && (
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 8V12L14 14"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        {index === 3 && (
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="4"
                              y="4"
                              width="16"
                              height="16"
                              rx="2"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 4V2"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16 4V2"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 10H16"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 15H13"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-gray-800 dark:text-gray-200 font-medium group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                          {otherProgram.title}
                        </h4>
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-400 group-hover:text-${otherProgram.color} transform group-hover:translate-x-1 transition-all`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                animate={isLoaded ? 'visible' : 'hidden'}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6"
              >
                <h3 className="text-xl font-heading font-bold text-primary dark:text-white mb-4">
                  Jadwalkan Kunjungan
                </h3>
                <div className="mb-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Tertarik untuk mengunjungi BAST ANRI? Jadwalkan kunjungan dengan tim kami sekarang.
                  </p>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center text-indigo-600 dark:text-indigo-400 mb-3">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-gray-800 dark:text-gray-200">kunjungan@anri.go.id</span>
                    </div>
                    <div className="flex items-center text-indigo-600 dark:text-indigo-400 mb-4">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="text-gray-800 dark:text-gray-200">(021) 7805851</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/kontak"
                  className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  <span>Jadwalkan Sekarang</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </motion.div>

              {/* Galeri Foto */}
              <motion.div
                initial="hidden"
                animate={isLoaded ? 'visible' : 'hidden'}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
              >
                <h3 className="text-xl font-heading font-bold text-primary dark:text-white mb-4">
                  Galeri Foto
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {program.gallery.slice(0, 4).map((item, index) => (
                    <div
                      key={index}
                      className="relative rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => handleImageClick(item.src)}
                    >
                      <div className="relative h-32 w-full">
                        <Image
                          src={item.src}
                          alt={item.caption}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 inline-flex items-center text-sm font-medium"
                    onClick={() => {
                      // Implement gallery modal here
                    }}
                  >
                    <span>Lihat Semua Foto</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Apa Kata Pengunjung
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Pengalaman dari mereka yang telah mengunjungi BAST ANRI dan melihat langsung pengelolaan
              arsip nasional.
            </p>
          </motion.div>

          <div className="mx-auto max-w-6xl">
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              navigation
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="testimonial-swiper"
            >
              {[
                {
                  name: 'Budi Santoso',
                  role: 'Guru Sejarah',
                  avatar: '/images/avatar-1.jpg',
                  text: 'Kunjungan ini sangat bermanfaat untuk memperluas wawasan saya sebagai guru sejarah. Penjelasan yang diberikan oleh tim ANRI sangat komprehensif dan membantu saya memahami pentingnya arsip bagi bangsa.',
                  rating: 5,
                },
                {
                  name: 'Dewi Lestari',
                  role: 'Mahasiswa S2 Sejarah',
                  avatar: '/images/avatar-2.jpg',
                  text: 'Sebagai mahasiswa sejarah, kunjungan ini memberikan pengalaman langsung berinteraksi dengan arsip-arsip asli. Saya terkesan dengan sistem pengarsipan modern yang dipadukan dengan penghargaan pada nilai historis dokumen.',
                  rating: 5,
                },
                {
                  name: 'PT Maju Bersama',
                  role: 'Perusahaan Swasta',
                  avatar: '/images/avatar-3.jpg',
                  text: 'Tim kami belajar banyak tentang sistem pengarsipan yang baik dari kunjungan ini. Kami langsung mengimplementasikan beberapa teknik yang kami pelajari di perusahaan untuk meningkatkan efisiensi.',
                  rating: 4,
                },
                {
                  name: 'SMA Negeri 5 Jakarta',
                  role: 'Kunjungan Edukasi',
                  avatar: '/images/avatar-4.jpg',
                  text: 'Siswa-siswi kami sangat antusias selama kunjungan. Mereka mendapatkan pemahaman baru tentang nilai penting arsip dan sejarah. Panduan tur sangat interaktif dan dikemas dengan cara yang menarik.',
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    variants={fadeInUp}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md h-full flex flex-col"
                  >
                    <div className="flex-grow">
                      <div className="flex mb-3">
                        {Array(testimonial.rating)
                          .fill(0)
                          .map((_, i) => (
                            <svg
                              key={i}
                              className="w-5 h-5 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                      </div>
                      <blockquote className="text-gray-700 dark:text-gray-300 italic mb-4">
                        "{testimonial.text}"
                      </blockquote>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mr-4">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{testimonial.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Jawaban untuk pertanyaan umum seputar program kunjungan ke dalam BAST ANRI.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
              className="space-y-4"
            >
              {[
                {
                  q: 'Apakah kunjungan ini berbayar?',
                  a: 'Tidak, program kunjungan ke dalam BAST ANRI tidak dipungut biaya. Ini adalah bagian dari upaya edukasi dan transparansi lembaga kepada masyarakat.',
                },
                {
                  q: 'Berapa lama durasi kunjungan?',
                  a: 'Durasi kunjungan umumnya berkisar antara 1.5 - 2 jam, tergantung pada jumlah peserta dan kebutuhan spesifik dari kelompok pengunjung.',
                },
                {
                  q: 'Berapa kapasitas maksimal pengunjung?',
                  a: 'Kami dapat mengakomodasi hingga 30 orang per kelompok kunjungan. Untuk grup yang lebih besar, kami sarankan untuk membagi menjadi beberapa kelompok dengan jadwal yang berbeda.',
                },
                {
                  q: 'Apakah boleh mengambil foto selama kunjungan?',
                  a: 'Ya, pengunjung diperbolehkan mengambil foto di area-area tertentu yang telah ditentukan. Namun, ada beberapa area dengan dokumen sensitif yang tidak diizinkan untuk difoto demi alasan keamanan dan preservasi.',
                },
                {
                  q: 'Bagaimana cara mendaftar untuk kunjungan?',
                  a: 'Pendaftaran dapat dilakukan melalui formulir online di website kami atau dengan mengirimkan surat resmi ke email kunjungan@anri.go.id minimal 7 hari kerja sebelum tanggal kunjungan yang diinginkan.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden"
                >
                  <details className="group">
                    <summary className="flex items-center justify-between p-4 cursor-pointer">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.q}</h3>
                      <svg
                        className="w-5 h-5 text-indigo-500 group-open:rotate-180 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <div className="p-4 pt-0 text-gray-700 dark:text-gray-300">{item.a}</div>
                  </details>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Siap Menjelajahi Dunia Kearsipan?
            </h2>
            <p className="text-lg text-indigo-100 max-w-2xl mx-auto mb-8">
              Jadwalkan kunjungan anda sekarang dan temukan pengalaman belajar yang menarik tentang
              sejarah dan pentingnya arsip bagi bangsa.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/kontak"
                className="bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-4 rounded-lg font-medium shadow-lg transform transition hover:-translate-y-1"
              >
                Jadwalkan Kunjungan
              </Link>
              <Link
                href="/sections-program"
                className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-4 rounded-lg font-medium transition-colors"
              >
                Lihat Program Lainnya
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <Image
              src={previewImage}
              alt="Preview"
              width={1200}
              height={800}
              className="w-full h-auto object-contain rounded-lg"
            />
            <button
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              onClick={closeModal}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KunjunganKedalamDetail;