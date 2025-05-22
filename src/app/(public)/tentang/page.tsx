<<<<<<< HEAD:src/app/tentang/page.tsx

=======
// src/app/(public)/sections-program/tentang/page.tsx
>>>>>>> origin/hero:src/app/(public)/tentang/page.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

<<<<<<< HEAD:src/app/tentang/page.tsx
=======
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { TabContent } from '@/components/about-detail/TabContent';
import { MBKMContent } from '@/components/about-detail/MBKMContent';
import { CollaborationContent } from '@/components/about-detail/CollaborationContent';
import { WebsiteContent } from '@/components/about-detail/WebsiteContent';
import { Book, Building, Handshake, Shuffle, Monitor } from 'lucide-react';
import { MotionDiv } from '@/components/common/MotionClientOnly';
>>>>>>> origin/hero:src/app/(public)/tentang/page.tsx



// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Reusable Components
const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (

    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section with Animated Particles - MADE LARGER */}
      <section
        className={`relative overflow-hidden ${currentTheme.hero} text-white py-32 px-4 transition-all duration-500`}
      >
        {/* Interactive Animated Particles Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <MotionDiv
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
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl shadow-lg"
          >
            <Image
              src="/images/about-anri.jpg"
              alt="Gedung ANRI"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>


            <MotionDiv
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
            </MotionDiv>
          </MotionDiv>

        </div>
      </section>



          {/* Main Content */}
          <div className="md:w-2/3 lg:w-3/4" ref={contentRef}>
            {/* Dynamic Tab Content with animated transitions */}
            <MotionDiv
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


      {/* Timeline Section - More Professional */}
      <section
        aria-label="Timeline Program MBKM BAST ANRI"
        className="bg-gray-50 dark:bg-dark-DEFAULT py-16 md:py-20"
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeader 
            title="Timeline Program" 
            subtitle="Urutan kegiatan dalam Program MBKM BAST ANRI" 
          />
          <div className="mt-10 pl-6 border-l-2 border-primary-DEFAULT dark:border-blue-600">
            {timelineItems.map((item, idx) => (
              <TimelineItem
                key={idx}
                index={idx}
                isLast={idx === timelineItems.length - 1}
                {...item}
              />
            ))}


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
            </MotionDiv>
>
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

      {/* Tim Pengelola Section - Lighter, More Professional */}
      <section
        aria-label="Tim Pengelola Program MBKM BAST ANRI"
        className="container mx-auto px-6 py-16 md:py-20 max-w-6xl"
      >
        <SectionHeader 
          title="Tim Pengelola Program" 
          subtitle="Para profesional yang mengelola program MBKM BAST ANRI" 
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          <TeamMemberCard
            name="ARRAJULA STAQUFA"
            role="Koordinator Program"
            photo="/images/team/rina.jpg"
          />
          <TeamMemberCard
            name="Iqbal Afdhalas"
            role="Mentor Arsip Digital"
            photo="/images/team/budi.jpg"
          />
          <TeamMemberCard
            name="Kevin putra zerian"
            role="Manajer Pelatihan"
            photo="/images/team/sari.jpg"
          />
          <TeamMemberCard
            name="Abidah Ardelia"
            role="Pengelola Dokumentasi"
            photo="/images/team/agus.jpg"
          />
        </div>
      </section>

      {/* Partner & Kolaborator Section - Minimalist, Professional */}
      <section
        aria-label="Partner dan Kolaborator Program MBKM BAST ANRI"
        className="bg-gray-50 dark:bg-dark-DEFAULT py-16 md:py-20"
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionHeader 
            title="Partner & Kolaborator" 
            subtitle="Institusi yang bekerja sama mewujudkan program MBKM BAST ANRI" 
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 items-center mt-10 justify-center max-w-4xl mx-auto">
            <PartnerLogo logo="/images/Logo_ANRI.png" name="ANRI" />
            <PartnerLogo logo="/images/kemdikbud.png" name="Kemdikbud" />
            <PartnerLogo logo="/images/logo_mbkm_white.png" name="Universitas Syiah Kuala" />
          </div>
        </div>
      </section>
    </main>
  );
}

