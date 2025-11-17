import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "@/features/auth/types";

/**
 * Custom hook to access authentication context
 *
 * @returns {AuthContextType} The authentication context value
 * @throws {Error} If used outside of AuthProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user, isAuthenticated, login, logout } = useAuthContext();
 *   // Use auth state and functions
 * }
 * ```
 */
export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);

  // Throw error if hook is used outside AuthProvider
  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within an AuthProvider. " +
        "Make sure to wrap your component tree with <AuthProvider>."
    );
  }

  return context;
}
