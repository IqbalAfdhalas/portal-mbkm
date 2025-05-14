"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

const AuthStatus = () => {
  const { user, login, logout, isAdmin } = useAuth();

  return (
    <div className="space-y-2">
      {user ? (
        <>
          <p>👋 Halo, {user.displayName || user.email}</p>
          {isAdmin && <p className="text-sm text-red-500">🛡 Anda admin</p>}
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </>
      ) : (
        <>
          <p>Belum login.</p>
          <Button
            onClick={() => login("demo@example.com", "password123")}
            variant="primary"
          >
            Login Demo
          </Button>
        </>
      )}
    </div>
  );
};

export default AuthStatus;
