// src/app/admin/layout.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { LogOut, Home, Image, BookOpen, FileText } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-3 text-gray-700 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="flex flex-col h-full">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <Link href="/admin" className="flex items-center">
              <span className="text-lg font-bold text-gray-800 dark:text-white">
                MBKM BAST ANRI
              </span>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-4">
            <Link
              href="/admin"
              className="flex items-center px-2 py-2 mb-2 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Home className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/admin/katalog"
              className="flex items-center px-2 py-2 mb-2 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FileText className="w-5 h-5 mr-3" />
              <span>Katalog</span>
            </Link>

            <Link
              href="/admin/galeri"
              className="flex items-center px-2 py-2 mb-2 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Image className="w-5 h-5 mr-3" />
              <span>Galeri</span>
            </Link>

            <Link
              href="/admin/pojok-mbkm"
              className="flex items-center px-2 py-2 mb-2 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <BookOpen className="w-5 h-5 mr-3" />
              <span>Pojok MBKM</span>
            </Link>
          </nav>

          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => signOut()}
              className="flex items-center px-2 py-2 w-full text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </button>

            <Link
              href="/"
              className="flex items-center px-2 py-2 mt-2 w-full text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Home className="w-5 h-5 mr-3" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Admin Dashboard</h1>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300 mr-4">{user?.email}</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6 bg-gray-100 dark:bg-gray-900">{children}</main>
      </div>
    </div>
  );
}
