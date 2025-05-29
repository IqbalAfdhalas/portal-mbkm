// src/app/layout.tsx
import '../styles/globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Portal MBKM BAST ANRI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
