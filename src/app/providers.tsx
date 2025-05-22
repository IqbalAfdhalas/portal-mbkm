'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes'; // Mengasumsikan Anda menggunakan next-themes
import { AuthProvider } from '@/context/AuthContext'; // Import AuthProvider

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      {' '}
      {/* Sesuaikan dengan provider theme yang Anda gunakan */}
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
