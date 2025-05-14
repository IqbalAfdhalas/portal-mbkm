// src/components/auth/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LoadingScreen from "@/components/ui/LoadingScreen";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

/**
 * ProtectedRoute component ensures that the user is authenticated
 * before rendering its children components.
 *
 * @param children - The components to render if user is authenticated
 * @param requireAdmin - Whether the route requires admin privileges
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Wait for auth to initialize before checking
    if (!loading) {
      if (!user) {
        // User not logged in, redirect to login
        router.push(
          "/auth/login?redirect=" +
            encodeURIComponent(window.location.pathname),
        );
      } else if (requireAdmin && !isAdmin) {
        // User logged in but not admin, redirect to home
        router.push("/unauthorized");
      } else {
        // User is authenticated (and is admin if required)
        setIsChecking(false);
      }
    }
  }, [user, loading, isAdmin, requireAdmin, router]);

  // Show loading screen while checking authentication
  if (loading || isChecking) {
    return <LoadingScreen />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
