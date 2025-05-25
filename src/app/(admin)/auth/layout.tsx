// src/app/(admin)/auth/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-container">
      {/* Konten khusus untuk auth pages bisa ditambahkan di sini */}
      {children}
    </div>
  );
}
