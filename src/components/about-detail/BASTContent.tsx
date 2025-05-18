'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion } from './Accordion';
import { bastData } from '@/data/about/bast';
import { ExternalLink, Info, FileText, BookOpen, Building, History } from 'lucide-react';
import { useTheme } from 'next-themes';

export const BASTContent = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const { theme } = useTheme();
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

  // Theme-based styling aligned with MBKMContent
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

  // Navigation items for BAST sections
  const navItems = [
    { id: 'overview', label: 'Ringkasan', icon: Info },
    { id: 'history', label: 'Sejarah', icon: History },
    { id: 'functions', label: 'Fungsi', icon: FileText },
    { id: 'collections', label: 'Koleksi', icon: BookOpen },
    { id: 'structure', label: 'Struktur', icon: Building },
  ];

  // Highlight features for BAST
  const features = bastData.features.map(feature => ({
    ...feature,
    bgColor: getRandomColor(),
  }));

  // Content sections based on active tab
  const contentSections = {
    overview: (
      <div className={`rounded-xl ${currentTheme.card} backdrop-blur-sm p-6`}>
        <h3 className={`text-xl font-bold mb-4 ${currentTheme.headingText}`}>Tentang BAST ANRI</h3>

        <div className="grid gap-6 mb-6">
          {/* Bagian semua item kecuali terakhir jika ganjil */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.slice(0, features.length - (features.length % 2)).map((feature, index) => (
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

          {/* Jika ganjil, tampilkan item terakhir di tengah */}
          {features.length % 2 !== 0 && (
            <div className="grid place-items-center">
              <motion.div
                key="last"
                className="rounded-xl overflow-hidden shadow-md w-full md:w-1/2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: features.length * 0.1, duration: 0.5 }}
              >
                <div className={`${features[features.length - 1].bgColor} p-4 text-white`}>
                  <h4 className="text-lg font-bold">{features[features.length - 1].title}</h4>
                </div>
                <div className={`p-4 ${currentTheme.featureCard}`}>
                  <p className={currentTheme.text}>{features[features.length - 1].description}</p>
                </div>
              </motion.div>
            </div>
          )}
        </div>

        <div
          className={`prose prose-sm md:prose lg:prose-lg max-w-none dark:prose-invert 
          prose-p:leading-relaxed prose-p:text-justify prose-p:mb-5 prose-p:indent-6
          prose-li:mb-2 prose-li:ml-6 list-disc prose-a:text-blue-600 dark:prose-a:text-blue-400 ${currentTheme.text}`}
          dangerouslySetInnerHTML={{ __html: bastData.overviewContent }}
        />
      </div>
    ),
    history: (
      <div className={`rounded-xl ${currentTheme.card} backdrop-blur-sm p-6`}>
        <h3 className={`text-xl font-bold mb-6 ${currentTheme.headingText}`}>Sejarah BAST ANRI</h3>

        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute left-4 top-0 bottom-0 w-1 ${currentTheme.accent}`}></div>

          {/* Timeline items */}
          <div className="space-y-8 pl-12 relative">
            {bastData.timeline.map((item, index) => (
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

                <div className={`rounded-lg border ${currentTheme.divider} p-4 backdrop-blur-sm`}>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs ${currentTheme.badge} mb-2`}
                  >
                    {item.period}
                  </span>
                  <h4 className={`font-bold ${currentTheme.headingText} mb-2`}>{item.title}</h4>
                  <p className={currentTheme.text}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
    functions: (
      <div className={`rounded-xl ${currentTheme.card} backdrop-blur-sm p-6`}>
        <h3 className={`text-xl font-bold mb-4 ${currentTheme.headingText}`}>Fungsi Utama BAST</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bastData.functions.map((item, index) => (
            <motion.div
              key={index}
              className="flex gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-full ${currentTheme.accent} flex items-center justify-center text-white`}
              >
                <span className="font-bold text-lg">{index + 1}</span>
              </div>
              <div>
                <h4 className={`font-bold ${currentTheme.headingText}`}>{item.title}</h4>
                <p className={`${currentTheme.text} mt-1`}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
    collections: (
      <div className={`rounded-xl ${currentTheme.card} backdrop-blur-sm p-6`}>
        <h3 className={`text-xl font-bold mb-6 ${currentTheme.headingText}`}>Koleksi Unggulan</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bastData.collections.map((item, index) => (
            <motion.div
              key={index}
              className={`border ${currentTheme.divider} rounded-lg overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="relative h-48">
                <Image
                  src="/api/placeholder/400/320"
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 backdrop-blur-sm">
                <h4 className={`font-bold ${currentTheme.headingText}`}>{item.title}</h4>
                <p className={currentTheme.text}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
    structure: (
      <div className={`rounded-xl ${currentTheme.card} backdrop-blur-sm p-6`}>
        <h3 className={`text-xl font-bold mb-4 ${currentTheme.headingText}`}>
          Struktur Organisasi
        </h3>

        <div
          className={`w-full border ${currentTheme.divider} rounded-lg p-6 mb-6 ${currentTheme.featureCard}`}
        >
          <div className="relative h-80 w-full">
            <Image
              src="/api/placeholder/800/600"
              alt="Struktur Organisasi BAST ANRI"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bastData.structureItems.map((item, index) => (
            <motion.div
              key={index}
              className={`p-4 border ${currentTheme.divider} rounded-lg ${currentTheme.featureCard}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <h4 className={`font-bold ${currentTheme.headingText}`}>{item.title}</h4>
              <p className={`text-sm ${currentTheme.text} mt-1`}>{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  };

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
                {bastData.headerTitle}
              </motion.h2>
              <motion.p
                className="text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {bastData.headerDescription}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {bastData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-white/20 text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <motion.div
                className="relative w-full h-52 md:h-64"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Image
                  src={bastData.headerImageSrc}
                  alt="Gedung atau Logo BAST ANRI"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bastData.stats.map((stat, index) => (
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
          {contentSections[activeSection]}
        </motion.div>
      </AnimatePresence>

      {/* Accordion Content - FAQ */}
      <div className={`rounded-xl ${currentTheme.card} backdrop-blur-sm p-6 mt-8`}>
        <h3 className={`text-xl font-bold mb-4 ${currentTheme.headingText}`}>Informasi Penting</h3>
        <div className={`border rounded-lg overflow-hidden divide-y ${currentTheme.divider}`}>
          {bastData.accordionItems.map(item => (
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

      {/* External Link - Call to Action */}
      <div className="flex justify-center mt-8">
        <motion.a
          href={bastData.externalLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center px-6 py-3 ${currentTheme.buttonPrimary} font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {bastData.externalLink.label}
          <ExternalLink className="ml-2 h-4 w-4" />
        </motion.a>
      </div>
    </div>
  );
};
