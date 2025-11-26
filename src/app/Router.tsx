import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute, ROUTES } from "@/routes";
import { AuthErrorPage, LoginPage } from "@/features/auth";
import UserLayout from "@/features/layout/pages/UserLayout";
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
            <UserLayout />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  );
}
