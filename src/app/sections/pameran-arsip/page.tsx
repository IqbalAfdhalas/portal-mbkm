'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const PameranArsip = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Gallery images
  const galleryImages = [
    {
      src: '/images/pameran/pameran-1.jpg',
      alt: 'Pameran arsip dengan pengunjung melihat dokumen bersejarah',
      caption: 'Pameran dokumen sejarah kemerdekaan'
    },
    {
      src: '/images/pameran/pameran-2.jpg',
      alt: 'Pengunjung berinteraksi dengan display arsip digital',
      caption: 'Interaksi pengunjung dengan arsip digital'
    },
    {
      src: '/images/pameran/pameran-3.jpg',
      alt: 'Pameran arsip keliling di sekolah',
      caption: 'Pameran arsip keliling di SMA Negeri 5'
    },
    {
      src: '/images/pameran/pameran-4.jpg',
      alt: 'Workshop pengenalan arsip untuk anak-anak',
      caption: 'Workshop edukasi arsip untuk siswa SD'
    },
    {
      src: '/images/pameran/pameran-5.jpg',
      alt: 'Pameran arsip tsunami Aceh',
      caption: 'Pameran khusus arsip tsunami Aceh'
    },
    {
      src: '/images/pameran/pameran-6.jpg',
      alt: 'Pengunjung melihat arsip foto bersejarah',
      caption: 'Koleksi foto bersejarah'
    },
  ];

  // Timeline events
  const timelineEvents = [
    {
      year: '2023',
      title: 'Pameran "Arsip Tsunami: Sejarah yang Tak Boleh Terlupakan"',
      description: 'Pameran tematik menampilkan dokumentasi dan arsip terkait bencana tsunami di Indonesia, terutama tsunami Aceh 2004.',
      image: '/images/pameran/timeline-2023.jpg'
    },
    {
      year: '2022',
      title: 'Pameran Keliling "Arsip Masuk Sekolah"',
      description: 'Program pameran arsip yang berkeliling ke berbagai sekolah di Jabodetabek untuk mengenalkan pentingnya arsip kepada generasi muda.',
      image: '/images/pameran/timeline-2022.jpg'
    },
    {
      year: '2021',
      title: 'Pameran Virtual "Arsip di Era Digital"',
      description: 'Pameran daring pertama yang menampilkan digitalisasi arsip penting dan cara mengaksesnya secara virtual.',
      image: '/images/pameran/timeline-2021.jpg'
    },
    {
      year: '2020',
      title: 'Pameran "Jejak Pandemi dalam Arsip"',
      description: 'Dokumentasi real-time tentang pandemi COVID-19 dan pengaruhnya terhadap kehidupan sosial masyarakat Indonesia.',
      image: '/images/pameran/timeline-2020.jpg'
    },
  ];

  // Program activities for MBKM students
  const mbkmActivities = [
    {
      title: 'Kurasi Arsip',
      icon: '/images/icons/folder.svg',
      description: 'Mahasiswa terlibat dalam pemilihan dan pengorganisasian arsip untuk dipamerkan sesuai tema tertentu.'
    },
    {
      title: 'Desain Pameran',
      icon: '/images/icons/design.svg',
      description: 'Merencanakan tata letak dan desain visual pameran untuk mengoptimalkan pengalaman pengunjung.'
    },
    {
      title: 'Digitalisasi Ekshibit',
      icon: '/images/icons/digital.svg',
      description: 'Mengubah arsip fisik menjadi format digital interaktif untuk pameran virtual dan display touchscreen.'
    },
    {
      title: 'Edukasi Pengunjung',
      icon: '/images/icons/education.svg',
      description: 'Menjadi pemandu pameran dan memberikan penjelasan mendalam tentang arsip yang dipamerkan.'
    },
    {
      title: 'Dokumentasi Kegiatan',
      icon: '/images/icons/camera.svg',
      description: 'Mendokumentasikan seluruh rangkaian kegiatan pameran untuk arsip institusi.'
    },
    {
      title: 'Publikasi dan Media',
      icon: '/images/icons/social.svg',
      description: 'Membuat konten untuk media sosial dan materi promosi untuk meningkatkan kunjungan ke pameran.'
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Rina Wijaya',
      university: 'Universitas Indonesia',
      quote: 'Program MBKM di bagian Pameran Arsip memberikan saya pengalaman berharga dalam mengelola arsip sekaligus berinteraksi dengan publik. Saya belajar banyak tentang pentingnya mengkomunikasikan sejarah melalui media visual yang menarik.',
      image: '/images/testimonials/student-1.jpg'
    },
    {
      name: 'Budi Santoso',
      university: 'Universitas Gadjah Mada',
      quote: 'Terlibat dalam desain pameran arsip tsunami mengajarkan saya bagaimana menyampaikan narasi sensitif dengan penuh penghargaan dan edukatif. Keterampilan kurasi yang saya pelajari sangat bermanfaat untuk karir saya di bidang manajemen informasi.',
      image: '/images/testimonials/student-2.jpg'
    },
    {
      name: 'Laras Purnama',
      university: 'Universitas Padjadjaran',
      quote: 'Program pameran keliling memberikan kesempatan unik bagi saya untuk berinteraksi dengan berbagai kalangan masyarakat dan melihat bagaimana arsip dapat membangkitkan minat sejarah pada generasi muda.',
      image: '/images/testimonials/student-3.jpg'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-surface">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="absolute inset-0 bg-black/40">
          <div className="absolute inset-0 opacity-30">
            <Image 
              src="/images/pameran/hero-pameran.jpg" 
              alt="Pameran Arsip BAST ANRI" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-block bg-orange-500 text-white px-4 py-1 text-sm font-medium rounded-full mb-4">
              Program MBKM
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Pameran Arsip
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Program unggulan untuk memperkenalkan arsip kepada masyarakat luas melalui pameran tematik dan interaktif yang edukatif dan menginspirasi.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="#daftar" 
                className="px-6 py-3 bg-white text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-colors"
              >
                Daftar Program
              </Link>
              <Link 
                href="#galeri" 
                className="px-6 py-3 bg-orange-700 text-white font-medium rounded-lg hover:bg-orange-800 transition-colors"
              >
                Lihat Galeri
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs 
            defaultValue="overview" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-center mb-12">
              <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <TabsTrigger 
                  value="overview"
                  className="px-5 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded-md transition-all"
                >
                  Gambaran Program
                </TabsTrigger>
                <TabsTrigger 
                  value="activities"
                  className="px-5 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded-md transition-all"
                >
                  Aktivitas MBKM
                </TabsTrigger>
                <TabsTrigger 
                  value="gallery"
                  className="px-5 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded-md transition-all"
                >
                  Galeri
                </TabsTrigger>
                <TabsTrigger 
                  value="testimonials"
                  className="px-5 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded-md transition-all"
                >
                  Testimoni
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Content */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                    Tentang Program Pameran Arsip
                  </h2>
                  
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <p>
                      Program Pameran Arsip merupakan salah satu program unggulan di Balai Arsip Statis dan Tsunami ANRI yang didesain untuk mengedukasi dan menginspirasi masyarakat tentang pentingnya arsip sebagai warisan sejarah dan identitas bangsa. Program ini menggabungkan nilai edukasi, seni, dan interaksi masyarakat dalam format yang menarik dan informatif.
                    </p>
                    
                    <p>
                      Pameran Arsip BAST ANRI menampilkan koleksi arsip yang bervariasi, mulai dari dokumen sejarah penting, foto-foto bersejarah, hingga rekaman audio dan video yang memiliki nilai historis tinggi. Pameran ini dirancang dengan konsep tematik yang berganti secara berkala, sehingga memberikan perspektif baru dan menarik bagi pengunjung yang datang kembali.
                    </p>

                    <h3>Tujuan Program</h3>
                    <ul>
                      <li>Meningkatkan kesadaran masyarakat tentang pentingnya arsip sebagai sumber informasi sejarah dan identitas bangsa</li>
                      <li>Mempromosikan koleksi arsip yang dimiliki oleh BAST ANRI kepada masyarakat luas</li>
                      <li>Memberikan pengalaman edukatif yang interaktif dan menarik tentang arsip dan sejarah</li>
                      <li>Membangun apresiasi terhadap peran arsiparis dalam melestarikan warisan dokumenter bangsa</li>
                      <li>Menjangkau berbagai lapisan masyarakat melalui pameran keliling dan format pameran yang bervariasi</li>
                    </ul>

                    <h3>Format Pameran</h3>
                    <ol>
                      <li><strong>Pameran Tetap</strong> - Berlokasi di gedung BAST ANRI dengan tema-tema yang berganti secara berkala</li>
                      <li><strong>Pameran Keliling</strong> - Membawa koleksi arsip ke sekolah, universitas, dan pusat komunitas</li>
                      <li><strong>Pameran Virtual</strong> - Format digital yang dapat diakses secara online melalui platform resmi ANRI</li>
                      <li><strong>Pameran Interaktif</strong> - Menggunakan teknologi seperti augmented reality dan display touchscreen</li>
                    </ol>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border-t-4 border-orange-500">
                    <div className="flex">
                      <div className="flex-shrink-0 flex flex-col items-center mr-6">
                        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">3</div>
                        <div className="h-full w-1 bg-orange-200 dark:bg-orange-900/30 mt-2"></div>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Implementasi Pameran</h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          Mahasiswa berpartisipasi aktif dalam pelaksanaan pameran, mulai dari setting up display, pembuatan konten digital, hingga menjadi pemandu untuk pengunjung.
                        </p>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-sm text-gray-600 dark:text-gray-300">
                          <span className="font-medium text-orange-600 dark:text-orange-400">Durasi:</span> 8-12 minggu
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-heading font-bold text-primary dark:text-white mb-4">
                        Detail Program
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg mr-4">
                            <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Durasi Program</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">3-6 bulan (1-2 semester)</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg mr-4">
                            <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Peserta</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">5-10 mahasiswa per periode</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg mr-4">
                            <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Lokasi</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">BAST ANRI dan lokasi pameran keliling</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg mr-4">
                            <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Jurusan Terkait</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Arsip, Sejarah, Komunikasi, Desain, Manajemen Informasi</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg mr-4">
                            <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Kompetensi</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-4">
                              <li>Manajemen Pameran</li>
                              <li>Kurasi Konten</li>
                              <li>Desain Ekshibisi</li>
                              <li>Komunikasi Publik</li>
                              <li>Pengelolaan Arsip</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                      <div className="p-6">
                        <h3 className="text-xl font-heading font-bold text-primary dark:text-white mb-4">
                          Kontak Coordinator
                        </h3>
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                            <Image 
                              src="/images/staff/coordinator.jpg"
                              alt="Coordinator"
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Dr. Aditya Nugraha</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Koordinator Program Pameran</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm text-gray-600 dark:text-gray-300">pameran.arsip@anri.go.id</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-sm text-gray-600 dark:text-gray-300">(021) 5225-6451</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Section */}
              <div className="mt-16">
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Sejarah Pameran Arsip
                </h2>
                
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-orange-200 dark:bg-orange-900/30"></div>
                  
                  <div className="relative">
                    {timelineEvents.map((event, index) => (
                      <div key={event.year} className={`mb-12 flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                        <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`} style={{ maxWidth: '400px' }}>
                            <div className="relative h-48">
                              <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="p-5">
                              <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-medium rounded-full mb-2">
                                {event.year}
                              </span>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{event.description}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-orange-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{event.year}</span>
                        </div>
                        
                        <div className="w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Activities Content */}
            <TabsContent value="activities" className="mt-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Aktivitas MBKM di Program Pameran Arsip
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {mbkmActivities.map((activity) => (
                    <div key={activity.title} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border-l-4 border-orange-500 hover:shadow-lg transition-shadow duration-300">
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg mr-4">
                            <Image 
                              src={activity.icon} 
                              alt={activity.title} 
                              width={24} 
                              height={24} 
                              className="w-6 h-6"
                            />
                          </div>
                          <h3 className="text-xl font-heading font-medium text-gray-900 dark:text-white">
                            {activity.title}
                          </h3>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 bg-gray-100 dark:bg-gray-800/50 rounded-2xl p-8">
                  <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                    Alur Kegiatan MBKM
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="flex-shrink-0 flex flex-col items-center mr-6">
                        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">1</div>
                        <div className="h-full w-1 bg-orange-200 dark:bg-orange-900/30 mt-2"></div>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Orientasi dan Pengenalan</h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          Mahasiswa diperkenalkan dengan dasar-dasar manajemen pameran arsip, koleksi BAST ANRI, dan prinsip kurasi konten arsip.
                        </p>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-sm text-gray-600 dark:text-gray-300">
                          <span className="font-medium text-orange-600 dark:text-orange-400">Durasi:</span> 2 minggu
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 flex flex-col items-center mr-6">
                        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">2</div>
                        <div className="h-full w-1 bg-orange-200 dark:bg-orange-900/30 mt-2"></div>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Perencanaan Pameran</h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          Mahasiswa belajar dan terlibat dalam proses perencanaan pameran, termasuk penentuan tema, pemilihan arsip, dan pengembangan narasi pameran.
                        </p>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-sm text-gray-600 dark:text-gray-300">
                          <span className="font-medium text-orange-600 dark:text-orange-400">Durasi:</span> 4 minggu
                        </div>
                      </div>
                    </div>
                    
                    <div className