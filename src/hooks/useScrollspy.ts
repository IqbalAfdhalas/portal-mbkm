'use client';

import { useState, useEffect } from 'react';

interface UseScrollspyOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollspy = (elementIds: string[], options: UseScrollspyOptions = {}) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const { threshold = 0.1, rootMargin = '0px 0px -20% 0px' } = options;

    const observer = new IntersectionObserver(
      entries => {
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        threshold,
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

  // ⬇ Tambahkan bagian ini
  useEffect(() => {
    const handleHashChange = () => {
      elementIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight * 0.6) {
            setActiveId(id);
          }
        }
      });
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('load', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('load', handleHashChange);
    };
  }, [elementIds]);

  return activeId;
};
