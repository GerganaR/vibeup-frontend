import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute, ROUTES } from "@/routes";
import { AuthErrorPage, LoginPage } from "@/features/auth";
import UserLayout from "@/features/layout/pages/UserLayout";
import HomePage from "@/pages/HomePage";
import EventsPage from "@/features/event/pages/EventsPage";
import EventDetailPage from "@/features/event/pages/EventDetailPage";
import SettingsPage from "@/pages/SettingsPage";

export function Router() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.AUTH_ERROR} element={<AuthErrorPage />} />

      {/* Protected Routes with UserLayout */}
      <Route
        element={
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.EVENTS} element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  );
}
