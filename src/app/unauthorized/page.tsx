// src/app/unauthorized/page.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function UnauthorizedPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-dark-default p-4">
      <div className="bg-white dark:bg-dark-surface rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Akses Tidak Diizinkan
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Halaman ini hanya tersedia
          untuk administrator.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Kembali ke Beranda
          </Link>
          {user && (
            <button
              onClick={() => logout()}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
