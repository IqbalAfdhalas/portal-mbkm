// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // Pastikan import sesuai dengan path di project Anda

interface UseProtectedRouteOptions {
  adminOnly?: boolean;
}

export const useProtectedRoute = (options: UseProtectedRouteOptions = {}) => {
  const { adminOnly = false } = options;
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth/login?redirect=' + encodeURIComponent(window.location.pathname));
      } else if (adminOnly && !isAdmin) {
        router.push('/unauthorized');
      }
      setIsChecking(false);
    }
  }, [user, loading, isAdmin, adminOnly, router]);

  return { isChecking, user, isAdmin };
};

// Re-export useAuth to maintain consistency
export { useAuth } from '@/context/AuthContext';
