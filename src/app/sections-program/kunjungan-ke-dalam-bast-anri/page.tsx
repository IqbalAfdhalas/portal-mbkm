'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const KunjunganDalam = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Image slider data
  const sliderImages = [
    {
      src: '/images/program-kunjungan-dalam-1.jpg',
      alt: 'Kunjungan ke Dalam BAST ANRI 1'
    },
    {
      src: '/images/program-kunjungan-dalam-2.jpg',
      alt: 'Kunjungan ke Dalam BAST ANRI 2'
    },
    {
      src: '/images/program-kunjungan-dalam-3.jpg',
      alt: 'Kunjungan ke Dalam BAST ANRI 3'
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
    title: 'Kunjungan ke Dalam BAST ANRI',
    icon: '/images/icons/visit-in.svg',
    description: 'Program kunjungan dari luar instansi seperti sekolah, universitas, dan organisasi untuk mengenal pengelolaan arsip secara langsung.',
    features: ['Tur Ruang Arsip', 'Simulasi Pengarsipan', 'Pengenalan Unit dan Fungsi', 'Interaksi dengan Arsiparis'],
    color: 'from-indigo-500/20 to-indigo-600/20',
    borderColor: 'border-indigo-500',
    detailContent: [
      {
        heading: 'Tentang Program Kunjungan ke Dalam BAST ANRI',
        content: 'Program Kunjungan ke Dalam BAST ANRI merupakan kesempatan bagi instansi eksternal seperti sekolah, universitas, dan berbagai organisasi untuk mengenal lebih dekat tentang pengelolaan arsip statis dan tsunami. Program ini dirancang untuk memberikan pengalaman langsung dan wawasan mengenai praktik kearsipan modern yang diterapkan di BAST ANRI.'
      },
      {
        heading: 'Tujuan Program',
        content: 'Program ini bertujuan untuk meningkatkan kesadaran dan pemahaman masyarakat tentang pentingnya pengelolaan arsip nasional, memberikan edukasi tentang proses dan teknik pengarsipan, serta memperkenalkan fungsi strategis BAST ANRI dalam melestarikan warisan dokumenter bangsa.'
      },
      {
        heading: 'Kegiatan Program',
        listItems: [
          {
            title: 'Tur Ruang Arsip',
            description: 'Peserta akan diajak mengunjungi berbagai ruang penyimpanan arsip dengan penjelasan langsung dari arsiparis profesional tentang sistem penyimpanan dan pengelolaan arsip.'
          },
          {
            title: 'Simulasi Pengarsipan',
            description: 'Pengalaman langsung melakukan proses pengarsipan dasar, mulai dari identifikasi, klasifikasi, hingga penyimpanan dokumen arsip.'
          },
          {
            title: 'Pengenalan Unit dan Fungsi',
            description: 'Penjelasan komprehensif tentang struktur organisasi, tugas, dan fungsi masing-masing unit di BAST ANRI dalam pengelolaan arsip statis dan tsunami.'
          },
          {
            title: 'Interaksi dengan Arsiparis',
            description: 'Kesempatan berdiskusi dan bertanya langsung dengan para arsiparis profesional untuk mendapatkan wawasan mendalam tentang profesi kearsipan.'
          }
        ]
      },
      {
        heading: 'Manfaat untuk Peserta MBKM',
        content: 'Bagi mahasiswa peserta MBKM, program ini memberikan kesempatan untuk memperluas jaringan profesional, memahami tata kelola kearsipan di tingkat nasional, serta memperoleh pengalaman praktis dalam bidang manajemen informasi dan dokumentasi.'
      }
    ],
    schedule: [
      { day: 'Senin - Kamis', time: '09.00 - 15.00 WIB' },
      { day: 'Jumat', time: '09.00 - 11.30 WIB' }
    ],
    requirements: [
      'Surat permohonan resmi dari institusi',
      'Daftar peserta kunjungan',
      'Konfirmasi jadwal minimal 1 minggu sebelumnya',
      'Jumlah peserta maksimal 30 orang per sesi'
    ],
    contactPerson: {
      name: 'Bagian Humas BAST ANRI',
      email: 'kunjungan@bast.anri.go.id',
      phone: '(021) 7805851 ext. 404'
    }
  };

 // Data link program aktivitas
  
const programLinks = [
  {
    title: 'Kunjungan ke dalam BAST ANRI',
    url: '/sections-program/kunjungan-ke-dalam-bast-anri',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
  },
  {
    title: 'Kunjungan ke luar BAST ANRI',
    url: '/sections-program/kunjungan-ke-luar-bast-anri',
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
  },
  {
    title: 'Daily Activity',
    url: '/sections-program/daily-activity',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
  },
  {
    title: 'Pameran',
    url: '/sections-program/pameran-arsip',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
  }

];

  return (
    <div className={`py-16 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center mb-16">
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <div className="inline-block bg-indigo-100 dark:bg-indigo-900/30 rounded-lg px-4 py-2 mb-6">
              <div className="flex items-center">
                <Image src={program.icon} alt={program.title} width={24} height={24} />
                <span className="ml-2 text-indigo-700 dark:text-indigo-300 font-medium">Program MBKM</span>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white font-heading mb-6">{program.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{program.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {program.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                      <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-2">{item.title}</h3>
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
                  <span className="text-indigo-600 dark:text-indigo-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-heading mb-6">Persyaratan Kunjungan</h2>
            <ul className="space-y-3">
              {program.requirements.map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-indigo-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Person */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-heading mb-6">Kontak Informasi</h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">{program.contactPerson.name}</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{program.contactPerson.email}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{program.contactPerson.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Activity Units */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-heading mb-8 text-center">Aktivitas Unit Lainnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activityUnits.map((activity, index) => (
              <Link 
                key={index}
                href={activity.href}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg p-6 transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 flex flex-col items-center text-center"
              >
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-full mb-4">
                  <Image src={activity.icon} alt={activity.title} width={28} height={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{activity.title}</h3>
                <svg className="w-5 h-5 text-indigo-500 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KunjunganDalam;