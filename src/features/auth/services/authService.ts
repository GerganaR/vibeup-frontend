// Authentication service for handling auth operations
import { apiClient } from "@/services/api/apiClient";
import { API_ENDPOINTS, STORAGE_KEYS } from "@/constants/auth";
import type { User, AuthError } from "@/features/auth/types";

/**
 * Response type for OAuth callback
 */
interface OAuthCallbackResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

/**
 * Response type for refresh token
 */
interface RefreshTokenResponse {
  token: string;
  refreshToken?: string;
}

/**
 * Authentication service class
 */
class AuthService {
  /**
   * Login with Google OAuth token
   * Sends the Google token to the backend and receives application tokens
   */
  async loginWithGoogle(token: string): Promise<User> {
    try {
      const response = await apiClient.post<OAuthCallbackResponse>(
        API_ENDPOINTS.AUTH.OAUTH_CALLBACK,
        { token, provider: "google" }
      );

      // Store tokens in localStorage
      if (response.data.token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
      }
      if (response.data.refreshToken) {
        localStorage.setItem(
          STORAGE_KEYS.REFRESH_TOKEN,
          response.data.refreshToken
        );
      }

      // Store user data
      if (response.data.user) {
        localStorage.setItem(
          STORAGE_KEYS.USER,
          JSON.stringify(response.data.user)
        );
      }

      return response.data.user;
    } catch (error) {
      const authError: AuthError = {
        message:
          error instanceof Error
            ? error.message
            : "Failed to login with Google",
        status: 500,
      };
      throw authError;
    }
  }

  /**
   * Handle Google OAuth callback with token
   * Alias for loginWithGoogle for consistency
   */
  async handleGoogleCallback(token: string): Promise<User> {
    return this.loginWithGoogle(token);
  }

  /**
   * Logout - clear all tokens and user data
   */
  async logout(): Promise<void> {
    try {
      // Call backend logout endpoint if token exists
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        try {
          await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
        } catch (error) {
          // Continue with local logout even if backend call fails
          console.warn("Backend logout failed, clearing local storage:", error);
        }
      }
    } catch (error) {
      // Continue with local logout even if there's an error
      console.warn("Logout error:", error);
    } finally {
      // Always clear local storage
      this.clearLocalStorage();
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(): Promise<string> {
    try {
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await apiClient.post<RefreshTokenResponse>(
        API_ENDPOINTS.AUTH.REFRESH,
        { refreshToken }
      );

      // Update stored tokens
      if (response.data.token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
      }
      if (response.data.refreshToken) {
        localStorage.setItem(
          STORAGE_KEYS.REFRESH_TOKEN,
          response.data.refreshToken
        );
      }

      return response.data.token;
    } catch (error) {
      // If refresh fails, clear storage and throw error
      this.clearLocalStorage();
      const authError: AuthError = {
        message:
          error instanceof Error ? error.message : "Failed to refresh token",
        status: 401,
      };
      throw authError;
    }
  }

  /**
   * Get current user from API endpoint
   */
  async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.USER);

      // Update stored user data
      if (response.data) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      const authError: AuthError = {
        message:
          error instanceof Error ? error.message : "Failed to get current user",
        status: 401,
      };
      throw authError;
    }
  }

  /**
   * Validate token by checking if it exists and is not expired
   * Optionally makes a request to validate with backend
   */
  async validateToken(): Promise<boolean> {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

      if (!token) {
        return false;
      }

      // Try to get current user to validate token
      await this.getCurrentUser();
      return true;
    } catch {
      // Token is invalid, clear storage
      this.clearLocalStorage();
      return false;
    }
  }

  /**
   * Get stored auth token from localStorage
   */
  getAuthToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  /**
   * Get stored refresh token from localStorage
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Get stored user from localStorage
   */
  getStoredUser(): User | null {
    try {
      const userStr = localStorage.getItem(STORAGE_KEYS.USER);
      if (!userStr) {
        return null;
      }
      return JSON.parse(userStr) as User;
    } catch (error) {
      console.error("Failed to parse stored user:", error);
      return null;
    }
  }

  /**
   * Clear all auth-related data from localStorage
   */
  private clearLocalStorage(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.OAUTH_STATE);
  }
}

// Export singleton instance
export const authService = new AuthService();
