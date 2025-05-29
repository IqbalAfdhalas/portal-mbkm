// src/app/layout.tsx
import '../styles/globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Portal MBKM BAST ANRI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme') || 'light';
                if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                  document.body.className = 'min-h-screen bg-gray-900 transition-colors';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.body.className = 'min-h-screen bg-white transition-colors';
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white transition-colors" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
