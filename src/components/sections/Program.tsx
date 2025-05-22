// src/components/sections/Program.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import slugify from 'slugify';

const ProgramPreview = () => {
  // Menggunakan varian dash untuk semua list item
  const LIST_STYLE = 'dash';

  // Redesigned basePrograms with brighter colors
  const basePrograms = [
    {
      title: 'Aktivitas Unit',
      icon: '/images/Aktivitas Unit.png',
      description: 'Rasakan langsung serunya jadi bagian dari tiap unit di BAST ANRI!',
      features: [
        'Unit Akuisisi Arsip',
        'Unit Pengolahan Arsip',
        'Unit Preservasi Arsip',
        'Unit Pelayanan Arsip',
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
      icon: '/images/Kunjungan ke Dalam BAST ANRI.png',
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
      icon: '/images/Kunjungan ke Luar BAST ANRI.png',
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
      icon: '/images/Daily Activity.png',
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
      title: 'Pameran Arsip',
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

  const programs = [...basePrograms, ...basePrograms, ...basePrograms];
  const originalLength = basePrograms.length;
  const initialIndex = originalLength;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const AUTO_SCROLL_INTERVAL = 10000; // 5 detik untuk scrolling otomatis
  const PAUSE_DURATION = 10000; // detik durasi pause setelah klik manual

  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 3;
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 3;
  };

  const visibleCards = getVisibleCount();

  useEffect(() => {
    const updateWidth = () => {
      if (carousel.current) {
        const cardWidth = carousel.current.scrollWidth / programs.length;
        setWidth(cardWidth);
      }
    };
    updateWidth();
    startAutoScroll();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!carousel.current) return;
    const totalLength = programs.length;
    const maxIndex = totalLength - visibleCards;
    const buffer = 2;

    carousel.current.style.transition = 'transform 0.5s ease';
    carousel.current.style.transform = `translateX(-${currentIndex * width}px)`;

    if (currentIndex <= buffer || currentIndex >= maxIndex - buffer) {
      setTimeout(() => {
        if (carousel.current) {
          carousel.current.style.transition = 'none';
          setCurrentIndex(initialIndex);
          carousel.current.style.transform = `translateX(-${initialIndex * width}px)`;
        }
      }, 500);
    }
  }, [currentIndex, width]);

  // Memulai auto scroll
  const startAutoScroll = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);

    if (!isPaused) {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex(prev => prev + 1);
      }, AUTO_SCROLL_INTERVAL);
    }
  };

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
  }, [isPaused]);

  // Menangani klik tombol navigasi
  const handleNavClick = (direction: 'prev' | 'next') => {
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
  };

  // Function to render list items based on selected style
  const renderListItem = (program: any, feature: string, index: number) => {
    return (
      <div
        key={feature + index}
        className="flex items-center p-1 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/20 transition-colors duration-300"
      >
        <div className="flex-shrink-0 mr-2 font-bold" style={{ color: program.colorStart }}>
          —
        </div>
        <span className="text-xs text-gray-700 dark:text-gray-200 font-medium">{feature}</span>
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
      className="py-20 min-h-[100vh] bg-gradient-to-b from-white via-gray-50 to-white dark:from-[#0f172a] dark:via-dark-surface dark:to-[#0f172a]"
    >
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-secondary uppercase tracking-wider">
            Program Unggulan
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary dark:text-white mt-2 mb-4">
            Program MBKM di BAST ANRI
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Berikut adalah program-program MBKM yang dapat diikuti mahasiswa di Balai Arsip Statis
            dan Tsunami ANRI.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => handleNavClick('prev')}
            className="absolute -left-8 lg:-left-12 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full p-3 shadow-lg hover:scale-110 hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="Previous program"
          >
            <svg
              className="w-5 h-5 text-primary dark:text-blue-400"
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

          <div className="overflow-hidden relative">
            <div ref={carousel} className="flex" style={{ willChange: 'transform' }}>
              {programs.map((program, index) => (
                <div
                  key={`program-${index}`}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4"
                >
                  <div
                    className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden 
                    hover:shadow-xl dark:hover:shadow-blue-900/20 transition-all duration-500
                    hover:-translate-y-2 border border-transparent hover:border-blue-100 dark:hover:border-blue-900
                    flex flex-col h-full"
                    style={{
                      borderTopWidth: '4px',
                      borderTopColor: program.borderColor.replace('border-', ''),
                    }}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-gradient-to-br from-primary to-transparent" />

                    {/* Decorative Circle */}
                    <div
                      className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br blur-md group-hover:scale-125 transition-transform duration-700"
                      style={{
                        background: `radial-gradient(circle, ${program.colorStart}30 0%, ${program.colorEnd}15 70%)`,
                      }}
                    />

                    <div
                      className={`relative h-40 overflow-hidden group-hover:h-44 transition-all duration-500`}
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
                            width={150}
                            height={150}
                            className="object-contain drop-shadow-lg"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col p-5 z-10 relative flex-grow">
                      <h3
                        className="text-xl font-heading font-bold text-center mb-3 bg-clip-text text-transparent"
                        style={{
                          textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                          backgroundImage: `linear-gradient(to right, ${program.colorStart}, ${program.colorEnd})`,
                        }}
                      >
                        {program.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 text-center mb-4 text-sm italic">
                        "{program.description}"
                      </p>

                      <div className="space-y-1 mb-4">
                        {program.features.map((feature, featureIndex) =>
                          renderListItem(program, feature, featureIndex)
                        )}
                      </div>

                      <div className="text-center mt-auto">
                        <Link
                          href={`/sections-program/${slugify(program.title, { lower: true })}`}
                          className={`
                          group relative inline-flex items-center justify-center gap-1 
                          px-4 py-2 rounded-lg overflow-hidden
                          text-white text-sm font-medium
                          shadow-md hover:shadow-lg
                          transition-all duration-300 ease-in-out
                          hover:-translate-y-1
                          before:absolute before:inset-0 before:origin-left before:scale-x-0 hover:before:scale-x-100
                          before:transition-transform before:duration-300 before:ease-out
                          before:z-0
                        `}
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
                              className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
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
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleNavClick('next')}
            className="absolute -right-8 lg:-right-12 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full p-3 shadow-lg hover:scale-110 hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="Next program"
          >
            <svg
              className="w-5 h-5 text-primary dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
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
      `}</style>
    </section>
  );
};

export default ProgramPreview;
