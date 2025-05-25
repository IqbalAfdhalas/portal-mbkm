'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

const AuthStatus = () => {
  const { user, login, signOut, isAdmin } = useAuth();

  return (
    <div className="space-y-2">
      {user ? (
        <>
          <p>👋 Halo, {user.displayName || user.email}</p>
          {isAdmin && <p className="text-sm text-red-500">🛡 Anda admin</p>}
          <Button onClick={signOut} variant="outline">
            Logout
          </Button>
        </>
      ) : (
        <>
          <p>Belum login.</p>
          <Button onClick={() => login('demo@example.com', 'password123')} variant="primary">
            Login Demo
          </Button>
        </>
      )}
    </div>
  );
};

export default AuthStatus;
