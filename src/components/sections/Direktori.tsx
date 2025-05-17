// src/components/sections/Directory.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';

// Type definitions for our participant data
interface Participant {
  id: string;
  name: string;
  university: string;
  programStudy?: string;
  partner: string;
  status: 'active' | 'completed' | 'discontinued';
  year: string;
  projectCategory?: string;
  email?: string;
  photoUrl: string;
}

// Sample data for the carousel
const sampleParticipants: Participant[] = [
  {
    id: '1',
    name: 'Farhan Akbar',
    university: 'Universitas Gadjah Mada',
    programStudy: 'Teknik Informatika',
    partner: 'BAST ANRI',
    status: 'active',
    year: '2025',
    projectCategory: 'Digitalisasi Arsip Nasional',
    email: 'farhan.akbar@mail.ugm.ac.id',
    photoUrl: '/api/placeholder/150/150'
  },
  {
    id: '2',
    name: 'Siti Nurhaliza',
    university: 'Universitas Indonesia',
    programStudy: 'Ilmu Perpustakaan',
    partner: 'BAST ANRI',
    status: 'active',
    year: '2025',
    projectCategory: 'Katalogisasi Digital',
    email: 'siti.nurhaliza@ui.ac.id',
    photoUrl: '/api/placeholder/150/150'
  },
  {
    id: '3',
    name: 'Budi Santoso',
    university: 'Institut Teknologi Bandung',
    programStudy: 'Teknik Elektro',
    partner: 'BAST ANRI',
    status: 'active',
    year: '2025',
    projectCategory: 'Otomasi Sistem Pendataan',
    email: 'budi.santoso@std.itb.ac.id',
    photoUrl: '/api/placeholder/150/150'
  },
  {
    id: '4',
    name: 'Anisa Rahmawati',
    university: 'Universitas Airlangga',
    programStudy: 'Sistem Informasi',
    partner: 'BAST ANRI',
    status: 'active',
    year: '2025',
    projectCategory: 'Pengembangan Database',
    email: 'anisa.rahmawati@unair.ac.id',
    photoUrl: '/api/placeholder/150/150'
  },
  {
    id: '5',
    name: 'Hendra Wijaya',
    university: 'Universitas Diponegoro',
    programStudy: 'Ilmu Sejarah',
    partner: 'BAST ANRI',
    status: 'active',
    year: '2025',
    projectCategory: 'Pelestarian Dokumen Bersejarah',
    email: 'hendra.wijaya@students.undip.ac.id',
    photoUrl: '/api/placeholder/150/150'
  },
  {
    id: '6',
    name: 'Diana Putri',
    university: 'Universitas Brawijaya',
    programStudy: 'Manajemen Informasi',
    partner: 'BAST ANRI',
    status: 'active',
    year: '2025',
    projectCategory: 'Sistem Klasifikasi Arsip',
    email: 'diana.putri@ub.ac.id',
    photoUrl: '/api/placeholder/150/150'
  }
];

// Create an infinite array for the carousel by duplicating items
const createInfiniteArray = (items: Participant[]): Participant[] => {
  // For a seamless infinite scroll, we need to duplicate the array
  // Adding unique key identifiers to avoid React key warnings
  return [
    ...items.map(item => ({ ...item, id: `clone-start-${item.id}` })),
    ...items,
    ...items.map(item => ({ ...item, id: `clone-end-${item.id}` }))
  ];
};

