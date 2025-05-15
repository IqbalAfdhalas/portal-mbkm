'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const DailyActivity = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const program = {
    title: 'Daily Activity',
    icon: '/images/icons/daily.svg',
    description: 'Kegiatan harian staf dan peserta magang di BAST ANRI yang terdokumentasi secara berkala.',
    features: ['Pencatatan Kegiatan Harian', 'Digitalisasi Dokumen', 'Pelayanan Arsip Publik', 'Rapat Evaluasi'],
    image: '/images/program-daily.jpg',
    color: 'from-pink-500/20 to-pink-600/20',
    borderColor: 'border-pink-500',
    detailContent: [
      {
        heading: 'Tentang Program Daily Activity',
        content: 'Program Daily Activity merupakan kegiatan rutin yang dilakukan oleh staf dan peserta magang di Balai Arsip Statis dan Tsunami ANRI. Program ini dirancang untuk memberikan pengalaman kerja nyata dalam pengelolaan arsip melalui keterlibatan langsung dalam operasional harian BAST ANRI.'
      },
      {
        heading: 'Tujuan Program',
        content: 'Program ini bertujuan untuk memberikan pemahaman mendalam tentang rutinitas kerja kearsipan, mengembangkan kemampuan praktis dalam pengelolaan dokumen dan arsip, serta membangun kedisiplinan dan profesionalisme dalam lingkungan kerja kearsipan.'
      },
      {
        heading: 'Kegiatan Program',
        listItems: [
          {
            title: 'Pencatatan Kegiatan Harian',
            description: 'Pendokumentasian seluruh aktivitas yang dilakukan dalam format jurnal harian untuk memastikan akuntabilitas dan evaluasi berkelanjutan.'
          },
          {
            title: 'Digitalisasi Dokumen',
            description: 'Proses alih media arsip dari bentuk fisik ke digital, termasuk pemindaian, pengindeksan, dan penyimpanan dalam sistem manajemen arsip digital.'
          },
          {
            title: 'Pelayanan Arsip Publik',
            description: 'Membantu melayani permintaan akses arsip dari peneliti, akademisi, dan masyarakat umum sesuai dengan prosedur layanan yang berlaku.'
          },
          {
            title: 'Rapat Evaluasi',
            description: 'Partisipasi dalam diskusi evaluasi berkala untuk membahas pencapaian, tantangan, dan rencana perbaikan dalam pengelolaan arsip.'
          }
        ]
      },
      {
        heading: 'Manfaat untuk Peserta MBKM',
        content: 'Bagi mahasiswa peserta MBKM, program ini menawarkan kesempatan untuk mengembangkan keterampilan teknis kearsipan, kemampuan manajemen waktu, komunikasi profesional, dan pemahaman mendalam tentang alur kerja lembaga kearsipan nasional secara langsung.'
      }
    ],
    schedule: [
      { day: 'Senin - Kamis', time: '08.00 - 16.00 WIB' },
      { day: 'Jumat', time: '08.00 - 16.30 WIB' }
    ],
    activities: [
      { time: '08.00 - 08.30', activity: 'Morning Briefing' },
      { time: '08.30 - 12.00', activity: 'Core Activities (Digitalization/Processing/Service)' },
      { time: '12.00 - 13.00', activity: 'Break' },
      { time: '13.00 - 15.30', activity: 'Continued Core Activities' },
      { time: '15.30 - 16.00', activity: 'Daily Reporting & Wrap-up' }
    ],
    requirements: [
      'Komitmen penuh waktu selama periode magang',
      'Kemampuan dasar penggunaan komputer dan perangkat lunak perkantoran',
      'Ketelitian dan atensi terhadap detail',
      'Kemampuan bekerja dalam tim'
    ],
    contactPerson: {
      name: 'Koordinator Magang BAST ANRI',
      email: 'magang@bast.anri.go.id',
      phone: '(021) 7805851 ext. 303'
    }
  };

  return (
    <div className={`py-16 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center mb-16">
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <div className="inline-block bg-pink-100 dark:bg-pink-900/30 rounded-lg px-4 py-2 mb-6">
              <div className="flex items-center">
                <Image src={program.icon} alt={program.title} width={24} height={24} />
                <span className="ml-2 text-pink-700 dark:text-pink-300 font-medium">Program MBKM</span>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white font-heading mb-6">{program.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{program.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {program.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                </div>
              ))}
            </div>
            <Link 
              href="/apply" 
              className="inline-flex items-center bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Daftar Program
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
                      <h3 className="text-lg font-bold text-pink-600 dark:text-pink-400 mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Daily Schedule */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-heading mb-6">Jadwal Harian</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-left font-medium text-gray-700 dark:text-gray-300">Waktu</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-700 dark:text-gray-300">Aktivitas</th>
                </tr>
              </thead>
              <tbody>
                {program.activities.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <td className="py-3 px-4 text-pink-600 dark:text-pink-400 font-medium">{item.time}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{item.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">* Jadwal dapat berubah sesuai dengan kebutuhan dan aktivitas khusus</p>
          </div>
        </div>

        {/* Requirements and Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-heading mb-6">Jadwal Kerja</h2>
            <div className="space-y-4">
              {program.schedule.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{item.day}</span>
                  <span className="text-pink-600 dark:text-pink-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-heading mb-6">Persyaratan Program</h2>
            <ul className="space-y-3">
              {program.requirements.map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-pink-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Person */}
        <div className="bg-pink-50 dark:bg-pink-900/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-heading mb-6">Kontak Informasi</h2>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">{program.contactPerson.name}</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{program.contactPerson.email}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{program.contactPerson.phone}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <Link 
                href="/testimonial" 
                className="inline-flex items-center bg-white dark:bg-gray-700 text-pink-600 dark:text-pink-400 font-medium py-3 px-6 rounded-lg border border-pink-100 dark:border-gray-600 hover:bg-pink-50 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                Lihat Testimoni Alumni
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyActivity;