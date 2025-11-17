// OAuth Callback Handler Component with Material Tailwind
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Spinner, Typography, Alert, Card } from "@material-tailwind/react";
import { useAuth } from "@/features/auth/hooks";

/**
 * Auth Callback Component using Material Tailwind
 *
 * Handles OAuth callback from providers (if using redirect flow)
 *
 * Note: With @react-oauth/google using implicit flow,
 * this component may not be needed as authentication
 * is handled directly in LoginButton. However, it's
 * kept for potential future use or if switching to
 * authorization code flow.
 *
 * Features:
 * - Extracts token/code from URL parameters
 * - Processes OAuth callback
 * - Redirects to dashboard on success
 * - Redirects to login on error
 * - Shows Material Design loading state during processing
 *
 * @example
 * ```tsx
 * <Route path="/auth/callback" element={<AuthCallback />} />
 * ```
 */
export function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [status, setStatus] = useState<"processing" | "success" | "error">(
    "processing"
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Extract token or code from URL parameters
        const token = searchParams.get("token");
        const code = searchParams.get("code");
        const errorParam = searchParams.get("error");

        // Check for OAuth error
        if (errorParam) {
          setError(
            searchParams.get("error_description") ||
              "Authentication failed. Please try again."
          );
          setStatus("error");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        // If using authorization code flow
        if (code) {
          // In a real implementation, you would exchange the code for a token
          // For now, we'll show an error as this requires backend support
          setError("Authorization code flow requires backend implementation");
          setStatus("error");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        // If using token directly (implicit flow)
        if (token) {
          await login(token);
          setStatus("success");
          setTimeout(() => navigate("/dashboard"), 1000);
          return;
        }

        // No token or code found
        setError("No authentication token found in callback");
        setStatus("error");
        setTimeout(() => navigate("/login"), 2000);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to process authentication"
        );
        setStatus("error");
        setTimeout(() => navigate("/login"), 2000);
      }
    };

    handleCallback();
  }, [searchParams, login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
      <Card className="p-8 max-w-md w-full mx-4" placeholder={undefined}>
        {status === "processing" && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Spinner className="h-12 w-12" color="blue" />
            </div>
            <Typography variant="h6" color="gray" placeholder={undefined}>
              Processing authentication...
            </Typography>
          </div>
        )}

        {status === "success" && (
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <Typography variant="h5" color="gray" placeholder={undefined}>
              Authentication successful!
            </Typography>
            <Typography
              variant="paragraph"
              color="gray"
              placeholder={undefined}
            >
              Redirecting to dashboard...
            </Typography>
          </div>
        )}

        {status === "error" && (
          <div className="text-center space-y-4">
            <Alert
              color="red"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              <Typography variant="h6" color="red" placeholder={undefined}>
                Authentication failed
              </Typography>
              {error && (
                <Typography
                  variant="small"
                  color="red"
                  className="mt-2"
                  placeholder={undefined}
                >
                  {error}
                </Typography>
              )}
            </Alert>
            <Typography
              variant="paragraph"
              color="gray"
              placeholder={undefined}
            >
              Redirecting to login page...
            </Typography>
          </div>
        )}
      </Card>
    </div>
  );
}
