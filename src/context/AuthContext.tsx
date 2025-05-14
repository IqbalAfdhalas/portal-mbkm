//src/context/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, setAuthPersistence } from "@/lib/firebase";
import toast from "react-hot-toast";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

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
  register: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: {
    displayName?: string;
    photoURL?: string;
  }) => Promise<void>;
  isAdmin: boolean;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Fungsi untuk mendapatkan data user tambahan dari Firestore
  const getUserAdditionalData = async (uid: string) => {
    try {
      const userRef = doc(db, "users", uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        return userDoc.data();
      }
      return null;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  // Observer untuk auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("🔥 [Auth] Current user:", currentUser);
      if (currentUser) {
        try {
          // Ambil data tambahan user dari Firestore
          const additionalData = await getUserAdditionalData(currentUser.uid);

          // Gabungkan data Firebase Auth dengan data Firestore
          const enhancedUser = {
            ...currentUser,
            isAdmin: additionalData?.isAdmin || false,
            role: additionalData?.role || "user",
            metadata: {
              ...additionalData?.metadata,
              lastLogin: new Date().toISOString(),
            },
          } as User;

          setUser(enhancedUser);
          setIsAdmin(enhancedUser.isAdmin || false);

          // Update last login
          const userRef = doc(db, "users", currentUser.uid);
          await setDoc(
            userRef,
            {
              metadata: {
                lastLogin: new Date().toISOString(),
              },
            },
            { merge: true },
          );
        } catch (error) {
          console.error("Error enhancing user:", error);
          setUser(currentUser as User);
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login dengan email dan password
  const login = async (
    email: string,
    password: string,
    remember: boolean = false,
  ) => {
    setLoading(true);
    try {
      // Set persistence berdasarkan remember me
      await setAuthPersistence(remember);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login berhasil!");
    } catch (error: any) {
      console.error("Login error:", error);

      // Pesan error yang lebih user-friendly
      let errorMessage = "Gagal masuk. Silakan coba lagi.";
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        errorMessage = "Email atau password tidak valid.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Terlalu banyak percobaan. Coba lagi nanti.";
      } else if (error.code === "auth/user-disabled") {
        errorMessage = "Akun ini telah dinonaktifkan.";
      }

      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register user baru
  const register = async (
    email: string,
    password: string,
    displayName: string,
  ) => {
    setLoading(true);
    try {
      // Buat user di Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      // Update profile dengan displayName
      await updateProfile(userCredential.user, { displayName });

      // Tambahkan data tambahan ke Firestore
      const userRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userRef, {
        email,
        displayName,
        role: "user",
        isAdmin: false,
        metadata: {
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        },
      });

      toast.success("Registrasi berhasil!");
    } catch (error: any) {
      console.error("Register error:", error);

      // Pesan error yang lebih user-friendly
      let errorMessage = "Registrasi gagal. Silakan coba lagi.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email sudah digunakan. Silakan gunakan email lain.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password terlalu lemah. Gunakan minimal 6 karakter.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Format email tidak valid.";
      }

      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout berhasil!");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error("Gagal logout. Silakan coba lagi.");
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Email reset password telah dikirim!");
    } catch (error: any) {
      console.error("Reset password error:", error);

      let errorMessage = "Gagal mengirim email reset. Silakan coba lagi.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "Email tidak terdaftar dalam sistem.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Format email tidak valid.";
      }

      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (data: {
    displayName?: string;
    photoURL?: string;
  }) => {
    if (!auth.currentUser) {
      toast.error("Tidak ada user yang login.");
      throw new Error("No authenticated user");
    }

    setLoading(true);
    try {
      await updateProfile(auth.currentUser, data);

      // Update juga di Firestore
      if (auth.currentUser.uid) {
        const userRef = doc(db, "users", auth.currentUser.uid);
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

      toast.success("Profil berhasil diperbarui!");
    } catch (error: any) {
      console.error("Update profile error:", error);
      toast.error("Gagal memperbarui profil. Silakan coba lagi.");
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
