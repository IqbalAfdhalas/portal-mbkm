'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Share2 } from 'lucide-react';

// Sample gallery data - replace with your actual data source
const sampleGalleryItems = [
  {
    id: '1',
    title: 'Kegiatan Seminar Nasional MBKM 2025',
    category: 'Seminar',
    thumbnailUrl: '/api/placeholder/600/400',
    type: 'photo',
    publishedAt: '2025-05-01'
  },
  {
    id: '2',
    title: 'Workshop Pengembangan Web MBKM Batch 12',
    category: 'Workshop',
    thumbnailUrl: '/api/placeholder/600/400',
    type: 'video',
    publishedAt: '2025-04-25'
  },
  {
    id: '3',
    title: 'Pelepasan Magang Mahasiswa Angkatan 2023',
    category: 'Kegiatan Kampus',
    thumbnailUrl: '/api/placeholder/600/400',
    type: 'photo',
    publishedAt: '2025-04-20'
  },
  {
    id: '4',
    title: 'Dokumentasi Program Pertukaran Mahasiswa 2025',
    category: 'Magang',
    thumbnailUrl: '/api/placeholder/600/400',
    type: 'video',
    publishedAt: '2025-04-15'
  },
  {
    id: '5',
    title: 'Kunjungan Industri ke Perusahaan Mitra MBKM',
    category: 'Kegiatan Kampus',
    thumbnailUrl: '/api/placeholder/600/400',
    type: 'photo',
    publishedAt: '2025-04-10'
  },
  {
    id: '6',
    title: 'Penandatanganan MoU dengan Industri Partner Baru',
    category: 'Kegiatan Kampus',
    thumbnailUrl: '/api/placeholder/600/400',
    type: 'photo',
    publishedAt: '2025-04-05'
  }
];

// GalleryItem component
const GalleryItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative rounded-lg overflow-hidden shadow-md transition-all duration-300 h-full"
      style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-48 sm:h-56 md:h-64 bg-gray-200">
        <img 
          src={item.thumbnailUrl} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-blue-600/75 rounded-full flex items-center justify-center">
              <Play color="white" size={24} />
            </div>
          </div>
        )}
        {isHovered && (
          <button 
            className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              // Share functionality can be implemented here
              alert(`Sharing ${item.title}`);
            }}
          >
            <Share2 size={16} className="text-blue-600" />
          </button>
        )}
      </div>
      <div className={`absolute bottom-0 left-0 right-0 p-3 text-white transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
        <div className="text-xs inline-block px-2 py-0.5 rounded bg-blue-600 mb-1">{item.category}</div>
        <h3 className="font-medium text-sm sm:text-base line-clamp-2">{item.title}</h3>
      </div>
    </div>
  );
};

// Main Gallery Preview component
export default function GalleryPreview() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);
  const totalSlides = sampleGalleryItems.length;
  
  // Update visible count based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    const play = () => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };
    
    autoPlayRef.current = play;
  }, [totalSlides]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoPlayRef.current) {
        autoPlayRef.current();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Create duplicated items array for infinite effect
  const items = [...sampleGalleryItems, ...sampleGalleryItems];
  
  const translateValue = -currentSlide * (100 / visibleCount);

  return (
    <div className="relative w-full py-8 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold font-heading text-gray-800 dark:text-white">Galeri</h2>
          <a href="/galeri" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors">
            Lihat Semua
          </a>
        </div>

        <div className="relative overflow-hidden" ref={sliderRef}>
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(${translateValue}%)`,
              width: `${items.length * (100/visibleCount)}%` 
            }}
          >
            {items.map((item, index) => (
              <div 
                key={`${item.id}-${index}`} 
                className="px-2" 
                style={{ width: `${100/visibleCount}%` }}
              >
                <GalleryItem item={item} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          <button 
            onClick={prevSlide} 
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
          
          {/* Dots for each slide (limited to original items) */}
          <div className="flex items-center gap-1 mx-2">
            {sampleGalleryItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  idx === currentSlide % totalSlides ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          
          <button 
            onClick={nextSlide} 
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
