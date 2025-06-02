'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Show button after scrolling 200px on mobile, 300px on desktop
      const threshold = window.innerWidth < 768 ? 200 : 300;
      setIsVisible(scrolled > threshold);

      // Calculate scroll progress (0-100)
      const totalScroll = docHeight - winHeight;
      const progress = Math.min((scrolled / totalScroll) * 100, 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            duration: 0.3,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={scrollToTop}
            className="relative group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-2.5 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 touch-manipulation"
            aria-label="Back to top"
            title="Kembali ke atas"
          >
            {/* Progress ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
                className="sm:stroke-2"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 16}`}
                strokeDashoffset={`${2 * Math.PI * 16 * (1 - scrollProgress / 100)}`}
                className="transition-all duration-300 ease-out sm:stroke-2"
              />
            </svg>

            {/* Arrow icon */}
            <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:animate-bounce" />

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
          </button>

          {/* Tooltip - hanya tampil di desktop */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
            <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
              Kembali ke atas
              <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
