// src/app/auth/reset-password-success/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function ResetPasswordSuccessPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is already logged in
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  // Don't show form if checking auth state or already logged in
  if (loading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-dark-default">
        <div className="w-16 h-16 border-4 border-primary-light border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-dark-default">
      <div className="w-full flex flex-col justify-center items-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.svg"
                alt="MBKM BAST ANRI"
                width={180}
                height={60}
                className="h-auto"
              />
            </Link>
          </div>

          <div className="w-full max-w-md mx-auto bg-white dark:bg-dark-surface rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-500 mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-heading font-semibold text-gray-800 dark:text-white mb-2">
                  Password Berhasil Diubah
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Password Anda telah berhasil diubah. Silakan masuk dengan password baru Anda.
                </p>
                <Link
                  href="/auth/login"
                  className="inline-block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-light hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-colors"
                >
                  Masuk Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
