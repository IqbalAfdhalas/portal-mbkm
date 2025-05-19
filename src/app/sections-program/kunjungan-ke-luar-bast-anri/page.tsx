// src/app/sections-program/kunjungan-ke-luar-bast-anri/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';

const KunjunganLuarDetail = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(0);
  const handleImageClick = (src: string) => setPreviewImage(src);
  const closeModal = () => setPreviewImage(null);
  const toggleFAQ = (index: number) => setActiveFAQ(activeFAQ === index ? null : index);

  useEffect(() => {
    setIsLoaded(true);
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const program = {
    title: 'Kunjungan ke Luar BAST ANRI',
    subtitle: 'BAST ANRI Keliling? Bisa!',
    description:
      'Kalau biasanya orang datang ke BAST ANRI, kali ini kita yang datang ke tempatmu! Lewat program ini, tim BAST ANRI melakukan kunjungan ke sekolah, kampus, atau instansi lain untuk berbagi pengetahuan seputar dunia arsip. Edukatif, interaktif, dan pastinya seru!',
    icon: '/images/Kunjungan Luar.png',
    color: 'red-500',
    video: '/images/WhatsApp Video 2025-05-17 at 22.03.11_8ea9712d.mp4',
    programDescription:
      'Tim BAST ANRI siap berkunjung ke lokasi Anda untuk memperkenalkan dunia kearsipan dengan cara yang edukatif dan interaktif. Program ini dirancang khusus untuk sekolah, kampus, dan berbagai instansi yang ingin mengenal lebih dekat tentang pengelolaan arsip secara profesional.',
    programActivities:
      'Dalam kunjungan ini, tim kami akan memberikan sosialisasi komprehensif tentang pentingnya arsip dalam kehidupan sehari-hari, pelatihan praktis pengelolaan arsip, dan membuka peluang kolaborasi untuk penyelamatan arsip penting. Melalui pendekatan yang ramah dan interaktif, kami berharap dapat membangun kesadaran tentang pentingnya arsip di berbagai lapisan masyarakat.',
    activities: [
      {
        name: 'Sosialisasi Kearsipan',
        description:
          'Mengenalkan pentingnya arsip sejak dini dan bagaimana perannya dalam kehidupan sehari-hari, serta bagaimana dokumen-dokumen tertentu memiliki nilai sejarah yang perlu dilestarikan.',
        icon: '/images/icons/socialization.svg',
        details: [
          'Pengenalan dasar dunia kearsipan',
          'Pentingnya arsip dalam kehidupan sehari-hari',
          'Jenis-jenis arsip dan nilainya',
          'Arsip sebagai warisan sejarah bangsa',
        ],
        image: '/images/kunjungan-sosialisasi.jpg',
      },
      {
        name: 'Penyuluhan & Pelatihan',
        description:
          'Sesi belajar bersama tentang cara mengelola arsip yang baik dan benar, mencakup praktik-praktik dasar pengarsipan yang dapat diterapkan oleh berbagai kalangan.',
        icon: '/images/icons/training.svg',
        details: [
          'Workshop pengelolaan arsip dasar',
          'Teknik penyimpanan dokumen yang tepat',
          'Digitalisasi arsip sederhana',
          'Pemeliharaan arsip jangka panjang',
        ],
        image: '/images/kunjungan-pelatihan.jpg',
      },
      {
        name: 'Kerja Sama Penyelamatan Arsip',
        description:
          'Mengajak pihak luar untuk sama-sama menjaga dokumen penting dengan pendekatan kolaboratif, termasuk penyelamatan arsip yang bernilai sejarah tinggi.',
        icon: '/images/icons/collaboration.svg',
        details: [
          'Identifikasi arsip bernilai tinggi',
          'Protokol penyelamatan arsip darurat',
          'Kemitraan dalam preservasi arsip',
          'Program adopsi arsip untuk institusi',
        ],
        image: '/images/kunjungan-kerjasama.jpg',
      },
      {
        name: 'Promosi Program Arsip',
        description:
          'Memperkenalkan program-program BAST ANRI lainnya supaya makin dikenal luas, serta menjaring minat kolaborasi dari berbagai institusi.',
        icon: '/images/icons/promotion.svg',
        details: [
          'Pengenalan berbagai program BAST ANRI',
          'Peluang magang dan kunjungan ke BAST ANRI',
          'Program edukasi kearsipan berkelanjutan',
          'Ajakan partisipasi masyarakat dalam kearsipan',
        ],
        image: '/images/kunjungan-promosi.jpg',
      },
    ],
    benefits: [
      {
        title: 'Penyebarluasan Ilmu Kearsipan',
        description: 'Masyarakat dapat belajar ilmu kearsipan tanpa harus datang ke BAST ANRI',
      },
      {
        title: 'Edukasi Langsung',
        description: 'Pembelajaran langsung dari para ahli dalam lingkungan yang familiar',
      },
      {
        title: 'Membangun Kesadaran',
        description: 'Menanamkan kesadaran pentingnya arsip di berbagai lapisan masyarakat',
      },
      {
        title: 'Jangkauan Lebih Luas',
        description: 'Menjangkau institusi dan komunitas yang mungkin belum bisa mengunjungi BAST ANRI',
      },
      {
        title: 'Peluang Kolaborasi',
        description: 'Membuka pintu kerja sama untuk proyek-proyek kearsipan di masa depan',
      },
    ],
    gallery: [
      {
        src: '/images/kunjungan-luar-1.jpg',
        caption: 'Tim BAST ANRI presentasi di sebuah kampus',
      },
      {
        src: '/images/kunjungan-luar-2.jpg',
        caption: 'Workshop kearsipan di sekolah menengah',
      },
      {
        src: '/images/kunjungan-luar-3.jpg',
        caption: 'Sesi interaktif dengan siswa-siswi',
      },
      {
        src: '/images/kunjungan-luar-4.jpg',
        caption: 'Penandatanganan kerja sama dengan institusi',
      },
    ],
    faqs: [
      {
        question: 'Bagaimana cara mengajukan permohonan kunjungan BAST ANRI ke institusi kami?',
        answer: 'Permohonan kunjungan dapat diajukan melalui surat resmi ke Kepala BAST ANRI atau melalui formulir online di website kami. Mohon cantumkan informasi mengenai institusi, tujuan kunjungan, dan perkiraan jumlah peserta yang akan terlibat.'
      },
      {
        question: 'Berapa lama durasi kunjungan tim BAST ANRI?',
        answer: 'Durasi kunjungan bervariasi tergantung kebutuhan dan program yang dipilih, mulai dari setengah hari (3-4 jam) hingga program intensif sehari penuh. Kami dapat menyesuaikan durasi sesuai kebutuhan institusi Anda.'
      },
      {
        question: 'Apakah ada biaya untuk program kunjungan ini?',
        answer: 'Program kunjungan ke luar BAST ANRI untuk institusi pendidikan negeri disediakan secara gratis sebagai bagian dari misi edukasi kami. Untuk kunjungan ke institusi swasta atau komersial, mungkin dikenakan biaya transportasi dan akomodasi tim.'
      },
      {
        question: 'Berapa jumlah minimal peserta untuk program ini?',
        answer: 'Untuk efektivitas program, kami menyarankan minimal 20 peserta. Namun, kami tetap terbuka untuk diskusi jika institusi Anda memiliki jumlah peserta yang berbeda.'
      },
      {
        question: 'Apakah BAST ANRI menyediakan materi untuk peserta?',
        answer: 'Ya, tim kami akan menyiapkan materi presentasi, modul pelatihan, dan beberapa alat peraga untuk kegiatan interaktif. Jika ada kebutuhan spesifik, mohon dapat diinformasikan saat pengajuan permohonan.'
      }
    ]
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
      {/* Banner Section - with red theme */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white py-32 px-4">
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
              <h1 className="text-5xl md:text-6xl font-bold relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-red-200">
                {program.title}
              </h1>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-red-400 to-red-500 rounded-full opacity-70 blur-sm"></div>
            </div>

            {/* Subjudul dengan styling yang lebih menarik */}
            <div className="relative inline-block px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
              <p className="text-xl md:text-2xl italic bg-gradient-to-r from-red-200 to-white bg-clip-text text-transparent font-medium">
                {program.subtitle}
              </p>
              <div className="absolute -inset-px bg-gradient-to-r from-red-500 to-red-500 rounded-lg opacity-20 blur-sm -z-10"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/4 -left-10 w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-red-500 opacity-20 blur-md"></div>
            <div className="absolute bottom-1/3 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-red-500 opacity-20 blur-md"></div>
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
              <h2 className="text-2xl font-heading font-bold text-primary dark:text-red-400 mb-4">
                Deskripsi Program
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {program.description}
              </p>

              <div className="h-1 w-20 bg-red-500 rounded-full mb-6"></div>

              <h3 className="text-xl font-heading font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Manfaat Program
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {program.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                      <svg
                        className="w-4 h-4 text-red-600 dark:text-red-400"
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
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-red-500 mb-8`}
            >
              <div className="flex flex-col md:flex-row md:items-center mb-6">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center shadow-lg p-4">
                    <svg
                      className="w-8 h-8 text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-primary dark:text-white">
                    Program Kunjungan ke Luar BAST ANRI
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    {program.programDescription}
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
                Aktivitas dalam Program:
              </h4>

              <p className="text-gray-700 dark:text-gray-300 mb-6">{program.programActivities}</p>

              <div className="mt-8">
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                  Kegiatan dalam Program Kunjungan:
                </h4>

                <div className="space-y-4 mt-4">
                  {program.activities.map((activity, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(idx)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold mr-3">
                            {idx + 1}
                          </div>
                          <span className="font-medium text-gray-800 dark:text-gray-200">
                            {activity.name}
                          </span>
                        </div>
                        <svg
                          className={`w-5 h-5 text-gray-500 transition-transform ${
                            activeFAQ === idx ? 'transform rotate-180' : ''
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

                      {activeFAQ === idx && (
                        <div className="p-4 bg-white dark:bg-gray-800">
                          <div className="flex flex-col md:flex-row">
                            <div className="relative w-full md:w-1/3 h-48 md:h-auto flex-shrink-0 overflow-hidden rounded-lg mb-4 md:mb-0 md:mr-4">
                              <Image
                                src={activity.image}
                                alt={activity.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            </div>
                            <div className="flex-grow">
                              <p className="text-gray-700 dark:text-gray-300 mb-4">
                                {activity.description}
                              </p>
                              <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                                Detail Kegiatan:
                              </h5>
                              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
                                {activity.details.map((detail, detailIdx) => (
                                  <li key={detailIdx}>{detail}</li>
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

            {/* FAQ Section */}
            <motion.div
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8"
            >
              <h3 className="text-xl font-heading font-bold text-primary dark:text-red-400 mb-6">
                Pertanyaan yang Sering Diajukan
              </h3>
              
              <div className="space-y-3">
                {program.faqs.map((faq, idx) => (
                  <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(idx + program.activities.length)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {faq.question}
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-500 flex-shrink-0 ml-2 transition-transform ${
                          activeFAQ === idx + program.activities.length ? 'transform rotate-180' : ''
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
                    
                    {activeFAQ === idx + program.activities.length && (
                      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
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
                      title: 'Kunjungan ke Dalam BAST ANRI',
                      color: 'blue-500',
                      slug: 'kunjungan-ke-dalam-bast-anri',
                    },
                    {
                      title: 'Daily Activity',
                      color: 'purple-500',
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
                              d="M19 11H5C3.89543 11 3 11.8954 3 13V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V13C21 11.8954 20.1046 11 19 11Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7 11V7C7 5.93913 7.42143 4.92172 8.17157 4.17157C8.92172 3.42143 9.93913 3 11 3H13C14.0609 3 15.0783 3.42143 15.8284 4.17157C16.5786 4.92172 17 5.93913 17 7V11"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
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
                              d="M6 8L2 12L6 16"
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
                              d="M14 12V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H19C19.5304 5 20.0391 5.