const Directory = () => {
  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Generate infinite array for seamless scrolling
  const infiniteParticipants = createInfiniteArray(sampleParticipants);
  
  // Calculate values for scrolling 
  const cardWidth = 300; // Approximate width of card + margin
  const originalLength = sampleParticipants.length;
  const middleIndex = originalLength; // Index where the original array starts in infiniteParticipants
  
  // Initial positioning at the start of the original items (not the clones)
  useEffect(() => {
    if (carouselRef.current) {
      // Position at the start of original array (after first set of clones)
      const initialScrollPosition = middleIndex * cardWidth;
      carouselRef.current.scrollLeft = initialScrollPosition;
      setScrollPosition(initialScrollPosition);
    }
    
    // Start autoscroll upon component mount
    resetAutoPlayTimer();
  }, []);
  
  // Handle infinite scroll effect
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;
    
    // If we've scrolled to the cloned area at the beginning
    if (scrollPosition < originalLength * cardWidth && scrollPosition > 0) {
      // Check if we're too close to the start
      if (scrollPosition < cardWidth) {
        // Jump to the end of the original items (before last set of clones)
        const newPosition = (middleIndex + originalLength - 1) * cardWidth;
        container.scrollLeft = newPosition;
        setScrollPosition(newPosition);
      }
    }
    
    // If we've scrolled to the cloned area at the end
    if (scrollPosition > (middleIndex + originalLength - 1) * cardWidth) {
      // Check if we're too far to the end
      if (scrollPosition > (infiniteParticipants.length - 2) * cardWidth) {
        // Jump to the start of the original items (after first set of clones)
        const newPosition = middleIndex * cardWidth;
        container.scrollLeft = newPosition;
        setScrollPosition(newPosition);
      }
    }
  }, [scrollPosition, infiniteParticipants.length, originalLength, middleIndex, cardWidth]);

  // Reset autoplay timer
  const resetAutoPlayTimer = () => {
    if (autoScrollTimerRef.current) {
      clearTimeout(autoScrollTimerRef.current);
    }
    
    if (autoPlay && !isHovering && !isScrolling) {
      autoScrollTimerRef.current = setTimeout(() => {
        handleScroll('right', true);
      }, 5000); // 5 seconds interval for auto-scroll
    }
  };

  // Setup auto-scroll effect
  useEffect(() => {
    resetAutoPlayTimer();
    
    return () => {
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current);
      }
    };
  }, [autoPlay, scrollPosition, isHovering, isScrolling]);

  // Function to handle card scrolling
  const handleScroll = (direction: 'left' | 'right', isAutoScroll = false) => {
    const container = carouselRef.current;
    if (!container || isScrolling) return;
    
    setIsScrolling(true);
    
    let newScrollPosition = scrollPosition;
    if (direction === 'left') {
      newScrollPosition = scrollPosition - cardWidth;
    } else {
      newScrollPosition = scrollPosition + cardWidth;
    }
    
    container.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
    setScrollPosition(newScrollPosition);
    
    // When manually scrolling, reset the auto-scroll timer
    if (!isAutoScroll) {
      resetAutoPlayTimer();
    }
    
    // Allow scrolling again after animation completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 500); // Slightly less than scroll animation duration
  };

  // Handle manual scroll events
  const handleScrollEvent = () => {
    if (carouselRef.current && !isScrolling) {
      setScrollPosition(carouselRef.current.scrollLeft);
      resetAutoPlayTimer(); // Reset timer on manual scroll
    }
  };

  // Setup scroll event listener
  useEffect(() => {
    const container = carouselRef.current;
    if (container) {
      container.addEventListener('scroll', handleScrollEvent);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScrollEvent);
      }
    };
  }, [isScrolling]);

  // Function to toggle autoplay
  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  // Function to open participant detail modal
  const openParticipantDetail = (participant: Participant) => {
    // Remove the clone prefix if present to get the original participant
    const originalId = participant.id.replace(/^clone-(start|end)-/, '');
    const originalParticipant = sampleParticipants.find(p => p.id === originalId) || participant;
    
    setCurrentParticipant(originalParticipant);
    setAutoPlay(false); // Pause autoplay when viewing details
  };

  // Function to close participant detail modal
  const closeParticipantDetail = () => {
    setCurrentParticipant(null);
    setAutoPlay(true); // Resume autoplay when closing details
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-dark-surface">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-heading font-semibold text-primary dark:text-white">
              Direktori Peserta MBKM
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Lihat siapa saja yang sedang berkontribusi di program MBKM BAST ANRI.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleAutoPlay} 
              className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-light bg-opacity-10 text-primary-light hover:bg-opacity-20 transition"
              aria-label={autoPlay ? "Pause auto-scroll" : "Play auto-scroll"}
            >
              {autoPlay ? <BsPauseFill size={20} /> : <BsPlayFill size={20} />}
            </button>
            
            <Link 
              href="/direktori" 
              className="text-sm font-medium text-primary-light hover:text-primary dark:text-blue-400 dark:hover:text-blue-300 transition"
            >
              Lihat Semua
            </Link>
          </div>
        </div>

        {/* Carousel Navigation */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full px-2 z-10">
            <button 
              onClick={() => handleScroll('left')}
              className="bg-white dark:bg-dark-surface rounded-full p-2 shadow-md text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-blue-400 transition"
            >
              <IoIosArrowBack size={20} />
            </button>
            <button 
              onClick={() => handleScroll('right')}
              className="bg-white dark:bg-dark-surface rounded-full p-2 shadow-md text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-blue-400 transition"
            >
              <IoIosArrowForward size={20} />
            </button>
          </div>

          {/* Carousel Indicator */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2 z-10">
            {Array.from({ length: sampleParticipants.length }).map((_, index) => {
              // Calculate which card is active based on scroll position, accounting for the cloned items
              const scrollPos = scrollPosition / cardWidth;
              // Get position in the original array (modulo originalLength)
              const activePosition = ((scrollPos - middleIndex) % originalLength + originalLength) % originalLength;
              const isActive = Math.round(activePosition) === index;
              
              return (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${isActive ? 'bg-primary-light w-4' : 'bg-gray-300 dark:bg-gray-600'}`}
                />
              );
            })}
          </div>

          {/* Carousel Container */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4 px-2 -mx-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {infiniteParticipants.map((participant) => (
              <motion.div 
                key={participant.id}
                className="snap-start flex-shrink-0 w-64 sm:w-72 md:w-80 mx-2"
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="bg-white dark:bg-dark-surface rounded-lg shadow-md overflow-hidden h-full border border-transparent hover:border-primary-light hover:shadow-lg transition duration-300">
                  <div className="p-5 flex flex-col items-center">
                    <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-primary-light">
                      <Image 
                        src={participant.photoUrl} 
                        alt={participant.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-heading font-medium text-lg text-center">{participant.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm text-center mt-1">{participant.university}</p>
                    <p className="text-primary-light dark:text-blue-400 text-sm mt-2">Mitra: {participant.partner}</p>
                    
                    <button
                      onClick={() => openParticipantDetail(participant)}
                      className="mt-4 px-4 py-1.5 bg-primary-light text-white text-sm rounded-md hover:bg-primary transition"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {currentParticipant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-dark-surface rounded-lg shadow-lg max-w-md w-full mx-auto overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mr-4 border-2 border-primary-light">
                    <Image 
                      src={currentParticipant.photoUrl} 
                      alt={currentParticipant.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-xl">{currentParticipant.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{currentParticipant.university}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <p><span className="font-medium">Program Studi:</span> {currentParticipant.programStudy}</p>
                <p><span className="font-medium">Mitra:</span> {currentParticipant.partner}</p>
                <p><span className="font-medium">Status Program:</span> {
                  currentParticipant.status === 'active' ? 
                    <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">Aktif</span> : 
                  currentParticipant.status === 'completed' ? 
                    <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">Selesai</span> : 
                    <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs">Tidak Lanjut</span>
                }</p>
                <p><span className="font-medium">Tahun Program:</span> {currentParticipant.year}</p>
                {currentParticipant.projectCategory && (
                  <p><span className="font-medium">Kategori Proyek:</span> {currentParticipant.projectCategory}</p>
                )}
                {currentParticipant.email && (
                  <p><span className="font-medium">Email:</span> <a href={`mailto:${currentParticipant.email}`} className="text-primary-light hover:underline">{currentParticipant.email}</a></p>
                )}
              </div>

              <button
                onClick={closeParticipantDetail}
                className="mt-6 w-full px-4 py-2 bg-primary-light text-white text-sm rounded-md hover:bg-primary transition"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Directory;