// src/app/forum/layout.tsx
'use client';

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ForumLayoutProps {
  children: ReactNode;
}

export default function ForumLayout({ children }: ForumLayoutProps) {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efek untuk deteksi dark mode preferensi sistem
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check initial preference
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);

      // Listen for changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener('change', handleChange);

      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Efek untuk scroll navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Glass Morphism Navbar */}
        <nav
          className={`sticky top-0 z-50 transition-all duration-300 ${
            isScrolled
              ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md'
              : 'bg-transparent'
          }`}
        >
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold text-[#0B3954] dark:text-[#087E8B]">
                MBKM BAST ANRI
              </Link>

              <div className="hidden md:flex space-x-6">
                <Link
                  href="/forum"
                  className={`transition-colors duration-300 ${
                    pathname === '/forum'
                      ? 'text-[#087E8B] dark:text-[#087E8B] font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:text-[#087E8B] dark:hover:text-[#087E8B]'
                  }`}
                >
                  Forum Utama
                </Link>
                <Link
                  href="/forum/category/pengumuman"
                  className={`transition-colors duration-300 ${
                    pathname?.includes('/forum/category/pengumuman')
                      ? 'text-[#087E8B] dark:text-[#087E8B] font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:text-[#087E8B] dark:hover:text-[#087E8B]'
                  }`}
                >
                  Pengumuman
                </Link>
                <Link
                  href="/forum/category/diskusi"
                  className={`transition-colors duration-300 ${
                    pathname?.includes('/forum/category/diskusi')
                      ? 'text-[#087E8B] dark:text-[#087E8B] font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:text-[#087E8B] dark:hover:text-[#087E8B]'
                  }`}
                >
                  Diskusi
                </Link>
                <Link
                  href="/forum/category/tanya-jawab"
                  className={`transition-colors duration-300 ${
                    pathname?.includes('/forum/category/tanya-jawab')
                      ? 'text-[#087E8B] dark:text-[#087E8B] font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:text-[#087E8B] dark:hover:text-[#087E8B]'
                  }`}
                >
                  Tanya Jawab
                </Link>
                <Link
                  href="/forum/category/pengalaman"
                  className={`transition-colors duration-300 ${
                    pathname?.includes('/forum/category/pengalaman')
                      ? 'text-[#087E8B] dark:text-[#087E8B] font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:text-[#087E8B] dark:hover:text-[#087E8B]'
                  }`}
                >
                  Berbagi Pengalaman
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>

              {/* Dropdown menu untuk mobile - implementasi lengkap bisa ditambahkan sesuai kebutuhan */}
              <div className="md:hidden">
                <button className="p-2 text-gray-700 dark:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-menu"
                  >
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* User profile - bisa diintegrasikan dengan sistem autentikasi */}
              <div className="hidden sm:block">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                  <span className="text-sm">Pengguna</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">{children}</main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-[#0B3954] dark:text-[#087E8B]">
                  Forum MBKM BAST ANRI
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  © {new Date().getFullYear()} Arsip Nasional Republik Indonesia
                </p>
              </div>
              <div className="flex space-x-6">
                <Link
                  href="/about"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#087E8B] dark:hover:text-[#087E8B]"
                >
                  Tentang MBKM
                </Link>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#087E8B] dark:hover:text-[#087E8B]"
                >
                  Kontak
                </Link>
                <Link
                  href="/faq"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#087E8B] dark:hover:text-[#087E8B]"
                >
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
