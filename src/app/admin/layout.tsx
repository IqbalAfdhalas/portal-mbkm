// src/app/admin/layout.tsx
"use client";

import { ReactNode } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

interface AdminLayoutProps {
  children: ReactNode;
}

/**
 * Layout for all admin pages that ensures the user is authenticated and has admin privileges
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-gray-50 dark:bg-dark-DEFAULT">
        {/* You can add shared layout elements for admin pages here */}
        <main>{children}</main>
      </div>
    </ProtectedRoute>
  );
}
