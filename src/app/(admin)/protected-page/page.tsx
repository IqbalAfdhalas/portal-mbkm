// src/app/(admin)/protected-page/page.tsx
'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  if (!user) return null; // Will redirect in useEffect

  return <div>Halaman yang dilindungi</div>;
};

export default ProtectedPage;
