'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionProps } from './Accordion';
import { websiteData, rawFeatures } from '@/data/about/website';
import { Book, Settings, Zap, Users, ExternalLink } from 'lucide-react';
import { useTheme } from 'next-themes';

export const WebsiteContent: React.FC = () => {
  const colorVariants = [
    'bg-gradient-to-br from-pink-500 to-red-500',
    'bg-gradient-to-br from-orange-400 to-yellow-400',
    'bg-gradient-to-br from-green-500 to-teal-400',
    'bg-gradient-to-br from-blue-500 to-cyan-500',
    'bg-gradient-to-br from-purple-500 to-indigo-500',
    'bg-gradient-to-br from-rose-500 to-pink-400',
    'bg-gradient-to-br from-yellow-400 to-lime-400',
  ];

  const getRandomColor = () => colorVariants[Math.floor(Math.random() * colorVariants.length)];

  const [activeSection, setActiveSection] = useState('overview');
  const { theme } = useTheme();

  // Theme-based styling consistent with MBKMContent
  const themeStyles = {
    light: {
      card: 'bg-white/90 border border-blue-100 shadow-lg shadow-blue-100/20',
      accent: 'bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400',
      badge: 'bg-blue-100 text-blue-800',
      buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
      buttonSecondary: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
      divider: 'border-blue-100',
      icon: 'text-blue-600',
      featureCard: 'bg-white/95',
      text: 'text-gray-700',
      headingText: 'text-gray-800',
      statsCard: 'bg-blue-50/80',
    },
    dark: {
      card: 'bg-gray-800/95 border border-gray-700 shadow-lg shadow-blue-900/20',
      accent: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900',
      badge: 'bg-gray-700 text-blue-300',
      buttonPrimary: 'bg-blue-700 hover:bg-blue-800 text-white',
      buttonSecondary: 'bg-gray-800 hover:bg-gray-700 text-blue-300',
      divider: 'border-gray-700',
      icon: 'text-blue-400',
      featureCard: 'bg-gray-800/80',
      text: 'text-gray-300',
      headingText: 'text-gray-100',
      statsCard: 'bg-gray-800/60',
    },
  };

  const currentTheme = theme === 'dark' ? themeStyles.dark : themeStyles.light;

  const featuresWithColor = rawFeatures.map(feature => ({
    ...feature,
    bgColor: getRandomColor(),
  }));

  // Navigation items for the Website sections
  const navItems = [
    { id: 'overview', label: 'Ringkasan', icon: Book },
    { id: 'features', label: 'Fitur', icon: Zap },
    { id: 'technical', label: 'Teknis', icon: Settings },
  ];

  // Placeholder stats for website metrics (can be replaced with actual data)
  const websiteStats = [
    { value: '2K+', label: 'Pengguna' },
    { value: '24/7', label: 'Ketersediaan' },
    { value: '100+', label: 'Dokumen' },
    { value: '98%', label: 'Kepuasan' },
  ];

  return (
    <div className="space-y-8">
      {/* Dynamic Header Section */}
      <div className={`rounded-xl overflow-hidden ${currentTheme.card} backdrop-blur-sm`}>
        <div className={`${currentTheme.accent} p-8 text-white`}>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="md:w-2/3">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {websiteData.headerTitle || 'Website MBKM BAST ANRI'}
              </motion.h2>
              <motion.p
                className="text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {websiteData.headerDescription ||
                  'Platform digital untuk pengelolaan dokumen MBKM di ANRI'}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {websiteData.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-white/20 text-sm font-medium"
                  >
                    {tag}
                  </span>
                )) || (
                  <>
                    <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                      Responsif
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                      Next.js
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                      Dashboard
                    </span>
                  </>
                )}
              </motion.div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <motion.div
                className="relative w-full h-52 md:h-64"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {websiteData.imageUrl ? (
                  <Image
                    src={websiteData.imageUrl}
                    alt="Screenshot website MBKM BAST ANRI"
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-white/10 flex items-center justify-center">
                    <p className="text-white">Screenshot Website</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Website Stats with animated counters */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {websiteStats.map((stat, index) => (
              <motion.div
                key={index}
                className={`text-center p-4 rounded-lg ${currentTheme.statsCard}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                <span className={`text-3xl font-bold ${currentTheme.icon}`}>{stat.value}</span>
                <p className={`text-sm mt-1 ${currentTheme.text}`}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              activeSection === item.id ? currentTheme.buttonPrimary : currentTheme.buttonSecondary
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Dynamic Content Sections */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className={`rounded-xl ${currentTheme.card} backdrop-blur-sm p-6`}>
              <h3 className={`text-xl font-bold mb-4 ${currentTheme.headingText}`}>
                Ringkasan Website
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {featuresWithColor.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="rounded-xl overflow-hidden shadow-md"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className={`${feature.bgColor} p-4 text-white`}>
                      <h4 className="text-lg font-bold">{feature.title}</h4>
                    </div>
                    <div className={`p-4 ${currentTheme.featureCard}`}>
                      <p className={currentTheme.text}>{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div
                className={`prose prose-sm md:prose lg:prose-lg max-w-none dark:prose-invert
                prose-p:leading-relaxed prose-p:text-justify prose-p:mb-5 prose-p:indent-6
                prose-li:mb-2 prose-li:ml-6 list-disc prose-a:text-blue-600 dark:prose-a:text-blue-400 ${currentTheme.text}`}
              ></div>
            </div>
          )}

          {/* Features Section */}
          {activeSection === 'features' && (
            <div className={`rounded-xl ${currentTheme.card} backdrop-blur-sm p-6`}>
              <h3 className={`text-xl font-bold mb-4 ${currentTheme.headingText}`}>
                Fitur Unggulan
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {websiteData.features?.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`border ${currentTheme.divider} rounded-lg p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <div
                      className={`w-12 h-12 mb-4 rounded-full ${currentTheme.accent} flex items-center justify-center text-white`}
                    >
                      <span className="font-bold">{index + 1}</span>
                    </div>
                    <h4 className={`text-xl font-medium mb-2 ${currentTheme.headingText}`}>
                      {feature.title}
                    </h4>
                    <p className={currentTheme.text}>{feature.description}</p>
                  </motion.div>
                )) ||
                  // Extended feature list if none provided
                  [
                    {
                      title: 'Dashboard Interaktif',
                      description:
                        'Panel kontrol dengan visualisasi data yang informatif untuk monitoring kegiatan dan status dokumen',
                    },
                    {
                      title: 'Manajemen Dokumen',
                      description:
                        'Sistem penyimpanan dan pengelolaan dokumen digital yang terstruktur dengan fitur pencarian lanjutan',
                    },
                    {
                      title: 'Tracking Progres',
                      description:
                        'Pemantauan real-time terhadap status pemrosesan dokumen dan tahapan administratif',
                    },
                    {
                      title: 'Notifikasi Realtime',
                      description:
                        'Sistem pemberitahuan otomatis untuk setiap perubahan status dokumen dan deadline penting',
                    },
                    {
                      title: 'Multi-platform',
                      description:
                        'Akses website dari berbagai perangkat dengan tampilan yang responsif dan konsisten',
                    },
                    {
                      title: 'Keamanan Data',
                      description:
                        'Perlindungan data tingkat tinggi dengan enkripsi dan sistem otorisasi berlapis',
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className={`border ${currentTheme.divider} rounded-lg p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -5 }}
                    >
                      <div
                        className={`w-12 h-12 mb-4 rounded-full ${currentTheme.accent} flex items-center justify-center text-white`}
                      >
                        <span className="font-bold">{index + 1}</span>
                      </div>
                      <h4 className={`text-xl font-medium mb-2 ${currentTheme.headingText}`}>
                        {feature.title}
                      </h4>
                      <p className={currentTheme.text}>{feature.description}</p>
                    </motion.div>
                  ))}
              </div>
            </div>
          )}

          {/* Technical Section */}
          {activeSection === 'technical' && (
            <div className={`rounded-xl ${currentTheme.card} backdrop-blur-sm p-6`}>
              <h3 className={`text-xl font-bold mb-6 ${currentTheme.headingText}`}>
                Informasi Teknis
              </h3>

              <div className="relative">
                {/* Timeline line */}
                <div className={`absolute left-4 top-0 bottom-0 w-1 ${currentTheme.accent}`}></div>

                {/* Technical specs items */}
                <div className="space-y-8 pl-12 relative">
                  {[
                    {
                      title: 'Frontend Modern',
                      description:
                        'Dibangun dengan Next.js dan React, dipadukan dengan Tailwind CSS untuk tampilan yang cepat, responsif, dan estetis.',
                    },
                    {
                      title: 'Firebase Integration',
                      description:
                        'Menggunakan Firebase untuk autentikasi user, database (Firestore), dan media storage guna mendukung fitur login serta pengelolaan konten.',
                    },
                    {
                      title: 'Desain Responsif',
                      description:
                        'UI dirancang dengan pendekatan desktop-first yang tetap optimal di perangkat mobile, dengan dukungan dark/light mode.',
                    },
                    {
                      title: 'Animasi Halus',
                      description:
                        'Didukung oleh Framer Motion untuk transisi interaktif dan animasi yang meningkatkan pengalaman pengguna.',
                    },
                    {
                      title: 'Optimasi Performa',
                      description:
                        'Menggunakan teknik lazy loading, image optimization, dan scrollspy untuk pengalaman menjelajah yang cepat dan efisien.',
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      className="relative"
                    >
                      {/* Timeline dot */}
                      <div
                        className={`absolute -left-12 w-8 h-8 rounded-full ${currentTheme.accent} flex items-center justify-center text-white font-bold`}
                      >
                        {index + 1}
                      </div>

                      <div
                        className={`rounded-lg border ${currentTheme.divider} p-4 backdrop-blur-sm`}
                      >
                        <h4 className={`font-bold ${currentTheme.headingText} mb-2`}>
                          {item.title}
                        </h4>
                        <p className={currentTheme.text}>{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Accordion Content - FAQ */}
      <div className={`rounded-xl ${currentTheme.card} backdrop-blur-sm p-6 mt-8`}>
        <h3 className={`text-xl font-bold mb-4 ${currentTheme.headingText}`}>Informasi Website</h3>
        <div className={`border rounded-lg overflow-hidden divide-y ${currentTheme.divider}`}>
          {websiteData.accordionItems?.map(item => (
            <Accordion
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              isOpenDefault={item.isOpen}
            />
          )) ||
            // Default FAQ items if none provided
            [
              {
                id: 'faq-1',
                title: 'Bagaimana cara mengakses website MBKM BAST ANRI?',
                content:
                  'Website dapat diakses melalui domain resmi ANRI dengan menggunakan kredensial yang diberikan oleh administrator sistem.',
                isOpen: true,
              },
              {
                id: 'faq-2',
                title: 'Siapa saja yang dapat menggunakan platform ini?',
                content:
                  'Platform ini dapat digunakan oleh mahasiswa peserta MBKM, dosen pembimbing, koordinator program, dan staf administrasi ANRI yang terlibat dalam program MBKM.',
                isOpen: false,
              },
              {
                id: 'faq-3',
                title: 'Bagaimana sistem keamanan data pada website?',
                content:
                  'Website dilengkapi dengan sistem keamanan berlapis, termasuk enkripsi data, autentikasi dua faktor, dan audit log untuk memastikan keamanan data pengguna.',
                isOpen: false,
              },
              {
                id: 'faq-4',
                title: 'Apakah website dapat diakses melalui perangkat mobile?',
                content:
                  'Ya, website dirancang dengan tampilan responsif sehingga dapat diakses dengan optimal baik melalui desktop maupun perangkat mobile seperti smartphone dan tablet.',
                isOpen: false,
              },
              {
                id: 'faq-5',
                title: 'Bagaimana prosedur pemulihan akun jika lupa password?',
                content:
                  'Pengguna dapat menggunakan fitur "Lupa Password" pada halaman login untuk mengatur ulang password melalui email terdaftar atau menghubungi administrator sistem.',
                isOpen: false,
              },
            ].map(item => (
              <Accordion
                key={item.id}
                id={item.id}
                title={item.title}
                content={item.content}
                isOpenDefault={item.isOpen}
              />
            ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="flex justify-center mt-8">
        <motion.a
          href="/"
          className={`inline-flex items-center px-6 py-3 ${currentTheme.buttonPrimary} font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Kembali ke Halaman Utama
          <ExternalLink className="ml-2 h-4 w-4" />
        </motion.a>
      </div>
    </div>
  );
};

export default WebsiteContent;
