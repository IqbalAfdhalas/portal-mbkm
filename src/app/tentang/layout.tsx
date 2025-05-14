// src/app/tentang/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tentang MBKM BAST ANRI | Portal MBKM BAST ANRI',
  description: 'Informasi lengkap tentang Program Merdeka Belajar Kampus Merdeka di Badan Arsip Nasional Republik Indonesia',
};

export default function TentangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}