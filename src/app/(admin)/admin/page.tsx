// src/app/admin/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Image, BookOpen, Users } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Katalog Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-4">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Kenali Kami</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Kelola data mahasiswa, pembimbing, dan mentor
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/admin/kenali-kami"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Kelola data
            </Link>
          </div>
        </div>

        {/* Galeri Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mr-4">
              <Image className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Galeri</h2>
              <p className="text-gray-600 dark:text-gray-300">Kelola foto dan video kegiatan</p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/admin/galeri"
              className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Kelola Galeri
            </Link>
          </div>
        </div>

        {/* Pojok MBKM Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 mr-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Pojok MBKM</h2>
              <p className="text-gray-600 dark:text-gray-300">Kelola jurnal kegiatan mahasiswa</p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/admin/pojok-mbkm"
              className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Kelola Jurnal
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Aktivitas Terbaru
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Tidak ada aktivitas terbaru
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Total Mahasiswa</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">0</h3>
            </div>
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Media di Galeri</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">0</h3>
            </div>
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
              <Image className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Jurnal Dipublikasi</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">0</h3>
            </div>
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
