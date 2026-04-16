import { Navigate } from "react-router";
import { tokenStorage } from "@/shared/utils/token-storage";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const hasToken = tokenStorage.hasToken();

  if (!hasToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
