import { Navigate, useLocation } from "react-router-dom";
import { Spinner, Typography } from "@material-tailwind/react";
import { useAuth } from "@/features/auth/hooks";
import { ROUTES, getReturnUrl } from "@/constants";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  /**
   * Optional redirect path if not authenticated
   * Defaults to LOGIN route with return URL
   */
  redirectTo?: string;
}

/**
 * Protected Route Component
 * Checks if the user is authenticated and redirects to the login page if not
 */
export function ProtectedRoute({ children, redirectTo }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Spinner className="h-12 w-12" color="blue" />
          </div>
          <Typography
            variant="paragraph"
            color="gray"
            className="font-medium animate-pulse"
            placeholder={undefined}
          >
            Checking authentication...
          </Typography>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    const returnUrl = getReturnUrl(location.pathname + location.search);
    const loginPath = redirectTo || ROUTES.LOGIN;
    const redirectPath = `${loginPath}?returnUrl=${returnUrl}`;

    return <Navigate to={redirectPath} replace />;
  }

  // Render protected content if authenticated
  return <>{children}</>;
}
