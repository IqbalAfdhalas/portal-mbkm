'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// User type dengan tambahan custom fields
export interface User extends FirebaseUser {
  isAdmin?: boolean;
  role?: string;
  customMetadata?: {
    lastLogin?: string;
    createdAt?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
  isAdmin: boolean;
}

/**
 * Set the persistence for Firebase Authentication
 * @param remember Whether to remember the user or not
 */
const setAuthPersistence = async (remember: boolean) => {
  const persistenceType = remember ? browserLocalPersistence : browserSessionPersistence;
  return setPersistence(auth, persistenceType);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Fungsi untuk mendapatkan data user tambahan dari Firestore
  const getUserAdditionalData = async (uid: string) => {
    try {
      console.log('Fetching user data for:', uid);
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        console.log('User data found:', userDoc.data());
        return userDoc.data();
      }
      console.log('No user data found in Firestore');
      return null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  // Observer untuk auth state changes
  useEffect(() => {
    console.log('Setting up auth state observer');
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      console.log('Auth state changed:', currentUser?.email);

      if (currentUser) {
        try {
          // Ambil data tambahan user dari Firestore
          const additionalData = await getUserAdditionalData(currentUser.uid);
          console.log('Additional data:', additionalData);

          // If role is "admin", set isAdmin to true
          const userIsAdmin = additionalData?.isAdmin || additionalData?.role === 'admin';

          // Gabungkan data Firebase Auth dengan data Firestore
          const enhancedUser = {
            ...currentUser,
            isAdmin: userIsAdmin,
            role: additionalData?.role || 'user',
            metadata: {
              ...additionalData?.metadata,
              lastLogin: new Date().toISOString(),
            },
          } as User;

          console.log('Enhanced user:', enhancedUser);
          setUser(enhancedUser);
          setIsAdmin(userIsAdmin);

          // Update last login
          const userRef = doc(db, 'users', currentUser.uid);
          await setDoc(
            userRef,
            {
              metadata: {
                lastLogin: new Date().toISOString(),
              },
            },
            { merge: true }
          );
        } catch (error) {
          console.error('Error enhancing user:', error);
          setUser(currentUser as User);
          setIsAdmin(false);
        }
      } else {
        console.log('No user logged in');
        setUser(null);
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => {
      console.log('Cleaning up auth observer');
      unsubscribe();
    };
  }, []);

  // Login dengan email dan password
  const login = async (email: string, password: string, remember: boolean = false) => {
    console.log('Login attempt with email:', email);
    setLoading(true);
    try {
      // Set persistence berdasarkan remember me
      await setAuthPersistence(remember);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful for:', userCredential.user.email);

      // Don't need to manually set the user here as the auth state observer will handle it
      return userCredential;
    } catch (error: any) {
      console.error('Login error:', error);

      // Pesan error yang user-friendly
      const errorMessages: Record<string, string> = {
        'auth/user-not-found': 'Email atau password salah',
        'auth/wrong-password': 'Email atau password salah',
        'auth/invalid-credential': 'Email atau password salah',
        'auth/too-many-requests': 'Terlalu banyak percobaan. Coba lagi nanti',
        'auth/user-disabled': 'Akun ini telah dinonaktifkan',
        'auth/network-request-failed': 'Masalah koneksi internet. Silakan periksa koneksi Anda',
      };

      const errorMessage = errorMessages[error.code] || 'Gagal login. Silakan coba lagi';
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register user baru
  const register = async (email: string, password: string, displayName: string) => {
    setLoading(true);
    try {
      // Buat user di Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update profile dengan displayName
      await updateProfile(userCredential.user, { displayName });

      // Tambahkan data tambahan ke Firestore
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, {
        email,
        displayName,
        role: 'user',
        isAdmin: false,
        metadata: {
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        },
      });
    } catch (error: any) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Reset password error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (data: { displayName?: string; photoURL?: string }) => {
    if (!auth.currentUser) {
      throw new Error('No authenticated user');
    }

    setLoading(true);
    try {
      await updateProfile(auth.currentUser, data);

      // Update juga di Firestore
      if (auth.currentUser.uid) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await setDoc(userRef, data, { merge: true });
      }

      // Update local state
      if (user) {
        setUser({
          ...user,
          displayName: data.displayName || user.displayName,
          photoURL: data.photoURL || user.photoURL,
        });
      }
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        resetPassword,
        updateUserProfile,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk menggunakan Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
