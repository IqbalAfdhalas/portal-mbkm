// src/components/sections/Hero.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBook } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { useTheme } from 'next-themes';
import { FaChevronDown } from 'react-icons/fa';
import { scrollToId } from '@/lib/utils';
import { MotionDiv } from '@/components/common/MotionClientOnly';


const Hero = () => {
  const { theme } = useTheme();
  // State untuk posisi mouse (untuk efek parallax)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // State untuk menampilkan elemen setelah mounting (untuk animasi)
  const [isMounted, setIsMounted] = useState(false);

  // Effect untuk mengatur event listener mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    setIsMounted(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Handler untuk scroll ke section
  const handleScrollToSection = (sectionId: string) => {
    scrollToId(sectionId, -10);
  };

  // Variant untuk animasi text
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  // Variant untuk animasi particles
  const starVariants = {
    animate: (i: number) => ({
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2 + i * 0.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    }),
  };

  // Variant untuk animasi button hover
  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0px 10px 20px rgba(8, 126, 139, 0.3)',
      transition: { duration: 0.3 },
    },
    tap: {
      scale: 0.98,
      boxShadow: '0px 5px 10px rgba(8, 126, 139, 0.2)',
      transition: { duration: 0.15 },
    },
  };

  // Membuat particles
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
  }));

  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.3, // mulai saat 30% elemen terlihat
  });

  const useCountUp = (target: number, inView: boolean, duration = 2000, stepSize = 1) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!inView) return;

      let start = 0;
      const totalSteps = duration / 16;
      const increment = Math.max(stepSize, target / totalSteps);

      const step = () => {
        start += increment;
        if (start < target) {
          setCount(Math.ceil(start));
          requestAnimationFrame(step);
        } else {
          setCount(target);
        }
      };
      step();
    }, [inView, target, duration, stepSize]);

    return count;
  };

  const glowSize = 'w-[180%] h-[75%]';
  const glowOpacity = 'opacity-100 dark:opacity-100';

  const glowGradients = [
    'radial-gradient(ellipse at center, #ec4899aa, #a855f7aa, transparent)', // pink-fuchsia
    'radial-gradient(ellipse at center, #22d3eeaa, #3b82f6aa, transparent)', // cyan-blue
    'radial-gradient(ellipse at center, #facc15aa, #f97316aa, transparent)', // amber-orange
    'radial-gradient(ellipse at center, #a3e635aa, #34d399aa, transparent)', // lime-green
    'radial-gradient(ellipse at center, #8b5cf6aa, #6366f1aa, transparent)', // purple-indigo
  ];

  const [glowIndex, setGlowIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIndex(prev => (prev + 1) % glowGradients.length);
    }, 3000); // Ganti warna tiap 3 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-b from-[#ffffff] via-[#f0f4f8] to-[#dce3eb] dark:from-[#164B69] dark:via-[#2D3748] dark:to-[#2D3748]"
    >
      {/* Background gradients - Animated */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white/90 dark:bg-primary/80 backdrop-brightness-110" />

        {/* Animated gradient light */}
        <MotionDiv
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] rounded-full bg-gradient-radial from-blue-300/20 via-transparent to-transparent"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <MotionDiv
          className="absolute bottom-[-30%] right-[-30%] w-[150%] h-[150%] rounded-full bg-gradient-radial from-secondary/10 via-transparent to-transparent"
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Animated stars/particles */}
      {isMounted &&
        particles.map(particle => (
          <MotionDiv
            key={particle.id}
            className="absolute rounded-full bg-gray-400 dark:bg-white drop-shadow-md dark:drop-shadow"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            custom={particle.id}
            variants={starVariants}
            animate="animate"
            initial={{ opacity: 0 }}
          />
        ))}

      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-10 dark:opacity-10" />

      {/* Main content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col lg:flex-row items-center justify-between gap-12 py-20">
        {/* Text content */}
        <div className="flex-1 text-gray-900 dark:text-white">
          {/* Badge */}
          <MotionDiv
            className="inline-flex items-center px-4 py-1.5 rounded-full 
             bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
             text-white text-xs font-semibold tracking-wide 
             ring-1 ring-white/20 hover:ring-2 hover:ring-indigo-400 
             transition shadow-lg mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
              MBKM x BAST ANRI
            </span>
          </MotionDiv>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6"
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            KOLABORAKSI <br />
            {/* Teks untuk light mode */}
            <span className="block dark:hidden bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent drop-shadow-md">
              MBKM x BAST ANRI
            </span>
            {/* Teks untuk dark mode */}
            <span className="hidden dark:block bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent drop-shadow-lg">
              MBKM x BAST ANRI
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-blue-100 mb-8 max-w-xl"
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            Laman kolaboratif antara Mahasiswa Merdeka Belajar Kampus Merdeka (MBKM) & Balai Arsip
            Statis Tsunami Arsip Nasional Republik Indonesia (BAST ANRI) membuka peluang bagi
            mahasiswa untuk belajar dan berkontribusi dalam pelestarian arsip statis serta
            pengetahuan kebencanaan.
          </motion.p>

          {/* CTA Buttons */}
          <MotionDiv
            className="flex flex-col sm:flex-row gap-4 md:gap-6"
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-secondary to-secondary-light text-white font-medium text-lg transition-all shadow-lg"
              variants={buttonHoverVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleScrollToSection('program')}
            >
              <FaGraduationCap className="text-xl" />
              <span>Jelajahi Program</span>
            </motion.button>

            <motion.button
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-gray-800 dark:bg-white/5 dark:text-white border border-gray-200 dark:border-white/20 font-medium text-lg transition-all shadow-lg hover:bg-gray-100 dark:hover:bg-white/20"
              variants={buttonHoverVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleScrollToSection('tentang')}
            >
              <FaBook className="text-xl" />
              <span>Tentang MBKM</span>
            </motion.button>
          </MotionDiv>

          {/* Stats preview */}
          <MotionDiv
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { label: 'Kemitraan Kampus', value: 10 },
              { label: 'Mahasiswa Magang', value: 200 },
              { label: 'Kegiatan MBKM', value: 25 },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10"
              >
                <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {statsInView && <CountUp end={stat.value} duration={2.5} suffix="+" />}
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-100">{stat.label}</p>
              </div>
            ))}
          </MotionDiv>
        </div>

        {/* Image/illustration */}
        <MotionDiv
          className="flex-1 w-full max-w-xl"
          style={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative w-full aspect-square">
            <div className="relative w-full max-w-sm mx-auto transform translate-y-16 -translate-x-4 transition-transform duration-500 hover:scale-105">
              {/* 💡 GLOW MASUK SINI */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <MotionDiv
                  className={`${glowSize} blur-[100px] opacity-100 brightness-150 saturate-200 mix-blend-screen`}
                  style={{
                    background: glowGradients[glowIndex],
                    transform: `translate(${mousePosition.x * 3}px, ${mousePosition.y * 3}px)`,
                  }}
                  animate={{
                    scale: [1, 1.07, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>

              {/* Shadow melayang */}
              <div className="absolute inset-0 -bottom-4 blur-2xl bg-black/20 rounded-2xl z-0"></div>

              {/* Gambar poster */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                <Image
                  src="/images/Beranda/beranda_ilustrasi.png"
                  alt="MBKM BAST ANRI"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>

            {/* Decoration circles */}
            <MotionDiv
              className="absolute top-10 right-10 w-20 h-20 rounded-full bg-gradient-to-r from-secondary to-secondary-light opacity-70 blur-md"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <MotionDiv
              className="absolute bottom-20 left-10 w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-70 blur-md"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </MotionDiv>
      </div>

      {/* Wave decoration at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-16 drop-shadow-[0_-3px_6px_rgba(0,0,0,0.1)]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,
         250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,
         214.34,3V120H0V95.8C59.44,118.92,140.97,111.31,221.93,94.67c93.18-19.18,
         143.24-43.43,199.39-56.61Z"
            className="fill-[#f9f9fc] dark:fill-[#2D3748]"
          />
        </svg>
      </div>
      {/* Scroll Down Arrows */}
      <MotionDiv
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-0 text-gray-600 dark:text-white z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {[0, 1, 2].map(i => (
          <MotionDiv
            key={i}
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3, // ini bikin giliran nyala
            }}
          >
            <FaChevronDown className="text-xl" />
          </MotionDiv>
        ))}
      </MotionDiv>
    </section>
  );
};

export default Hero;
