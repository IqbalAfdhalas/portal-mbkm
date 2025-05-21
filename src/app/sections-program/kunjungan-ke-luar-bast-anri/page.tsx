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
  const [activeItem, setActiveItem] = useState<number | null>(0);
  const handleImageClick = (src: string) => setPreviewImage(src);
  const closeModal = () => setPreviewImage(null);
  const toggleItem = (index: number) => setActiveItem(activeItem === index ? null : index);

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
    icon: '/images/program/logo_program/Kunjungan_ke_Luar_BAST_ANRI.png',
    color: 'red-500',
    video: '/images/program/kunjungan_ke_luar_bast_anri/vidio1.mp4',
    activityDescription:
      'Kegiatan kunjungan keluar kantor BAST ANRI bersama para mahasiswa peserta program MBKM ke Palang Merah Indonesia (PMI) Aceh menjadi momen yang sangat berharga dan penuh makna. Dalam kunjungan ini, para peserta mendapat kesempatan istimewa untuk mendengarkan secara langsung pengalaman para relawan PMI Aceh dalam menjalankan tugas-tugas kemanusiaan, khususnya saat menghadapi situasi duka akibat bencana Tsunami. Tidak hanya itu, para peserta juga memperoleh wawasan tentang pentingnya pengelolaan arsip kebencanaan, yang menjadi bagian tak terpisahkan dari upaya dokumentasi dan pembelajaran di masa depan.',
    mainActivity:
      'Trip singkat ini sangat inspiratif, penuh makna dan memberi pengalaman baru. Kami dikenalin dengan para relawan PMI yang hebat, dan dengerin kisah mengharukan dibalik layer. Kami dikasih kesempatan merasakan momen trip singkat keluar kantor bersama kakak dan abang-abang yang sangat fun dan asik. Memorable untuk dikenang, informatif untuk diceritakan kembali. ',
    allActivities: [
      {
        name: 'Sosialisasi Kearsipan',
        description:
          'Kegiatan yang bertujuan mengenalkan pentingnya arsip sejak dini dan bagaimana perannya dalam kehidupan sehari-hari. Tim BAST ANRI memberikan presentasi yang interaktif dan edukatif tentang nilai arsip bagi masyarakat dan bangsa.',
        icon: '/images/icons/education.svg',
        activities: [
          'Presentasi tentang pentingnya arsip',
          'Diskusi interaktif dengan peserta',
          'Pemutaran video edukasi tentang arsip',
          'Pengenalan jenis-jenis arsip penting',
        ],
        image: '/images/outreach-education.jpg',
      },
      {
        name: 'Penyuluhan & Pelatihan',
        description:
          'Sesi pembelajaran bersama tentang cara mengelola arsip yang baik dan benar. Tim memberikan pelatihan praktis yang dapat langsung diterapkan oleh peserta dalam mengelola arsip pribadi maupun institusi.',
        icon: '/images/icons/training.svg',
        activities: [
          'Pelatihan dasar pengelolaan arsip',
          'Workshop penyusunan sistem arsip sederhana',
          'Praktik pengamanan dokumen penting',
          'Teknik digitalisasi arsip dasar',
        ],
        image: '/images/outreach-training.jpg',
      },
      {
        name: 'Kerja Sama Penyelamatan Arsip',
        description:
          'Mengajak pihak luar untuk sama-sama menjaga dokumen penting dengan pendekatan kolaboratif. Tim BAST ANRI menawarkan program kerja sama untuk menyelamatkan dan melestarikan arsip bernilai sejarah.',
        icon: '/images/icons/collaboration.svg',
        activities: [
          'Identifikasi arsip bernilai sejarah',
          'Perencanaan program penyelamatan bersama',
          'Pemberian bantuan teknis preservasi',
          'Perjanjian kerja sama pelestarian arsip',
        ],
        image: '/images/outreach-collaboration.jpg',
      },
      {
        name: 'Promosi Program Arsip',
        description:
          'Memperkenalkan program-program BAST ANRI lainnya agar semakin dikenal luas. Tim mempromosikan berbagai kegiatan dan layanan BAST ANRI yang dapat dimanfaatkan oleh masyarakat.',
        icon: '/images/icons/promotion.svg',
        activities: [
          'Presentasi program-program BAST ANRI',
          'Pembagian brosur dan materi promosi',
          'Pendaftaran program kunjungan ke dalam BAST ANRI',
          'Penawaran program kerja sama lanjutan',
        ],
        image: '/images/outreach-promotion.jpg',
      },
    ],
    benefits: [
      {
        title: 'Jangkauan Lebih Luas',
        description: 'Menjangkau masyarakat yang belum berkesempatan mengunjungi BAST ANRI',
      },
      {
        title: 'Edukasi Langsung',
        description: 'Pembelajaran langsung dari para profesional arsip dalam suasana familiar',
      },
      {
        title: 'Kesadaran Arsip',
        description: 'Meningkatkan kesadaran tentang pentingnya pengelolaan arsip yang baik',
      },
      {
        title: 'Jaringan Kolaborasi',
        description: 'Membangun jaringan kerja sama untuk pelestarian arsip bernilai sejarah',
      },
      {
        title: 'Pengetahuan Praktis',
        description: 'Mendapatkan keterampilan praktis dalam pengelolaan dokumen penting',
      },
    ],
    gallery: [
      {
        src: '/images/program/kunjungan_ke_luar_bast_anri/foto1.jpg',
        caption: '',
      },
      {
        src: '/images/program/kunjungan_ke_luar_bast_anri/foto2.jpg',
        caption: '',
      },
      {
        src: '/images/program/kunjungan_ke_luar_bast_anri/foto3.jpg',
        caption: '',
      },
      {
        src: '/images/program/kunjungan_ke_luar_bast_anri/foto4.jpg',
        caption: '',
      },
      {
        src: '/images/program/kunjungan_ke_luar_bast_anri/foto5.jpg',
        caption: '',
      },
      {
        src: '/images/program/kunjungan_ke_luar_bast_anri/foto6.jpg',
        caption: '',
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#86efac] via-[#4ade80] to-[#34d399] text-white py-32 px-4">
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
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-[#86efac] to-[#34d399] rounded-full opacity-70 blur-sm"></div>
            </div>

            {/* Subjudul dengan styling yang lebih menarik */}
            <div className="relative inline-block px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
              <p className="text-xl md:text-2xl italic bg-gradient-to-r from-[#bbf7d0] to-white bg-clip-text text-transparent font-medium">
                {program.subtitle}
              </p>
              <div className="absolute -inset-px bg-gradient-to-r from-[#86efac] to-[#34d399] rounded-lg opacity-20 blur-sm -z-10"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/4 -left-10 w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-red-600 opacity-20 blur-md"></div>
            <div className="absolute bottom-1/3 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-red-600 opacity-20 blur-md"></div>
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
                    className="flex items-start space-x-3 p-3 rounded-lg bg-red-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                      <svg
                        className="w-4 h-4 text-green-600 dark:text-green-400"
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
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-green-500 mb-8`}
            >
              <div className="flex flex-col md:flex-row md:items-center mb-6">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center shadow-lg p-4">
                    <svg
                      className="w-8 h-8 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
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
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-primary dark:text-white">
                    Kunjungan ke Luar BAST ANRI
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    {program.activityDescription}
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
                Aktivitas yang Dilakukan:
              </h4>

              <p className="text-gray-700 dark:text-gray-300 mb-6">{program.mainActivity}</p>

              <div className="mt-8">
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                  Kegiatan dalam Program:
                </h4>

                <div className="space-y-2 mt-4">
                  {program.allActivities.map((activity, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(idx)}
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
                            activeItem === idx ? 'transform rotate-180' : ''
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

                      {activeItem === idx && (
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
                                Kegiatan {activity.name}:
                              </h5>
                              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
                                {activity.activities.map((item, actIdx) => (
                                  <li key={actIdx}>{item}</li>
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
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
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
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
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
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
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
                            <path
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
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
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <motion.div
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="mt-12"
        >
          <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-6 text-center">
            Galeri Kegiatan
          </h2>
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: '.custom-swiper-button-next',
                prevEl: '.custom-swiper-button-prev',
              }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="relative"
            >
              {program.gallery.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={image.src}
                        alt={image.caption}
                        fill
                        className="object-cover w-full h-full cursor-pointer"
                        onClick={() => handleImageClick(image.src)}
                      />
                    </div>
                    <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-2">
                      {image.caption}
                    </p>
                  </div>
                </SwiperSlide>
              ))}

              {/* 🔻 Panah kiri */}
              <div className="custom-swiper-button-prev absolute top-1/2 left-2 z-10 transform -translate-y-1/2 cursor-pointer bg-black/30 hover:bg-black/50 text-white p-2 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>

              {/* 🔺 Panah kanan */}
                                   <div className="custom-swiper-button-next absolute top-1/2 right-2 z-10 transform -translate-y-1/2 cursor-pointer bg-black/30 hover:bg-black/50 text-white p-2 rounded-full">
                                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path
                                         strokeLinecap="round"
                                         strokeLinejoin="round"
                                         strokeWidth={2}
                                         d="M9 5l7 7-7 7"
                                       />
                                     </svg>
                                   </div>
                                 </Swiper>
                               </div>
                             </motion.div>
                           </div>
              {/* Image Preview Modal */}
                   {previewImage && (
                     <div
                       className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center p-4"
                       onClick={closeModal}
                     >
                       <div className="relative max-w-4xl max-h-[90vh] overflow-hidden">
                         <Image
                           src={previewImage}
                           alt="Preview"
                           width={1200}
                           height={800}
                           className="max-h-[90vh] w-auto object-contain"
                         />
                         <button
                           onClick={closeModal}
                           className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                         >
                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
             
             export default KunjunganLuarDetail;
                         