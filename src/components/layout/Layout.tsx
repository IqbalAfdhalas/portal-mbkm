// src/components/layout/Layout.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTopButton from '@/components/ui/BackToTopButton';
import { useTheme } from 'next-themes';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Daftar halaman yang TIDAK perlu Navbar/Footer
  const noLayoutRoutes = ['/auth/login', '/auth/register', '/unauthorized'];
  const hideLayout = pathname ? noLayoutRoutes.includes(pathname) : false;

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === 'dark' ? 'dark bg-dark text-gray-100' : 'bg-white text-gray-800'
      }`}
    >
      {!hideLayout && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!hideLayout && <Footer />}

      {/* Back to Top Button - hanya muncul di halaman yang ada layoutnya */}
      {!hideLayout && <BackToTopButton />}
    </div>
  );
};

export default Layout;
