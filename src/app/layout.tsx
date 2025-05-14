// src/app/layout.tsx
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";

export const metadata = {
  title: "Portal MBKM BAST ANRI",
  description: "Portal Merdeka Belajar Kampus Merdeka BAST ANRI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="font-body">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <Layout>{children}</Layout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
