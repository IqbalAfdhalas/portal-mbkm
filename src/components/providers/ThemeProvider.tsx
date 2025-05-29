'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'light', // Ubah dari 'system' ke 'light'
  enableSystem = true,
  disableTransitionOnChange = true,
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render placeholder saat belum mounted untuk mencegah hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white">
        <div suppressHydrationWarning>{children}</div>
      </div>
    );
  }

  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      storageKey="theme" // Pastikan menggunakan key yang sama dengan script inline
    >
      {children}
    </NextThemesProvider>
  );
}
