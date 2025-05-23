'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion } from './Accordion';
import { collaborationData, rawFeatures } from '@/data/about/collaboration';
import { ExternalLink, Handshake, Building, Users, FileText, Award } from 'lucide-react';
import { useTheme } from 'next-themes';
import { MotionDiv } from '@/components/common/MotionClientOnly';

export const CollaborationContent = () => {
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

  // Generate features dengan warna acak berdasarkan index
  const getRandomColor = () => colorVariants[Math.floor(Math.random() * colorVariants.length)];

  const features = rawFeatures.map(item => ({
    ...item,
    bgColor: getRandomColor(),
  }));

  // Theme-based styling aligned with MBKMContent styling
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

  // Navigation items for the collaboration sections
  const navItems = [
    { id: 'overview', label: 'Ringkasan', icon: FileText },
    { id: 'programs', label: 'Program', icon: Award },
    { id: 'testimonials', label: 'Testimoni', icon: Users },
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
                {collaborationData.headerTitle}
              </motion.h2>
              <motion.p
                className="text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {collaborationData.headerDescription}
              </motion.p>

              <MotionDiv
                className="flex flex-wrap gap-3 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {collaborationData.tags &&
                  collaborationData.tags.map((tag, index) => (
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
                  src={collaborationData.headerImageSrc}
                  alt="Ilustrasi Kolaborasi"
                  fill
                  className="object-contain"
                />
              </MotionDiv>
            </div>
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
                Ringkasan Kolaborasi
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

              {collaborationData.overviewContent && (
                <div
                  className="prose prose-sm md:prose lg:prose-lg max-w-none dark:prose-invert
                  prose-p:leading-relaxed prose-p:text-justify prose-p:mb-5 prose-p:indent-6
                  prose-li:mb-2 prose-li:ml-6 list-disc prose-a:text-blue-600 dark:prose-a:text-blue-400"
                  dangerouslySetInnerHTML={{ __html: collaborationData.overviewContent }}
                />
              )}
            </div>
          )}

          {/* Programs Section */}
          {activeSection === 'programs' && (
            <div className={`rounded-xl ${currentTheme.card} backdrop-blur-sm p-6`}>
              <h3 className={`text-xl font-bold mb-6 ${currentTheme.headingText}`}>
                Praktek Kerja
              </h3>

              {collaborationData.programs && (
                <div className="relative">
                  {/* Timeline line */}
                  <div
                    className={`absolute left-4 top-0 bottom-0 w-1 ${currentTheme.accent}`}
                  ></div>

                  {/* Timeline items */}
                  <div className="space-y-8 pl-12 relative">
                    {collaborationData.programs.map((program, index) => (
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
                            {program.type}
                          </span>
                          <h4 className={`font-bold ${currentTheme.headingText} mb-2`}>
                            {program.title}
                          </h4>
                          <p className={currentTheme.text}>{program.description}</p>
                        </div>
                      </MotionDiv>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Testimonials Section */}
          {activeSection === 'testimonials' && (
            <div className={`rounded-xl ${currentTheme.card} backdrop-blur-sm p-6`}>
              <h3 className={`text-xl font-bold mb-6 ${currentTheme.headingText}`}>
                Testimoni Peserta
              </h3>

              {collaborationData.testimonials && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {collaborationData.testimonials.map((testimonial, index) => (
                    <MotionDiv
                      key={index}
                      className={`relative rounded-lg overflow-hidden border ${currentTheme.divider}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                        <div className="absolute bottom-0 p-4 text-white z-10">
                          <h4 className="font-bold text-lg">{testimonial.name}</h4>
                          <p className="text-sm mb-1">
                            {testimonial.university} - {testimonial.program}
                          </p>
                          <p className="text-sm line-clamp-4">{testimonial.quote}</p>
                        </div>
                      </div>
                    </MotionDiv>
                  ))}
                </div>
              )}
            </div>
          )}
        </MotionDiv>
      </AnimatePresence>

      {/* Accordion Content - FAQ */}
      <div className={`rounded-xl ${currentTheme.card} backdrop-blur-sm p-6 mt-8`}>
        <h3 className={`text-xl font-bold mb-4 ${currentTheme.headingText}`}>
          Informasi Kolaborasi
        </h3>
        <div className={`border rounded-lg overflow-hidden divide-y ${currentTheme.divider}`}>
          {collaborationData.accordionItems.map(item => (
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
      {collaborationData.externalLink && (
        <div className="flex justify-center mt-8">
          <motion.a
            href={collaborationData.externalLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-6 py-3 ${currentTheme.buttonPrimary} font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {collaborationData.externalLink.label}
            <ExternalLink className="ml-2 h-4 w-4" />
          </motion.a>
        </div>
      )}
    </div>
  );
};
