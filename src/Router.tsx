import { Routes, Route, Navigate } from "react-router-dom";
import { AuthCallback, ProtectedRoute, PublicRoute } from "@/features/auth";
import { ROUTES } from "@/constants";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

/**
 * Router component that defines all application routes
 * Route Structure:
 * - "/" - Home (Dashboard if logged in, redirects to login if not)
 * - "/login" - Login page (redirects to home if already authenticated)
 * - "/auth/callback" - OAuth callback handler
 * - "/dashboard" - Alternative dashboard route
 */
export function Router() {
  return (
    <Routes>
      {/* Home route - Shows dashboard when logged in */}
      <Route
        path={ROUTES.HOME}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
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
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route - 404 handler */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}
