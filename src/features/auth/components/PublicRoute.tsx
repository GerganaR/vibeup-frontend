// Public Route Component - Redirects authenticated users
import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks";
import { ROUTES } from "@/constants";
import type { ReactNode } from "react";

interface PublicRouteProps {
  children: ReactNode;
  /**
   * Optional redirect path if already authenticated
   * Defaults to DASHBOARD route
   */
  redirectTo?: string;
}

/**
 * Public Route Component
 *
 * Best Practice: Use this for routes that should only be accessible
 * when the user is NOT authenticated (e.g., login, register pages)
 */
export function PublicRoute({ children, redirectTo }: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Don't redirect while loading to avoid flash
  if (isLoading) {
    return <>{children}</>;
  }

  // Redirect authenticated users away from public routes
  if (isAuthenticated) {
    return <Navigate to={redirectTo || ROUTES.DASHBOARD} replace />;
  }

  // Render public content for unauthenticated users
  return <>{children}</>;
}
