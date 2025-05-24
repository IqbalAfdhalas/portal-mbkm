// src/components/layout/Footer.tsx
import Link from 'next/link';
import { navigation } from '@/constants/navigation';
import { social } from '@/constants/social';
import { SiFirebase } from 'react-icons/si';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary dark:bg-dark-surface text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Footer Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo & About */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <img
                src="/images/logo/logo_mbkm_white.png"
                alt="MBKM BAST ANRI"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-300 text-sm mb-4 font-body">
              Program Merdeka Belajar Kampus Merdeka (MBKM) Badan Arsip dan Standardisasi Nasional
              Republik Indonesia.
            </p>
            <div className="flex space-x-4">
              {social.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4 font-heading">Menu Utama</h3>
            <ul className="space-y-2">
              {navigation.slice(0, 5).map(item => (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm font-body"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="text-lg font-medium mb-4 font-heading">Informasi</h3>
            <ul className="space-y-2">
              {navigation.slice(5).map(item => (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm font-body"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4 font-heading">Kontak</h3>
            <ul className="space-y-3">
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
                <span className="text-gray-300 font-body">
                  Jl. Tengku Hasan di Bakoi, Bakoy, Kec. Ingin Jaya, Kabupaten Aceh Besar, Aceh
                  23116
                </span>
              </li>
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-300 font-body">bast@anri.go.id</span>
              </li>
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-gray-300 font-body">(0651) 7551698</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm font-body text-center md:text-left">
              © {currentYear} Portal MBKM BAST ANRI. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm font-body mt-2 md:mt-0 flex items-center justify-center">
              Built with <FaHeart className="text-secondary mx-1" /> and{' '}
              <SiFirebase className="text-secondary mx-1" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
