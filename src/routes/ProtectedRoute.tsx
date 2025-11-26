import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import { ROUTES } from ".";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? children : <Navigate to={ROUTES.LOGIN} replace />;
}
