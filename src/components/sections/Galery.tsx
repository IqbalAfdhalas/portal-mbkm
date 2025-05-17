'use client';

import { useState } from 'react';
import { Share2, Heart, Download, ExternalLink } from 'lucide-react';

// Type definitions for gallery items
interface GalleryItem {
  id: string;
  title: string;
  category: string;
  thumbnailUrl: string;
  type: 'photo' | 'video';
  publishedAt: string;
  description?: string;
  likes?: number;
}

// Sample gallery data - replace with your actual data source
const galleryData: GalleryItem[] = [
  {
    id: '1',
    title: 'Kegiatan Seminar Nasional MBKM 2025',
    category: 'Seminar',
    thumbnailUrl: '/api/placeholder/600/400',
    type: 'photo',
    publishedAt: '2025-05-01',
    description: 'Seminar nasional membahas perkembangan program MBKM di Indonesia',
    likes: 42,
  },
  {
    id: '2',
    title: 'Workshop Pengembangan Web MBKM Batch 12',
    category: 'Workshop',
    thumbnailUrl: '/api/placeholder/600/400',
    type: 'video',
    publishedAt: '2025-04-25',
    description: 'Mahasiswa mempelajari teknik pengembangan web modern',
    likes: 36,
  },
  {
    id: '3',
    title: 'Pelepasan Magang Mahasiswa Angkatan 2023',
    category: 'Kegiatan Kampus',
    thumbnailUrl: '/api/placeholder/600/400',
    type: 'photo',
    publishedAt: '2025-04-20',
    description: 'Acara pelepasan mahasiswa magang ke berbagai industri partner',
    likes: 29,
  },
  {
    id: '4',
    title: 'Dokumentasi Program Pertukaran Mahasiswa 2025',
    category: 'Magang',
    thumbnailUrl: '/api/placeholder/600/400',
    type: 'video',
    publishedAt: '2025-04-15',
    description: 'Kegiatan mahasiswa pertukaran di berbagai kampus mitra',
    likes: 45,
  },
  {
    id: '5',
    title: 'Kunjungan Industri ke Perusahaan Mitra MBKM',
    category: 'Kegiatan Kampus',
    thumbnailUrl: '/api/placeholder/600/400',
    type: 'photo',
    publishedAt: '2025-04-10',
    description: 'Mahasiswa berkunjung ke perusahaan teknologi terkemuka',
    likes: 38,
  },
  {
    id: '6',
    title: 'Penandatanganan MoU dengan Industri Partner Baru',
    category: 'Kegiatan Kampus',
    thumbnailUrl: '/api/placeholder/600/400',
    type: 'photo',
    publishedAt: '2025-04-05',
    description: 'Perluasan kerjasama dengan mitra industri untuk program MBKM',
    likes: 27,
  },
];

// Date formatter utility
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

// GalleryItem component
const GalleryItem = ({
  item,
  onItemClick,
}: {
  item: GalleryItem;
  onItemClick: (item: GalleryItem) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Share functionality can be implemented here
    alert(`Berbagi: ${item.title}`);
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 h-full bg-white dark:bg-gray-800 cursor-pointer group"
      style={{ transform: isHovered ? 'translateY(-5px)' : 'translateY(0)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onItemClick(item)}
    >
      <div className="relative w-full h-52 sm:h-56 md:h-64 bg-gray-200 overflow-hidden">
        <img
          src={item.thumbnailUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-blue-600/75 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
            onClick={handleShare}
            aria-label="Share"
          >
            <Share2 size={16} className="text-blue-600 dark:text-blue-400" />
          </button>
          <button
            className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
            onClick={handleLike}
            aria-label="Like"
          >
            <Heart
              size={16}
              className={liked ? 'text-red-500 fill-red-500' : 'text-gray-600 dark:text-gray-400'}
            />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
            {item.category}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(item.publishedAt)}
          </span>
        </div>
        <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-white line-clamp-2 mb-2">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
            {item.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Heart size={14} className="mr-1" />
            <span>{item.likes || 0}</span>
          </div>
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center">
            Detail <ExternalLink size={12} className="ml-1" />
          </span>
        </div>
      </div>
    </div>
  );
};

// Modal component for detailed view
const GalleryModal = ({
  item,
  isOpen,
  onClose,
}: {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen || !item) return null;

  // Close when clicking outside the modal content
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <div className="relative aspect-video bg-gray-200">
            <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-blue-600/75 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700/75 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
              {item.category}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(item.publishedAt)}
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{item.title}</h2>

          {item.description && (
            <p className="text-gray-600 dark:text-gray-300 mb-6">{item.description}</p>
          )}

          <div className="flex items-center justify-between border-t dark:border-gray-700 pt-4">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Heart size={18} />
                <span>Suka ({item.likes})</span>
              </button>
              <button className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Share2 size={18} />
                <span>Bagikan</span>
              </button>
            </div>

            <button className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
              <Download size={18} />
              <span>Unduh</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Gallery component
export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sort items by likes to get the most popular ones
  const popularItems = [...galleryData].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 4);

  // Handle item click to open modal
  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="Galery" className="relative w-full py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-secondary uppercase tracking-wider">
            Program Unggulan
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary dark:text-white mt-2 mb-4">
            Galeri MBKM di BAST ANRI
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-sm">
            Berikut dokumentasi kegiatan MBKM yang telah dilaksanakan oleh mahasiswa di lingkungan
            BAST ANRI.
          </p>
        </div>

        {/* Grid layout with 2x2 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {popularItems.map(item => (
            <GalleryItem key={item.id} item={item} onItemClick={handleItemClick} />
          ))}
        </div>

        {/* Lihat Semua button moved to the bottom */}
        <div className="flex justify-center mt-10">
          <a
            href="/galeri"
            className="px-6 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300 text-sm font-medium flex items-center"
          >
            Lihat Semua
            <ExternalLink size={16} className="ml-2" />
          </a>
        </div>
      </div>

      {/* Modal for item details */}
      <GalleryModal item={selectedItem} isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
}
