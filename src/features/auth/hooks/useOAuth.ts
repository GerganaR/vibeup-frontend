// Google OAuth hook
import { useCallback, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "./useAuth";

/**
 * Hook for Google OAuth-specific logic
 * Integrates @react-oauth/google with the auth context
 *
 * @returns Object with login function and loading state
 *
 * @example
 * ```tsx
 * function LoginButton() {
 *   const { loginWithGoogle, isLoading } = useOAuth();
 *
 *   return (
 *     <button onClick={loginWithGoogle} disabled={isLoading}>
 *       {isLoading ? "Loading..." : "Login with Google"}
 *     </button>
 *   );
 * }
 * ```
 */
export function useOAuth() {
  const { login, isLoading, error } = useAuth();
  const [oauthError, setOAuthError] = useState<string | null>(null);

  /**
   * Handle successful Google OAuth login
   * Receives the Google access token and sends it to our backend
   */
  const handleGoogleSuccess = useCallback(
    async (tokenResponse: { access_token: string }) => {
      try {
        setOAuthError(null); // Clear any previous errors
        // Send Google token to our backend via auth context
        await login(tokenResponse.access_token);
      } catch (err) {
        // Error is already handled by auth context
        console.error("Failed to complete Google login:", err);
      }
    },
    [login]
  );

  /**
   * Handle Google OAuth error
   */
  const handleGoogleError = useCallback(
    (errorResponse: {
      error?: string;
      error_description?: string;
      error_uri?: string;
    }) => {
      console.error("Google OAuth error:", errorResponse);

      // Provide helpful error messages
      let errorMessage = "Authentication failed. Please try again.";

      if (errorResponse.error === "invalid_client") {
        errorMessage =
          "Invalid Google Client ID. Please check your .env file and Google Cloud Console configuration. " +
          "Make sure VITE_GOOGLE_CLIENT_ID is set correctly and authorized JavaScript origins include your domain.";
        console.error(
          "❌ Invalid Google Client ID. Please check:",
          "\n1. VITE_GOOGLE_CLIENT_ID is set in your .env file",
          "\n2. The Client ID is correct in Google Cloud Console",
          "\n3. The OAuth consent screen is configured",
          "\n4. Authorized JavaScript origins include your domain (e.g., http://localhost:5173)"
        );
      } else if (errorResponse.error_description) {
        errorMessage = errorResponse.error_description;
      } else if (errorResponse.error) {
        errorMessage = `Authentication error: ${errorResponse.error}`;
      }

      setOAuthError(errorMessage);
    },
    []
  );

  /**
   * Trigger Google OAuth login flow
   * Uses useGoogleLogin hook from @react-oauth/google
   * Uses implicit flow which provides access token directly
   */
  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
    // Implicit flow: provides access_token directly
    // Alternative: use flow: "auth-code" if backend expects authorization code
  });

  return {
    /**
     * Function to trigger Google OAuth login
     * Call this when user clicks "Login with Google" button
     */
    loginWithGoogle,
    /**
     * Loading state from auth context
     */
    isLoading,
    /**
     * Error state - combines OAuth errors and auth context errors
     */
    error: oauthError || error,
  };
}
