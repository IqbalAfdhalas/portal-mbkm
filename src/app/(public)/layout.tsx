// src/app/(public)/layout.tsx
import Layout from '@/components/layout/Layout';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}
