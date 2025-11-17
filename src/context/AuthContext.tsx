/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { authService } from "@/features/auth/services";
import type { AuthContextType, User } from "@/features/auth/types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider component that manages authentication state
 * - Initializes state from localStorage on mount
 * - Provides login, logout, refreshUser functions
 * - Handles token refresh logic
 * - Persists auth state to localStorage
 * - Handles errors and loading states
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    return authService.getStoredUser();
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  /**
   * Initialize auth state on mount
   * Validates existing token and loads user data
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const token = authService.getAuthToken();
        if (token) {
          const isValid = await authService.validateToken();
          if (isValid) {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
        setError(
          err instanceof Error ? err.message : "Failed to initialize auth"
        );
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login function - handles Google OAuth token
   * Sends token to backend and updates state
   */
  const login = useCallback(async (token: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const userData = await authService.loginWithGoogle(token);

      setUser(userData);
    } catch (err) {
      setUser(null);
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout function - clears auth state and tokens
   */
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      await authService.logout();

      setUser(null);
    } catch (err) {
      setUser(null);
      const errorMessage = err instanceof Error ? err.message : "Logout failed";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Refresh user data from API
   * Useful when user data might have changed on the backend
   */
  const refreshUser = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const userData = await authService.getCurrentUser();

      setUser(userData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to refresh user";
      setError(errorMessage);

      try {
        await authService.refreshToken();
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (refreshError) {
        setUser(null);
        throw refreshError;
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Auto-refresh token logic
   * Periodically checks and refreshes token before expiration
   */
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const tokenCheckInterval = setInterval(async () => {
      try {
        const isValid = await authService.validateToken();
        if (!isValid) {
          try {
            await authService.refreshToken();
            await refreshUser();
          } catch {
            await logout();
          }
        }
      } catch {
        await logout();
      }
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(tokenCheckInterval);
    };
  }, [isAuthenticated, refreshUser, logout]);

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
