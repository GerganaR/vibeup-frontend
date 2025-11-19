import { API_ENDPOINTS, STORAGE_KEYS } from "@/constants/auth";
import type { User } from "@/features/auth/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function getAuthToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
}

export function getStoredUser(): User | null {
  const userStr = localStorage.getItem(STORAGE_KEYS.USER);
  if (!userStr) return null;

  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
}

function saveAuthData(token: string, user: User, refreshToken?: string) {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  if (refreshToken) {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }
}

function clearAuthData() {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.OAUTH_STATE);
}

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options?.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    throw new Error(error.message || `Request failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Login with Google OAuth token
 * Sends token to backend and saves user data
 */
export async function loginWithGoogle(googleToken: string): Promise<User> {
  const data = await apiRequest<{
    token: string;
    user: User;
    refreshToken?: string;
  }>(API_ENDPOINTS.AUTH.OAUTH_CALLBACK, {
    method: "POST",
    body: JSON.stringify({ token: googleToken, provider: "google" }),
  });

  saveAuthData(data.token, data.user, data.refreshToken);
  return data.user;
}

/**
 * Get current user from backend
 */
export async function getCurrentUser(): Promise<User> {
  const user = await apiRequest<User>(API_ENDPOINTS.AUTH.USER);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  return user;
}

/**
 * Logout user - clears local data and notifies backend
 */
export async function logout(): Promise<void> {
  try {
    // Try to notify backend, but don't fail if it doesn't work
    await apiRequest(API_ENDPOINTS.AUTH.LOGOUT, { method: "POST" });
  } catch {
    // Ignore backend errors during logout
  } finally {
    clearAuthData();
  }
}
