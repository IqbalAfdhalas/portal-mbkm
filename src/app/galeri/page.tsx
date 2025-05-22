// src/app/galeri/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSearch, FiShare2, FiChevronDown, FiImage, FiVideo, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MotionDiv } from '@/components/common/MotionClientOnly';

// Types
interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  mediaUrl: string;
  thumbnailUrl: string;
  type: 'photo' | 'video';
  category: string;
  createdAt: Date;
  publishedAt: Date;
}

interface Category {
  id: string;
  name: string;
  color: string;
}

// Mock data
const categories: Category[] = [
  { id: 'all', name: 'Semua', color: '#0B3954' },
  { id: 'campus', name: 'Kegiatan Kampus', color: '#087E8B' },
  { id: 'seminar', name: 'Seminar', color: '#FF5A5F' },
  { id: 'workshop', name: 'Workshop', color: '#9B5DE5' },
  { id: 'internship', name: 'Magang', color: '#00BBF9' },
];

const generateMockGalleryItems = (): GalleryItem[] => {
  const items: GalleryItem[] = [];
  const types: ('photo' | 'video')[] = ['photo', 'photo', 'photo', 'video', 'photo', 'video'];
  const categoryIds = categories.slice(1).map(c => c.id);

  for (let i = 1; i <= 20; i++) {
    const type = types[i % types.length];
    const catId = categoryIds[i % categoryIds.length];
    const today = new Date();
    const publishedDate = new Date(today);
    publishedDate.setDate(today.getDate() - i * 2);

    items.push({
      id: `gallery-item-${i}`,
      title: `${type === 'photo' ? 'Foto' : 'Video'} ${getCategoryName(catId)} #${i}`,
      description: `Deskripsi untuk item galeri #${i}. Ini adalah ${type === 'photo' ? 'foto' : 'video'} dari kegiatan ${getCategoryName(catId)}.`,
      mediaUrl: `/api/placeholder/800/${type === 'photo' ? 600 : 400}`,
      thumbnailUrl: `/api/placeholder/600/${type === 'photo' ? 450 : 350}`,
      type: type,
      category: catId,
      createdAt: publishedDate,
      publishedAt: publishedDate,
    });
  }
  return items;
};

const getCategoryName = (id: string): string => {
  const category = categories.find(c => c.id === id);
  return category ? category.name : '';
};

const getCategoryColor = (id: string): string => {
  const category = categories.find(c => c.id === id);
  return category ? category.color : '#0B3954';
};

