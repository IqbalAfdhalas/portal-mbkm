// src/app/auth/register/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RegisterForm from "@/components/ui/RegisterForm";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-dark-DEFAULT py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-light border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Memuat...</p>
        </div>
      </div>
    );
  }

  // If user is null (not logged in) and not loading, show register page
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-dark-DEFAULT">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <img
                src="/images/logo.svg"
                alt="MBKM BAST ANRI"
                className="h-12 mx-auto"
              />
            </Link>
          </div>

          <RegisterForm />
        </div>
      </div>

      {/* Right Side - Illustration (hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-primary-light items-center justify-center text-white">
        <div className="max-w-md px-8 text-center">
          <h2 className="text-3xl font-bold font-heading mb-6">
            Bergabung dengan Program MBKM BAST ANRI
          </h2>
          <p className="text-lg mb-6">
            Dapatkan pengalaman belajar yang berharga dan kesempatan untuk
            mengembangkan keterampilan Anda.
          </p>
          <img
            src="/images/register-illustration.svg"
            alt="Register Illustration"
            className="max-w-sm mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
