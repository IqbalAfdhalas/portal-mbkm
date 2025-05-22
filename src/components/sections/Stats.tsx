// src/components/sections/Stats.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { MotionDiv } from '@/components/common/MotionClientOnly';

// Import data dari Program.tsx untuk memastikan konsistensi data
const basePrograms = [
  {
    title: 'Aktivitas Unit',
    icon: '/images/icons/activity.svg',
    description: 'Rasakan langsung serunya jadi bagian dari tiap unit di BAST ANRI!',
    features: [
      'Unit Akuisisi Arsip',
      'Unit Pengolahan Arsip',
      'Unit Preservasi Arsip',
      'Unit Pelayanan Arsip',
      'Unit Tata Usaha',
    ],
    image: '/images/program-aktivitas.jpg',
    color: 'from-yellow-500/20 to-yellow-600/20',
    borderColor: 'border-yellow-500',
  },
  {
    title: 'Kunjungan ke Dalam BAST ANRI',
    icon: '/images/icons/visit-in.svg',
    description: 'Jelajahi dunia arsip lewat tur seru langsung di BAST ANRI!',
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
    description: 'Kami datang langsung ke tempatmu bawa semangat arsip!',
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
    description: 'Intip keseharian seru di balik layar BAST ANRI!',
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
    description: 'Lihat arsip tampil beda lewat pameran tematik dan interaktif!',
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

// Menghitung statistik berdasarkan data program
const calculateStats = () => {
  // 1. Jumlah Program MBKM
  const totalPrograms = basePrograms.length;

  // 2. Total Aktivitas/Fitur
  const totalActivities = basePrograms.reduce(
    (total, program) => total + program.features.length,
    0
  );

  // 3. Rata-rata Aktivitas per Program (dibulatkan ke atas)
  const avgActivitiesPerProgram = Math.ceil(totalActivities / totalPrograms);

  // 4. Jumlah Unit yang Terlibat (dari Program "Aktivitas Unit")
  const unitProgram = basePrograms.find(p => p.title === 'Aktivitas Unit');
  const totalUnits = unitProgram ? unitProgram.features.length : 0;

  return [
    {
      value: totalPrograms,
      suffix: '',
      label: 'Program MBKM',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.949 49.949 0 0 0-9.902 3.912l-.003.002-.34.18a.75.75 0 0 1-.707 0A50.009 50.009 0 0 0 7.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.129 56.129 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
          <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 0 1-.46.71 47.878 47.878 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.877 47.877 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 0 1 6 13.18v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 0 0 .551-1.608 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.668 2.25 2.25 0 0 0 2.12 0Z" />
          <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
    },
    {
      value: totalActivities,
      suffix: '+',
      label: 'Aktivitas Tersedia',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path
            fillRule="evenodd"
            d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      value: avgActivitiesPerProgram,
      suffix: '±',
      label: 'Aktivitas per Program',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
    },
    {
      value: totalUnits,
      suffix: '',
      label: 'Unit Terlibat',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path
            fillRule="evenodd"
            d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
            clipRule="evenodd"
          />
          <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
        </svg>
      ),
      color: 'from-indigo-500 to-indigo-600',
    },
  ];
};

const Stats = () => {
  const [inView, setInView] = useState(false);
  // Gunakan data dari Program.tsx untuk menghitung statistik
  const statistics = calculateStats();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('stats');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section
      id="stats"
      className="py-16 bg-gradient-to-r from-primary to-primary-light text-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-white/5 -skew-y-3 transform origin-left"></div>
      <div className="absolute bottom-0 right-0 w-full h-32 bg-white/5 skew-y-3 transform origin-right"></div>

      {/* Animated circles */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-400/10 animate-pulse blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-indigo-400/10 animate-pulse blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <MotionDiv
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-3 bg-blue-700/30 text-blue-200 px-4 py-1 rounded-full">
            <span className="text-sm font-medium uppercase tracking-wider">Data Statistik</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
            Program MBKM di BAST ANRI
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-300 mx-auto my-4 rounded-full"></div>
          <p className="text-blue-100 mt-2 max-w-2xl mx-auto">
            Data program dan aktivitas MBKM yang tersedia di Balai Arsip Statis dan Tsunami ANRI
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <MotionDiv
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/20 group">
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-20 rounded-xl -z-10`}
                ></div>

                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} p-0.5 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="bg-white/90 dark:bg-gray-800/90 w-full h-full rounded-full flex items-center justify-center">
                      <div className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-500">
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center gap-1">
                    {inView && (
                      <>
                        <CountUp end={stat.value} duration={2.5} />
                        <span className="text-blue-300">{stat.suffix}</span>
                      </>
                    )}
                  </div>
                  <p className="text-white/80 font-medium">{stat.label}</p>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
