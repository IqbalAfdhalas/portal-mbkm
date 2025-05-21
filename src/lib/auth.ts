// src/lib/auth.ts
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

/**
 * Get the redirect URL from query string
 * @param query The query parameters
 * @returns The redirect URL or '/'
 */
export const getRedirectUrl = (query: { redirect?: string }): string => {
  const { redirect } = query;
  // Validate redirect URL to prevent open redirects
  if (
    redirect &&
    typeof redirect === 'string' &&
    redirect.startsWith('/') &&
    !redirect.startsWith('//')
  ) {
    return redirect;
  }
  return '/';
};

/**
 * Check if the current user is authenticated client-side
 * Based on cookies existence
 */
export const isAuthenticated = () => {
  return !!getCookie('auth-session');
};

/**
 * Check if the current user is an admin client-side
 * Based on cookies existence
 */
export const isAdmin = () => {
  return !!getCookie('admin-session');
};

/**
 * Set authentication cookies after successful login
 * @param token Authentication token
 * @param isAdmin Whether user is admin
 * @param remember Whether to set long-term cookie
 */
export const setAuthCookies = (token: string, isAdmin: boolean, remember: boolean = false) => {
  const maxAge = remember ? 30 * 24 * 60 * 60 : undefined; // 30 days if remember is true

  setCookie('auth-session', token, {
    maxAge,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  if (isAdmin) {
    setCookie('admin-session', 'true', {
      maxAge,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
  }
};

/**
 * Clear authentication cookies
 */
export const clearAuthCookies = () => {
  deleteCookie('auth-session');
  deleteCookie('admin-session');
};
