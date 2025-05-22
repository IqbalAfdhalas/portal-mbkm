// src/app/protected-page/page.tsx
import { useProtectedRoute } from "@/hooks/useAuth";

const ProtectedPage = () => {
  const { isChecking } = useProtectedRoute();

  if (isChecking) return <p>Loading...</p>;

  return <div>Halaman yang dilindungi</div>;
};
