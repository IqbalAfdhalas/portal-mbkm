// src/components/sections/Program.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import slugify from 'slugify';

const ProgramPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const basePrograms = [
    {
      title: 'Aktivitas Unit',
      icon: '/images/icons/activity.svg',
      description:
        'Kegiatan rutin unit kerja di BAST ANRI yang mencakup akuisisi arsip, pengolahan, preservasi, dan pelayanan arsip.',
      features: [
        'Unit Akuisisi Arsip',
        'Unit Pengolahan Arsip',
        'Unit Preservasi Arsip',
        'Unit Pelayanan Arsip',
      ],
      image: '/images/program-aktivitas.jpg',
      color: 'from-yellow-500/20 to-yellow-600/20',
      borderColor: 'border-yellow-500',
    },
    {
      title: 'Kunjungan ke Dalam BAST ANRI',
      icon: '/images/icons/visit-in.svg',
      description:
        'Program kunjungan dari luar instansi seperti sekolah, universitas, dan organisasi untuk mengenal pengelolaan arsip secara langsung.',
      features: [
        'Tur Ruang Arsip',
        'Simulasi Pengarsipan',
        'Pengenalan Unit dan Fungsi',
        'Interaksi dengan Arsiparis',
      ],
      image: '/images/program-kunjungan-dalam.jpg',
      color: 'from-indigo-500/20 to-indigo-600/20',
      borderColor: 'border-indigo-500',
    },
    {
      title: 'Kunjungan ke Luar BAST ANRI',
      icon: '/images/icons/visit-out.svg',
      description:
        'Kegiatan edukasi dan promosi arsip oleh tim BAST ANRI ke instansi atau lembaga lain di luar.',
      features: [
        'Sosialisasi Kearsipan',
        'Penyuluhan dan Pelatihan',
        'Kerja Sama Penyelamatan Arsip',
        'Promosi Program Arsip',
      ],
      image: '/images/program-kunjungan-luar.jpg',
      color: 'from-red-500/20 to-red-600/20',
      borderColor: 'border-red-500',
    },
    {
      title: 'Daily Activity',
      icon: '/images/icons/daily.svg',
      description:
        'Kegiatan harian staf dan peserta magang di BAST ANRI yang terdokumentasi secara berkala.',
      features: [
        'Pencatatan Kegiatan Harian',
        'Digitalisasi Dokumen',
        'Pelayanan Arsip Publik',
        'Rapat Evaluasi',
      ],
      image: '/images/program-daily.jpg',
      color: 'from-pink-500/20 to-pink-600/20',
      borderColor: 'border-pink-500',
    },
    {
      title: 'Pameran Arsip',
      icon: '/images/icons/exhibition.svg',
      description:
        'Program untuk memperkenalkan arsip kepada masyarakat luas melalui pameran tematik dan interaktif.',
      features: [
        'Tema Sejarah Nasional',
        'Media Arsip Interaktif',
        'Pameran Keliling',
        'Edukasi Publik',
      ],
      image: '/images/program-pameran.jpg',
      color: 'from-orange-500/20 to-orange-600/20',
      borderColor: 'border-orange-500',
    },
  ];

  const programs = [...basePrograms, ...basePrograms];
  const originalLength = basePrograms.length;

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
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (currentIndex >= programs.length - visibleCards) {
      const timeout = setTimeout(() => {
        if (carousel.current) {
          carousel.current.style.transition = 'none';
          setCurrentIndex(0);
          carousel.current.style.transform = `translateX(0px)`;
        }
      }, 300);
      return () => clearTimeout(timeout);
    } else {
      if (carousel.current) {
        carousel.current.style.transition = 'transform 0.5s ease';
        carousel.current.style.transform = `translateX(-${currentIndex * width}px)`;
      }
    }
  }, [currentIndex, width]);

  const startAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }

    autoScrollRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }, 5000);
  };

  return (
    <section id="program" className="py-20 min-h-[100vh] bg-gray-50 dark:bg-dark-surface">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="text-center mb-16">
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
          {/* Tombol kiri */}
          <button
            onClick={() => {
              setCurrentIndex(prevIndex => (prevIndex <= 0 ? programs.length - 1 : prevIndex - 1));
              startAutoScroll();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 dark:bg-gray-800/70 rounded-full shadow-md p-2 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none"
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

          {/* Carousel */}
          <div className="overflow-hidden">
            <div ref={carousel} className="flex" style={{ willChange: 'transform' }}>
              {programs.map((program, index) => (
                <div
                  key={`program-${index}`}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4"
                >
                  <div
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border-t-4 hover:shadow-lg transition-shadow duration-300 h-full"
                    style={{ borderColor: program.borderColor.replace('border-', '') }}
                  >
                    <div className={`relative h-48 bg-gradient-to-br ${program.color}`}>
                      <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <Image
                          src={program.image}
                          alt={program.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-lg p-4">
                          <Image src={program.icon} alt={program.title} width={40} height={40} />
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-heading font-bold text-primary dark:text-white text-center mb-4">
                        {program.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                        {program.description}
                      </p>
                      <div className="space-y-2 mb-6">
                        {program.features.map(feature => (
                          <div key={feature} className="flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-green-500"
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
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="text-center">
                        <Link
                          href={`/sections-program/${slugify(program.title, { lower: true })}`}
                          className="inline-block px-6 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white font-medium transition-colors duration-300"
                        >
                          Lihat Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tombol kanan */}
          <button
            onClick={() => {
              setCurrentIndex(prevIndex => prevIndex + 1);
              startAutoScroll();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 dark:bg-gray-800/70 rounded-full shadow-md p-2 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none"
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
    </section>
  );
};

export default ProgramPreview;
