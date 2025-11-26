import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "@/pages";
import { ProtectedRoute, ROUTES } from "@/routes";
import { AuthErrorPage, LoginPage } from "@/features/auth";
export function Router() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.AUTH_ERROR} element={<AuthErrorPage />} />

      {/* Protected Routes */}
      <Route
        path={ROUTES.HOME}
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  );
}
