// src/components/layout/UserDropdown.tsx
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User } from 'firebase/auth';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiSettings, FiLogOut, FiBook, FiShield } from 'react-icons/fi';
import { MotionDiv } from '@/components/common/MotionClientOnly';

interface UserDropdownProps {
  user: User;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout, isAdmin } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (user.displayName) {
      return user.displayName
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    return user.email?.substring(0, 2).toUpperCase() || 'U';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-controls="user-dropdown"
      >
        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary-light flex items-center justify-center text-white">
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt={user.displayName || 'User profile'}
              width={32}
              height={32}
              className="object-cover"
            />
          ) : (
            <span className="text-sm font-medium">{getUserInitials()}</span>
          )}

          {/* Online indicator */}
          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-white"></span>
        </div>

        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[100px]">
            {user.displayName || user.email?.split('@')[0]}
          </p>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            id="user-dropdown"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 rounded-md bg-white dark:bg-dark-surface shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          >
            <div className="p-3 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center text-white">
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt={user.displayName || 'User profile'}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-medium">{getUserInitials()}</span>
                  )}
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate max-w-[180px]">
                    {user.displayName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="py-1" role="menu" aria-orientation="vertical">
              <Link
                href="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                <FiUser className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                Profil Saya
              </Link>

              <Link
                href="/aktivitas"
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                <FiBook className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                Aktivitas Saya
              </Link>

              <Link
                href="/profile/settings"
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                <FiSettings className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                Pengaturan
              </Link>

              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center px-4 py-2 text-sm text-blue-700 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  <FiShield className="mr-3 h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Admin Panel
                </Link>
              )}

              <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>

              <button
                className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                role="menuitem"
                onClick={handleLogout}
              >
                <FiLogOut className="mr-3 h-4 w-4 text-red-500 dark:text-red-400" />
                Keluar
              </button>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
