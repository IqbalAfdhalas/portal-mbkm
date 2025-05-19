// src/components/sections/Galery.tsx
'use client';

import { useState, useEffect } from 'react';
import { Search, X, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

// Demo data for gallery images
const demoImages = [
  {
    id: 1,
    src: "/images/Akuisisi_Unit.jpg",
    title: "Kegiatan Magang BAST ANRI 2024",
    category: "Kegiatan",
    year: "2024",
    date: "15 Maret 2024"
  },
  {
    id: 2,
    src: "/images/contoh1.jpg",
    title: "Workshop Digitalisasi Arsip Nasional",
    category: "Event",
    year: "2024",
    date: "2 Februari 2024"
  },
  {
    id: 3,
    src: "/images/Pengolahan_Unit.jpg",
    title: "Kunjungan Kepala ANRI",
    category: "Dokumentasi",
    year: "2023",
    date: "10 Desember 2023"
  },
  {
    id: 4,
    src: "/images/logo_mbkm_white.png",
    title: "Presentasi Hasil Program MBKM",
    category: "Kegiatan",
    year: "2023",
    date: "25 November 2023"
  },
  {
    id: 5,
    src: "/images/Preservasi_unit.jpg",
    title: "Pelatihan Pengelolaan Arsip",
    category: "Event",
    year: "2024",
    date: "8 April 2024"
  },
  {
    id: 6,
    src: "/images/hero-illustration.png",
    title: "Seminar Nasional Kearsipan",
    category: "Event",
    year: "2023",
    date: "5 Oktober 2023"
  },
  {
    id: 7,
    src: "/images/Pelayanan_Unit.jpg",
    title: "Orientasi Mahasiswa MBKM",
    category: "Kegiatan",
    year: "2024",
    date: "22 Januari 2024"
  },
  {
    id: 8,
    src: "/images/contoh2.jpg",
    title: "Penutupan Program MBKM Batch 2023",
    category: "Dokumentasi",
    year: "2023",
    date: "15 Desember 2023"
  },
  {
    id: 9,
    src: "/images/contoh2.jpg",
    title: "Diskusi Panel Kearsipan Digital",
    category: "Event",
    year: "2024",
    date: "12 Maret 2024"
  },
  {
    id: 10,
    src: "/images/contoh5.jpg",
    title: "Kunjungan Studi di ANRI",
    category: "Dokumentasi",
    year: "2023",
    date: "8 September 2023"
  },
  {
    id: 11,
    src: "/images/Akuisisi_Unit.jpg",
    title: "Kolaborasi Lintas Institusi",
    category: "Kegiatan",
    year: "2024",
    date: "5 April 2024"
  },
  {
    id: 12,
    src: "/images/contoh4.jpeg",
    title: "Pelatihan Pengembangan Kompetensi",
    category: "Event",
    year: "2024",
    date: "28 Februari 2024"
  }
];

// Component for each gallery item
const GaleryItem = ({ image, onClick }) => {
  return (
    <div 
      className="mb-4 break-inside-avoid cursor-pointer transform transition duration-200 hover:scale-105"
      onClick={() => onClick(image)}
    >
      <div className="relative overflow-hidden rounded-lg shadow-md">
        <img 
          src={image.src} 
          alt={image.title} 
          className="w-full object-cover"
        />
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
    const handleKeyDown = (e) => {
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
              className="w-full h-full object-contain"
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {hasNext && (
            <button 
              className="ml-auto bg-white/30 dark:bg-gray-900/50 hover:bg-white/50 dark:hover:bg-gray-900/70 rounded-full p-2 transition-colors"
              onClick={onNext}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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

  const categories = ['all', 'Event', 'Kegiatan', 'Dokumentasi'];
  const years = ['all', '2023', '2024', '2025'];

  // Filter images based on active filters and search query
  const filteredImages = demoImages.filter(image => {
    const matchesCategory = activeCategory === 'all' || image.category === activeCategory;
    const matchesYear = activeYear === 'all' || image.year === activeYear;
    const matchesSearch = searchQuery === '' || 
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      image.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesYear && matchesSearch;
  });

  const handleImageClick = (image) => {
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
    <section
      id="Galery"
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div
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
            Dokumentasi berbagai kegiatan pembelajaran, pelatihan, dan kolaborasi mahasiswa 
            dalam program Merdeka Belajar Kampus Merdeka di Arsip Nasional Republik Indonesia.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative">
              <input
                type="text"
                placeholder="Cari gambar..."
                className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full py-2 pl-10 pr-4 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
            </motion.div>
          </div>
          
          {/* Filters */}
          <motion.div 
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
          </motion.div>
          
          {/* Image Counter */}
          <motion.div 
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
          </motion.div>
          
          {/* Gallery */}
          <motion.div 
            className="relative max-h-[600px] overflow-y-auto custom-scrollbar"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {filteredImages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-medium">Tidak ada foto yang ditemukan</h3>
                <p className="mt-1">Coba ubah filter atau kata kunci pencarian</p>
              </div>
            ) : viewMode === 'masonry' ? (
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                {filteredImages.map((image) => (
                  <GaleryItem 
                    key={image.id} 
                    image={image} 
                    onClick={handleImageClick}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image) => (
                  <GaleryItem 
                    key={image.id} 
                    image={image} 
                    onClick={handleImageClick}
                  />
                ))}
              </div>
            )}
          </motion.div>
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
          background: #2D3748;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4A5568;
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