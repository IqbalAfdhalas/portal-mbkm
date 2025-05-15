'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const AktivitasUnitDetail = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const units = [
    {
      name: 'Unit Akuisisi Arsip',
      description: 'Unit yang bertanggung jawab dalam pengumpulan dan penerimaan arsip dari berbagai sumber untuk disimpan di BAST ANRI.',
      activities: [
        'Pendataan sumber arsip statis dan tsunami',
        'Penilaian arsip yang akan diakuisisi',
        'Proses serah terima arsip',
        'Dokumentasi dan administrasi akuisisi'
      ],
      skills: ['Manajemen Dokumen', 'Penilaian Arsip', 'Komunikasi Efektif', 'Administrasi'],
      icon: '/images/icons/acquisition.svg',
      image: '/images/unit-akuisisi.jpg'
    },
    {
      name: 'Unit Pengolahan Arsip',
      description: 'Unit yang melakukan pengorganisasian, identifikasi, klasifikasi, dan katalogisasi arsip yang telah diakuisisi.',
      activities: [
        'Klasifikasi arsip berdasarkan tema',
        'Deskripsi dan indeksasi arsip',
        'Penyusunan finding aids',
        'Pembuatan katalog arsip digital'
      ],
      skills: ['Klasifikasi Dokumen', 'Metadata Management', 'Pengorganisasian', 'Analisis Konten'],
      icon: '/images/icons/processing.svg',
      image: '/images/unit-pengolahan.jpg'
    },
    {
      name: 'Unit Preservasi Arsip',
      description: 'Unit yang menangani perawatan dan pemeliharaan arsip untuk menjaga keutuhannya dalam jangka panjang.',
      activities: [
        'Pengendalian suhu dan kelembaban ruang arsip',
        'Restorasi dan konservasi arsip rusak',
        'Digitalisasi arsip fisik',
        'Pencegahan deteriorasi arsip'
      ],
      skills: ['Konservasi Dokumen', 'Digitalisasi', 'Kontrol Lingkungan', 'Preservasi Digital'],
      icon: '/images/icons/preservation.svg',
      image: '/images/unit-preservasi.jpg'
    },
    {
      name: 'Unit Pelayanan Arsip',
      description: 'Unit yang memberikan layanan akses dan diseminasi arsip kepada publik dan peneliti.',
      activities: [
        'Layanan penelusuran arsip',
        'Penyediaan ruang baca dan referensi',
        'Peminjaman dan penggandaan arsip',
        'Penyuluhan dan edukasi kearsipan'
      ],
      skills: ['Layanan Publik', 'Information Retrieval', 'Komunikasi', 'Edukasi'],
      icon: '/images/icons/service.svg',
      image: '/images/unit-pelayanan.jpg'
    }
  ];

  const overviewContent = (
    <div className="space-y-6">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-yellow-700 dark:text-yellow-400 mb-3">
          Tentang Program Aktivitas Unit
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Program Aktivitas Unit di BAST ANRI merupakan kegiatan magang yang berfokus pada pengelolaan arsip statis dan tsunami dalam operasional sehari-hari. 
          Peserta MBKM akan ditempatkan pada salah satu atau beberapa unit kerja untuk terlibat langsung dalam kegiatan kearsipan rutin yang mencakup seluruh 
          siklus hidup arsip, mulai dari akuisisi, pengolahan, preservasi, hingga pelayanan kepada publik.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-primary dark:text-white mb-3">
            Manfaat Program
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">Pengalaman praktis pengelolaan arsip standar nasional</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">Pemahaman mendalam tentang nilai historis arsip</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">Pengembangan keterampilan teknis kearsipan</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">Networking dengan profesional kearsipan</span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-primary dark:text-white mb-3">
            Persyaratan Program
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">Mahasiswa aktif semester 5-7</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">IPK minimal 3.0</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">Ketertarikan pada bidang kearsipan atau sejarah</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">Kemampuan komputasi dasar</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-primary dark:text-white mb-3">
          Timeline Program
        </h3>
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
          
          <div className="relative z-10 mb-6">
            <div className="flex items-center">
              <div className="bg-yellow-500 rounded-full h-8 w-8 flex items-center justify-center shadow-md">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <div className="ml-4">
                <h4 className="text-md font-medium text-gray-800 dark:text-white">Minggu 1-2: Orientasi</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pengenalan BAST ANRI, sistem kearsipan, dan unit-unit kerja</p>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 mb-6">
            <div className="flex items-center">
              <div className="bg-yellow-500 rounded-full h-8 w-8 flex items-center justify-center shadow-md">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div className="ml-4">
                <h4 className="text-md font-medium text-gray-800 dark:text-white">Minggu 3-8: Rotasi Unit</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Penempatan bergilir di berbagai unit untuk pemahaman komprehensif</p>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 mb-6">
            <div className="flex items-center">
              <div className="bg-yellow-500 rounded-full h-8 w-8 flex items-center justify-center shadow-md">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <div className="ml-4">
                <h4 className="text-md font-medium text-gray-800 dark:text-white">Minggu 9-14: Spesialisasi</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Fokus pada satu unit yang diminati untuk pengalaman lebih mendalam</p>
              </div>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center">
              <div className="bg-yellow-500 rounded-full h-8 w-8 flex items-center justify-center shadow-md">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <div className="ml-4">
                <h4 className="text-md font-medium text-gray-800 dark:text-white">Minggu 15-16: Proyek Akhir</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Penyusunan laporan dan presentasi hasil pembelajaran</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <Link 
            href="/program" 
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Program
          </Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">Program Aktivitas Unit</h1>
        
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
          <Image 
            src="/images/program-aktivitas.jpg" 
            alt="Program Aktivitas Unit" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-6 left-6">
              <span className="bg-yellow-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                16 Minggu
              </span>
              <h2 className="text-white text-xl md:text-2xl font-bold mt-2">
                Pengalaman Kearsipan Komprehensif
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-primary text-primary dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('units')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'units'
                ? 'border-primary text-primary dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Unit Kerja
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'testimonials'
                ? 'border-primary text-primary dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Testimonial
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'faq'
                ? 'border-primary text-primary dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            FAQ
          </button>
        </nav>
      </div>

      {activeTab === 'overview' && overviewContent}

      {activeTab === 'units' && (
        <div className="space-y-10">
          {units.map((unit, index) => (
            <div 
              key={unit.name}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden ${
                index % 2 === 0 ? 'md:flex' : 'md:flex md:flex-row-reverse'
              }`}
            >
              <div className="md:w-2/5 relative h-64 md:h-auto">
                <Image
                  src={unit.image}
                  alt={unit.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:w-3/5">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-3">
                    <Image
                      src={unit.icon}
                      alt={unit.name}
                      width={24}
                      height={24}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-primary dark:text-white">{unit.name}</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{unit.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-2">
                    Aktivitas
                  </h4>
                  <ul className="space-y-1">
                    {unit.activities.map((activity) => (
                      <li key={activity} className="flex items-start">
                        <svg className="w-4 h-4 mr-2 text-yellow-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-2">
                    Keterampilan yang Dikembangkan
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {unit.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'testimonials' && (
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                <svg className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Adinda Pratiwi</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Mahasiswa Ilmu Sejarah - Universitas Indonesia</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic">
              "Program Aktivitas Unit di BAST ANRI sangat menambah wawasan dan keterampilan saya dalam bidang kearsipan. 
              Saya mendapat kesempatan untuk menangani arsip tsunami langsung yang merupakan pengalaman berharga untuk karir saya 
              di bidang sejarah. Para mentor sangat membantu dan suasana belajarnya kondusif."
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                <svg className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bima Pradana</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Mahasiswa Ilmu Informasi - Universitas Gadjah Mada</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic">
              "Pengalaman magang di Unit Pengolahan Arsip memberikan saya pandangan baru tentang manajemen informasi. 
              Proses klasifikasi dan pengindeksan arsip tsunami mengajarkan saya pentingnya metadata dan sistem organisasi 
              yang baik. Keterampilan ini sangat relevan dengan jurusan saya dan memberikan nilai tambah untuk portofolio karir."
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                <svg className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Fajar Ramadhan</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Mahasiswa Sistem Informasi - Institut Teknologi Bandung</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic">
              "Program ini melebihi ekspektasi saya! Di Unit Preservasi, saya belajar teknik digitalisasi arsip 
              dan sistem penyimpanan digital yang canggih. Saya bahkan berkesempatan membantu mengembangkan 
              algoritma sederhana untuk mengotomatiskan beberapa proses preservasi. Mentor saya sangat supportif 
              dan membantu menghubungkan pembelajaran dengan bidang teknologi informasi."
            </p>
          </div>
        </div>
      )}

      {activeTab === 'faq' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-primary dark:text-blue-400 mb-4">
              Pertanyaan Umum
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Apakah program ini terbuka untuk semua jurusan?
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Ya, program ini terbuka untuk mahasiswa dari berbagai jurusan seperti Sejarah, Ilmu Informasi, 
                  Ilmu Perpustakaan, Sistem Informasi, Sastra, dan jurusan lain yang memiliki ketertarikan 
                  dalam bidang kearsipan.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Berapa SKS yang akan saya dapatkan dari program ini?
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Program Aktivitas Unit di BAST ANRI memberikan konversi 20 SKS untuk program 
                  magang selama satu semester penuh (16 minggu). Pembagian SKS disesuaikan dengan kurikulum 
                  perguruan tinggi masing-masing.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Apakah ada tunjangan atau beasiswa untuk peserta?
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  BAST ANRI menyediakan tunjangan transportasi dan makan siang bagi peserta magang. 
                  Untuk beberapa posisi khusus, tersedia juga beasiswa parsial yang dapat diajukan 
                  dengan persyaratan tambahan.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Bagaimana dengan akomodasi selama program?
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  BAST ANRI tidak menyediakan akomodasi, namun dapat memberikan rekomendasi tempat tinggal 
                  yang terjangkau di sekitar lokasi magang. Tim MBKM juga dapat membantu mahasiswa 
                  untuk mencari pilihan tempat tinggal yang sesuai.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Apakah saya akan mendapatkan sertifikat setelah program selesai?
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Ya, setiap peserta yang berhasil menyelesaikan program akan mendapatkan sertifikat 
                  resmi dari ANRI yang mencantumkan detail program, durasi, dan pencapaian khusus 
                  selama mengikuti program magang.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-400 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Masih punya pertanyaan?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Jika Anda memiliki pertanyaan lain yang belum terjawab, silakan hubungi tim MBKM BAST ANRI 
              melalui kontak berikut:
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">mbkm.bast@anri.go.id</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">(021) 7805851 ext. 314</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Jl. Ampera Raya No.7, Jakarta Selatan</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 text-center">
        <h3 className="text-xl font-bold text-primary dark:text-white mb-4">
          Tertarik dengan Program Ini?
        </h3>
        <Link
          href="/pendaftaran"
          className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark font-medium shadow-sm hover:shadow-md transition-all duration-300"
        >
          Daftar Sekarang
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Pendaftaran dibuka sepanjang tahun untuk berbagai periode magang
        </p>
      </div>
    </div>
  );
};
const AktivitasUnitPage = () => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Aktivitas Unit</h1>
      <p>Halaman detail untuk program Aktivitas Unit.</p>
    </div>
  );
};

export default AktivitasUnitPage; // ❗ Harus pakai `export default`