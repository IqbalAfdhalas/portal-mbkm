// src/components/ui/RegisterForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiEye, FiEyeOff, FiMail, FiUser, FiLock } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";

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
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      return;
    }

    setIsLoading(true);
    setServerError(null);

    try {
      await signUp(data.email, data.password, data.displayName);
      router.push("/auth/register-success");
    } catch (error: any) {
      // Handle specific Firebase errors
      if (error.code === "auth/email-already-in-use") {
        setServerError("Email sudah terdaftar. Silakan gunakan email lain.");
      } else if (error.code === "auth/weak-password") {
        setServerError("Password terlalu lemah. Gunakan minimal 6 karakter.");
      } else {
        setServerError(
          error.message || "Terjadi kesalahan. Silakan coba lagi.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white dark:bg-dark-surface rounded-xl shadow-md">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold font-heading text-primary dark:text-white">
          Daftar Akun
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Bergabung dengan portal MBKM BAST ANRI
        </p>
      </div>

      {serverError && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-lg">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <FiUser className="text-gray-400" />
            </div>
            <input
              id="displayName"
              type="text"
              className={`block w-full pl-10 pr-3 py-2 rounded-lg border ${
                errors.displayName
                  ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-primary-light focus:border-primary-light"
              } dark:bg-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2`}
              placeholder="Masukkan nama lengkap"
              {...register("displayName", {
                required: "Nama lengkap wajib diisi",
                minLength: {
                  value: 3,
                  message: "Nama minimal 3 karakter",
                },
                maxLength: {
                  value: 50,
                  message: "Nama maksimal 50 karakter",
                },
              })}
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
              <FiMail className="text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              className={`block w-full pl-10 pr-3 py-2 rounded-lg border ${
                errors.email
                  ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-primary-light focus:border-primary-light"
              } dark:bg-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2`}
              placeholder="nama@example.com"
              {...register("email", {
                required: "Email wajib diisi",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Format email tidak valid",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
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
              <FiLock className="text-gray-400" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`block w-full pl-10 pr-10 py-2 rounded-lg border ${
                errors.password
                  ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-primary-light focus:border-primary-light"
              } dark:bg-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2`}
              placeholder="Minimal 8 karakter"
              {...register("password", {
                required: "Password wajib diisi",
                minLength: {
                  value: 8,
                  message: "Password minimal 8 karakter",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password harus memiliki huruf besar, huruf kecil, angka, dan karakter khusus",
                },
              })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.password.message}
            </p>
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
              <FiLock className="text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className={`block w-full pl-10 pr-10 py-2 rounded-lg border ${
                errors.confirmPassword
                  ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-primary-light focus:border-primary-light"
              } dark:bg-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2`}
              placeholder="Ulangi password"
              {...register("confirmPassword", {
                required: "Konfirmasi password wajib diisi",
                validate: (value) =>
                  value === password || "Password tidak sama",
              })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FiEyeOff size={18} />
              ) : (
                <FiEye size={18} />
              )}
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
              {...register("acceptTerms", {
                required: "Anda harus menyetujui syarat dan ketentuan",
              })}
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="acceptTerms"
              className="font-medium text-gray-700 dark:text-gray-300"
            >
              Saya menyetujui{" "}
              <a href="#" className="text-primary-light hover:underline">
                syarat dan ketentuan
              </a>
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
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Mendaftar...
            </>
          ) : (
            "Daftar"
          )}
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sudah memiliki akun?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-primary-light hover:underline"
            >
              Masuk disini
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
