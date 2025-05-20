// src/components/sections/About.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

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
      className="py-20 bg-gray-50 dark:bg-gradient-to-b dark:from-[#2D3748] dark:to-[#1A202C]"
    >
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium text-secondary uppercase tracking-wider">
            Tentang Program
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary dark:text-white mt-2 mb-4">
            Merdeka Belajar Kampus Merdeka
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Program MBKM memberikan kesempatan bagi mahasiswa untuk mengasah kemampuan sesuai bakat
            dan minat dengan terjun langsung ke dunia kerja sebagai persiapan karir masa depan.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/about.jpg"
                alt="Kegiatan mahasiswa dalam program MBKM"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-heading font-semibold text-primary dark:text-white mb-6">
              Program yang Berfokus pada Pengembangan Mahasiswa
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              MBKM x BAST ANRI merupakan program yang dirancang untuk memberikan pengalaman belajar
              yang komprehensif melalui kolaborasi dengan Arsip Nasional Republik Indonesia. Program
              ini memberikan kesempatan mahasiswa untuk mengembangkan hard skill dan soft skill yang
              relevan dengan dunia kerja.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map(({ icon, title, description }) => (
                <div key={title} className="flex items-start space-x-4">
                  <span className="text-2xl" aria-hidden="true">
                    {icon}
                  </span>
                  <div>
                    <h4 className="font-medium text-primary dark:text-white">{title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/tentang"
                title="Lihat halaman detail tentang MBKM"
                className="text-primary-light dark:text-blue-400 font-medium inline-flex items-center hover:underline"
              >
                Pelajari lebih lanjut
                <svg
                  className="w-4 h-4 ml-2"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
