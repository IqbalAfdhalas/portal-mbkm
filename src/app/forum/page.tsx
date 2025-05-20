// src/app/forum/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ThreadList from '@/components/forum/ThreadList';
import ForumSidebar from '@/components/forum/ForumSidebar';
import CategoryFilter from '@/components/forum/CategoryFilter';
import SortOptions from '@/components/forum/SortOptions';
import { useThreads } from '@/hooks/forum/useThreads';
import Link from 'next/link';

export default function ForumMainPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const { threads, loading, error } = useThreads({ category: selectedCategory, sortBy });
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for system preferred color scheme on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);

      // Listen for changes in color scheme preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener('change', handleChange);

      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`forum-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="forum-header bg-white dark:bg-gray-900 p-6 mb-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Forum MBKM BAST ANRI
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Ruang diskusi terbuka untuk komunitas MBKM BAST ANRI
        </p>
      </div>

      <div className="forum-content flex flex-col md:flex-row gap-6">
        <div className="forum-main w-full md:w-3/4">
          <div className="forum-actions flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <div className="flex gap-4 items-center">
              <SortOptions sortBy={sortBy} onSortChange={setSortBy} />
              <Link
                href="/forum/create"
                className="btn-primary px-4 py-2 bg-[#087E8B] hover:bg-[#0B3954] text-white rounded-md transition-colors duration-300 flex items-center"
              >
                Buat Thread Baru
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="loading-indicator p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#087E8B] mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Memuat thread...</p>
            </div>
          ) : error ? (
            <div className="error-message p-8 text-center bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-red-600 dark:text-red-400">
                Gagal memuat thread. Silakan coba lagi nanti.
              </p>
            </div>
          ) : (
            <ThreadList threads={threads} />
          )}
        </div>

        <ForumSidebar />
      </div>
    </div>
  );
}
