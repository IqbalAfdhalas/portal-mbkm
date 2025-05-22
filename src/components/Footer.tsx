// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-dark-surface py-10 mt-24 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-300 text-sm space-y-4">
        <div className="flex justify-center space-x-6">
          <Link href="/" className="hover:text-primary-DEFAULT transition">
            Beranda
          </Link>
          <Link href="/about" className="hover:text-primary-DEFAULT transition">
            Tentang
          </Link>
          <Link href="/contact" className="hover:text-primary-DEFAULT transition">
            Kontak
          </Link>
        </div>
        <p>&copy; {new Date().getFullYear()} MBKM BAST ANRI. Semua hak dilindungi.</p>
      </div>
    </footer>
  );
}
