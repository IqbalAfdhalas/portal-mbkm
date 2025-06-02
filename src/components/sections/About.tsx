// src/components/sections/About.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MotionDiv } from '@/components/common/MotionClientOnly';

const About = () => {
  const features = [
    {
      icon: '🎓',
      title: 'Pembelajaran Fleksibel',
      description: 'Kebebasan memilih program belajar sesuai minat dan bakat',
    },
    {
      icon: '🔄',
      title: 'SKS Konversi',
      description: 'Konversi kegiatan MBKM menjadi SKS perkuliahan',
    },
    {
      icon: '🌐',
      title: 'Pengalaman Lintas Disiplin',
      description: 'Peluang untuk mendapatkan pengalaman dari berbagai bidang',
    },
    {
      icon: '🤝',
      title: 'Kemitraan Luas',
      description: 'Kolaborasi dengan berbagai institusi pendidikan dan industri',
    },
  ];

  return (
    <section
      id="tentang"
      className="py-12 md:py-20 bg-gray-50 dark:bg-gradient-to-b dark:from-[#2D3748] dark:to-[#1A202C]"
    >
      <div className="container mx-auto max-w-screen-xl px-4">
        <MotionDiv
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium text-secondary uppercase tracking-wider">
            Tentang Program
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary dark:text-white mt-2 mb-4">
            Merdeka Belajar Kampus Merdeka
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Program MBKM memberikan kesempatan bagi mahasiswa untuk mengasah kemampuan sesuai bakat
            dan minat dengan terjun langsung ke dunia kerja sebagai persiapan karir masa depan.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <MotionDiv
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/Tentang/about.jpg"
                alt="Kegiatan mahasiswa dalam program MBKM"
                fill
                className="object-cover"
                priority
              />
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-primary dark:text-white mb-4 md:mb-6">
              Program yang Berfokus pada Pengembangan Mahasiswa
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 md:mb-8 text-sm md:text-base">
              MBKM x BAST ANRI merupakan program yang dirancang untuk memberikan pengalaman belajar
              yang komprehensif melalui kolaborasi dengan Arsip Nasional Republik Indonesia. Program
              ini memberikan kesempatan mahasiswa untuk mengembangkan hard skill dan soft skill yang
              relevan dengan dunia kerja.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {features.map(({ icon, title, description }) => (
                <div key={title} className="flex items-start space-x-3 md:space-x-4">
                  <span className="text-xl md:text-2xl flex-shrink-0" aria-hidden="true">
                    {icon}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-medium text-primary dark:text-white text-sm md:text-base">
                      {title}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 md:mt-8">
              <Link
                href="/tentang"
                title="Lihat halaman detail tentang MBKM"
                className="text-primary-light dark:text-blue-400 font-medium inline-flex items-center hover:underline text-sm md:text-base"
              >
                Pelajari lebih lanjut
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 ml-2 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default About;
