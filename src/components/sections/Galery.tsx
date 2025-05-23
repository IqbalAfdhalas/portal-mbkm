// src/components/sections/Galery.tsx
'use client';

import { useState, useEffect } from 'react';
import { Search, X, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { MotionDiv } from '@/components/common/MotionClientOnly';

// Demo data for gallery images
const demoImages = [
  {
    id: 1,
    src: '/images/semua_gambar/galeri1.jpg',
    title: 'Kegiatan Mengklasifikasi Arsip di Akuisisi',
    category: 'Activity',
    year: '2025',
    date: '20 Maret 2025',
  },
  {
    id: 2,
    src: '/images/semua_gambar/galeri2.jpg',
    title: 'Black Friday',
    category: 'Activity',
    year: '2025',
    date: '11 Apr 2025',
  },
  {
    id: 3,
    src: '/images/semua_gambar/galeri3.jpg',
    title: 'Pameran Mini Arsip di BAST',
    category: 'Education',
    year: '2025',
    date: '22 Mei 2025',
  },
  {
    id: 4,
    src: '/images/semua_gambar/galeri4.jpg',
    title: 'Kegiatan Edukasi Kebencanaan',
    category: 'Event',
    year: '2025',
    date: '8 Mei 2025',
  },

  {
    id: 5,
    src: '/images/semua_gambar/galeri5.jpg',
    title: 'Pameran Terbuka Arsip Tsunami',
    category: 'Event',
    year: '2024',
    date: '11 November 2024',
  },

  {
    id: 6,
    src: '/images/semua_gambar/galeri6.jpg',
    title: 'Mahasiswa MBKM Sedang Menjelaskan',
    category: 'Event',
    year: '2024',
    date: '11 November 2024',
  },

  {
    id: 7,
    src: '/images/semua_gambar/galeri7.jpg',
    title: 'Foto Bersama Penyelenggara',
    category: 'Event',
    year: '2024',
    date: '11 November 2024',
  },

  {
    id: 8,
    src: '/images/semua_gambar/galeri8.jpg',
    title: 'Pemaparan Sejarah',
    category: 'Event',
    year: '2024',
    date: '11 November 2024',
  },

  {
    id: 9,
    src: '/images/semua_gambar/galeri9.jpg',
    title: 'Ketertarikan dari Pengunjung',
    category: 'Event',
    year: '2024',
    date: '11 November 2024',
  },

  {
    id: 10,
    src: '/images/semua_gambar/galeri10.jpg',
    title: 'Interaksi Bersama Pengunjung',
    category: 'Event',
    year: '2024',
    date: '11 November 2024',
  },
  {
    id: 11,
    src: '/images/semua_gambar/galeri11.jpg',
    title: 'Pelayanan dari Pameran',
    category: 'Event',
    year: '2024',
    date: '11 November 2024',
  },
  {
    id: 12,
    src: '/images/semua_gambar/galeri12.jpg',
    title: 'Berdiskusi Bersama Pengunjung',
    category: 'Event',
    year: '2024',
    date: '11 November 2024',
  },
  {
    id: 13,
    src: '/images/semua_gambar/galeri13.jpg',
    title: 'Penyusunan Buku POCADI',
    category: 'Activity',
    year: '2024',
    date: '20 November 2024',
  },
  {
    id: 14,
    src: '/images/semua_gambar/galeri14.jpg',
    title: 'Pertunjukan Laraska',
    category: 'Event',
    year: '2024',
    date: '08 November 2024',
  },
  {
    id: 15,
    src: '/images/semua_gambar/galeri15.jpg',
    title: 'Pameran Arsip di Balai Meuseuraya Aceh',
    category: 'Event',
    year: '2024',
    date: '08 November 2024',
  },
  {
    id: 16,
    src: '/images/semua_gambar/galeri16.png',
    title: 'Penyusunan Box',
    category: 'Activity',
    year: '2024',
    date: '14 April 2025',
  },
  {
    id: 17,
    src: '/images/semua_gambar/galeri17.png',
    title: 'Klasifikasi Folder Arsip',
    category: 'Activity',
    year: '2024',
    date: '11 April 2025',
  },
  {
    id: 18,
    src: '/images/semua_gambar/galeri18.jpg',
    title: 'Kegiatan di Pengolahan',
    category: 'Activity',
    year: '2025',
    date: '03 Maret 2025',
  },
  {
    id: 19,
    src: '/images/semua_gambar/galeri19.jpg',
    title: 'Penataan Arsip',
    category: 'Activity',
    year: '2025',
    date: '18 Maret 2025',
  },
  {
    id: 20,
    src: '/images/semua_gambar/galeri19.jpg',
    title: 'Ruang Penyimpanan Arsip',
    category: 'Activity',
    year: '2025',
    date: '17 April 2025',
  },
  {
    id: 21,
    src: '/images/semua_gambar/galeri21.jpg',
    title: 'Ruang Penyimpanan Arsip di Lampineung',
    category: 'Activity',
    year: '2025',
    date: '26 Maret 2025',
  },
  {
    id: 22,
    src: '/images/semua_gambar/galeri22.jpg',
    title: 'Maulid Nabi Muhammad SAW 1446 H',
    category: 'Event',
    year: '2024',
    date: '02 Oktober 2024',
  },

  {
    id: 23,
    src: '/images/semua_gambar/galeri23.jpg',
    title: 'Behind The Scene',
    category: 'Activity',
    year: '2024',
    date: '17 Oktober 2024',
  },
  {
    id: 24,
    src: '/images/semua_gambar/galeri24.jpg',
    title: 'Munggahan ',
    category: 'Event',
    year: '2025',
    date: '25 Februari 2025',
  },
  {
    id: 25,
    src: '/images/semua_gambar/galeri25.jpg',
    title: 'Pengenalan dan Tour Kantor Arsip ',
    category: 'Education',
    year: '2025',
    date: '25 April 2025',
  },
  {
    id: 26,
    src: '/images/semua_gambar/galeri26.jpg',
    title: 'Kunjungan oleh Prof. Yuka Mizumoto  ',
    category: 'Education',
    year: '2025',
    date: '12 Maret 2025',
  },
  {
    id: 27,
    src: '/images/semua_gambar/galeri27.jpg',
    title: 'Buka Puasa Bersama  ',
    category: 'Event',
    year: '2025',
    date: '15 Maret 2025',
  },
  {
    id: 28,
    src: '/images/semua_gambar/galeri28.jpg',
    title: 'Mahasiswa MBKM Sedang Menjelaskan  ',
    category: 'Activity',
    year: '2025',
    date: '06 Maret 2025',
  },
  {
    id: 29,
    src: '/images/semua_gambar/galeri29.jpg',
    title: 'Mahasiswa Membenahi Arsip  ',
    category: 'Activity',
    year: '2025',
    date: '09 Maret 2025',
  },
  {
    id: 30,
    src: '/images/semua_gambar/galeri30.jpg',
    title: 'Membongkar Klip pada Arsip  ',
    category: 'Activity',
    year: '2025',
    date: '13 Maret 2025',
  },
  {
    id: 31,
    src: '/images/semua_gambar/galeri31.jpg',
    title: 'Black Friday  ',
    category: 'Fun-Activity',
    year: '2025',
    date: '15 November 2024',
  },
  {
    id: 32,
    src: '/images/semua_gambar/galeri32.jpg',
    title: 'Memotong Label untuk Penamaan pada Arsip  ',
    category: 'Activity',
    year: '2025',
    date: '16 April 2025',
  },
  {
    id: 33,
    src: '/images/semua_gambar/galeri33.jpg',
    title: 'Kunjungan dalam Rangka HUT PMI  ',
    category: 'Activity',
    year: '2025',
    date: '05 Mei 2025',
  },
  {
    id: 34,
    src: '/images/semua_gambar/galeri34.jpg',
    title: 'Foto Bersama di PMI  ',
    category: 'Activity',
    year: '2025',
    date: '05 Mei 2025',
  },
  {
    id: 35,
    src: '/images/semua_gambar/galeri35.jpg',
    title: 'Sesi Podcast Bersama Relawan  ',
    category: 'Activity',
    year: '2025',
    date: '05 Mei 2025',
  },
  {
    id: 38,
    src: '/images/semua_gambar/galeri38.jpg',
    title: 'Podcast POV Mahasiswa  ',
    category: 'Activity',
    year: '2025',
    date: '05 Mei 2025',
  },
  {
    id: 39,
    src: '/images/semua_gambar/galeri39.jpg',
    title: 'Prasasti Jejak Bapak SBY  ',
    category: 'Activity',
    year: '2025',
    date: '05 Mei 2025',
  },
  {
    id: 43,
    src: '/images/semua_gambar/galeri43.jpg',
    title: 'Kunjungan Bapak Ihwan ke USK  ',
    category: 'Event',
    year: '2025',
    date: '17 Maret 2025',
  },

  {
    id: 44,
    src: '/images/semua_gambar/galeri43.jpg',
    title: 'BapaK Ihwan sebagai Narasumber  ',
    category: 'Event',
    year: '2025',
    date: '17 Maret 2025',
  },
  {
    id: 55,
    src: '/images/semua_gambar/galeri55.jpg',
    title: 'Peresmian Pusat Edukasi Tsunami Aceh di UTU  ',
    category: 'Event',
    year: '2024',
    date: '10 Desember 2024',
  },
  {
    id: 56,
    src: '/images/semua_gambar/galeri56.jpg',
    title: 'Foto Bersama  ',
    category: 'Event',
    year: '2024',
    date: '10 Desember 2024',
  },

  {
    id: 57,
    src: '/images/semua_gambar/galeri57.jpg',
    title: 'Black Friday  ',
    category: 'Fun-Activity',
    year: '2024',
    date: '22 November 2024',
  },
  {
    id: 58,
    src: '/images/semua_gambar/galeri58.jpg',
    title: 'Black Friday  ',
    category: 'Fun-Activity',
    year: '2025',
    date: '09 Mei 2025',
  },
  {
    id: 60,
    src: '/images/semua_gambar/galeri60.jpg',
    title: 'Rapat Project Akhir  ',
    category: 'Activity',
    year: '2025',
    date: '09 Mei 2025',
  },
  {
    id: 61,
    src: '/images/semua_gambar/galeri61.jpg',
    title: 'Presentasi oleh Mahasiswa MBKM  ',
    category: 'Activity',
    year: '2025',
    date: '09 Mei 2025',
  },
  {
    id: 64,
    src: '/images/semua_gambar/galeri64.jpg',
    title: 'Kegiatan Mahasiswa di Unit Preservasi  ',
    category: 'Activity',
    year: '2024',
    date: '17 September 2024',
  },
  {
    id: 65,
    src: '/images/semua_gambar/galeri65.jpg',
    title: 'Mendata Arsip  ',
    category: 'Activity',
    year: '2024',
    date: '18 September 2024',
  },
  {
    id: 69,
    src: '/images/semua_gambar/galeri69.jpg',
    title: 'Interaksi Bersama Panitian TDMRC  ',
    category: 'Activity',
    year: '2024',
    date: '12 November 2024',
  },
  {
    id: 71,
    src: '/images/semua_gambar/galeri71.jpg',
    title: 'Kunjungan oleh Direktur BNPB  ',
    category: 'Activity',
    year: '2024',
    date: '11 Oktober 2024',
  },

  {
    id: 73,
    src: '/images/semua_gambar/galeri73.jpg',
    title: 'Orientasi Materi kepada Mahasiswa MBKM  ',
    category: 'Activity',
    year: '2024',
    date: '10 September 2024',
  },
  {
    id: 74,
    src: '/images/semua_gambar/galeri74.jpg',
    title: 'Rapat Mahasiswa Bersama Bapak Ihwan  ',
    category: 'Activity',
    year: '2025',
    date: '08 September 2025',
  },
  {
    id: 75,
    src: '/images/semua_gambar/galeri75.jpg',
    title: 'Pelepasan Mahasiswa MBKM Angkatan 2  ',
    category: 'Activity',
    year: '2025',
    date: '04 September 2025',
  },
  {
    id: 76,
    src: '/images/semua_gambar/galeri76.jpg',
    title: 'Upacara Hari Korps Pegawai RI  ',
    category: 'Activity',
    year: '2024',
    date: '29 November 2024',
  },
  {
    id: 77,
    src: '/images/semua_gambar/galeri77.jpg',
    title: 'Kunjungan Barenbag Kemnaker RI  ',
    category: 'Activity',
    year: '2024',
    date: '01 Oktober 2024',
  },
  {
    id: 78,
    src: '/images/semua_gambar/galeri78.jpg',
    title: 'Studi Tiru di BAST  ',
    category: 'Activity',
    year: '2024',
    date: '01 Oktober 2024',
  },
  {
    id: 79,
    src: '/images/semua_gambar/galeri79.jpg',
    title: 'Implementation Agreement oleh BAST dan FMIPA USK  ',
    category: 'Activity',
    year: '2024',
    date: '03 Oktober 2024',
  },
  {
    id: 80,
    src: '/images/semua_gambar/galeri80.jpg',
    title: 'Menyambut Ramadan 1445 H  ',
    category: 'Event',
    year: '2024',
    date: '07 Maret 2024',
  },
  {
    id: 82,
    src: '/images/semua_gambar/galeri82.jpg',
    title: 'Sharing Session Bersama BNPB  ',
    category: 'Activity',
    year: '2024',
    date: '08 Oktober 2024',
  },

  {
    id: 83,
    src: '/images/semua_gambar/galeri83.jpg',
    title: 'Rangka Memperingati 20 Tahun Gempa dan Tsunami  ',
    category: 'Event',
    year: '2024',
    date: '08 Oktober 2024',
  },
  {
    id: 87,
    src: '/images/semua_gambar/galeri87.jpg',
    title: 'Pembekalan Dasar Kearsipan pada Mahasiswa MBKM  ',
    category: 'Activity',
    year: '2024',
    date: '21 Februari 2024',
  },
  {
    id: 88,
    src: '/images/semua_gambar/galeri88.jpg',
    title: 'Kunjungan dari Kanwil Kemenag Provinsi Aceh  ',
    category: 'Activity',
    year: '2024',
    date: '18 Oktober 2024',
  },
  {
    id: 89,
    src: '/images/semua_gambar/galeri89.jpeg',
    title: 'Kunjungan dari Kanwil Kemenag Provinsi Aceh  ',
    category: 'Activity',
    year: '2024',
    date: '28 Oktober 2024',
  },
  {
    id: 90,
    src: '/images/semua_gambar/BAS05589.JPG',
    title: 'Webinar Bersama CSEAS-KU  ',
    category: 'Event',
    year: '2024',
    date: '05 November 2024',
  },
];

// Component for each gallery item
const GaleryItem = ({ image, onClick }) => {
  return (
    <div
      className="mb-4 break-inside-avoid cursor-pointer transform transition duration-200 hover:scale-105"
      onClick={() => onClick(image)}
    >
      <div className="relative overflow-hidden rounded-lg shadow-md">
        <img src={image.src} alt={image.title} className="w-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
          <div className="text-white text-sm font-medium truncate">{image.title}</div>
          <div className="flex items-center text-gray-300 text-xs">
            <Calendar size={12} className="mr-1" />
            <span>{image.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Lightbox component
const Lightbox = ({ image, onClose, onPrev, onNext, hasNext, hasPrev }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-full max-w-4xl max-h-screen p-4">
        <button
          className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <img
              src={image.src}
              alt={image.title}
              className="max-h-[70vh] mx-auto object-contain"
            />
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{image.title}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                {image.category}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                {image.year}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                {image.date}
              </span>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 flex w-full justify-between px-4">
          {hasPrev && (
            <button
              className="bg-white/30 dark:bg-gray-900/50 hover:bg-white/50 dark:hover:bg-gray-900/70 rounded-full p-2 transition-colors"
              onClick={onPrev}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {hasNext && (
            <button
              className="ml-auto bg-white/30 dark:bg-gray-900/50 hover:bg-white/50 dark:hover:bg-gray-900/70 rounded-full p-2 transition-colors"
              onClick={onNext}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
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
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Gallery Component
const Galery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeYear, setActiveYear] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('masonry'); // masonry or grid

  const categories = ['all', 'Event', 'Activity']; //'Dokumentasi'
  const years = ['all', '2023', '2024', '2025'];

  // Filter images based on active filters and search query
  const filteredImages = demoImages.filter(image => {
    const matchesCategory = activeCategory === 'all' || image.category === activeCategory;
    const matchesYear = activeYear === 'all' || image.year === activeYear;
    const matchesSearch =
      searchQuery === '' ||
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesYear && matchesSearch;
  });

  const handleImageClick = image => {
    setSelectedImage(image);
    setActiveIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  const handleCloseLightbox = () => {
    setSelectedImage(null);
    setActiveIndex(-1);
  };

  const handlePrevImage = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      setSelectedImage(filteredImages[activeIndex - 1]);
    }
  };

  const handleNextImage = () => {
    if (activeIndex < filteredImages.length - 1) {
      setActiveIndex(activeIndex + 1);
      setSelectedImage(filteredImages[activeIndex + 1]);
    }
  };

  return (
    <section id="Galery" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-screen-xl px-4">
        <MotionDiv
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium text-secondary uppercase tracking-wider">
            Dokumentasi Kegiatan
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary dark:text-white mt-2 mb-4">
            Galeri MBKM BAST ANRI
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Dokumentasi berbagai kegiatan pembelajaran, pelatihan, dan kolaborasi mahasiswa dalam
            program Merdeka Belajar Kampus Merdeka di Arsip Nasional Republik Indonesia.
          </p>
        </MotionDiv>

        <div className="flex flex-col gap-6">
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <MotionDiv
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Cari gambar..."
                className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full py-2 pl-10 pr-4 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                size={18}
              />
            </MotionDiv>
          </div>

          {/* Filters */}
          <MotionDiv
            className="flex flex-wrap gap-2 md:gap-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Kategori:</span>
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category === 'all' ? 'Semua' : category}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Tahun:</span>
              {years.map(year => (
                <button
                  key={year}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeYear === year
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setActiveYear(year)}
                >
                  {year === 'all' ? 'Semua' : year}
                </button>
              ))}
            </div>
          </MotionDiv>

          {/* Image Counter */}
          <MotionDiv
            className="text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Menampilkan {filteredImages.length} foto
            {activeCategory !== 'all' && ` dalam kategori "${activeCategory}"`}
            {activeYear !== 'all' && ` tahun ${activeYear}`}
            {searchQuery && ` dengan pencarian "${searchQuery}"`}
          </MotionDiv>

          {/* Gallery */}
          <MotionDiv
            className="relative max-h-[600px] overflow-y-auto custom-scrollbar"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {filteredImages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="text-lg font-medium">Tidak ada foto yang ditemukan</h3>
                <p className="mt-1">Coba ubah filter atau kata kunci pencarian</p>
              </div>
            ) : viewMode === 'masonry' ? (
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                {filteredImages.map(image => (
                  <GaleryItem key={image.id} image={image} onClick={handleImageClick} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map(image => (
                  <GaleryItem key={image.id} image={image} onClick={handleImageClick} />
                ))}
              </div>
            )}
          </MotionDiv>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={handleCloseLightbox}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
          hasPrev={activeIndex > 0}
          hasNext={activeIndex < filteredImages.length - 1}
        />
      )}

      {/* Inject custom stylesheet for scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: #2d3748;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }

        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4a5568;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #718096;
        }
      `}</style>
    </section>
  );
};

export default Galery;
