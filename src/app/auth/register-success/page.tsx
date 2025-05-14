// src/app/auth/register-success/page.tsx
"use client";

import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

export default function RegisterSuccessPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-dark-DEFAULT flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center">
        <div className="mb-6">
          <Link href="/" className="inline-block">
            <img
              src="/images/logo.svg"
              alt="MBKM BAST ANRI"
              className="h-12 mx-auto"
            />
          </Link>
        </div>

        <div className="bg-white dark:bg-dark-surface rounded-xl shadow-md p-8">
          <div className="flex justify-center">
            <FiCheckCircle className="text-green-500 w-16 h-16" />
          </div>

          <h2 className="mt-6 text-2xl font-bold font-heading text-gray-900 dark:text-white">
            Registrasi Berhasil!
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Selamat! Akun anda berhasil dibuat. Sekarang anda dapat mengakses
            semua fitur Portal MBKM BAST ANRI.
          </p>

          <div className="mt-8 space-y-4">
            <Link
              href="/auth/login"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-light hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition duration-200"
            >
              Masuk ke Akun
            </Link>

            <Link
              href="/"
              className="w-full flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition duration-200"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          Jika anda mengalami masalah, silakan hubungi{" "}
          <a
            href="mailto:support@bastanri.ac.id"
            className="font-medium text-primary-light hover:text-primary"
          >
            support@bastanri.ac.id
          </a>
        </p>
      </div>
    </div>
  );
}
