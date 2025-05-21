// src/components/ui/RegisterForm.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, User, Lock, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';

interface RegisterFormData {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const { register: signUp } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      return;
    }

    setIsLoading(true);
    setServerError(null);

    try {
      await signUp(data.email, data.password, data.displayName);
      toast.success('Pendaftaran berhasil! Silahkan cek email Anda untuk verifikasi.');
      router.push('/auth/register-success');
    } catch (error: any) {
      // Handle specific Firebase errors
      const errorMessages: Record<string, string> = {
        'auth/email-already-in-use': 'Email sudah terdaftar. Silakan gunakan email lain',
        'auth/invalid-email': 'Format email tidak valid',
        'auth/weak-password': 'Password terlalu lemah. Gunakan minimal 6 karakter',
        'auth/network-request-failed': 'Masalah koneksi internet. Silakan periksa koneksi Anda',
      };

      const errorMessage = errorMessages[error.code] || 'Pendaftaran gagal. Silakan coba lagi';
      setServerError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-dark-surface rounded-lg shadow-md">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold font-heading text-gray-800 dark:text-white">
          Daftar Akun
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Bergabung dengan portal MBKM BAST ANRI
        </p>
      </div>

      {serverError && (
        <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-lg">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Nama Lengkap */}
        <div className="space-y-1">
          <label
            htmlFor="displayName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Nama Lengkap
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="displayName"
              type="text"
              className={`block w-full pl-10 pr-3 py-2 rounded-lg border ${
                errors.displayName
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 dark:border-gray-700 focus:ring-primary-light focus:border-primary-light'
              } dark:bg-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2`}
              placeholder="Masukkan nama lengkap"
              {...register('displayName', {
                required: 'Nama lengkap wajib diisi',
                minLength: {
                  value: 3,
                  message: 'Nama minimal 3 karakter',
                },
                maxLength: {
                  value: 50,
                  message: 'Nama maksimal 50 karakter',
                },
              })}
              disabled={isLoading}
            />
          </div>
          {errors.displayName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.displayName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              className={`block w-full pl-10 pr-3 py-2 rounded-lg border ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 dark:border-gray-700 focus:ring-primary-light focus:border-primary-light'
              } dark:bg-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2`}
              placeholder="nama@example.com"
              {...register('email', {
                required: 'Email wajib diisi',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Format email tidak valid',
                },
              })}
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className={`block w-full pl-10 pr-10 py-2 rounded-lg border ${
                errors.password
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 dark:border-gray-700 focus:ring-primary-light focus:border-primary-light'
              } dark:bg-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2`}
              placeholder="Minimal 6 karakter"
              {...register('password', {
                required: 'Password wajib diisi',
                minLength: {
                  value: 6,
                  message: 'Password minimal 6 karakter',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                  message: 'Password harus memiliki huruf besar, huruf kecil, dan angka',
                },
              })}
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Konfirmasi Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              className={`block w-full pl-10 pr-10 py-2 rounded-lg border ${
                errors.confirmPassword
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 dark:border-gray-700 focus:ring-primary-light focus:border-primary-light'
              } dark:bg-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2`}
              placeholder="Ulangi password"
              {...register('confirmPassword', {
                required: 'Konfirmasi password wajib diisi',
                validate: value => value === password || 'Password tidak sama',
              })}
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="acceptTerms"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-light dark:border-gray-700 dark:bg-gray-700"
              {...register('acceptTerms', {
                required: 'Anda harus menyetujui syarat dan ketentuan',
              })}
              disabled={isLoading}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="acceptTerms" className="font-medium text-gray-700 dark:text-gray-300">
              Saya menyetujui{' '}
              <Link href="/syarat-ketentuan" className="text-primary-light hover:underline">
                syarat dan ketentuan
              </Link>
            </label>
            {errors.acceptTerms && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.acceptTerms.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-light hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
              Mendaftar...
            </span>
          ) : (
            'Daftar'
          )}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sudah memiliki akun?{' '}
            <Link
              href="/auth/login"
              className="font-medium text-primary-light hover:underline transition-colors"
            >
              Masuk disini
            </Link>
          </p>
        </div>
      </form>

      {/* Password Requirements */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Password harus memiliki:
        </p>
        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <li className="flex items-center">
            <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5" />
            Minimal 6 karakter
          </li>
          <li className="flex items-center">
            <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5" />
            Minimal 1 huruf besar
          </li>
          <li className="flex items-center">
            <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5" />
            Minimal 1 huruf kecil
          </li>
          <li className="flex items-center">
            <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5" />
            Minimal 1 angka
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RegisterForm;
