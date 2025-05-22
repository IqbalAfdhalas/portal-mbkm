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

  // Set cookies
  cookies().set('authToken', token, options);
};

/**
 * Removes authentication cookies on logout
 */
export const clearAuthCookies = () => {
  cookies().delete('authToken');
};

/**
 * Gets the current Firebase ID token
 * Can be used in combination with the middleware for server-side auth checking
 */
export const getFirebaseIdToken = async () => {
  return new Promise(resolve => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      unsubscribe();
      if (user) {
        const token = await user.getIdToken();
        resolve(token);
      } else {
        resolve(null);
      }
    });
  });
};
