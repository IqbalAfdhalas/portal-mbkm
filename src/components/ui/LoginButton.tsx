import Link from "next/link";
import { LogIn, UserPlus } from "lucide-react";
import { useState } from "react";

interface LoginButtonProps {
  className?: string;
}

const LoginButton = ({ className = "" }: LoginButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/auth/login"
      className={`
        group relative inline-flex items-center justify-center 
        py-2.5 px-6 rounded-lg overflow-hidden gap-2
        font-medium text-sm transition-all duration-300
        bg-gradient-to-r from-indigo-500 to-purple-600
        text-white shadow-lg hover:shadow-indigo-500/30
        transform hover:-translate-y-1
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background animation */}
      <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

      {/* Shine effect */}
      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>

      {/* Main Content */}
      <span className="relative flex items-center gap-2 z-10">
        {/* Left Icon */}
        <LogIn size={18} className={`${isHovered ? "animate-pulse" : ""}`} />

        {/* Text */}
        <span className="flex items-center gap-1">
          <span>Masuk</span>
          <span className="opacity-70">atau</span>
          <span className="font-semibold">Daftar</span>
        </span>

        {/* Right Icon */}
        <UserPlus
          size={16}
          className={`${isHovered ? "animate-pulse" : ""} opacity-80`}
        />
      </span>
    </Link>
  );
};

export default LoginButton;
