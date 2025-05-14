"use client";

// src/components/ui/ThemeToggle.tsx
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { IoMoon, IoSunny } from "react-icons/io5";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Setelah mounted, kita bisa dengan aman menampilkan UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mendapatkan status tema saat ini
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) {
    return <div className="w-8 h-8"></div>; // Placeholder untuk mencegah layout shift
  }

  return (
    <button
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-blue-400"
      onClick={toggleTheme}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <IoMoon className="w-5 h-5" />
        ) : (
          <IoSunny className="w-5 h-5" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
