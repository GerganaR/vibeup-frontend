import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage, LoginPage } from "@/pages";
import { ProtectedRoute, ROUTES } from "@/routes";

export function Router() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
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
