// src/components/sections/Gallery.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, X, Calendar, ChevronLeft, ChevronRight, Download, Share2 } from 'lucide-react';
import { MotionDiv } from '@/components/common/MotionClientOnly';
import { AnimatePresence, motion } from 'framer-motion';
import { useInfiniteGallery } from '@/hooks/useInfiniteGallery';
import type { GalleryImage } from '@/data/gallery/galeryData';
import { GalleryViewCounter, DetailViewCounter } from '@/components/ui/ViewCounter';
import { useAutoViewCounter } from '@/hooks/useViewCounter';

// Component for each gallery item - Updated with ViewCounter
interface GalleryItemProps {
  image: GalleryImage;
  onClick: (image: GalleryImage) => void;
  index: number;
}

const GalleryItem = ({ image, onClick, index }: GalleryItemProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay: index * 0.05,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
        y: -20,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }}
      transition={{
        layout: {
          duration: 1.2,
          ease: 'easeInOut',
        },
      }}
      className="mb-4 break-inside-avoid cursor-pointer group"
      onClick={() => onClick(image)}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <motion.img
          src={image.src}
          alt={image.title}
          className="w-full object-cover"
          loading="lazy"
          layoutId={`image-${image.id}`}
        />
        <motion.div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white text-sm font-medium bg-black/60 px-3 py-1 rounded-full">
            Klik untuk memperbesar
          </div>
        </motion.div>

        {/* View Counter - positioned at bottom right */}
        <GalleryViewCounter
          viewCount={image.viewCount || 0}
          className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        />

        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pr-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-white text-sm font-medium line-clamp-2">{image.title}</div>
          <div className="flex items-center text-gray-300 text-xs mt-1">
            <Calendar size={12} className="mr-1" />
            <span>{image.date}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Lightbox component with ViewCounter integration
interface LightboxProps {
  image: GalleryImage;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  currentIndex: number;
  totalImages: number;
}

