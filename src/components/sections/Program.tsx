// src/components/sections/Program.tsx
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import slugify from 'slugify';

// Interface untuk tipe Program
interface Program {
  title: string;
  icon: string;
  description: string;
  features: string[];
  gradient: string;
  colorStart: string;
  colorEnd: string;
  borderColor: string;
  particleColor: string;
}

const ProgramPreview = () => {
  // Menggunakan varian dash untuk semua list item
  const LIST_STYLE = 'dash';

  // Redesigned basePrograms with brighter colors
  const basePrograms: Program[] = [
    {
      title: 'Aktivitas Unit',
      icon: '/images/program/logo_program/aktivitas_unit.png',
      description: 'Rasakan langsung serunya jadi bagian dari tiap unit di BAST ANRI!',
      features: [
        'Unit Akuisisi Arsip',
        'Unit Pengolahan Arsip',
        'Unit Preservasi Arsip',
        'Unit Layanan dan Pemanfaatan Arsip',
        'Unit Tata Usaha',
      ],
      gradient: 'from-yellow-300 to-amber-400',
      colorStart: '#fcd34d', // bright yellow
      colorEnd: '#fbbf24', // bright amber
      borderColor: 'border-yellow-400',
      particleColor: '#fde68a',
    },
    {
      title: 'Eksplorasi BAST ANRI',
      icon: '/images/program/logo_program/Kunjungan ke Dalam BAST ANRI.png',
      description: 'Jelajahi dunia arsip lewat tur seru langsung di BAST ANRI!',
      features: [
        'Tur Ruang Arsip',
        'Simulasi Pengarsipan',
        'Pengenalan Unit dan Fungsi',
        'Interaksi dengan Arsiparis',
      ],
      gradient: 'from-cyan-300 to-sky-400',
      colorStart: '#67e8f9', // bright cyan
      colorEnd: '#38bdf8', // bright sky blue
      borderColor: 'border-cyan-400',
      particleColor: '#a5f3fc',
    },
    {
      title: 'Learning Trip',
      icon: '/images/program/logo_program/Kunjungan_ke_Luar_BAST_ANRI.png',
      description: 'Kami datang langsung ke tempatmu bawa semangat arsip!',
      features: [
        'Sosialisasi Kearsipan',
        'Penyuluhan dan Pelatihan',
        'Kerja Sama Penyelamatan Arsip',
        'Promosi Program Arsip',
      ],
      gradient: 'from-green-300 to-emerald-400',
      colorStart: '#86efac', // bright green
      colorEnd: '#34d399', // bright emerald
      borderColor: 'border-green-400',
      particleColor: '#bbf7d0',
    },
    {
      title: 'Daily Activity',
      icon: '/images/program/logo_program/Daily Activity.png',
      description: 'Intip keseharian seru di balik layar BAST ANRI!',
      features: [
        'Pencatatan Kegiatan Harian',
        'Digitalisasi Dokumen',
        'Pelayanan Arsip Publik',
        'Rapat Evaluasi',
      ],
      gradient: 'from-violet-300 to-purple-400',
      colorStart: '#c4b5fd', // bright violet
      colorEnd: '#a78bfa', // bright purple
      borderColor: 'border-violet-400',
      particleColor: '#ddd6fe',
    },
    {
      title: 'Jejak Pameran Arsip',
      icon: '/images/program/logo_program/pameran_arsip.png',
      description: 'Lihat arsip tampil beda lewat pameran tematik dan interaktif!',
      features: [
        'Tema Sejarah Nasional',
        'Media Arsip Interaktif',
        'Pameran Keliling',
        'Edukasi Publik',
      ],
      gradient: 'from-rose-300 to-pink-400',
      colorStart: '#fda4af', // bright rose
      colorEnd: '#f472b6', // bright pink
      borderColor: 'border-rose-400',
      particleColor: '#fecdd3',
    },
  ];

  // Buat lebih banyak duplikasi untuk infinite loop yang lebih seamless
  const LOOP_COUNT = 6; // Duplikasi 6 kali untuk loop yang lebih smooth
  const programs: Program[] = Array(LOOP_COUNT).fill(basePrograms).flat();
  const originalLength = basePrograms.length;
  const initialIndex = originalLength * Math.floor(LOOP_COUNT / 2); // Mulai dari tengah

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showNavigation, setShowNavigation] = useState(true);
  const AUTO_SCROLL_INTERVAL = 10000; // 10 detik untuk scrolling otomatis
  const PAUSE_DURATION = 10000; // 10 detik durasi pause setelah klik manual

  const getVisibleCount = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1536) return 3; // 2xl screens
      if (window.innerWidth >= 1280) return 3; // xl screens
      if (window.innerWidth >= 1024) return 2; // lg screens (laptop)
      if (window.innerWidth >= 768) return 2; // md screens (tablet)
      return 1; // sm screens (mobile)
    }
    return 3;
  }, []);

  const visibleCards = getVisibleCount();

  // Memulai auto scroll - dibuat menjadi useCallback untuk menghindari dependency warning
  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);

    if (!isPaused) {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex(prev => prev + 1);
      }, AUTO_SCROLL_INTERVAL);
    }
  }, [isPaused, AUTO_SCROLL_INTERVAL]);

  useEffect(() => {
    const updateWidth = () => {
      if (carousel.current) {
        const cardWidth = carousel.current.scrollWidth / programs.length;
        setWidth(cardWidth);
      }
    };

    const handleResize = () => {
      updateWidth();
      // Update navigation visibility based on screen size
      setShowNavigation(window.innerWidth >= 768);
    };

    updateWidth();
    handleResize();
    startAutoScroll();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, [programs.length, startAutoScroll]);

  useEffect(() => {
    if (!carousel.current) return;
    const totalLength = programs.length;
    const buffer = originalLength; // Buffer zone lebih besar

    carousel.current.style.transition = 'transform 0.5s ease';
    carousel.current.style.transform = `translateX(-${currentIndex * width}px)`;

    // Reset posisi ketika mendekati ujung
    if (currentIndex <= buffer || currentIndex >= totalLength - buffer - visibleCards) {
      setTimeout(() => {
        if (carousel.current) {
          carousel.current.style.transition = 'none';
          const newIndex = initialIndex + (currentIndex % originalLength);
          setCurrentIndex(newIndex);
          carousel.current.style.transform = `translateX(-${newIndex * width}px)`;
        }
      }, 500);
    }
  }, [currentIndex, width, programs.length, visibleCards, initialIndex, originalLength]);

  // Efek untuk mengelola status auto scroll berdasarkan isPaused
  useEffect(() => {
    if (isPaused) {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
    } else {
      startAutoScroll();
    }
  }, [isPaused, startAutoScroll]);

  // Menangani klik tombol navigasi
  const handleNavClick = useCallback(
    (direction: 'prev' | 'next') => {
      // Menghentikan auto scroll yang sedang berjalan
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }

      // Mengatur status pause menjadi true
      setIsPaused(true);

      // Perbarui index carousel berdasarkan arah
      setCurrentIndex(prev => (direction === 'prev' ? prev - 1 : prev + 1));

      // Reset timer pause sebelumnya jika ada
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }

      // Mengatur timer baru untuk melanjutkan auto scroll setelah PAUSE_DURATION
      pauseTimerRef.current = setTimeout(() => {
        setIsPaused(false);
      }, PAUSE_DURATION);
    },
    [PAUSE_DURATION]
  );

  // Touch/Swipe handlers for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNavClick('next');
    } else if (isRightSwipe) {
      handleNavClick('prev');
    }
  };

  // Function to render list items based on selected style - dengan tipe data yang eksplisit
  const renderListItem = (program: Program, feature: string, index: number) => {
    return (
      <div
        key={feature + index}
        className="flex items-center p-1 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/20 transition-colors duration-300"
      >
        <div className="flex-shrink-0 mr-2 font-bold" style={{ color: program.colorStart }}>
          —
        </div>
        <span className="text-xs sm:text-sm md:text-sm lg:text-sm text-gray-700 dark:text-gray-200 font-medium">
          {feature}
        </span>
      </div>
    );
  };

  // Floating Particle Component
  const Particles = ({ color }: { color: string }) => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => {
          const size = Math.floor(Math.random() * 10) + 5; // 5-15px
          const animDuration = Math.floor(Math.random() * 20) + 10; // 10-30s
          const delay = Math.floor(Math.random() * 10); // 0-10s
          const startX = Math.floor(Math.random() * 100); // 0-100%

          return (
            <div
              key={i}
              className="absolute rounded-full opacity-70 animate-float"
              style={{
                backgroundColor: color,
                width: `${size}px`,
                height: `${size}px`,
                left: `${startX}%`,
                top: `${Math.floor(Math.random() * 100)}%`,
                animationDuration: `${animDuration}s`,
                animationDelay: `${delay}s`,
                boxShadow: `0 0 ${size / 2}px ${color}80`,
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <section
      id="program"
      className="py-8 sm:py-12 md:py-16 lg:py-20 min-h-[80vh] md:min-h-[100vh] bg-gradient-to-b from-white via-gray-50 to-white dark:from-[#0f172a] dark:via-dark-surface dark:to-[#0f172a]"
    >
      <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <span className="text-xs sm:text-sm font-medium text-secondary uppercase tracking-wider">
            Program Unggulan
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-primary dark:text-white mt-2 mb-3 sm:mb-4">
            Program MBKM di BAST ANRI
          </h2>
          <p className="max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg px-4">
            Berikut adalah program-program MBKM yang dapat diikuti mahasiswa di Balai Arsip Statis
            dan Tsunami ANRI.
          </p>
        </div>

        <div className="relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          {/* Desktop Navigation Buttons - Improved positioning - Tidak terlalu ke tepi */}
          {showNavigation && (
            <>
              <button
                onClick={() => handleNavClick('prev')}
                className="hidden md:flex absolute left-4 lg:left-8 xl:left-12 2xl:left-3 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-full shadow-lg hover:shadow-xl hover:scale-105 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 group"
                aria-label="Previous program"
              >
                <svg
                  className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => handleNavClick('next')}
                className="hidden md:flex absolute right-4 lg:right-8 xl:right-12 2xl:right-3 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-full shadow-lg hover:shadow-xl hover:scale-105 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 group"
                aria-label="Next program"
              >
                <svg
                  className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Carousel Container */}
          <div
            className="overflow-hidden relative mx-auto"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div ref={carousel} className="flex" style={{ willChange: 'transform' }}>
              {programs.map((program, index) => (
                <div
                  key={`program-${index}`}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/3 px-2 sm:px-3 md:px-4"
                >
                  <div
                    className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl dark:hover:shadow-blue-900/20 transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-blue-100 dark:hover:border-blue-900 flex flex-col h-full"
                    style={{
                      borderTopWidth: '4px',
                      borderTopColor: program.borderColor.replace('border-', ''),
                    }}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-gradient-to-br from-primary to-transparent" />

                    {/* Decorative Circle */}
                    <div
                      className="absolute -right-6 sm:-right-8 -top-6 sm:-top-8 w-20 sm:w-24 md:w-28 lg:w-32 h-20 sm:h-24 md:h-28 lg:h-32 rounded-full bg-gradient-to-br blur-md group-hover:scale-125 transition-transform duration-700"
                      style={{
                        background: `radial-gradient(circle, ${program.colorStart}30 0%, ${program.colorEnd}15 70%)`,
                      }}
                    />

                    <div
                      className={`relative h-28 sm:h-32 md:h-36 lg:h-40 overflow-hidden group-hover:h-32 sm:group-hover:h-36 md:group-hover:h-40 lg:group-hover:h-44 transition-all duration-500`}
                      style={{
                        background: `linear-gradient(135deg, ${program.colorStart}, ${program.colorEnd})`,
                      }}
                    >
                      {/* Brighter gradient banner */}
                      <div
                        className="absolute inset-0 opacity-100 group-hover:opacity-95 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(135deg, ${program.colorStart}, ${program.colorEnd})`,
                        }}
                      />

                      {/* Floating particles effect */}
                      <Particles color={program.particleColor} />

                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="flex justify-center items-center h-full">
                          <Image
                            src={program.icon}
                            alt={program.title}
                            width={100}
                            height={100}
                            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-contain drop-shadow-lg"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col p-3 sm:p-4 md:p-5 z-10 relative flex-grow">
                      <h3
                        className="text-base sm:text-lg md:text-xl lg:text-xl font-heading font-bold text-center mb-2 sm:mb-3 bg-clip-text text-transparent leading-tight"
                        style={{
                          textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                          backgroundImage: `linear-gradient(to right, ${program.colorStart}, ${program.colorEnd})`,
                        }}
                      >
                        {program.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 text-center mb-3 sm:mb-4 text-xs sm:text-sm md:text-sm italic leading-relaxed">
                        &ldquo;{program.description}&rdquo;
                      </p>

                      <div className="space-y-1 mb-4 sm:mb-6 flex-grow">
                        {program.features.map((feature: string, featureIndex: number) =>
                          renderListItem(program, feature, featureIndex)
                        )}
                      </div>

                      <div className="text-center mt-auto">
                        <Link
                          href={`/sections-program/${slugify(program.title, { lower: true })}`}
                          className="group relative inline-flex items-center justify-center gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg overflow-hidden text-white text-xs sm:text-sm md:text-base font-medium shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 before:absolute before:inset-0 before:origin-left before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-out before:z-0 w-full sm:w-auto"
                          style={
                            {
                              '--before-gradient': `linear-gradient(to right, ${program.colorEnd}, ${program.colorStart})`,
                              backgroundColor: program.colorStart,
                              backgroundImage: `linear-gradient(to right, ${program.colorStart}, ${program.colorEnd})`,
                              borderColor: program.colorStart,
                            } as React.CSSProperties
                          }
                        >
                          <span className="relative z-10 flex items-center">
                            Lihat Detail
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex md:hidden justify-center mt-4 sm:mt-6 space-x-2">
            {basePrograms.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(initialIndex + index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor((currentIndex - initialIndex) % basePrograms.length) === index
                    ? 'bg-primary w-6'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile Swipe Indicator */}
          <div className="flex md:hidden justify-center mt-3 sm:mt-4">
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span className="text-xs sm:text-sm">Geser untuk melihat program lainnya</span>
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 ml-1"
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
        </div>
      </div>

      {/* Add keyframes style for floating particles */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(20px);
          }
          75% {
            transform: translateY(-30px) translateX(-10px);
          }
        }

        .animate-float {
          animation-name: float;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        /* Custom scrollbar for webkit browsers */
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }

        .overflow-x-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Responsive breakpoint optimizations */
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          /* Tablet specific styles */
        }

        @media (min-width: 1024px) and (max-width: 1279px) {
          /* Laptop specific styles */
        }

        @media (min-width: 1280px) {
          /* Desktop specific styles */
        }

        @media (min-width: 1536px) {
          /* Large desktop specific styles */
        }
      `}</style>
    </section>
  );
};

export default ProgramPreview;
