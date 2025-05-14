// src/components/ui/3DPosterHero.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

// Configuration options
const DAMPENING_FACTOR = 0.08; // Controls how smooth the mouse movement effect is
const MAX_ROTATION = 10; // Maximum rotation angle in degrees
const SPRING_CONFIG = { stiffness: 50, damping: 30, mass: 1 }; // Smooth spring animation config

interface Poster {
  src: string;
  alt: string;
}

interface Props {
  title: ReactNode;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  poster: Poster;
  className?: string;
}

const ThreeDPosterHero = ({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  poster,
  className = '',
}: Props) => {
  // Track mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  // Parallax effects on scroll
  const yContentParallax = useTransform(scrollY, [0, 800], [0, -60]);
  const yPosterParallax = useTransform(scrollY, [0, 800], [0, -120]);
  const posterScale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const posterOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Mouse movement effect
  useEffect(() => {
    if (isMobile) return; // Skip on mobile devices

    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();

        // Calculate normalized mouse position from -1 to 1
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        // Apply dampening for smoother effect
        setMousePosition(prev => ({
          x: prev.x + (x - prev.x) * DAMPENING_FACTOR,
          y: prev.y + (y - prev.y) * DAMPENING_FACTOR,
        }));
      }
    };

    // Throttled mouse move handler for better performance
    let lastExecuted = 0;
    const throttleMs = 10; // Execute at most every 10ms

    const throttledMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastExecuted >= throttleMs) {
        lastExecuted = now;
        handleMouseMove(e);
      }
    };

    window.addEventListener('mousemove', throttledMouseMove);

    // Show elements with animation after initial load
    const timer = setTimeout(() => setIsVisible(true), 300);

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      clearTimeout(timer);
    };
  }, [isMobile]);

  // Animation variants
  const fadeInUpVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // Smooth easing curve
      },
    }),
  };

  return (
    <section
      ref={heroRef}
      className={`relative min-h-screen flex items-center justify-center py-16 md:py-0 overflow-hidden ${className}`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-center opacity-10 dark:opacity-20"></div>

        {/* Dynamic colored orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, rgba(79,70,229,0) 70%)',
            x: mousePosition.x * -10,
            y: mousePosition.y * -10,
          }}
          transition={{ type: 'spring', ...SPRING_CONFIG }}
        ></motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, rgba(236,72,153,0) 70%)',
            x: mousePosition.x * 15,
            y: mousePosition.y * 15,
          }}
          transition={{ type: 'spring', ...SPRING_CONFIG }}
        ></motion.div>

        {/* Animated particles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white dark:bg-indigo-500/30 opacity-20 dark:opacity-30"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-screen-xl px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Text content */}
          <motion.div
            className="flex-1 relative z-10"
            style={{
              y: yContentParallax,
            }}
          >
            {isVisible && (
              <>
                {/* Decorator element */}
                <motion.div
                  className="inline-block mb-4 px-4 py-2 bg-indigo-500/10 backdrop-blur-sm rounded-full border border-indigo-500/30 text-indigo-600 dark:text-indigo-300"
                  variants={fadeInUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                >
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                    {subtitle}
                  </span>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
                  variants={fadeInUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  {title}
                </motion.h1>

                <motion.p
                  className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl"
                  variants={fadeInUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  {description}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  variants={fadeInUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                >
                  <Link
                    href={ctaLink}
                    className="group relative px-8 py-4 rounded-lg overflow-hidden transition-all duration-500"
                  >
                    {/* Button background effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:scale-105 transition-transform duration-500"></span>
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-500"></span>

                    {/* Button content */}
                    <span className="relative flex items-center justify-center gap-2 text-white font-medium">
                      {ctaText}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:translate-x-1 transition-transform duration-500"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </span>
                  </Link>

                  {secondaryCtaText && secondaryCtaLink && (
                    <Link
                      href={secondaryCtaLink}
                      className="group relative px-8 py-4 rounded-lg overflow-hidden transition-all duration-500"
                    >
                      {/* Button border effect */}
                      <span className="absolute inset-0 border-2 border-indigo-600 dark:border-white rounded-lg group-hover:scale-105 transition-transform duration-500"></span>
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-indigo-600 dark:bg-white transition-opacity duration-500"></span>

                      {/* Button content */}
                      <span className="relative flex items-center justify-center text-indigo-600 dark:text-white font-medium">
                        {secondaryCtaText}
                      </span>
                    </Link>
                  )}
                </motion.div>
              </>
            )}
          </motion.div>

          {/* 3D Poster */}
          <motion.div
            className="flex-1 relative"
            style={{
              y: yPosterParallax,
              scale: posterScale,
              opacity: posterOpacity,
            }}
            transition={{ type: 'spring', ...SPRING_CONFIG }}
          >
            {isVisible && (
              <motion.div
                ref={posterRef}
                className="relative w-full max-w-md mx-auto h-[600px] perspective-1200"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {/* Poster frame with shadow */}
                <motion.div
                  className="absolute inset-0 bg-black/10 dark:bg-black/30 rounded-3xl blur-xl"
                  style={{
                    translateY: 20,
                    translateX: 0,
                    scale: 0.9,
                  }}
                ></motion.div>

                {/* 3D Poster container with glassmorphism effect */}
                <motion.div
                  className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm bg-white/10 dark:bg-gray-800/20"
                  style={{
                    rotateX: isMobile ? 0 : mousePosition.y * -MAX_ROTATION,
                    rotateY: isMobile ? 0 : mousePosition.x * MAX_ROTATION,
                    translateZ: 50,
                  }}
                  transition={{ type: 'spring', ...SPRING_CONFIG }}
                >
                  {/* Subtle glow effects behind poster */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent dark:from-indigo-500/20 dark:via-purple-500/10"></div>

                  {/* Additional glow spots */}
                  <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

                  {/* Reflective highlights */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 dark:via-white/10 dark:to-white/20"
                    style={{
                      opacity: 0.4,
                      translateX: mousePosition.x * 10,
                      translateY: mousePosition.y * 10,
                    }}
                  ></motion.div>

                  {/* Poster image */}
                  <motion.div
                    className="relative w-full h-full p-4"
                    animate={{
                      y: isMobile ? [0, -5, 0] : 0,
                    }}
                    transition={{
                      duration: 6,
                      repeat: isMobile ? Infinity : 0,
                      ease: 'easeInOut',
                    }}
                  >
                    <div className="w-full h-full relative rounded-xl overflow-hidden border border-white/20 shadow-lg">
                      <Image
                        src={poster.src}
                        alt={poster.alt}
                        fill
                        className="object-cover object-center"
                        priority
                      />

                      {/* Bottom reflective highlight */}
                      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white/20 to-transparent"></div>
                    </div>
                  </motion.div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <motion.div
                      className="w-3 h-3 rounded-full bg-red-500"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                    <motion.div
                      className="w-3 h-3 rounded-full bg-yellow-500"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    ></motion.div>
                    <motion.div
                      className="w-3 h-3 rounded-full bg-green-500"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    ></motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ThreeDPosterHero;
