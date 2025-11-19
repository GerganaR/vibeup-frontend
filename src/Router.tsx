import { Routes, Route, Navigate } from "react-router-dom";
import { AuthCallback, ProtectedRoute, PublicRoute } from "@/features/auth";
import { ROUTES } from "@/constants";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

export function Router() {
  return (
    <Routes>
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
        path={ROUTES.HOME}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}
