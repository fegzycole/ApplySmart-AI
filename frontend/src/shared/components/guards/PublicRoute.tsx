import { Navigate } from "react-router";
import { tokenStorage } from "@/shared/utils/token-storage";

interface PublicRouteProps {
  children: React.ReactNode;
}

/**
 * Public routes that redirect to dashboard if user is already authenticated
 * (e.g., login, signup, landing pages)
 */
export function PublicRoute({ children }: PublicRouteProps) {
  const hasToken = tokenStorage.hasToken();

  if (hasToken) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
}
