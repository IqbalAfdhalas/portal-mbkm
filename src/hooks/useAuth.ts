// src/hooks/useAuth.ts
'use client';
import { useContext, useEffect, useState } from 'react';
import {
  signOut as firebaseSignOut,
  signInWithEmailAndPassword as firebaseSignIn,
  sendPasswordResetEmail, // Tambahkan import ini
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useAuth as useAuthContext } from '@/context/AuthContext';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useAuth() {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [checkingAdmin, setCheckingAdmin] = useState<boolean>(true);

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user?.uid) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setIsAdmin(userData.role === 'admin' || userData.isAdmin === true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setCheckingAdmin(false);
    };

    if (!loading) {
      checkAdminStatus();
    }
  }, [user, loading]);

  // Fungsi untuk login dengan username
  const login = async (username: string, password: string, rememberMe = false) => {
    try {
      // 1. Pertama, kita perlu mencari user berdasarkan username
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw { code: 'auth/user-not-found' };
      }

      // 2. Ambil data user termasuk emailnya
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      const email = userData.email;

      if (!email) {
        throw new Error('auth/user-not-found');
      }

      // 3. Gunakan email & password untuk login melalui Firebase Auth
      await firebaseSignIn(auth, email, password);

      // 4. Jika tidak ingin "remember me", set session persistence (opsional)
      if (!rememberMe) {
        // Implementasi untuk "don't remember me" jika diperlukan
        // Contoh: auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
      }

      return { success: true, userId: userDoc.id };
    } catch (error: any) {
      console.error('Login error:', error);

      // Handle error codes
      const errorCode = error.code || error.message;
      return {
        success: false,
        error: errorCode,
      };
    }
  };

  // Fungsi sign in original dengan email (sebagai backup)
  const signIn = async (email: string, password: string) => {
    try {
      await firebaseSignIn(auth, email, password);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to sign in',
      };
    }
  };

  // Fungsi untuk reset password
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error: any) {
      console.error('Reset password error:', error);
      throw error; // Re-throw error agar bisa dihandle di component
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      router.push('/auth/login');
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to sign out',
      };
    }
  };

  return {
    user,
    loading: loading || checkingAdmin,
    isAdmin,
    login, // Fungsi login baru dengan username
    signIn, // Tetap dipertahankan untuk backward compatibility
    signOut,
    resetPassword, // Tambahkan fungsi resetPassword
    isAuthenticated: !!user,
  };
}

// Hook untuk protected routes
export function useProtectedRoute() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  return {
    user,
    isChecking: loading,
    isAuthenticated: !!user,
  };
}
