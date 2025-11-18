export const OAUTH_PROVIDERS = {
  GOOGLE: "google",
} as const;

export type OAuthProviderType =
  (typeof OAUTH_PROVIDERS)[keyof typeof OAUTH_PROVIDERS];

// OAuth endpoints (configure based on your backend)
export const OAUTH_ENDPOINTS = {
  GOOGLE: {
    AUTH_URL: "https://accounts.google.com/o/oauth2/v2/auth",
    TOKEN_URL: "https://oauth2.googleapis.com/token",
    USER_INFO_URL: "https://www.googleapis.com/oauth2/v2/userinfo",
  },
} as const;

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
  OAUTH_STATE: "oauth_state",
} as const;

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    OAUTH_CALLBACK: "/auth/oauth/callback",
    USER: "/auth/user",
  },
} as const;

// OAuth scopes
export const OAUTH_SCOPES = {
  GOOGLE: "openid email profile",
} as const;
