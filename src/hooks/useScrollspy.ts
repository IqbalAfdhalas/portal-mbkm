"use client";

// src/hooks/useScrollspy.ts
import { useState, useEffect } from "react";

interface UseScrollspyOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollspy = (
  elementIds: string[],
  options: UseScrollspyOptions = {},
) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const { threshold = 0.2, rootMargin = "0px 0px -70% 0px" } = options;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        threshold,
        rootMargin,
      },
    );

    elementIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      elementIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [elementIds, options]);

  return activeId;
};
