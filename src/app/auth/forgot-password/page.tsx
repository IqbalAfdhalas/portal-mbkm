// src/app/auth/forgot-password/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import ForgotPasswordForm from '@/components/ui/ForgotPasswordForm';
import Link from 'next/link';
import Image from 'next/image';

export default function ForgotPasswordPage() {
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
      {/* Split screen layout */}
      <div className="flex w-full">
        {/* Form section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-12">
          <div className="absolute top-4 left-4 z-10">
            <Link
              href="/auth/login"
              className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:underline hover:text-primary transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Kembali ke Login</span>
            </Link>
          </div>
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

            <ForgotPasswordForm />
          </div>
        </div>

        {/* Illustration/branding section - hidden on mobile */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-primary-light p-12 flex-col justify-center items-center relative overflow-hidden">
          <div className="z-10 text-center">
            <h1 className="text-4xl font-heading font-bold text-white mb-6">Lupa Password?</h1>
            <p className="text-lg text-white/90 max-w-md">
              Jangan khawatir! Kami akan membantu Anda mengatur ulang password dan mengakses kembali
              akun Anda dengan aman.
            </p>
          </div>

          {/* Background elements - can be replaced with actual illustration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white"></div>
            <div className="absolute bottom-40 right-10 w-40 h-40 rounded-full bg-white"></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
