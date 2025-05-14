// src/lib/auth.ts
import { auth } from "./firebase";
import {
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

/**
 * Set the persistence for Firebase Authentication
 * @param remember Whether to remember the user or not
 */
export const setAuthPersistence = async (remember: boolean) => {
  const persistenceType = remember
    ? browserLocalPersistence
    : browserSessionPersistence;

  return setPersistence(auth, persistenceType);
};

/**
 * Sign in a user and set necessary cookies
 * @param email User email
 * @param password User password
 * @param remember Whether to remember the user
 */
export const signIn = async (
  email: string,
  password: string,
  remember: boolean = false,
) => {
  await setAuthPersistence(remember);
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );

  // Get ID token to store in cookie
  const token = await userCredential.user.getIdToken();

  // Set auth cookie with appropriate options
  setCookie("auth-session", token, {
    maxAge: remember ? 30 * 24 * 60 * 60 : undefined, // 30 days if remember is true
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  // Check if user is admin and set admin cookie if needed
  const idTokenResult = await userCredential.user.getIdTokenResult();
  if (idTokenResult.claims.admin) {
    setCookie("admin-session", "true", {
      maxAge: remember ? 30 * 24 * 60 * 60 : undefined,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return userCredential;
};

/**
 * Sign out a user and clear cookies
 */
export const signOut = async () => {
  await firebaseSignOut(auth);

  // Clear auth cookies
  deleteCookie("auth-session");
  deleteCookie("admin-session");
};

/**
 * Check if the current user is authenticated
 */
export const isAuthenticated = () => {
  return !!getCookie("auth-session");
};

/**
 * Check if the current user is an admin
 */
export const isAdmin = () => {
  return !!getCookie("admin-session");
};

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
    typeof redirect === "string" &&
    redirect.startsWith("/") &&
    !redirect.startsWith("//")
  ) {
    return redirect;
  }
  return "/";
};
