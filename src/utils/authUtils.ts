// src/utils/authUtils.ts
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { cookies } from 'next/headers';

/**
 * Sets authentication cookies after successful login
 */
export const setAuthCookies = async (token: string) => {
  // Secure cookie settings - adjust as needed for your environment
  const options = {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'strict' as const,
  };

  // ✅ DIPERBAIKI: Await cookies() untuk Next.js 15
  const cookieStore = await cookies();
  cookieStore.set('authToken', token, options);
};

/**
 * Removes authentication cookies on logout
 */
export const clearAuthCookies = async () => {
  // ✅ DIPERBAIKI: Await cookies() untuk Next.js 15
  const cookieStore = await cookies();
  cookieStore.delete('authToken');
};

/**
 * Gets authentication token from cookies
 */
export const getAuthTokenFromCookies = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken');
    return token?.value || null;
  } catch (error) {
    console.error('Error getting auth token from cookies:', error);
    return null;
  }
};

/**
 * Gets the current Firebase ID token
 * Can be used in combination with the middleware for server-side auth checking
 */
export const getFirebaseIdToken = async (): Promise<string | null> => {
  return new Promise(resolve => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      unsubscribe();
      if (user) {
        try {
          const token = await user.getIdToken();
          resolve(token);
        } catch (error) {
          console.error('Error getting Firebase ID token:', error);
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  });
};

/**
 * Checks if user is authenticated by checking both cookies and Firebase auth state
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    // Check cookie first (faster)
    const tokenFromCookie = await getAuthTokenFromCookies();
    if (!tokenFromCookie) {
      return false;
    }

    // Optionally verify with Firebase (more secure but slower)
    // const firebaseToken = await getFirebaseIdToken();
    // return !!firebaseToken;

    return true;
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
};
