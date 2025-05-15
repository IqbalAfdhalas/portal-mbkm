'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const KunjunganDalam = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const program = {
    title: 'Kunjungan ke Dalam BAST ANRI',
    icon: '/images/icons/visit-in.svg',
    description: 'Program kunjungan dari luar instansi seperti sekolah, universitas, dan organisasi untuk mengenal pengelolaan arsip secara langsung.',
    features: ['Tur Ruang Arsip', 'Simulasi Pengarsipan', 'Pengenalan Unit dan Fungsi', 'Interaksi dengan Arsiparis'],
    image: '/images/program-kunjungan-dalam.jpg',
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
            <Link 
              href="/kontak" 
              className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Ajukan Kunjungan
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          <div className="lg:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-xl" style={{height: '400px'}}>
              <Image 
                src={program.image} 
                alt={program.title}
                fill
                className="object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-60`}></div>
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
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-heading mb-6">Kontak Informasi</h2>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">{program.contactPerson.name}</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{program.contactPerson.email}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{program.contactPerson.phone}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <Link 
                href="/faq" 
                className="inline-flex items-center bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 font-medium py-3 px-6 rounded-lg border border-indigo-100 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                Lihat FAQ Kunjungan
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KunjunganDalam;