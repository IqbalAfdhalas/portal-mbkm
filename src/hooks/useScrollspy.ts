'use client';

import { useState, useEffect } from 'react';

interface UseScrollspyOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollspy = (elementIds: string[], options: UseScrollspyOptions = {}) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    // Ubah threshold dan rootMargin agar lebih sesuai untuk deteksi section
    const { threshold = 0.3, rootMargin = '-80px 0px -40% 0px' } = options;

    const observer = new IntersectionObserver(
      entries => {
        // Dari entries yang terlihat, prioritaskan yang paling tinggi intersectionRatio
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          // Set activeId ke ID element yang paling terlihat
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        threshold: [threshold, 0.5, 0.75], // Tambahkan multiple threshold untuk deteksi lebih baik
        rootMargin,
      }
    );

    elementIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      elementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [elementIds, options]);

  // Tambahkan handler untuk manual scroll juga
  useEffect(() => {
    const handleScroll = () => {
      // Hitung visibility setiap section
      let mostVisibleId = null;
      let maxVisiblePercentage = 0;

      // Iterasi melalui semua section yang kita spy
      elementIds.forEach(id => {
        const element = document.getElementById(id);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Bagian elemen yang terlihat di viewport
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(windowHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        // Persentase elemen yang terlihat
        const visiblePercentage = visibleHeight / element.clientHeight;

        // Berikan preferensi pada elemen yang berada di bagian atas viewport
        // dengan menambahkan bobot berdasarkan posisi
        let positionBonus = 0;
        if (rect.top <= 100 && rect.bottom >= windowHeight * 0.3) {
          positionBonus = 0.3; // Bonus untuk elemen di atas viewport
        }

        const effectiveVisibility = visiblePercentage + positionBonus;

        if (effectiveVisibility > maxVisiblePercentage) {
          maxVisiblePercentage = effectiveVisibility;
          mostVisibleId = id;
        }
      });

      if (mostVisibleId && maxVisiblePercentage > 0.1) {
        setActiveId(mostVisibleId);
      }
    };

    // Handler untuk perubahan hash URL
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && elementIds.includes(hash)) {
        setActiveId(hash);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleHashChange);
    handleScroll(); // Periksa posisi scroll saat pertama kali dimuat

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [elementIds]);

  return activeId;
};
