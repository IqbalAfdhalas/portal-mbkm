'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useScrollspy } from '@/hooks/useScrollspy';
import { navigation } from '@/constants/navigation';
import { useAuth } from '@/hooks/useAuth';
import { usePathname, useRouter } from 'next/navigation';
import { scrollToId } from '@/lib/utils';
import { MotionDiv } from '@/components/common/MotionClientOnly';

// Smooth scroll helper
const NAVBAR_OFFSET = -5;

const Navbar = () => {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const activeSection = useScrollspy(
    navigation.map(item => item.id),
    { threshold: 0.5 }
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md shadow-sm py-2 sm:py-3'
          : 'bg-transparent py-3 sm:py-5'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center flex-shrink-0">
          <MotionDiv
            className="flex items-center"
            animate={{ scale: scrolled ? 0.85 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-6 h-6 sm:w-8 sm:h-8 mr-1.5 sm:mr-2 flex-shrink-0">
              <Image
                src="/images/logo/logo_mbkm_white.png"
                alt="MBKM BAST ANRI Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div className="flex flex-col xl:flex-row xl:items-center">
              <span className="text-primary-light dark:text-blue-400 font-heading font-bold text-sm sm:text-base xl:text-xl leading-tight xl:mr-1">
                MBKM
              </span>
              <span className="text-primary dark:text-white font-heading font-bold text-sm sm:text-base xl:text-xl leading-tight">
                BAST ANRI
              </span>
            </div>
          </MotionDiv>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex lg:space-x-8 md:space-x-6">
          {navigation.map(item => {
            const showDots = hoveredItem === item.id || activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={e => {
                  e.preventDefault();

                  if (pathname !== '/') {
                    sessionStorage.setItem('scrollTarget', item.id);
                    router.push('/');
                  } else {
                    scrollToId(item.id, -10);
                    setHoveredItem(null);
                    if (mobileMenuOpen) {
                      setMobileMenuOpen(false);
                    }
                  }
                }}
                className={`text-xs lg:text-sm font-medium transition-colors relative px-1.5 lg:px-2 py-1 whitespace-nowrap ${
                  activeSection === item.id
                    ? 'text-primary-light dark:text-blue-400'
                    : 'text-gray-700 hover:text-primary-light dark:text-gray-300 dark:hover:text-blue-400'
                }`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.name}

                {showDots && (
                  <MotionDiv
                    className="absolute left-0 right-0 bottom-[-5px] flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MotionDiv
                      className="flex space-x-0.5 lg:space-x-1"
                      initial={{ y: -5 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.span
                          key={i}
                          className="h-0.5 w-0.5 lg:h-1 lg:w-1 rounded-full bg-primary-light dark:bg-blue-400"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: i * 0.08,
                            type: 'spring',
                            stiffness: 400,
                            damping: 10,
                          }}
                        />
                      ))}
                    </MotionDiv>
                  </MotionDiv>
                )}
              </a>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
          <div className="scale-75 sm:scale-100">
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none p-1 touch-manipulation"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MotionDiv
          className="md:hidden bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md shadow-lg border-t border-gray-200/20 dark:border-gray-700/20"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex flex-col space-y-2 sm:space-y-4 max-h-[60vh] overflow-y-auto">
            {navigation.map((item, index) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={e => {
                  e.preventDefault();
                  setMobileMenuOpen(false);

                  if (pathname !== '/') {
                    sessionStorage.setItem('scrollTarget', item.id);
                    router.push('/');
                  } else {
                    scrollToId(item.id, NAVBAR_OFFSET);
                  }
                }}
                className={`text-sm sm:text-base font-medium py-2 sm:py-3 px-3 rounded-lg transition-all duration-200 touch-manipulation ${
                  activeSection === item.id
                    ? 'text-primary-light dark:text-blue-400 bg-primary-light/10 dark:bg-blue-400/10'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>
        </MotionDiv>
      )}
    </motion.header>
  );
};

export default Navbar;
