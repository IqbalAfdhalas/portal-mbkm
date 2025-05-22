// src/components/auth/ProtectedRoute.tsx
'use client';

import { useEffect, ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log('ProtectedRoute mount - User:', user?.email);
    console.log('isAdmin:', isAdmin);
    console.log('requireAdmin:', requireAdmin);
    console.log('loading:', loading);

    if (!loading) {
      if (!user) {
        console.log('No user found, redirecting to login');
        const currentPath = window.location.pathname;
        router.push(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
      } else if (requireAdmin && !isAdmin) {
        console.log('User is not admin, redirecting to unauthorized page');
        router.push('/unauthorized');
      } else {
        console.log('User is authorized to view this page');
        setIsReady(true);
      }
    }
  }, [user, loading, isAdmin, requireAdmin, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-light border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4">Loading...</p>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-light border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4">Checking permissions...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
