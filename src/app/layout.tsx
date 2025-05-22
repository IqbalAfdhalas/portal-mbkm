// src/app/layout.tsx
import '../styles/globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Portal MBKM BAST ANRI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