// Main Component
const GalleryPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const itemsPerPage = 8;

  // Initialize data (would be replaced by real API calls)
  useEffect(() => {
    const mockData = generateMockGalleryItems();
    setGalleryItems(mockData);
    setLoading(false);
  }, []);

  // Handle filtering and pagination
  useEffect(() => {
    if (galleryItems.length > 0) {
      let filtered = [...galleryItems];

      // Apply category filter
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(item => item.category === selectedCategory);
      }

      // Apply search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          item =>
            item.title.toLowerCase().includes(query) ||
            (item.description && item.description.toLowerCase().includes(query))
        );
      }

      setFilteredItems(filtered.slice(0, page * itemsPerPage));
      setHasMore(filtered.length > page * itemsPerPage);
    }
  }, [galleryItems, selectedCategory, searchQuery, page]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const handleShare = (item: GalleryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    // Implement sharing functionality here
    alert(`Berbagi ${item.title}`);
  };

  const handleOpenLightbox = (item: GalleryItem) => {
    setLightboxItem(item);
  };

  const handleCloseLightbox = () => {
    setLightboxItem(null);
  };

  const handlePrevItem = () => {
    if (!lightboxItem) return;

    const currentIndex = filteredItems.findIndex(item => item.id === lightboxItem.id);
    if (currentIndex > 0) {
      setLightboxItem(filteredItems[currentIndex - 1]);
    }
  };

  const handleNextItem = () => {
    if (!lightboxItem) return;

    const currentIndex = filteredItems.findIndex(item => item.id === lightboxItem.id);
    if (currentIndex < filteredItems.length - 1) {
      setLightboxItem(filteredItems[currentIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary-light dark:from-dark-primary dark:to-primary py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
                Galeri
              </h1>
              <nav className="text-sm text-white/70">
                <ol className="flex items-center">
                  <li>
                    <a href="/" className="hover:text-white">
                      Beranda
                    </a>
                  </li>
                  <li>
                    <span className="mx-2">&gt;</span>
                  </li>
                  <li className="text-white">Galeri</li>
                </ol>
              </nav>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <input
                type="text"
                placeholder="Cari di galeri..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg shadow-md focus:ring-2 focus:ring-primary-light focus:outline-none dark:bg-gray-800 dark:text-white"
              />
              <FiSearch
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                size={18}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filter Section */}
        <div className="mb-8">
          {/* Mobile Filter */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="w-full flex items-center justify-between px-5 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm"
            >
              <span className="font-medium">
                {getCategoryName(selectedCategory) || 'Semua Kategori'}
              </span>
              <FiChevronDown
                className={`transform transition-transform ${mobileFilterOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {mobileFilterOpen && (
                <MotionDiv
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setPage(1);
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        selectedCategory === category.id
                          ? 'font-medium text-primary-light dark:text-blue-400'
                          : ''
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </MotionDiv>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Filter Tabs */}
          <div className="hidden md:flex space-x-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setPage(1);
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary-light text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-800 rounded-lg h-64 animate-pulse"
              />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <FiImage className="mx-auto text-gray-400 dark:text-gray-600" size={64} />
            <h3 className="mt-4 text-xl font-heading font-medium text-gray-700 dark:text-gray-300">
              Tidak ada item yang ditemukan
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Coba ubah filter atau kata kunci pencarian Anda
            </p>
          </div>
        ) : (
          <MotionDiv
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            <AnimatePresence>
              {filteredItems.map(item => (
                <MotionDiv
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative group rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
                  onClick={() => handleOpenLightbox(item)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.thumbnailUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
                          <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[14px] border-l-white ml-1"></div>
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white font-medium truncate">{item.title}</h3>
                    </div>

                    <button
                      onClick={e => handleShare(item, e)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:dark:bg-gray-700"
                    >
                      <FiShare2 size={16} className="text-gray-700 dark:text-gray-200" />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-heading font-medium line-clamp-2 text-gray-800 dark:text-gray-200 mb-1">
                        {item.title}
                      </h3>
                      {item.type === 'photo' ? (
                        <FiImage
                          className="flex-shrink-0 text-gray-500 dark:text-gray-400"
                          size={16}
                        />
                      ) : (
                        <FiVideo
                          className="flex-shrink-0 text-gray-500 dark:text-gray-400"
                          size={16}
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span
                        className="inline-block px-2 py-1 text-xs rounded"
                        style={{
                          backgroundColor: `${getCategoryColor(item.category)}20`,
                          color: getCategoryColor(item.category),
                        }}
                      >
                        {getCategoryName(item.category)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(item.publishedAt)}
                      </span>
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </AnimatePresence>
          </MotionDiv>
        )}

        {/* Load More Button */}
        {hasMore && !loading && (
          <div className="mt-8 text-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-sm hover:bg-primary-light transition-colors"
            >
              Muat Lebih Banyak
            </button>
          </div>
        )}
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={handleCloseLightbox}
          >
            <button
              onClick={handleCloseLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 z-10"
            >
              <FiX size={24} />
            </button>

            <button
              onClick={e => {
                e.stopPropagation();
                handlePrevItem();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 z-10"
            >
              <FiChevronDown className="transform rotate-90" size={28} />
            </button>

            <button
              onClick={e => {
                e.stopPropagation();
                handleNextItem();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 z-10"
            >
              <FiChevronDown className="transform -rotate-90" size={28} />
            </button>

            <div
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative max-h-[70vh] w-full flex items-center justify-center mb-4">
                {lightboxItem.type === 'photo' ? (
                  <div className="relative w-full h-full max-h-[70vh]">
                    <Image
                      src={lightboxItem.mediaUrl}
                      alt={lightboxItem.title}
                      className="object-contain"
                      fill
                      sizes="100vw"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-0 pb-[56.25%]">
                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                      <Image
                        src={lightboxItem.mediaUrl}
                        alt={lightboxItem.title}
                        className="object-contain"
                        fill
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-20 h-20 rounded-full bg-black/50 flex items-center justify-center">
                          <div className="w-0 h-0 border-y-[15px] border-y-transparent border-l-[25px] border-l-white ml-2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 w-full max-w-3xl">
                <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-white">
                  {lightboxItem.title}
                </h2>

                {lightboxItem.description && (
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    {lightboxItem.description}
                  </p>
                )}

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <span
                      className="inline-block px-3 py-1 text-sm rounded-lg"
                      style={{
                        backgroundColor: `${getCategoryColor(lightboxItem.category)}20`,
                        color: getCategoryColor(lightboxItem.category),
                      }}
                    >
                      {getCategoryName(lightboxItem.category)}
                    </span>
                    <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(lightboxItem.publishedAt)}
                    </span>
                  </div>

                  <button
                    onClick={e => handleShare(lightboxItem, e)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FiShare2 size={16} />
                    <span className="font-medium">Bagikan</span>
                  </button>
                </div>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
