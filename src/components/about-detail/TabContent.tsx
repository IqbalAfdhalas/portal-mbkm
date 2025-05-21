//src/components/about-detail/TabContent.tsx

'use client';

import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { MotionDiv } from '@/components/common/MotionClientOnly';

interface TabContentProps {
  children: ReactNode;
}

export const TabContent: React.FC<TabContentProps> = ({ children }) => {
  const { theme } = useTheme();

  // Theme-based styling aligned with page.tsx
  const themeStyles = {
    light: {
      contentBg: 'bg-white',
      text: 'text-gray-800',
      shape: 'text-blue-100',
    },
    dark: {
      contentBg: 'bg-gray-900',
      text: 'text-gray-100',
      shape: 'text-gray-800',
    },
  };

  const currentTheme = theme === 'dark' ? themeStyles.dark : themeStyles.light;

  return (
    <div className={`${currentTheme.contentBg} transition-colors duration-300`}>
      <div className="container mx-auto max-w-6xl px-4 py-8 relative">
        {/* Decorative elements that change with theme */}
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <svg
            width="180"
            height="180"
            viewBox="0 0 180 180"
            className={`${currentTheme.shape} transition-colors duration-300`}
          >
            <circle cx="90" cy="90" r="70" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="90" cy="90" r="35" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M90,20 L90,160" stroke="currentColor" strokeWidth="2" />
            <path d="M20,90 L160,90" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        <div className="absolute bottom-0 left-0 opacity-5 pointer-events-none">
          <svg
            width="150"
            height="150"
            viewBox="0 0 150 150"
            className={`${currentTheme.shape} transition-colors duration-300`}
          >
            <rect
              x="25"
              y="25"
              width="100"
              height="100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="75" cy="75" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M25,75 L125,75" stroke="currentColor" strokeWidth="2" />
            <path d="M75,25 L75,125" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        <AnimatePresence mode="wait">
          <MotionDiv
            key={React.Children.count(children)}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="relative z-10"
          >
            {children}
          </MotionDiv>
        </AnimatePresence>
      </div>
    </div>
  );
};
