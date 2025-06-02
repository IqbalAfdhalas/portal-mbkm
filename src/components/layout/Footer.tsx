/* eslint-disable @next/next/no-img-element */
// src/components/layout/Footer.tsx
import Link from 'next/link';
import { navigation } from '@/constants/navigation';
import { social } from '@/constants/social';
import { SiFirebase } from 'react-icons/si';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary dark:bg-dark-surface text-white pt-8 md:pt-12 pb-4 md:pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Logo & About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-3 md:mb-4">
              <img
                src="/images/logo/logo_mbkm_white.png"
                alt="MBKM BAST ANRI"
                className="h-10 sm:h-12 w-auto"
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-4 font-body max-w-sm">
              Program Merdeka Belajar Kampus Merdeka (MBKM) Balai Arsip Statis dan Tsunami (BAST)
              Arsip Nasional Republik Indonesia (ANRI).
            </p>
            <div className="flex space-x-3 md:space-x-4">
              {social.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white hover:scale-110 transition-all duration-200"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4 font-heading text-white">
              Menu Utama
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-1 md:gap-2">
              {navigation.slice(0, 5).map(item => (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm font-body block py-1"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4 font-heading text-white">
              Informasi
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-1 md:gap-2">
              {navigation.slice(5).map(item => (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm font-body block py-1"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4 font-heading text-white">
              Kontak
            </h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start space-x-3 text-sm">
                <svg
                  className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-gray-300 font-body leading-relaxed">
                  Jl. Tengku Hasan di Bakoi, Bakoy, Kec. Ingin Jaya, Kabupaten Aceh Besar, Aceh
                  23116
                </span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <svg
                  className="h-5 w-5 text-secondary flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:bast@anri.go.id"
                  className="text-gray-300 hover:text-white transition-colors font-body"
                >
                  bast@anri.go.id
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <svg
                  className="h-5 w-5 text-secondary flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+6265177551698"
                  className="text-gray-300 hover:text-white transition-colors font-body"
                >
                  (0651) 7551698
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 md:pt-6 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-gray-400 text-xs md:text-sm font-body text-center sm:text-left order-2 sm:order-1">
              © {currentYear} Portal MBKM BAST ANRI. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs md:text-sm font-body flex items-center justify-center order-1 sm:order-2">
              Built with <FaHeart className="text-secondary mx-1 animate-pulse" /> and{' '}
              <SiFirebase className="text-secondary mx-1" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
