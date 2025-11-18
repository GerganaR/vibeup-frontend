/* eslint-disable react-refresh/only-export-components */
/**
 * Simple AuthContext - manages authentication state
 * No complex auto-refresh or nested error handling
 */
import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import * as authService from "@/features/auth/services";
import type { User } from "@/features/auth/types";

// Define what the auth context provides
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (googleToken: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider - wraps your app to provide auth state
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = user !== null;

  // On startup, check if user is already logged in
  useEffect(() => {
    async function checkAuth() {
      const storedUser = authService.getStoredUser();
      const token = authService.getAuthToken();

      // If we have both stored user and token, verify with backend
      if (storedUser && token) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } catch {
          // Token invalid, clear everything
          setUser(null);
        }
      }

      setIsLoading(false);
    }

    checkAuth();
  }, []);

  // Login with Google token
  async function login(googleToken: string) {
    try {
      setIsLoading(true);
      setError(null);

      const userData = await authService.loginWithGoogle(googleToken);
      setUser(userData);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  // Logout
  async function logout() {
    try {
      setIsLoading(true);
      await authService.logout();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Logout failed";
      setError(message);
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  }

  // Refresh user data from server
  async function refreshUser() {
    try {
      setIsLoading(true);
      setError(null);

      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to refresh user";
      setError(message);
      setUser(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
