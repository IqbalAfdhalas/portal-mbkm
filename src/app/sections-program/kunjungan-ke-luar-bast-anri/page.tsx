'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const KunjunganLuar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const program = {
    title: 'Kunjungan ke Luar BAST ANRI',
    icon: '/images/icons/visit-out.svg',
    description: 'Kegiatan edukasi dan promosi arsip oleh tim BAST ANRI ke instansi atau lembaga lain di luar.',
    features: ['Sosialisasi Kearsipan', 'Penyuluhan dan Pelatihan', 'Kerja Sama Penyelamatan Arsip', 'Promosi Program Arsip'],
    image: '/images/program-kunjungan-luar.jpg',
    color: 'from-red-500/20 to-red-600/20',
    borderColor: 'border-red-500',
    detailContent: [
      {
        heading: 'Tentang Program Kunjungan ke Luar BAST ANRI',
        content: 'Program Kunjungan ke Luar BAST ANRI merupakan inisiatif untuk memperluas jangkauan edukasi dan sosialisasi kearsipan ke berbagai instansi, lembaga pendidikan, dan organisasi di luar ANRI. Tim khusus dari BAST ANRI akan berkunjung langsung untuk melakukan berbagai kegiatan terkait dengan pengelolaan dan pelestarian arsip.'
      },
      {
        heading: 'Tujuan Program',
        content: 'Program ini bertujuan untuk meningkatkan pemahaman dan kesadaran masyarakat akan pentingnya pengelolaan arsip yang baik, memperluas akses terhadap layanan kearsipan, serta membangun kerja sama strategis dengan berbagai pihak dalam upaya penyelamatan dan pelestarian arsip bernilai sejarah.'
      },
      {
        heading: 'Kegiatan Program',
        listItems: [
          {
            title: 'Sosialisasi Kearsipan',
            description: 'Pemberian informasi dan pengetahuan mengenai dasar-dasar kearsipan, peraturan terkait, serta manfaat pengelolaan arsip yang baik bagi institusi dan masyarakat.'
          },
          {
            title: 'Penyuluhan dan Pelatihan',
            description: 'Workshop praktis tentang teknik pengarsipan, preservasi dokumen, dan pemanfaatan teknologi informasi dalam pengelolaan arsip modern.'
          },
          {
            title: 'Kerja Sama Penyelamatan Arsip',
            description: 'Kolaborasi dengan institusi pemilik arsip untuk mengidentifikasi, menyelamatkan, dan melestarikan arsip yang memiliki nilai guna sejarah, penelitian, atau bukti.'
          },
          {
            title: 'Promosi Program Arsip',
            description: 'Pengenalan berbagai program dan layanan BAST ANRI yang dapat dimanfaatkan oleh institusi, peneliti, dan masyarakat umum.'
          }
        ]
      },
      {
        heading: 'Manfaat untuk Peserta MBKM',
        content: 'Bagi mahasiswa peserta MBKM, keterlibatan dalam program ini memberikan pengalaman berharga dalam berkomunikasi dengan berbagai stakeholder, memahami dinamika kebutuhan kearsipan di berbagai institusi, serta mengembangkan kemampuan dalam melakukan edukasi dan transfer pengetahuan di bidang kearsipan.'
      }
    ],
    schedule: [
      { day: 'Selasa & Kamis', time: '09.00 - 15.00 WIB' },
      { day: 'Rabu', time: '09.00 - 12.00 WIB' }
    ],
    requirements: [
      'Konfirmasi jadwal minimal 2 minggu sebelumnya',
      'Penyediaan ruang dan fasilitas presentasi',
      'Minimal peserta 15 orang',
      'Surat permohonan resmi dari instansi penerima'
    ],
    contactPerson: {
      name: 'Divisi Outreach BAST ANRI',
      email: 'outreach@bast.anri.go.id',
      phone: '(021) 7805851 ext. 505'
    }
  };

  return (
    <div className={`py-16 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center mb-16">
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <div className="inline-block bg-red-100 dark:bg-red-900/30 rounded-lg px-4 py-2 mb-6">
              <div className="flex items-center">
                <Image src={program.icon} alt={program.title} width={24} height={24} />
                <span className="ml-2 text-red-700 dark:text-red-300 font-medium">Program MBKM</span>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white font-heading mb-6">{program.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{program.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {program.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                </div>
              ))}
            </div>
            <Link 
              href="/kontak" 
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
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
                      <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">{item.title}</h3>
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
                  <span className="text-red-600 dark:text-red-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-heading mb-6">Persyaratan Kunjungan</h2>
            <ul className="space-y-3">
              {program.requirements.map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-red-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Person */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-heading mb-6">Kontak Informasi</h2>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">{program.contactPerson.name}</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{program.contactPerson.email}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{program.contactPerson.phone}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <Link 
                href="/faq" 
                className="inline-flex items-center bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 font-medium py-3 px-6 rounded-lg border border-red-100 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-gray-600 transition-colors duration-300"
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

export default KunjunganLuar;