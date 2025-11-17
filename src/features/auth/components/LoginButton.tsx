import { Button, Spinner, Alert } from "@material-tailwind/react";
import { useOAuth } from "@/features/auth/hooks";
import type { ReactNode } from "react";

interface LoginButtonProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Modern Google OAuth Login Button using Material Tailwind
 */
export function LoginButton({ className, children }: LoginButtonProps) {
  const { loginWithGoogle, isLoading, error } = useOAuth();

  return (
    <div className="w-full">
      <Button
        variant="outlined"
        color="blue-gray"
        size="lg"
        fullWidth
        onClick={() => loginWithGoogle()}
        disabled={isLoading}
        className={`flex items-center justify-center gap-3 ${className || ""}`}
        aria-label="Sign in with Google"
        placeholder={undefined}
      >
        {/* Loading Spinner */}
        {isLoading ? (
          <Spinner className="h-5 w-5" color="blue-gray" />
        ) : (
          /* Google Icon */
          <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        )}

        {/* Button Text */}
        <span>{children || "Continue with Google"}</span>
      </Button>

      {/* Error Message with Material Alert */}
      {error && (
        <Alert
          color="red"
          className="mt-3"
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
          {error}
        </Alert>
      )}
    </div>
  );
}
