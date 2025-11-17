// Authentication constants and configuration

export const OAUTH_PROVIDERS = {
  GOOGLE: "google",
  GITHUB: "github",
  MICROSOFT: "microsoft",
  APPLE: "apple",
} as const;

export type OAuthProviderType = (typeof OAUTH_PROVIDERS)[keyof typeof OAUTH_PROVIDERS];

// OAuth endpoints (configure based on your backend)
export const OAUTH_ENDPOINTS = {
  GOOGLE: {
    AUTH_URL: "https://accounts.google.com/o/oauth2/v2/auth",
    TOKEN_URL: "https://oauth2.googleapis.com/token",
    USER_INFO_URL: "https://www.googleapis.com/oauth2/v2/userinfo",
  },
  GITHUB: {
    AUTH_URL: "https://github.com/login/oauth/authorize",
    TOKEN_URL: "https://github.com/login/oauth/access_token",
    USER_INFO_URL: "https://api.github.com/user",
  },
  MICROSOFT: {
    AUTH_URL: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    TOKEN_URL: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    USER_INFO_URL: "https://graph.microsoft.com/v1.0/me",
  },
} as const;

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
  OAUTH_STATE: "oauth_state",
} as const;

// API endpoints (update with your backend URL)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    REFRESH: "/api/auth/refresh",
    OAUTH_CALLBACK: "/api/auth/oauth/callback",
    USER: "/api/auth/user",
  },
} as const;

// OAuth scopes
export const OAUTH_SCOPES = {
  GOOGLE: "openid email profile",
  GITHUB: "user:email",
  MICROSOFT: "openid email profile",
} as const;

