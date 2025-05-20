// src/app/forum/[categorySlug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ThreadList from '@/components/forum/ThreadList';
import ForumSidebar from '@/components/forum/ForumSidebar';
import SortOptions from '@/components/forum/SortOptions';
import { useThreads } from '@/hooks/forum/useThreads';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.categorySlug as string;
  const [sortBy, setSortBy] = useState('newest');
  const { threads, loading, error } = useThreads({ category: categorySlug, sortBy });
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Map kategori slug ke nama yang ditampilkan
  const categoryNames: Record<string, string> = {
    pengumuman: 'Pengumuman Resmi',
    diskusi: 'Diskusi Umum',
    'tanya-jawab': 'Tanya Jawab',
    pengalaman: 'Berbagi Pengalaman',
  };

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

  // Map kategori slug ke icon
  const categoryIcons: Record<string, string> = {
    pengumuman: '📢',
    diskusi: '💬',
    'tanya-jawab': '❓',
    pengalaman: '📝',
  };

  // Map kategori slug ke deskripsi
  const categoryDescriptions: Record<string, string> = {
    pengumuman: 'Informasi dan pengumuman resmi dari pengelola program MBKM BAST ANRI',
    diskusi: 'Ruang diskusi bebas seputar program dan topik terkait MBKM BAST ANRI',
    'tanya-jawab': 'Ajukan pertanyaan dan dapatkan jawaban dari komunitas',
    pengalaman: 'Berbagi cerita dan pengalaman selama mengikuti program MBKM di BAST ANRI',
  };

  return (
    <div className={`forum-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="forum-header bg-white dark:bg-gray-900 p-6 mb-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{categoryIcons[categorySlug] || '📁'}</span>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {categoryNames[categorySlug] || categorySlug}
            </h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400 ml-12">
          {categoryDescriptions[categorySlug] || 'Diskusi kategori forum MBKM BAST ANRI'}
        </p>

        <div className="mt-4 ml-12">
          <Link href="/forum" className="text-[#087E8B] hover:underline flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Kembali ke Forum Utama
          </Link>
        </div>
      </div>

      <div className="forum-content flex flex-col md:flex-row gap-6">
        <div className="forum-main w-full md:w-3/4">
          <div className="forum-actions flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Thread dalam kategori ini
            </h2>
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
          ) : threads.length === 0 ? (
            <div className="empty-state p-8 text-center bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                Belum ada thread
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Jadilah yang pertama membuat thread dalam kategori ini
              </p>
              <Link
                href="/forum/create"
                className="inline-block px-4 py-2 bg-[#087E8B] hover:bg-[#0B3954] text-white rounded-md transition-colors duration-300"
              >
                Buat Thread Baru
              </Link>
            </div>
          ) : (
            <ThreadList threads={threads} />
          )}
        </div>

        <ForumSidebar activeCategorySlug={categorySlug} />
      </div>
    </div>
  );
}

//src/app/forum/thread/[threadId]/page.tsx