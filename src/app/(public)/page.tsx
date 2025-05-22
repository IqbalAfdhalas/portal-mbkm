// src/app/(public)/page.tsx
'use client';

import { useEffect } from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Program from '@/components/sections/Program';
import Stats from '@/components/sections/Stats';
import KatalogMBKM from '@/components/sections/KatalogMBKM';
import Galery from '@/components/sections/Galery';
import PojokMBKM from '@/components/sections/PojokMBKM';
import Faq from '@/components/sections/Faq';
import Contact from '@/components/sections/Contact';
import { scrollToId } from '@/lib/utils';



export default function HomePage() {
  useEffect(() => {
    // Cek apakah ada target scroll di session storage
    const targetId = sessionStorage.getItem('scrollTarget');
    if (targetId) {
      // Tambahkan delay agar halaman dimuat lebih dahulu sebelum scroll
      setTimeout(() => {
        scrollToId(targetId, -80); // Gunakan offset -80px untuk jarak dari navbar

        // Hapus target dari session storage setelah di-scroll
        sessionStorage.removeItem('scrollTarget');
      }, 500); // Delay yang lebih lama untuk memastikan semua elemen dimuat
    }
  }, []);

  // Tambahkan event handler untuk memperbarui scrollspy saat halaman dimuat
  useEffect(() => {
    const updateScrollspy = () => {
      // Cek URL hash dan scroll ke sana jika ada
      if (window.location.hash) {
        const targetId = window.location.hash.substring(1); // Hapus karakter '#'
        setTimeout(() => {
          scrollToId(targetId, -80);
        }, 100);
      }
    };

    // Panggil handler saat window dimuat
    window.addEventListener('load', updateScrollspy);

    // Cleanup
    return () => {
      window.removeEventListener('load', updateScrollspy);
    };
  }, []);

  return (
    <main>
      <Hero />
      <About />
      <Program />
      <Stats />
      <KatalogMBKM />
      <Galery />
      <PojokMBKM />
      <Faq />
      <Contact />
    </main>
  );
}
