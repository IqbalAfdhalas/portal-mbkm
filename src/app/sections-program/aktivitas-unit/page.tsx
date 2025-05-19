// src/app/sections-program/aktivitas-unit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';

const AktivitasUnitDetail = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const handleImageClick = (src: string) => setPreviewImage(src);
  const closeModal = () => setPreviewImage(null);

  useEffect(() => {
    setIsLoaded(true);
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const program = {
    title: 'Aktivitas Unit',
    subtitle: 'Ikut Serunya Aktivitas Unit di BAST ANRI!',
    description:
      'Lewat program ini, kamu akan ikut langsung dalam aktivitas harian di unit-unit kerja BAST ANRI. Bukan cuma duduk dan mengamati, tapi benar-benar terlibat seperti bagian dari tim! Setiap unit punya tugas dan pengalaman yang beda-beda — cocok banget buat kamu yang pengen belajar dari praktik nyata.',
    icon: '/images/icons/activity.svg',
    banner: '/images/program-aktivitas.jpg',
    color: 'yellow-500',
    units: [
      {
        name: 'Unit Akuisisi Arsip',
        icon: '/images/logo_mbkm_white.png',
        description:
          'Belajar gimana arsip pertama kali diterima — mulai dari seleksi, penerimaan, sampai pencatatan dokumen yang masuk.',
        activities: `Kamu akan dilibatkan langsung dalam proses awal pengelolaan arsip. Mulai dari menyeleksi arsip yang diterima dari berbagai instansi, melakukan pencatatan metadata, hingga koordinasi pengambilan arsip dan verifikasi dokumen. Semuanya kamu rasakan langsung seolah menjadi bagian dari tim akuisisi.`,
        video: '/images/WhatsApp Video 2025-05-17 at 22.03.11_8ea9712d.mp4',
      },
      {
        name: 'Unit Pengolahan Arsip',
        icon: '/images/logo_mbkm_white.png',
        description:
          'Di sini kamu akan bantu menyusun dan mengklasifikasikan arsip biar lebih rapi dan gampang ditemukan.',
        activities: [
          'Pengklasifikasian arsip berdasarkan kategori dan tahun',
          'Pembuatan sistem pengindeksan untuk arsip baru',
          'Pemberian kode dan label pada arsip fisik',
          'Input data arsip ke sistem database',
        ],
        image: '/images/logo_mbkm_white.png',
      },
      {
        name: 'Unit Preservasi Arsip',
        icon: '/images/logo_mbkm_white.png',
        description:
          'Tugasnya menjaga arsip tetap awet. Kamu bisa lihat dan ikut langsung proses penyimpanan, pelindungan, bahkan perbaikan arsip.',
        activities: [
          'Pemeriksaan kondisi fisik arsip secara berkala',
          'Restorasi dokumen yang rusak/pudar',
          'Pemindaian (scanning) arsip untuk backup digital',
          'Pengaturan suhu dan kelembaban ruang penyimpanan',
        ],
        image: '/images/logo_mbkm_white.png',
      },
      {
        name: 'Unit Pelayanan Arsip',
        icon: '/images/logo_mbkm_white.png',
        description:
          'Di bagian ini kamu akan berinteraksi dengan pengguna arsip, bantu pencarian data, dan ikut dalam layanan informasi publik.',
        activities: [
          'Melayani permintaan pencarian arsip dari pengunjung',
          'Memberikan panduan penggunaan katalog arsip',
          'Membantu proses peminjaman arsip untuk penelitian',
          'Pencatatan statistik kunjungan dan penggunaan arsip',
        ],
        image: '/images/logo_mbkm_white.png',
      },
      {
        name: 'Unit Tata Usaha',
        icon: '/images/logo_mbkm_white.png',
        description:
          'Belajar tentang pengelolaan administrasi internal. Mulai dari surat-menyurat, penjadwalan, hingga pengarsipan internal BAST ANRI.',
        activities: [
          'Pengelolaan surat masuk dan keluar',
          'Penjadwalan kegiatan dan rapat internal',
          'Pembuatan laporan kegiatan harian/mingguan',
          'Koordinasi antar unit untuk kelancaran operasional',
        ],
        image: '/images/logo_mbkm_white.png',
      },
    ],
    benefits: [
      {
        title: 'Pengalaman Praktis',
        description: 'Mendapatkan pengalaman hands-on di lingkungan kerja profesional kearsipan',
      },
      {
        title: 'Pemahaman Mendalam',
        description: 'Memahami siklus lengkap pengelolaan arsip dari penerimaan hingga pelayanan',
      },
      {
        title: 'Networking',
        description: 'Membangun koneksi dengan para profesional di bidang kearsipan',
      },
      {
        title: 'Skill Teknis',
        description: 'Memperoleh keterampilan teknis dalam pengelolaan dan preservasi arsip',
      },
      {
        title: 'Perspektif Sejarah',
        description: 'Mendapatkan perspektif unik tentang sejarah melalui dokumen asli',
      },
    ],
    gallery: [
      {
        src: '/images/8a009479-7725-4447-96e4-72ddba3b799a.jpg',
        caption: 'Mahasiswa sedang mendigitalisasi arsip',
      },
      {
        src: '/images/hero-illustration.png',
        caption: 'Rapat evaluasi kegiatan unit',
      },
      {
        src: '/images/8a009479-7725-4447-96e4-72ddba3b799a.jpg',
        caption: 'Proses pemindaian dokumen',
      },
      {
        src: '/images/hero-illustration.png',
        caption: 'Suasana kerja di ruang pengolahan',
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      {/* Banner Section */}
      <div className="relative h-[30vh] md:h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/70 to-primary/90 mix-blend-multiply" />
        <Image
          src={program.banner}
          alt={program.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
              variants={fadeInUp}
              className="flex items-center mb-4"
            >
              <div className="bg-white dark:bg-gray-800 rounded-full p-3 mr-4 shadow-lg">
                <Image
                  src={program.icon}
                  alt={program.title}
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
              </div>
              <nav className="flex text-sm text-white/80">
                <Link href="/" className="hover:text-white">
                  Beranda
                </Link>
                <span className="mx-2">/</span>
                <Link href="/#program" className="hover:text-white">
                  Program
                </Link>
                <span className="mx-2">/</span>
                <span className="text-white font-medium">{program.title}</span>
              </nav>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-2 md:mb-4"
            >
              {program.title}
            </motion.h1>

            <motion.p
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
              variants={fadeInUp}
              className="text-xl md:text-2xl text-white/90 font-medium italic max-w-3xl"
            >
              {program.subtitle}
            </motion.p>
          </div>
        </div>
      </div>

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
              <h2 className="text-2xl font-heading font-bold text-primary dark:text-yellow-400 mb-4">
                Deskripsi Program
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {program.description}
              </p>

              <div className="h-1 w-20 bg-yellow-500 rounded-full mb-6"></div>

              <h3 className="text-xl font-heading font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Manfaat Program
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {program.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800/30"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center mt-0.5">
                      <svg
                        className="w-4 h-4 text-yellow-600 dark:text-yellow-400"
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
              variants={staggerContainer}
              className="space-y-6"
            >
              {program.units.map((unit, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-${program.color}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center mb-6">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <div
                        className={`w-16 h-16 rounded-full bg-${program.color}/20 flex items-center justify-center shadow-lg p-4`}
                      >
                        <Image
                          src={unit.icon || program.icon}
                          alt={unit.name}
                          width={32}
                          height={32}
                          className="h-8 w-8"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-primary dark:text-white">
                        {unit.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 italic">{unit.description}</p>
                    </div>
                  </div>

                  <div className="w-full rounded-lg overflow-hidden mb-6">
                    {unit.video ? (
                      <div className="relative w-full pb-[56.25%]">
                        <video
                          src={unit.video}
                          controls
                          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    ) : (
                      <Image
                        src={unit.image}
                        alt={unit.name}
                        width={800}
                        height={450}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    )}
                  </div>

                  <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                    Aktivitas yang Dilakukan:
                  </h4>

                  <p className="text-gray-700 dark:text-gray-300">{unit.activities}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
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
                      title: 'Kunjungan ke Dalam BAST ANRI',
                      icon: '/images/icons/visit-in.svg',
                      color: 'indigo-500',
                      slug: 'kunjungan-ke-dalam-bast-anri',
                    },
                    {
                      title: 'Kunjungan ke Luar BAST ANRI',
                      icon: '/images/icons/visit-out.svg',
                      color: 'red-500',
                      slug: 'kunjungan-ke-luar-bast-anri',
                    },
                    {
                      title: 'Daily Activity',
                      icon: '/images/icons/daily.svg',
                      color: 'pink-500',
                      slug: 'daily-activity',
                    },
                    {
                      title: 'Pameran Arsip',
                      icon: '/images/icons/exhibition.svg',
                      color: 'orange-500',
                      slug: 'pameran-arsip',
                    },
                  ].map((otherProgram, index) => (
                    <Link
                      key={index}
                      href={`/sections-program/${otherProgram.slug}`}
                      className={`flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-${otherProgram.color} hover:bg-${otherProgram.color}/5 transition-all duration-300 group`}
                    >
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full bg-${otherProgram.color}/20 flex items-center justify-center mr-3`}
                      >
                        <Image
                          src={otherProgram.icon}
                          alt={otherProgram.title}
                          width={20}
                          height={20}
                          className="h-5 w-5"
                        />
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
                  Lokasi BAST ANRI
                </h3>
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
                  {/* Placeholder untuk peta - dalam produksi mungkin menggunakan Google Maps atau sejenisnya */}
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Peta lokasi BAST ANRI
                    </p>
                  </div>
                </div>
                <address className="not-italic text-gray-700 dark:text-gray-300 text-sm space-y-2">
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 text-yellow-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>
                      Jl. Ampera Raya No.7, Cilandak Timur, Jakarta Selatan, DKI Jakarta 12560
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-yellow-500 mr-2"
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
                    <span>(021) 7805851</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-yellow-500 mr-2"
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
                    <span>info@bast.anri.go.id</span>
                  </div>
                </address>
              </motion.div>

              <motion.div
                initial="hidden"
                animate={isLoaded ? 'visible' : 'hidden'}
                variants={fadeInUp}
                className="bg-gradient-to-br from-primary to-primary-light text-white rounded-xl shadow-md p-6"
              >
                <h3 className="text-xl font-heading font-bold mb-4">Pertanyaan Lainnya?</h3>
                <p className="mb-4">
                  Jika Anda memiliki pertanyaan lebih lanjut tentang program ini, jangan ragu untuk
                  menghubungi kami.
                </p>
                <Link
                  href="/kontak"
                  className="inline-block py-2 px-4 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Hubungi Kami
                </Link>
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
              <div className="custom-swiper-button-prev absolute top-1/2 left-2 z-10 transform -translate-y-1/2 cursor-pointer text-white hover:text-yellow-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>

              {/* 🔺 Panah kanan */}
              <div className="custom-swiper-button-next absolute top-1/2 right-2 z-10 transform -translate-y-1/2 cursor-pointer text-white hover:text-yellow-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* Bottom CTA */}
        <motion.div
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="mt-12 text-center"
        >
          <Link
            href="/#program"
            className="inline-flex items-center py-3 px-6 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali ke Program
          </Link>
        </motion.div>
      </div>
      {previewImage && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center cursor-zoom-out transition-opacity duration-300 animate-fade-in"
        >
          <div className="relative w-auto max-w-full px-4">
            <Image
              src={previewImage}
              alt="Preview"
              layout="intrinsic"
              width={0}
              height={0}
              sizes="100vw"
              className="max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-xl mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AktivitasUnitDetail;