const Lightbox = ({
  image,
  onClose,
  onPrev,
  onNext,
  hasNext,
  hasPrev,
  currentIndex,
  totalImages,
}: LightboxProps) => {
  const [isLoading, setIsLoading] = useState(true);

  // Auto increment view count when lightbox opens
  const { viewCount, isLoading: viewLoading } = useAutoViewCounter(image.id, image.viewCount || 0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `${image.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.caption || image.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link telah disalin ke clipboard!');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        {/* Header Bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 z-60 bg-gradient-to-b from-black/60 to-transparent p-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">
                {currentIndex + 1} dari {totalImages}
              </span>
              <span className="text-xs opacity-75">•</span>
              <span className="text-xs opacity-75">{image.category}</span>
              <span className="text-xs opacity-75">•</span>
              {/* View counter in header */}
              <DetailViewCounter
                viewCount={viewCount}
                isLoading={viewLoading}
                className="text-white"
              />
            </div>

            <div className="flex items-center space-x-2">
              <button
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                onClick={e => {
                  e.stopPropagation();
                  handleDownload();
                }}
                title="Download"
              >
                <Download size={20} />
              </button>
              <button
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                onClick={e => {
                  e.stopPropagation();
                  handleShare();
                }}
                title="Share"
              >
                <Share2 size={20} />
              </button>
              <button
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                onClick={onClose}
                title="Close (ESC)"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="flex items-center justify-center min-h-screen p-4 pt-20 pb-32"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={e => e.stopPropagation()}
        >
          <div className="relative max-w-6xl max-h-full w-full">
            {/* Image Container */}
            <div className="relative flex items-center justify-center">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              )}

              <motion.img
                src={image.src}
                alt={image.title}
                className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl"
                layoutId={`image-${image.id}`}
                transition={{ duration: 0.4 }}
                onLoad={() => setIsLoading(false)}
                style={{ display: isLoading ? 'none' : 'block' }}
              />
            </div>

            {/* Navigation Buttons */}
            {hasPrev && (
              <motion.button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 border border-white/20 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm"
                onClick={onPrev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ChevronLeft size={24} />
              </motion.button>
            )}

            {hasNext && (
              <motion.button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 border border-white/20 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm"
                onClick={onNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ChevronRight size={24} />
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Bottom Info Panel */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-60 bg-gradient-to-t from-black/70 to-transparent p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="max-w-4xl mx-auto text-white">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-semibold flex-1">{image.title}</h3>
              {/* Large view counter display */}
              <DetailViewCounter
                viewCount={viewCount}
                isLoading={viewLoading}
                className="text-gray-300 ml-4"
              />
            </div>
            {image.caption && (
              <p className="text-gray-300 mb-3 text-sm leading-relaxed">{image.caption}</p>
            )}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600/80 text-blue-100 backdrop-blur-sm">
                {image.category}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-gray-200 backdrop-blur-sm">
                {image.year}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-gray-200 backdrop-blur-sm">
                {image.date}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / totalImages) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

// Main Gallery Component with sorting options
const Gallery = () => {
  const {
    items: images,
    loading,
    hasMore,
    error,
    loadMore,
    refresh,
    isInitialLoading,
  } = useInfiniteGallery(12);

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeYear, setActiveYear] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular' | 'title'>('newest');

  // Handle error with retry
  const handleRetry = useCallback(() => {
    refresh();
  }, [refresh]);

  // Get categories and years from the data
  const categories = ['all', ...Array.from(new Set(images.map(item => item.category)))];
  const years = ['all', ...Array.from(new Set(images.map(item => item.year)))];

  // Filter images based on active filters and search query
  const filteredImages = images
    .filter(
      img =>
        (activeCategory === 'all' || img.category === activeCategory) &&
        (activeYear === 'all' || img.year === activeYear) &&
        (img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          img.caption?.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b.viewCount || 0) - (a.viewCount || 0);
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'newest':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const handleImageClick = (image: GalleryImage) => {
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

  // Function to get category display name
  const getCategoryDisplayName = (category: string) => {
    if (category === 'all') return 'Semua';
    return category;
  };

  // Get total views count
  const totalViews = images.reduce((sum, img) => sum + (img.viewCount || 0), 0);

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-screen-xl px-4">
        {/* Header */}
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

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <span className="font-medium">{images.length}</span>
              <span>foto</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">{totalViews.toLocaleString()}</span>
              <span>total views</span>
            </div>
          </div>
        </MotionDiv>

        <div className="flex flex-col gap-6">
          {/* Search and Sort */}
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

            {/* Sort Options */}
            <MotionDiv
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2"
            >
              <span className="text-gray-700 dark:text-gray-300 font-medium">Urutkan:</span>
              <select
                value={sortBy}
                onChange={e =>
                  setSortBy(e.target.value as 'newest' | 'oldest' | 'popular' | 'title')
                }
                className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
                <option value="popular">Terpopuler</option>
                <option value="title">Judul A-Z</option>
              </select>
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
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Kategori:</span>
              {categories.map(category => (
                <motion.button
                  key={category}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {getCategoryDisplayName(category)}
                </motion.button>
              ))}
            </div>

            {/* Year Filter */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Tahun:</span>
              {years.map(year => (
                <motion.button
                  key={year}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeYear === year
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setActiveYear(year)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {year === 'all' ? 'Semua' : year}
                </motion.button>
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
            {activeCategory !== 'all' &&
              ` dalam kategori "${getCategoryDisplayName(activeCategory)}"`}
            {activeYear !== 'all' && ` tahun ${activeYear}`}
            {searchQuery && ` dengan pencarian "${searchQuery}"`}
            {sortBy === 'popular' && ' (diurutkan berdasarkan views terbanyak)'}
            {sortBy === 'oldest' && ' (diurutkan dari yang terlama)'}
            {sortBy === 'title' && ' (diurutkan berdasarkan judul A-Z)'}
          </MotionDiv>

          {/* Gallery */}
          <MotionDiv
            className="relative max-h-[600px] overflow-y-auto custom-scrollbar"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {isInitialLoading ? (
              <motion.div
                className="flex flex-col items-center justify-center py-16 text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
                  <div className="animate-ping absolute top-0 left-0 rounded-full h-16 w-16 border border-blue-300 opacity-20"></div>
                </div>
                <h3 className="text-lg font-medium mt-6 mb-2">Memuat galeri...</h3>
                <p className="text-sm opacity-75">Mengambil data dari database</p>

                {/* Loading skeleton cards */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-4xl">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-[3/4] animate-pulse"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    />
                  ))}
                </div>
              </motion.div>
            ) : error ? (
              <motion.div
                className="flex flex-col items-center justify-center py-12 text-red-500 dark:text-red-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
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
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium mb-2">Gagal memuat galeri</h3>
                <p className="text-sm opacity-75 mb-4">{error}</p>
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Coba Lagi
                </button>
              </motion.div>
            ) : filteredImages.length === 0 ? (
              <motion.div
                className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
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
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4"
                  layout
                  transition={{
                    duration: 1.2,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    layout: {
                      duration: 1.5,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <AnimatePresence mode="popLayout">
                    {filteredImages.map((image, index) => (
                      <GalleryItem
                        key={`${image.id}-${index}`}
                        image={image}
                        onClick={handleImageClick}
                        index={index}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Load More Button */}
                <div className="w-full flex items-center justify-center mt-8 mb-4">
                  {hasMore ? (
                    <motion.button
                      onClick={loadMore}
                      disabled={loading}
                      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                        loading
                          ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                      }`}
                      whileHover={!loading ? { scale: 1.05 } : {}}
                      whileTap={!loading ? { scale: 0.95 } : {}}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                          <span>Memuat...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          <span>Muat Foto Lainnya</span>
                        </div>
                      )}
                    </motion.button>
                  ) : (
                    images.length > 0 && (
                      <motion.div
                        className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
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
                        <span>Semua foto telah dimuat</span>
                      </motion.div>
                    )
                  )}
                </div>
              </>
            )}
          </MotionDiv>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox
            image={selectedImage}
            onClose={handleCloseLightbox}
            onPrev={handlePrevImage}
            onNext={handleNextImage}
            hasPrev={activeIndex > 0}
            hasNext={activeIndex < filteredImages.length - 1}
            currentIndex={activeIndex}
            totalImages={filteredImages.length}
          />
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles */}
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
