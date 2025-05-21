'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion } from './Accordion';
import { mbkmData } from '@/data/about/mbkm';
import { ExternalLink, Book, Award, Calendar, Users, Rocket } from 'lucide-react';
import { useTheme } from 'next-themes';
import { MotionDiv } from '@/components/common/MotionClientOnly';

export const MBKMContent = () => {
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

  // Updated theme-based styling aligned with page.tsx
  const themeStyles = {
    light: {
      card: 'bg-white/90 border border-blue-100 shadow-lg shadow-blue-100/20',
      accent: 'bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400',
      badge: 'bg-blue-100 text-blue-800',
      buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
      buttonSecondary: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
      divider: 'border-blue-100',
      icon: 'text-blue-600',
      featureCard: 'bg-white/95 dark:bg-gray-800',
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

  // Navigation items for the MBKM sections
  const navItems = [
    { id: 'overview', label: 'Ringkasan', icon: Book },
    { id: 'benefits', label: 'Manfaat', icon: Award },
    { id: 'timeline', label: 'Timeline', icon: Calendar },
  ];

  // Feature highlights
  const features = mbkmData.features.map(feature => ({
    ...feature,
    bgColor: getRandomColor(),
  }));

  return (
    <div className="space-y-8">
      {/* Dynamic Header Section - Updated for better theme consistency */}
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
                {mbkmData.headerTitle}
              </motion.h2>
              <motion.p
                className="text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {mbkmData.headerDescription}
              </motion.p>

              <MotionDiv
                className="flex flex-wrap gap-3 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {mbkmData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-white/20 text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </MotionDiv>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <MotionDiv
                className="relative w-full h-52 md:h-64"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Image
                  src={mbkmData.headerImageSrc}
                  alt="Ilustrasi MBKM"
                  fill
                  className="object-contain"
                />
              </MotionDiv>
            </div>
          </div>
        </div>

        {/* Program Stats with animated counters - Updated with transparent styling */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mbkmData.stats.map((stat, index) => (
              <MotionDiv
                key={index}
                className={`text-center p-4 rounded-lg ${currentTheme.statsCard}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                <span className={`text-3xl font-bold ${currentTheme.icon}`}>{stat.value}</span>
                <p className={`text-sm mt-1 ${currentTheme.text}`}>{stat.label}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Navigation - Style updated for better consistency */}
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

      {/* Dynamic Content Sections - Updated for theme consistency */}
      <AnimatePresence mode="wait">
        <MotionDiv
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
                Ringkasan Program
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {features.map((feature, index) => (
                  <MotionDiv
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
                  </MotionDiv>
                ))}
              </div>

              <div
                className="prose prose-sm md:prose lg:prose-lg max-w-none dark:prose-invert prose-p:leading-relaxed prose-p:text-justify prose-p:mb-5 prose-p:indent-6 prose-li:mb-2 prose-li:ml-6 list-disc prose-a:text-blue-600 dark:prose-a:text-blue-400"
                dangerouslySetInnerHTML={{ __html: mbkmData.overviewContent ?? '' }}
              />
            </div>
          )}

          {/* Benefits Section */}
          {activeSection === 'benefits' && (
            <div className={`rounded-xl ${currentTheme.card} backdrop-blur-sm p-6`}>
              <h3 className={`text-xl font-bold mb-4 ${currentTheme.headingText}`}>
                Manfaat Program
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mbkmData.benefits.map((benefit, index) => (
                  <MotionDiv
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
                      <h4 className={`font-bold ${currentTheme.headingText}`}>{benefit.title}</h4>
                      <p className={`${currentTheme.text} mt-1`}>{benefit.description}</p>
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Section */}
          {activeSection === 'timeline' && (
            <div className={`rounded-xl ${currentTheme.card} backdrop-blur-sm p-6`}>
              <h3 className={`text-xl font-bold mb-6 ${currentTheme.headingText}`}>
                Timeline Program
              </h3>

              <div className="relative">
                {/* Timeline line */}
                <div className={`absolute left-4 top-0 bottom-0 w-1 ${currentTheme.accent}`}></div>

                {/* Timeline items */}
                <div className="space-y-8 pl-12 relative">
                  {mbkmData.timeline.map((item, index) => (
                    <MotionDiv
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
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs ${currentTheme.badge} mb-2`}
                        >
                          {item.period}
                        </span>
                        <h4 className={`font-bold ${currentTheme.headingText} mb-2`}>
                          {item.title}
                        </h4>
                        <p className={currentTheme.text}>{item.description}</p>
                      </div>
                    </MotionDiv>
                  ))}
                </div>
              </div>
            </div>
          )}
        </MotionDiv>
      </AnimatePresence>

      {/* Accordion Content - Frequently Asked Questions - Updated for better theme integration */}
      <div className={`rounded-xl ${currentTheme.card} backdrop-blur-sm p-6 mt-8`}>
        <h3 className={`text-xl font-bold mb-4 ${currentTheme.headingText}`}>Informasi Program</h3>
        <div className={`border rounded-lg overflow-hidden divide-y ${currentTheme.divider}`}>
          {mbkmData.accordionItems.map(item => (
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
          href={mbkmData.externalLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center px-6 py-3 ${currentTheme.buttonPrimary} font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {mbkmData.externalLink.label}
          <ExternalLink className="ml-2 h-4 w-4" />
        </motion.a>
      </div>
    </div>
  );
};
