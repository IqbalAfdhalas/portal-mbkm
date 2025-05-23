// src/components/ui/LoginForm.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, User, Lock, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface LoginFormProps {
  onSuccess?: () => void;
  redirect?: string;
}

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm = ({ onSuccess, redirect = '/' }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.username, data.password, data.rememberMe);
      toast.success('Login berhasil!');

      if (onSuccess) {
        onSuccess();
      } else {
        router.push(redirect);
      }
    } catch (error: any) {
      console.error('Login error:', error);

      // Pesan error yang user-friendly
      const errorMessages: Record<string, string> = {
        'auth/user-not-found': 'Username atau password salah',
        'auth/wrong-password': 'Username atau password salah',
        'auth/invalid-credential': 'Username atau password salah',
        'auth/too-many-requests': 'Terlalu banyak percobaan. Coba lagi nanti',
        'auth/user-disabled': 'Akun ini telah dinonaktifkan',
        'auth/network-request-failed': 'Masalah koneksi internet. Silakan periksa koneksi Anda',
      };

      const errorMessage = errorMessages[error.code] || 'Gagal login. Silakan coba lagi';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-dark-surface rounded-lg shadow-md overflow-hidden">
      <div className="p-8">
        <h2 className="text-2xl font-heading font-semibold text-gray-800 dark:text-white mb-2">
          Selamat Datang Kembali
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Masuk untuk mengakses akun MBKM Anda
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Input */}
          <div className="relative">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                autoComplete="username"
                className={`pl-10 w-full py-2 px-4 border ${
                  errors.username
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-primary-light focus:border-primary-light'
                } dark:bg-gray-800 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2`}
                placeholder="Masukkan username"
                {...register('username', {
                  required: 'Username harus diisi',
                  minLength: {
                    value: 3,
                    message: 'Username minimal 3 karakter',
                  },
                })}
                disabled={isLoading}
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className={`pl-10 w-full py-2 px-4 border ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-primary-light focus:border-primary-light'
                } dark:bg-gray-800 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 pr-10`}
                placeholder="Masukkan password"
                {...register('password', {
                  required: 'Password harus diisi',
                  minLength: {
                    value: 6,
                    message: 'Password minimal 6 karakter',
                  },
                })}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-primary-light focus:ring-primary-light border-gray-300 dark:border-gray-600 rounded"
                {...register('rememberMe')}
                disabled={isLoading}
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Ingat saya
              </label>
            </div>
            <div className="text-sm">
              <Link
                href="/auth/forgot-password"
                className="font-medium text-primary-light hover:text-primary transition-colors"
              >
                Lupa password?
              </Link>
            </div>
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
                'Masuk'
              )}
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Belum memiliki akun?{' '}
            <Link
              href="/auth/register"
              className="font-medium text-primary-light hover:text-primary transition-colors"
            >
              Daftar sekarang
            </Link>
          </p>
        </div>

        {/* Privacy Notice */}
        <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
          Dengan masuk, Anda menyetujui{' '}
          <Link
            href="/kebijakan-privasi"
            className="underline hover:text-primary-light transition-colors"
          >
            Kebijakan Privasi
          </Link>{' '}
          dan{' '}
          <Link
            href="/syarat-ketentuan"
            className="underline hover:text-primary-light transition-colors"
          >
            Syarat & Ketentuan
          </Link>{' '}
          kami.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
