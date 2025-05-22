// src/app/sections-program/pameran-arsip/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { MotionDiv } from '@/components/common/MotionClientOnly';

const PameranArsipDetail = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [activeUnit, setActiveUnit] = useState<number | null>(0);
  const handleImageClick = (src: string) => setPreviewImage(src);
  const closeModal = () => setPreviewImage(null);
  const toggleUnit = (index: number) => setActiveUnit(activeUnit === index ? null : index);

  useEffect(() => {
    setIsLoaded(true);
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const program = {
    title: 'Pameran Arsip',
    subtitle: 'Arsip Bukan Cuma Tumpukan Kertas!',
    description:
      'Di sini, arsip tampil beda! Lewat program pameran arsip, BAST ANRI memperkenalkan koleksi arsip penting ke masyarakat dalam bentuk yang menarik, interaktif, dan penuh cerita. Cocok buat kamu yang suka belajar sejarah lewat cara yang lebih visual dan hidup.',
    icon: '/images/program/logo_program/pameran_arsip.png',
    color: 'orange-500',
    video: '/images/program/pameran_arsip/vidio1.mp4',
    unitDescription:
      'Pameran Balai Arsip Statis dan Tsunami yang diselenggarakan oleh Arsip Nasional Republik Indonesia (ANRI) merupakan sebuah kegiatan yang bertujuan untuk memperkenalkan dan menyebarluaskan informasi mengenai arsip-arsip statis yang memiliki nilai sejarah, serta dokumentasi tentang bencana tsunami yang pernah terjadi di Indonesia. Pameran ini menjadi ajang penting untuk mempromosikan Balai Arsip Statis dan Tsunami (BAST) Arsip Nasional Republik Indonesia (ANRI) ',
    unitActivities:
      'Ikut berpartisipasi pameran gini seru banget pengunjung banyak yang bertanya, bahkan ada yang baru tahu kalau dokumen-dokumen kayak gini bisa disimpan dan punya banyak nilai penting.',
    allUnits: [
      {
        name: 'Pengenalan Arsip',
        description:
          'Interaksi antara pengunjung dan mahasiswa berlangsung secara aktif dan komunikatif. Para mahasiswa memberikan penjelasan mengenai cerita di balik arsip yang dipamerkan, sementara pengunjung menunjukkan antusiasme tinggi dengan mengajukan pertanyaan serta berdiskusi secara langsung. Kegiatan ini menciptakan suasana edukatif yang mendukung pemahaman publik terhadap pentingnya arsip sebagai sumber sejarah. Selain itu, BAST juga menyediakan Layanan Restorasi Arsip Keluarga (LARASKA) bagi masyarakat yang ingin memperbaiki arsip keluarga yang mengalami kerusakan.',
        icon: '/images/icons/history.svg',
        image: '/images/program/pameran_arsip/foto6.jpg',
      },
    ],
    benefits: [
      {
        title: 'Belajar Sejarah dari Sumber Asli',
        description: 'Melihat langsung dokumen sejarah asli, bukan sekadar narasi dari buku',
      },
      {
        title: 'Pengalaman Interaktif',
        description: 'Mengeksplorasi arsip melalui teknologi modern yang menarik dan interaktif',
      },
      {
        title: 'Wawasan Beragam',
        description: 'Mendapatkan perspektif baru tentang berbagai peristiwa sejarah nasional',
      },
      {
        title: 'Pengetahuan Kearsipan',
        description: 'Memahami proses pelestarian dan pengelolaan arsip nasional',
      },
      {
        title: 'Inspirasi Kreatif',
        description: 'Mendapatkan inspirasi untuk proyek penelitian atau karya kreatif',
      },
    ],
    gallery: [
      {
        src: '/images/program/pameran_arsip/foto7.jpg',
        caption: '',
      },
      {
        src: '/images/program/pameran_arsip/foto3.jpg',
        caption: '',
      },
      {
        src: '/images/program/pameran_arsip/foto5.jpg',
        caption: '',
      },
      {
        src: '/images/program/pameran_arsip/foto2.jpg',
        caption: '',
      },
      {
        src: '/images/program/pameran_arsip/foto1.jpg',
        caption: '',
      },
      {
        src: '/images/program/pameran_arsip/foto4.jpg',
        caption: '',
      },
      {
        src: '/images/program/pameran_arsip/foto8.jpg',
        caption: '',
      },
      {
        src: '/images/program/pameran_arsip/foto9.jpg',
        caption: '',
      },
      {
        src: '/images/program/pameran_arsip/foto10.jpg',
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
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-300 text-white py-32 px-4">
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <MotionDiv
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
          <MotionDiv
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
              <h1 className="text-5xl md:text-6xl font-bold relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-200">
                {program.title}
              </h1>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full opacity-70 blur-sm"></div>
            </div>

            {/* Subjudul dengan styling yang lebih menarik */}
            <div className="relative inline-block px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
              <p className="text-xl md:text-2xl italic bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent font-medium">
                {program.subtitle}
              </p>
              <div className="absolute -inset-px bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg opacity-20 blur-sm -z-10"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/4 -left-10 w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 opacity-20 blur-md"></div>
            <div className="absolute bottom-1/3 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 opacity-20 blur-md"></div>
          </MotionDiv>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Content - Description */}
          <div className="lg:col-span-2">
            <MotionDiv
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8"
            >
              <h2 className="text-2xl font-heading font-bold text-primary dark:text-orange-400 mb-4">
                Deskripsi Program
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {program.description}
              </p>

              <div className="h-1 w-20 bg-orange-500 rounded-full mb-6"></div>

              <h3 className="text-xl font-heading font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Manfaat Program
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {program.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/30"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5">
                      <svg
                        className="w-4 h-4 text-orange-600 dark:text-orange-400"
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
            </MotionDiv>

            <MotionDiv
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
              variants={fadeInUp}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-orange-500 mb-8`}
            >
              <div className="flex flex-col md:flex-row md:items-center mb-6">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center shadow-lg p-4">
                    <svg
                      className="w-8 h-8 text-orange-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-primary dark:text-white">
                    Pameran Arsip di BAST ANRI
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    {program.unitDescription}
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
                Aktivitas dalam Pameran:
              </h4>

              <p className="text-gray-700 dark:text-gray-300 mb-6">{program.unitActivities}</p>

              <div className="mt-8">
                <div className="space-y-2 mt-4">
                  {program.allUnits.map((unit, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleUnit(idx)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold mr-3">
                            {idx + 1}
                          </div>
                          <span className="font-medium text-gray-800 dark:text-gray-200">
                            {unit.name}
                          </span>
                        </div>
                        <svg
                          className={`w-5 h-5 text-gray-500 transition-transform ${
                            activeUnit === idx ? 'transform rotate-180' : ''
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

                      {activeUnit === idx && (
                        <div className="p-4 bg-white dark:bg-gray-800">
                          <div className="flex flex-col md:flex-row">
                            <div className="relative w-full md:w-1/3 h-48 md:h-auto flex-shrink-0 overflow-hidden rounded-lg mb-4 md:mb-0 md:mr-4">
                              <Image
                                src={unit.image}
                                alt={unit.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            </div>
                            <div className="flex-grow">
                              <p className="text-gray-700 dark:text-gray-300 mb-4">
                                {unit.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </MotionDiv>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 relative">
            <div className="sticky top-24">
              {/* Program Lainnya Section - Dengan Ikon Representatif */}
              <MotionDiv
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
                      title: 'Eksplorasi BAST ANRI',
                      color: 'indigo-500',
                      slug: 'eksplorasi-bast-anri',
                    },
                    {
                      title: 'Learning Trip',
                      color: 'red-500',
                      slug: 'Learning Trip',
                    },
                    {
                      title: 'Daily Activity',
                      color: 'pink-500',
                      slug: 'daily-activity',
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
                              d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
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
                              d="M3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M9 10V16M9 10L7 12M9 10L11 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15 8V14M15 14L13 12M15 14L17 12"
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
                        {index === 3 && (
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
              </MotionDiv>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <MotionDiv
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
        </MotionDiv>
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

export default PameranArsipDetail;
