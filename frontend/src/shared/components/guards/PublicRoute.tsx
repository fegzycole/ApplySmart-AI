import { Navigate } from "react-router";
import { tokenStorage } from "@/shared/utils/token-storage";

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const hasToken = tokenStorage.hasToken();

  if (hasToken) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
}
