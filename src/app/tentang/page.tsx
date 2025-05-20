// src/app/sections-program/tentang/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { TabContent } from '@/components/about-detail/TabContent';
import { MBKMContent } from '@/components/about-detail/MBKMContent';
import { CollaborationContent } from '@/components/about-detail/CollaborationContent';
import { ProgramFlowContent } from '@/components/about-detail/ProgramFlowContent';
import { WebsiteContent } from '@/components/about-detail/WebsiteContent';
import { Book, Building, Handshake, Shuffle, Monitor } from 'lucide-react';

export default function AboutDetailPage() {
  const [activeTab, setActiveTab] = useState('mbkm');
  const [mounted, setMounted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef(null);
  const { theme } = useTheme();

  // Ensure hydration is complete before rendering theme-dependent elements
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll to show/hide the scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'mbkm':
        return <MBKMContent />;
      case 'collaboration':
        return <CollaborationContent />;
      case 'website':
        return <WebsiteContent />;
      default:
        return <MBKMContent />;
    }
  };

  // Dynamic theme-based styling
  const themeStyles = {
    // Light theme colors
    light: {
      hero: 'bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400',
      particles: 'bg-white/20',
      heading: 'bg-gradient-to-r from-white to-white/70',
      buttonHover: 'hover:bg-white/30',
      tabActive: 'bg-blue-500 hover:bg-blue-600',
      tabInactive: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
      contentBg: 'bg-white',
      cardBorder: 'border-blue-100',
      cardShadow: 'shadow-blue-100/30',
      accentBorder: 'border-blue-200',
      scrollTop: 'bg-blue-500 hover:bg-blue-600',
    },
    // Dark theme colors
    dark: {
      hero: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900',
      particles: 'bg-white/10',
      heading: 'bg-gradient-to-r from-blue-300 to-purple-300',
      buttonHover: 'hover:bg-white/20',
      tabActive: 'bg-blue-700 hover:bg-blue-800',
      tabInactive: 'bg-gray-800 hover:bg-gray-700 text-blue-300',
      contentBg: 'bg-gray-900',
      cardBorder: 'border-gray-700',
      cardShadow: 'shadow-blue-900/30',
      accentBorder: 'border-blue-900',
      scrollTop: 'bg-blue-700 hover:bg-blue-800',
    },
  };

  // Setting current theme styles
  const currentTheme = theme === 'dark' ? themeStyles.dark : themeStyles.light;

  // If not mounted yet, show a simple skeleton to prevent theme flash
  if (!mounted) {
    return <div className="min-h-screen bg-gray-100 dark:bg-gray-900"></div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section with Animated Particles - MADE LARGER */}
      <section
        className={`relative overflow-hidden ${currentTheme.hero} text-white py-32 px-4 transition-all duration-500`}
      >
        {/* Interactive Animated Particles Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${currentTheme.particles}`}
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [Math.random() * 30, -Math.random() * 30],
                x: [Math.random() * 30, -Math.random() * 30],
                scale: [1, Math.random() * 0.3 + 0.8, 1],
              }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: Math.random() * 8 + 5,
              }}
            />
          ))}
        </div>

        {/* Tech-inspired Decoration Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Circuit-like lines */}
          <svg
            className="absolute w-full h-full opacity-10"
            viewBox="0 0 800 600"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50,300 Q200,100 400,300 T750,300"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <path
              d="M50,350 Q200,550 400,350 T750,350"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <circle cx="400" cy="300" r="8" fill="white" />
            <circle cx="200" cy="300" r="5" fill="white" />
            <circle cx="600" cy="300" r="5" fill="white" />
            <circle cx="400" cy="350" r="8" fill="white" />
            <circle cx="200" cy="350" r="5" fill="white" />
            <circle cx="600" cy="350" r="5" fill="white" />
          </svg>
        </div>

        {/* Hero Content - MADE LARGER */}
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1
              className={`text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent ${currentTheme.heading}`}
            >
              Tentang MBKM x BAST ANRI
            </h1>
            <motion.p
              className="text-xl md:text-2xl max-w-3xl leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Program magang MBKM di BAST ANRI yang bertujuan untuk memberikan kesempatan belajar
              dan pengalaman kerja yang berharga bagi mahasiswa Indonesia.
            </motion.p>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <button
                className={`px-8 py-4 bg-white/20 backdrop-blur-md ${currentTheme.buttonHover} rounded-full text-white font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-white/20`}
                onClick={() => {
                  const tabsElement = document.getElementById('content-section');
                  if (tabsElement) {
                    const yOffset = -45; // offset jarak dari atas (misal navbar tingginya 80px)
                    const y =
                      tabsElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
              >
                Pelajari Lebih Lanjut
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content Section with Left Sidebar Navigation */}
      <section id="content-section" className="container mx-auto max-w-screen-xl px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar Navigation - NEW STICKY SIDEBAR */}
          <div className="md:w-1/3 lg:w-1/4">
            <div
              className="sticky top-[80px]"
              style={{ maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto' }}
            >
              <div
                className={`p-4 rounded-xl ${currentTheme.contentBg} border ${currentTheme.cardBorder} shadow-md ${currentTheme.cardShadow}`}
              >
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  Navigasi
                </h3>
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'mbkm', label: 'MBKM', icon: Book },
                    { id: 'collaboration', label: 'Magang di BAST ANRI', icon: Handshake },
                    { id: 'website', label: 'Tentang Website', icon: Monitor },
                  ].map(tab => (
                    <motion.button
                      key={tab.id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 text-left ${
                        activeTab === tab.id
                          ? `${currentTheme.tabActive} text-white shadow-md`
                          : `${currentTheme.tabInactive} border border-transparent`
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-2/3 lg:w-3/4" ref={contentRef}>
            {/* Dynamic Tab Content with animated transitions */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`${currentTheme.contentBg} border ${currentTheme.accentBorder} shadow-lg ${currentTheme.cardShadow} rounded-3xl overflow-hidden transition-all duration-300`}
            >
              <div className="px-6 py-12">
                {/* Stylish graphic header for each tab */}
                <div className="mb-8 relative">
                  <div
                    className={`absolute left-0 top-0 w-16 h-16 rounded-full ${currentTheme.hero} flex items-center justify-center text-white opacity-80`}
                  >
                    {activeTab === 'mbkm' && <Book className="w-6 h-6" />}
                    {activeTab === 'collaboration' && <Handshake className="w-6 h-6" />}
                    {activeTab === 'program-flow' && <Shuffle className="w-6 h-6" />}
                    {activeTab === 'website' && <Monitor className="w-6 h-6" />}
                  </div>

                  <h2 className="text-3xl font-bold ml-20 text-gray-800 dark:text-gray-100">
                    {activeTab === 'mbkm'
                      ? 'MBKM'
                      : activeTab === 'collaboration'
                        ? 'Magang di BAST ANRI'
                        : activeTab === 'program-flow'
                          ? 'Alur Program'
                          : 'Tentang Website'}
                  </h2>
                  <div className={`h-1 w-40 ${currentTheme.hero} rounded-full mt-2 ml-20`}></div>
                </div>

                {/* Tab content with enhanced presentation */}
                <div className="relative">
                  {/* Decorative tech elements in the background */}
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-5">
                    <svg
                      width="200"
                      height="200"
                      viewBox="0 0 200 200"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path d="M100,20 L100,180" stroke="currentColor" strokeWidth="2" />
                      <path d="M20,100 L180,100" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>

                  <div className="relative z-10">
                    <TabContent>{renderTabContent()}</TabContent>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button - MODIFIED AS FLOATING BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-8 right-8 w-12 h-12 rounded-full ${currentTheme.scrollTop} text-white flex items-center justify-center shadow-lg z-50 transition-all duration-300 hover:shadow-xl`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
