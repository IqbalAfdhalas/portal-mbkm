//src/hooks/useAuthGuard.ts
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

interface ProtectedRouteOptions {
  redirectTo?: string;
  adminOnly?: boolean;
}

export const useProtectedRoute = (
  options: ProtectedRouteOptions = {
    redirectTo: "/auth/login",
    adminOnly: false,
  },
) => {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (loading) return;

    const checkAuth = async () => {
      if (!user) {
        sessionStorage.setItem("redirectAfterLogin", pathname || "");
        await router.replace(options.redirectTo || "/auth/login");
      } else if (options.adminOnly && !isAdmin) {
        await router.replace("/");
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [
    user,
    loading,
    isAdmin,
    router,
    pathname,
    options.redirectTo,
    options.adminOnly,
  ]);

  return { isChecking: loading || isChecking };
};

export const useRedirectAuthenticated = (redirectTo: string = "/") => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (loading) return;

    const checkAuth = async () => {
      if (user) {
        const savedRedirect = sessionStorage.getItem("redirectAfterLogin");
        if (savedRedirect) {
          sessionStorage.removeItem("redirectAfterLogin");
          await router.replace(savedRedirect);
        } else {
          await router.replace(redirectTo);
        }
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [user, loading, router, redirectTo]);

  return { isChecking: loading || isChecking };
};
