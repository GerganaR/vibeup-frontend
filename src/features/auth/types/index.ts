// Authentication types and interfaces

/**
 * User interface representing an authenticated user
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: OAuthProvider;
}

/**
 * OAuth provider type - currently only Google is supported
 */
export type OAuthProvider = "google";

/**
 * Authentication state interface
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Authentication context type for React Context
 */
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

/**
 * Login credentials for future email/password authentication
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Authentication error interface
 */
export interface AuthError {
  message: string;
  code?: string;
  status?: number;
}
