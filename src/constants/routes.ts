/**
 * Application route constants
 * Centralized route definitions for maintainability and type safety
 */
export const ROUTES = {
  // Public routes
  HOME: "/",
  LOGIN: "/login",
  AUTH_CALLBACK: "/auth/callback",

  // Protected routes
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  SETTINGS: "/settings",
} as const;

/**
 * Type for route paths
 */
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

/**
 * Helper function to build route with query params
 */
export function buildRoute(
  path: RoutePath,
  params?: Record<string, string>
): string {
  if (!params) return path;

  const queryString = new URLSearchParams(params).toString();
  return `${path}${queryString ? `?${queryString}` : ""}`;
}

/**
 * Helper function to get return URL for redirects
 */
export function getReturnUrl(currentPath: string): string {
  return encodeURIComponent(currentPath);
}

