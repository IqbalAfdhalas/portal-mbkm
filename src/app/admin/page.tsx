// src/app/admin/page.tsx
import { useProtectedRoute } from "@/hooks/useAuth";

const AdminPage = () => {
  const { isChecking } = useProtectedRoute({ adminOnly: true });

  if (isChecking) return <p>Loading...</p>;

  return <div>Halaman Admin</div>;
};
