/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import * as authService from "@/features/auth/services";
import type { User } from "@/features/auth/types";

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

      if (storedUser && token) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } catch {
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
