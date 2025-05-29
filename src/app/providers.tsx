'use client';

import React from 'react';
import { ThemeProvider } from '@/components/providers/ThemeProvider'; // Gunakan ThemeProvider kustom Anda
import { AuthProvider } from '@/context/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
