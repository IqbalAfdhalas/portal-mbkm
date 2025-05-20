// src/components/forum/ForumSidebar.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const ForumSidebar: React.FC = () => {
  const [popularThreads, setPopularThreads] = useState([
    { id: '1', title: 'Pengalaman Minggu Pertama di Unit Preservasi Arsip' },
    { id: '2', title: 'Info Pendaftaran Program MBKM BAST ANRI Periode Juli 2025' },
    { id: '3', title: 'Bagaimana Prosedur Pengajuan Izin Kunjungan ke Luar BAST ANRI?' },
  ]);

  const categories = [
    { id: 'announcement', name: 'Pengumuman Resmi', count: 5 },
    { id: 'general', name: 'Diskusi Umum', count: 12 },
    { id: 'qa', name: 'Tanya Jawab', count: 25 },
    { id: 'experience', name: 'Berbagi Pengalaman', count: 8 },
  ];

  return (
    <aside className="forum-sidebar w-full md:w-1/4">
      <div className="sidebar-widget bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Tentang Forum</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Forum MBKM BAST ANRI adalah ruang digital yang menghubungkan para mahasiswa peserta
          program, alumni, calon peserta, dan pembimbing dalam satu komunitas diskusi.
        </p>
        <div className="mt-4">
          <Link
            href="/forum/create"
            className="w-full inline-flex justify-center items-center px-4 py-2 bg-[#087E8B] hover:bg-[#0B3954] text-white rounded-md transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Buat Thread Baru
          </Link>
        </div>
      </div>

      <div className="sidebar-widget bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Thread Populer
        </h3>
        <ul className="space-y-3">
          {popularThreads.map(thread => (
            <li key={thread.id}>
              <Link
                href={`/forum/thread/${thread.id}`}
                className="text-[#087E8B] dark:text-[#164B69] hover:text-[#0B3954] dark:hover:text-[#087E8B] text-sm"
              >
                {thread.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-widget bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Kategori</h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category.id} className="flex justify-between items-center">
              <Link
                href={`/forum/${category.id}`}
                className="text-gray-700 dark:text-gray-300 hover:text-[#087E8B] dark:hover:text-[#164B69] text-sm"
              >
                {category.name}
              </Link>
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
                {category.count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ForumSidebar;
