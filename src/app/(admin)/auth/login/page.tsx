// src/app/auth/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export default function LoginPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get('redirect') || '/admin';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Get the ID token
      const token = await result.user.getIdToken();

      // Store the token in a cookie (this will be used by middleware)
      // Set auth cookie with HttpOnly and Secure in production
      document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; ${
        process.env.NODE_ENV === 'production' ? 'secure;' : ''
      } samesite=strict`;

      // Redirect to the admin page or the requested URL
      router.push(redirect);
    } catch (error: any) {
      console.error('Login error:', error);

      // Provide user-friendly error messages
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError('Email atau password salah. Silakan coba lagi.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Format email tidak valid.');
      } else {
        setError('Terjadi kesalahan saat login. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-4xl flex overflow-hidden rounded-xl shadow-lg">
        {/* Form Side */}
        <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-8 md:p-10">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 mb-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Kembali ke Beranda
            </Link>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Login</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Silakan login untuk mengakses dashboard admin
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Masukkan email"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 dark:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Memproses...' : 'Login'}
            </button>
          </form>
        </div>

        {/* Image Side */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-10 flex-col items-center justify-center relative">
          <div className="text-center">
            <Image
              src="/images/logo/logo_mbkm_white.png"
              alt="Portal MBKM BAST ANRI"
              width={150}
              height={150}
              className="mx-auto mb-6"
            />
            <h3 className="text-white text-2xl font-bold mb-2">Portal MBKM BAST ANRI</h3>
            <p className="text-blue-100">Admin Dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
}
