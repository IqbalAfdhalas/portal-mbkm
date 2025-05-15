'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const PameranDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    // Simulate loading to show transition effects
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Exhibition data - would likely come from a database in production
  const pameranData = {
    title: 'Pameran Arsip',
    subtitle: 'Program Edukasi Arsip untuk Masyarakat',
    description: 'Program unggulan BAST ANRI yang bertujuan untuk memperkenalkan arsip kepada masyarakat luas melalui pameran interaktif dengan tema-tema yang relevan dengan kebutuhan masyarakat dan sejarah bangsa Indonesia.',
    icon: '/images/icons/exhibition.svg',
    mainImage: '/images/program-pameran.jpg', 
    tagline: 'Melestarikan Sejarah, Mengedukasi Bangsa',
    color: 'from-orange-500 to-orange-600',
    borderColor: 'border-orange-500',
    objectives: [
      'Mempopulerkan arsip-arsip penting sejarah kepada masyarakat umum',
      'Memberikan edukasi mengenai nilai dan pentingnya arsip dalam kehidupan bernegara',
      'Membangun kesadaran publik tentang pelestarian dokumen sejarah',
      'Mengenalkan BAST ANRI sebagai lembaga pengelola arsip statis dan tsunami di Indonesia'
    ],
    features: [
      {
        title: 'Tema Sejarah Nasional',
        description: 'Pameran dengan tema-tema penting dalam sejarah Indonesia seperti perjuangan kemerdekaan, bencana alam nasional, dan arsip-arsip kepresidenan.',
        icon: '/images/icons/history.svg'
      },
      {
        title: 'Media Arsip Interaktif',
        description: 'Penggunaan teknologi digital touch screen dan augmented reality untuk memberikan pengalaman interaktif kepada pengunjung pameran.',
        icon: '/images/icons/digital.svg'
      },
      {
        title: 'Pameran Keliling',
        description: 'Program pameran yang berpindah-pindah ke berbagai lokasi seperti sekolah, universitas, dan ruang publik untuk menjangkau masyarakat lebih luas.',
        icon: '/images/icons/location.svg'
      },
      {
        title: 'Edukasi Publik',
        description: 'Sesi diskusi, workshop, dan kegiatan interaktif yang memungkinkan pengunjung untuk lebih memahami proses pengarsipan dan nilai historis arsip.',
        icon: '/images/icons/education.svg'
      }
    ],
    schedule: [
      {
        title: 'Pameran Arsip Kemerdekaan',
        date: '17-25 Agustus 2025',
        location: 'Gedung BAST ANRI, Jakarta',
        description: 'Pameran menampilkan arsip-arsip penting terkait kemerdekaan Indonesia.'
      },
      {
        title: 'Pameran Arsip Tsunami',
        date: '20-27 September 2025',
        location: 'Museum Tsunami, Aceh',
        description: 'Dokumentasi dan arsip peristiwa tsunami Aceh 2004 dan upaya pemulihan.'
      },
      {
        title: 'Pameran Keliling: Arsip untuk Generasi Z',
        date: '10-17 Oktober 2025',
        location: 'Kampus UI, Depok',
        description: 'Pameran yang dikemas untuk menarik minat generasi muda terhadap arsip.'
      },
      {
        title: 'Workshop Digitalisasi Arsip',
        date: '5 November 2025',
        location: 'Perpustakaan Nasional, Jakarta',
        description: 'Workshop interaktif tentang teknik pelestarian dan digitalisasi arsip.'
      }
    ],
    testimonials: [
      {
        name: 'Dra. Siti Nurhasanah',
        role: 'Guru Sejarah SMA',
        image: '/api/placeholder/64/64',
        quote: 'Pameran Arsip BAST ANRI memberikan pengalaman belajar yang tidak bisa didapatkan hanya dari buku teks. Siswa-siswa saya sangat antusias melihat dokumen asli sejarah bangsa.'
      },
      {
        name: 'Ahmad Rizki',
        role: 'Mahasiswa Ilmu Sejarah',
        image: '/api/placeholder/64/64',
        quote: 'Media interaktif di pameran membantu saya memahami konteks dan latar belakang peristiwa sejarah dengan cara yang lebih mendalam dan berkesan.'
      },
      {
        name: 'Prof. Dr. Bambang Sutrisno',
        role: 'Sejarawan',
        image: '/api/placeholder/64/64',
        quote: 'BAST ANRI telah melakukan terobosan penting dalam memperkenalkan arsip ke masyarakat luas melalui pameran yang dikemas secara modern dan edukatif.'
      }
    ],
    benefits: [
      'Pengalaman belajar sejarah secara langsung melalui dokumen asli',
      'Pemahaman mendalam tentang peristiwa sejarah dan konteksnya',
      'Pengenalan terhadap proses pengarsipan dan pelestarian dokumen',
      'Sensasi interaktif melalui teknologi digital dalam pameran',
      'Kesempatan diskusi dengan para ahli dan arsiparis'
    ],
    faqs: [
      {
        question: 'Apakah pameran terbuka untuk umum?',
        answer: 'Ya, pameran arsip BAST ANRI terbuka untuk umum dan biasanya gratis. Untuk pameran tertentu yang memerlukan registrasi, informasi akan diumumkan di situs resmi BAST ANRI.'
      },
      {
        question: 'Bisakah sekolah mengajukan kunjungan khusus untuk pameran?',
        answer: 'Tentu! BAST ANRI menyediakan layanan kunjungan khusus untuk rombongan sekolah dengan pemandu yang akan menjelaskan lebih detail. Kunjungan dapat diatur dengan menghubungi bagian humas BAST ANRI minimal 2 minggu sebelumnya.'
      },
      {
        question: 'Apakah dokumen yang dipamerkan adalah dokumen asli?',
        answer: 'Sebagian besar pameran menampilkan replika berkualitas tinggi untuk alasan konservasi, namun pada kesempatan khusus, dokumen asli juga ditampilkan dengan pengamanan dan pengendalian lingkungan yang ketat.'
      },
      {
        question: 'Bagaimana cara mahasiswa dapat berpartisipasi dalam program ini?',
        answer: 'Mahasiswa dapat berpartisipasi sebagai relawan pemandu pameran, asisten riset untuk tema pameran, atau magang dalam tim kurasi. Informasi lebih lanjut tersedia di bagian Direktori pada website ini.'
      }
    ],
    contactPerson: {
      name: 'Drs. Hadi Purnomo',
      position: 'Koordinator Program Pameran',
      email: 'pameran@bastanri.go.id',
      phone: '021-5550123 ext. 789'
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-dark-surface pt-20`}>
      {/* Hero Section */}
      <div className={`w-full bg-gradient-to-r ${pameranData.color} py-20 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-20">
          <Image src={pameranData.mainImage} alt={pameranData.title} fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 text-white">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                {pameranData.title}
              </h1>
              <p className="text-xl md:text-2xl font-light mb-6">{pameranData.subtitle}</p>
              <p className="text-lg opacity-90 mb-8 max-w-2xl">
                {pameranData.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/kontak" className="bg-white text-orange-600 hover:bg-orange-100 px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                  Hubungi Kami
                </Link>
                <Link href="#jadwal" className="bg-orange-700 hover:bg-orange-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                  Lihat Jadwal
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 mt-10 md:mt-0 flex justify-center">
              <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-xl p-10">
                <Image src={pameranData.icon} alt={pameranData.title} width={100} height={100} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Objectives */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary dark:text-white mb-4">
              Tujuan Program
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Program Pameran Arsip BAST ANRI didesain dengan tujuan-tujuan spesifik untuk memaksimalkan dampak edukasi dan kesadaran masyarakat tentang arsip.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {pameranData.objectives.map((objective, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-orange-500 flex items-start">
                <div className="mr-4 mt-1">
                  <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 dark:text-gray-200 font-medium">{objective}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary dark:text-white mb-4">
              Fitur Program
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Program Pameran Arsip BAST ANRI menawarkan berbagai fitur menarik yang dirancang untuk memberikan pengalaman edukasi yang optimal.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {pameranData.features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mr-4">
                      <Image src={feature.icon} alt={feature.title} width={24} height={24} />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-primary dark:text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div id="jadwal" className="mb-20 scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary dark:text-white mb-4">
              Jadwal Pameran Mendatang
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Berikut adalah jadwal pameran arsip yang akan diselenggarakan oleh BAST ANRI dalam waktu dekat.
            </p>
          </div>
          
          <div className="space-y-6">
            {pameranData.schedule.map((event, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border-l-4 border-orange-500">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-primary dark:text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {event.description}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-200 font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-200">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300 italic">
              * Jadwal dapat berubah sewaktu-waktu. Silakan pantau pengumuman resmi dari BAST ANRI.
            </p>
            <Link href="/kontak" className="inline-block mt-4 text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 font-medium">
              Hubungi kami untuk informasi jadwal terbaru →
            </Link>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary dark:text-white mb-4">
              Testimoni
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Apa kata mereka yang telah mengunjungi Pameran Arsip BAST ANRI.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pameranData.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image src={testimonial.image} alt={testimonial.name} width={64} height={64} className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-lg font-heading font-bold text-primary dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div>
                  <svg className="w-8 h-8 text-orange-300 mb-2 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    "{testimonial.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary dark:text-white mb-4">
              Manfaat Mengunjungi Pameran
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Kunjungan ke Pameran Arsip memberikan berbagai manfaat bagi pengunjung dari berbagai latar belakang.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {pameranData.benefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-orange-500 flex flex-col">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-orange-600">{index + 1}</span>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-200">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary dark:text-white mb-4">
              Pertanyaan Umum
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Berikut adalah jawaban untuk pertanyaan yang sering diajukan tentang Program Pameran Arsip.
            </p>
          </div>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {pameranData.faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h4 className="text-lg font-heading font-bold text-primary dark:text-white mb-3">
                    {faq.question}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-4 text-center">
                Kontak Penyelenggara
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4"></div>
                  <h4 className="text-lg font-heading font-semibold text-primary dark:text-white">
                    {pameranData.contactPerson.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {pameranData.contactPerson.position}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-orange-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-200">{pameranData.contactPerson.email}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-orange-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-200">{pameranData.contactPerson.phone}</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Link href="/kontak" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 inline-block">
                  Kirim Pesan
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-12 mb-6">
          <Link href="/#program" className="inline-flex items-center text-primary dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Program
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PameranDetail;