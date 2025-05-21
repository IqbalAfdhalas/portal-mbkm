// src/components/ui/ForgotPasswordForm.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      await resetPassword(data.email);
      toast.success('Email reset password telah dikirim!');
      setIsSubmitted(true);
    } catch (error: any) {
      console.error('Reset password error:', error);

      // Pesan error yang user-friendly
      const errorMessages: Record<string, string> = {
        'auth/user-not-found': 'Email tidak terdaftar dalam sistem',
        'auth/invalid-email': 'Format email tidak valid',
        'auth/missing-email': 'Email harus diisi',
        'auth/network-request-failed': 'Masalah koneksi internet. Silakan periksa koneksi Anda',
      };

      const errorMessage =
        errorMessages[error.code] || 'Gagal mengirim email reset. Silakan coba lagi';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
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
              Email Terkirim
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Kami telah mengirimkan instruksi reset password ke email Anda. Silakan periksa inbox
              atau folder spam Anda.
            </p>
            <Link
              href="/auth/login"
              className="inline-flex items-center text-primary-light hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Kembali ke halaman login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-dark-surface rounded-lg shadow-md overflow-hidden">
      <div className="p-8">
        <h2 className="text-2xl font-heading font-semibold text-gray-800 dark:text-white mb-2">
          Reset Password
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Masukkan email Anda untuk menerima link reset password
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={`pl-10 w-full py-2 px-4 border ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-primary-light focus:border-primary-light'
                } dark:bg-gray-800 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2`}
                placeholder="nama@example.com"
                {...register('email', {
                  required: 'Email harus diisi',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Format email tidak valid',
                  },
                })}
                disabled={isLoading}
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-light hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Memproses...
                </span>
              ) : (
                'Kirim Link Reset'
              )}
            </button>
          </div>
        </form>

        {/* Back to Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ingat password Anda?{' '}
            <Link
              href="/auth/login"
              className="font-medium text-primary-light hover:text-primary transition-colors"
            >
              Kembali ke login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
