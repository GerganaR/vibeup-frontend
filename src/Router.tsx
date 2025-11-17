import { Routes, Route, Navigate } from "react-router-dom";
import { AuthCallback, PublicRoute } from "@/features/auth";
import { ROUTES } from "@/constants";
import LoginPage from "./pages/LoginPage";

/**
 * Router component that defines all application routes
 * Route Structure:
 * - Public Routes: Accessible to all users
 *   - "/" - Redirects based on auth status
 *   - "/login" - Login page (redirects if already authenticated)
 *   - "/auth/callback" - OAuth callback handler
 *
 * - Protected Routes: Require authentication
 *   - "/dashboard" - Main dashboard (example)
 *   - Add more protected routes as needed
 */
export function Router() {
  return (
    <Routes>
      {/* Root route - redirects to login for now */}
      <Route
        path={ROUTES.HOME}
        element={<Navigate to={ROUTES.LOGIN} replace />}
      />

      {/* Public Routes */}
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route path={ROUTES.AUTH_CALLBACK} element={<AuthCallback />} />

      {/* Protected Routes */}
      {/* Uncomment when DashboardPage is created */}
      {/* <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      /> */}

      {/* Catch-all route - 404 handler */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}
