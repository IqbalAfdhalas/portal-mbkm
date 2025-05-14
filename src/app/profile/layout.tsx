// src/app/profile/layout.tsx
"use client";

import { ReactNode } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

interface ProfileLayoutProps {
  children: ReactNode;
}

/**
 * Layout for all profile pages that ensures the user is authenticated
 */
export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-dark-DEFAULT">
        {/* You can add shared layout elements for profile pages here */}
        <main>{children}</main>
      </div>
    </ProtectedRoute>
  );
}
