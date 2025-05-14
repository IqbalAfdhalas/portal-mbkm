// src/components/sections/Program.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import slugify from 'slugify';

const Program = () => {
  const [activeTab, setActiveTab] = useState(0);

  const programs = [
    {
      title: 'Magang',
      icon: '/images/icons/internship.svg',
      description:
        'Program magang bersertifikat yang memberikan pengalaman nyata bekerja di ANRI selama satu semester.',
      features: ['Durasi 6 bulan', 'Konversi 20 SKS', 'Sertifikat resmi', 'Pendampingan khusus'],
      image: '/images/program-internship.jpg',
    },
    {
      title: 'Penelitian',
      icon: '/images/icons/research.svg',
      description:
        'Kesempatan untuk melakukan penelitian arsip di bawah bimbingan ahli dan arsiparis ANRI.',
      features: [
        'Akses arsip nasional',
        'Bimbingan penelitian',
        'Publikasi karya ilmiah',
        'Konversi 20 SKS',
      ],
      image: '/images/program-research.jpg',
    },
    {
      title: 'Studi Independen',
      icon: '/images/icons/independent.svg',
      description:
        'Program belajar mandiri dengan kurikulum khusus tentang kearsipan dan manajemen dokumentasi.',
      features: [
        'Kurikulum spesialis',
        'Proyek lapangan',
        'Konversi 20 SKS',
        'Sertifikat kompetensi',
      ],
      image: '/images/program-independent.jpg',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="program" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium text-secondary uppercase tracking-wider">
            Program Unggulan
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary dark:text-white mt-2 mb-4">
            Program MBKM di BAST ANRI
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Berikut adalah program-program MBKM yang dapat diikuti mahasiswa di Balai Arsip Statis
            dan Tsunami ANRI.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-dark-surface rounded-xl shadow-md overflow-hidden">
              <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
                {programs.map((program, idx) => (
                  <button
                    key={program.title}
                    className={`flex items-center p-4 text-left transition-all ${
                      activeTab === idx
                        ? 'bg-primary/5 dark:bg-primary/20 border-l-4 border-primary'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setActiveTab(idx)}
                  >
                    <div className="w-10 h-10 mr-4 relative">
                      <Image
                        src={program.icon}
                        alt={program.title}
                        fill
                        className="object-contain"
                        priority={idx === 0}
                      />
                    </div>
                    <div>
                      <h3
                        className={`font-medium ${
                          activeTab === idx
                            ? 'text-primary dark:text-blue-400'
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        {program.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {program.description.substring(0, 60)}...
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-dark-surface rounded-xl shadow-md overflow-hidden h-full"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={programs[activeTab].image}
                  alt={`Ilustrasi program ${programs[activeTab].title} di ANRI`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-2xl font-heading font-bold text-white">
                      Program {programs[activeTab].title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-8">
                  {programs[activeTab].description}
                </p>

                <motion.ul
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {programs[activeTab].features.map((feature, idx) => (
                    <motion.li
                      key={`${programs[activeTab].title}-${feature}`}
                      className="flex items-center text-gray-700 dark:text-gray-300"
                      variants={itemVariants}
                    >
                      <svg
                        className="w-5 h-5 mr-2 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </motion.li>
                  ))}
                </motion.ul>

                <Link
                  href={`/program/${slugify(programs[activeTab].title, { lower: true })}`}
                  title={`Lihat detail program ${programs[activeTab].title}`}
                  className="inline-block px-6 py-3 rounded-lg bg-primary hover:bg-primary-light text-white font-medium transition-colors duration-300"
                >
                  Detail Program
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Program;
