// Main authentication hook
import { useAuthContext } from "@/context/useAuthContext";
import type { AuthContextType } from "@/features/auth/types";

/**
 * Main authentication hook that wraps useAuthContext
 * Provides a clean interface for accessing auth state and functions
 *
 * @returns {AuthContextType} Authentication state and functions
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user, isAuthenticated, isLoading, error, login, logout, refreshUser } = useAuth();
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *   if (!isAuthenticated) return <div>Please login</div>;
 *
 *   return <div>Welcome, {user?.name}!</div>;
 * }
 * ```
 */
export function useAuth(): AuthContextType {
  return useAuthContext();
}
