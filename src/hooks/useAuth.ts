// src/hooks/useAuth.ts
import { useContext } from 'react';
import {
  signOut as firebaseSignOut,
  signInWithEmailAndPassword as firebaseSignIn,
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
    loading,
    login, // Fungsi login baru dengan username
    signIn, // Tetap dipertahankan untuk backward compatibility
    signOut,
    isAuthenticated: !!user,
  };
}
