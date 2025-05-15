'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const KunjunganLuar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentActivityUnit, setCurrentActivityUnit] = useState(0);
  const autoScrollRef = useRef(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Image slider data
  const sliderImages = [
    {
      src: '/images/program-kunjungan-luar-1.jpg',
      alt: 'Kunjungan ke Luar BAST ANRI 1'
    },
    {
      src: '/images/program-kunjungan-luar-2.jpg',
      alt: 'Kunjungan ke Luar BAST ANRI 2'
    },
    {
      src: '/images/program-kunjungan-luar-3.jpg',
      alt: 'Kunjungan ke Luar BAST ANRI 3'
    }
  ];

  // Function to handle next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };

  // Function to handle previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const program = {
    title: 'Kunjungan ke Luar BAST ANRI',
    icon: '/images/icons/visit-out.svg',
    description: 'Program kunjungan tim BAST ANRI ke berbagai institusi pendidikan dan organisasi untuk berbagi pengetahuan tentang praktik kearsipan modern.',
    features: ['Sosialisasi Kearsipan', 'Workshop Praktis', 'Konsultasi Arsip', 'Asistensi Teknis'],
    color: 'from-blue-500/20 to-blue-600/20',
    borderColor: 'border-blue-500',
    detailContent: [
      {
        heading: 'Tentang Program Kunjungan ke Luar BAST ANRI',
        content: 'Program Kunjungan ke Luar BAST ANRI merupakan inisiatif jangkauan eksternal di mana tim profesional dari BAST ANRI mengunjungi berbagai institusi seperti kampus, sekolah, dan organisasi untuk berbagi pengetahuan dan praktik terbaik dalam pengelolaan arsip modern. Program ini dirancang untuk memperluas pengaruh positif lembaga kearsipan dan membangun kesadaran yang lebih luas tentang pentingnya pengelolaan arsip yang baik.'
      },
      {
        heading: 'Tujuan Program',
        content: 'Program ini bertujuan untuk memperluas akses pengetahuan kearsipan ke berbagai kalangan masyarakat, membangun kesadaran tentang pentingnya pengelolaan arsip yang baik, serta memberikan bantuan teknis dan konsultasi bagi institusi yang memerlukan panduan dalam mengembangkan sistem kearsipan mereka sendiri.'
      },
      {
        heading: 'Kegiatan Program',
        listItems: [
          {
            title: 'Sosialisasi Kearsipan',
            description: 'Penyampaian materi tentang dasar-dasar kearsipan, termasuk regulasi, standar, dan praktik terbaik dalam pengelolaan arsip di berbagai jenis institusi.'
          },
          {
            title: 'Workshop Praktis',
            description: 'Pelatihan hands-on tentang teknik-teknik pengarsipan modern, termasuk digitalisasi, preservasi, dan pengorganisasian arsip fisik maupun digital.'
          },
          {
            title: 'Konsultasi Arsip',
            description: 'Sesi konsultasi profesional di mana tim BAST ANRI memberikan solusi untuk masalah kearsipan spesifik yang dihadapi oleh institusi yang dikunjungi.'
          },
          {
            title: 'Asistensi Teknis',
            description: 'Pendampingan dalam perencanaan dan implementasi sistem kearsipan, termasuk rekomendasi infrastruktur, software, dan prosedur operasional standar.'
          }
        ]
      },
      {
        heading: 'Manfaat untuk Peserta MBKM',
        content: 'Bagi mahasiswa peserta MBKM, program ini memberikan pengalaman berharga dalam komunikasi profesional, kemampuan presentasi, dan pemahaman mendalam tentang variasi praktik kearsipan di berbagai jenis institusi. Peserta akan mendapatkan eksposur terhadap beragam tantangan kearsipan dan bagaimana menghadapinya dengan solusi praktis.'
      }
    ],
    schedule: [
      { day: 'Selasa dan Rabu', time: '09.00 - 15.00 WIB' },
      { day: 'Kamis', time: '09.00 - 13.00 WIB' }
    ],
    requirements: [
      'Konfirmasi jadwal minimal 2 minggu sebelumnya',
      'Surat permohonan resmi dari institusi penerima',
      'Informasi tentang kebutuhan spesifik institusi',
      'Penyediaan fasilitas presentasi di lokasi'
    ],
    contactPerson: {
      name: 'Divisi Outreach BAST ANRI',
      email: 'outreach@bast.anri.go.id',
      phone: '(021) 7805851 ext. 405'
    }
  };

  // Activity units links - duplicated to create infinite effect
  const activityUnits = [
    {
      title: 'Kunjungan ke Dalam BAST ANRI',
      icon: '/images/icons/visit-in.svg',
      href: '/aktivitas/kunjungan-dalam'
    },
    {
      title: 'Daily Activity',
      icon: '/images/icons/daily.svg',
      href: '/aktivitas/daily-activity'
    },
    {
      title: 'Pameran',
      icon: '/images/icons/exhibition.svg',
      href: '/aktivitas/pameran'
    },
    // Duplicate entries for infinite scrolling effect
    {
      title: 'Kunjungan ke Dalam BAST ANRI',
      icon: '/images/icons/visit-in.svg',
      href: '/aktivitas/kunjungan-dalam'
    },
    {
      title: 'Daily Activity',
      icon: '/images/icons/daily.svg',
      href: '/aktivitas/daily-activity'
    },
    {
      title: 'Pameran',
      icon: '/images/icons/exhibition.svg',
      href: '/aktivitas/pameran'
    }
  ];

  // Function to handle next activity unit
  const nextActivityUnit = () => {
    if (currentActivityUnit < activityUnits.length - 3) {
      setCurrentActivityUnit(currentActivityUnit + 1);
    } else {
      // Loop back to start when reaching end
      setCurrentActivityUnit(0);
    }
  };

  // Function to handle previous activity unit
  const prevActivityUnit = () => {
    if (currentActivityUnit > 0) {
      setCurrentActivityUnit(currentActivityUnit - 1);
    } else {
      // Jump to end when at start for continuous loop
      setCurrentActivityUnit(activityUnits.length - 4);
    }
  };

  // Auto scroll for activity units
  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        nextActivityUnit();
      }
    }, 5000);
    
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [currentActivityUnit]);

  // Functions to pause/resume auto-scrolling when user interacts
  const pauseAutoScroll = () => {
    isPausedRef.current = true;
  };

  const resumeAutoScroll = () => {
    isPausedRef.current = false;
  };

  return (
    <div className={`py-16 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center mb-16">
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <div className="inline-block bg-blue-100 dark:bg-blue-900/30 rounded-lg px-4 py-2 mb-6">
              <div className="flex items-center">
                <Image src={program.icon} alt={program.title} width={24} height={24} />
                <span className="ml-2 text-blue-700 dark:text-blue-300 font-medium">Program MBKM</span>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white font-heading mb-6">{program.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{program.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {program.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            {/* Image Slider */}
            <div className="relative rounded-xl overflow-hidden shadow-xl" style={{height: '400px'}}>
              {sliderImages.map((image, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
                >
                  <Image 
                    src={image.src} 
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-60`}></div>
                </div>
              ))}
              
              {/* Slider Controls */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Slider Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${currentSlide === index ? 'bg-white' : 'bg-white/50'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detail Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-16">
          {program.detailContent.map((section, index) => (
            <div key={index} className="mb-10 last:mb-0">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-heading mb-4">{section.heading}</h2>
              {section.content && <p className="text-gray-600 dark:text-gray-300 mb-6">{section.content}</p>}
              
              {section.listItems && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {section.listItems.map((item, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-100 dark:border-gray-700">
                      <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Schedule and Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-heading mb-6">Jadwal Kunjungan</h2>
            <div className="space-y-4">
              {program.schedule.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{item.day}</span>
                  <span className="text-blue-600 dark:text-blue-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-heading mb-6">Persyaratan Kunjungan</h2>
            <ul className="space-y-3">
              {program.requirements.map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-blue-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Person */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-heading mb-6">Kontak Informasi</h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">{program.contactPerson.name}</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{program.contactPerson.email}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{program.contactPerson.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Activity Units - Auto-scrolling Carousel */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-heading mb-8 text-center">Aktivitas Unit Lainnya</h2>
          
          <div className="relative">
            {/* Carousel Container */}
            <div 
              className="overflow-hidden"
              onMouseEnter={pauseAutoScroll}
              onMouseLeave={resumeAutoScroll}
              onTouchStart={pauseAutoScroll}
              onTouchEnd={resumeAutoScroll}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentActivityUnit * 33.33}%)` }}
              >
                {activityUnits.map((activity, index) => (
                  <div key={index} className="w-full md:w-1/3 flex-shrink-0 px-3">
                    <Link 
                      href={activity.href}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg p-6 transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 flex flex-col items-center text-center h-full"
                    >
                      <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-full mb-4">
                        <Image src={activity.icon} alt={activity.title} width={28} height={28} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{activity.title}</h3>
                      <svg className="w-5 h-5 text-blue-500 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Controls */}
            <button 
              onClick={prevActivityUnit}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors z-10"
              aria-label="Previous activity"
              onMouseEnter={pauseAutoScroll}
              onMouseLeave={resumeAutoScroll}
            >
              <svg className="w-5 h-5 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextActivityUnit}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors z-10"
              aria-label="Next activity"
              onMouseEnter={pauseAutoScroll}
              onMouseLeave={resumeAutoScroll}
            >
              <svg className="w-5 h-5 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Carousel Indicators */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-2 mt-4">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentActivityUnit(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentActivityUnit % 3 === index ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  onMouseEnter={pauseAutoScroll}
                  onMouseLeave={resumeAutoScroll}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KunjunganLuar;