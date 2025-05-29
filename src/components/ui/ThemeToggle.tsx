'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { MotionDiv } from '@/components/common/MotionClientOnly';

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Gunakan resolvedTheme sebagai fallback untuk memastikan sync yang benar
  const currentTheme = mounted ? resolvedTheme || theme : 'light';
  const isDark = currentTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  if (!mounted) {
    // Return placeholder dengan icon light theme sebagai default
    return (
      <button disabled className="p-2 rounded-full bg-gray-100 text-gray-800 transition-colors">
        <IoSunny className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-blue-400"
      onClick={toggleTheme}
    >
      <MotionDiv
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? <IoMoon className="w-5 h-5" /> : <IoSunny className="w-5 h-5" />}
      </MotionDiv>
    </button>
  );
};

export default ThemeToggle;
