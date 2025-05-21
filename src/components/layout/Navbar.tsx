'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useScrollspy } from '@/hooks/useScrollspy';
import { navigation } from '@/constants/navigation';
import LoginButton from '@/components/ui/LoginButton';
import { useAuth } from '@/hooks/useAuth';
import UserDropdown from '@/components/layout/UserDropdown';
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
          ? 'bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <MotionDiv
            className="flex items-center"
            animate={{ scale: scrolled ? 0.85 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-8 h-8 mr-2">
              <Image
                src="/images/logo_mbkm_white.png"
                alt="MBKM BAST ANRI Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <span className="text-primary-light dark:text-blue-400 font-heading font-bold text-xl mr-1">
              MBKM
            </span>
            <span className="text-primary dark:text-white font-heading font-bold text-xl">
              BAST ANRI
            </span>
          </MotionDiv>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navigation.map(item => {
            const showDots = hoveredItem === item.id || activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={e => {
                  e.preventDefault();

                  if (pathname !== '/') {
                    sessionStorage.setItem('scrollTarget', item.id); // simpan id target
                    router.push('/'); // arahkan ke homepage tanpa #
                  } else {
                    // Gunakan offset yang lebih besar untuk memastikan judul terlihat dengan baik
                    // di bawah navbar (sekitar -80px atau sesuaikan dengan kebutuhan)
                    scrollToId(item.id, -10);

                    // Update state secara manual untuk highlight menu
                    setHoveredItem(null);

                    // Tutup mobile menu jika terbuka
                    if (mobileMenuOpen) {
                      setMobileMenuOpen(false);
                    }
                  }
                }}
                className={`text-sm font-medium transition-colors relative px-2 py-1 ${
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
                      className="flex space-x-1"
                      initial={{ y: -5 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.span
                          key={i}
                          className="h-1 w-1 rounded-full bg-primary-light dark:bg-blue-400"
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
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {user ? <UserDropdown user={user} /> : <LoginButton className="hidden md:block" />}

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          className="md:hidden bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navigation.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={e => {
                  e.preventDefault();

                  if (pathname !== '/') {
                    sessionStorage.setItem('scrollTarget', item.id); // simpan id target
                    router.push('/'); // arahkan ke homepage tanpa #
                  } else {
                    scrollToId(item.id, NAVBAR_OFFSET); // scroll langsung kalau udah di homepage
                  }
                }}
                className={`text-sm font-medium py-2 ${
                  activeSection === item.id
                    ? 'text-primary-light dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.name}
              </a>
            ))}
            {!user && <LoginButton className="w-full mt-4" />}
          </div>
        </MotionDiv>
      )}
    </motion.header>
  );
};

export default Navbar;
