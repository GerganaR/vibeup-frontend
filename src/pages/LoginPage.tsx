// Modern Login page component
import { LoginButton } from "@/features/auth";
import { useAuth } from "@/features/auth";
import { Card, Typography, Alert } from "@material-tailwind/react";

export default function LoginPage() {
  const { error } = useAuth();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-linear-to-br from-indigo-50 via-white to-purple-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-8">
        {/* Logo/Brand Section */}
        <div className="text-center w-full">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg mb-6 transform hover:scale-105 transition-transform">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <Typography
            variant="h2"
            className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3"
            placeholder={undefined}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="paragraph"
            className="text-gray-600 text-base"
            placeholder={undefined}
          >
            Sign in to continue to your account
          </Typography>
        </div>

        {/* Login Card */}
        <Card
          className="w-full p-10 shadow-2xl border border-gray-100 backdrop-blur-sm bg-white/90"
          placeholder={undefined}
        >
          {error && (
            <Alert
              color="red"
              className="mb-8"
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

          <div className="space-y-8 w-full">
            <div className="w-full">
              <LoginButton className="group relative w-full flex items-center justify-center px-6 py-4 bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300 transform hover:scale-[1.02]">
                <svg
                  className="w-6 h-6 mr-3 transition-transform group-hover:scale-110 shrink-0"
                  viewBox="0 0 24 24"
                >
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
                <span className="text-gray-700 font-semibold text-base whitespace-nowrap">
                  Continue with Google
                </span>
              </LoginButton>
            </div>

            {/* Divider */}
            <div className="relative my-8 w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Secure authentication
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-100 w-full">
              <div className="text-center flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-3">
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <Typography
                  variant="small"
                  className="text-gray-600 font-medium"
                  placeholder={undefined}
                >
                  Secure
                </Typography>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-3">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <Typography
                  variant="small"
                  className="text-gray-600 font-medium"
                  placeholder={undefined}
                >
                  Fast
                </Typography>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-100 rounded-lg mb-3">
                  <svg
                    className="w-5 h-5 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <Typography
                  variant="small"
                  className="text-gray-600 font-medium"
                  placeholder={undefined}
                >
                  Safe
                </Typography>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-10 text-center w-full">
          <Typography
            variant="small"
            className="text-gray-500 text-sm"
            placeholder={undefined}
          >
            By signing in, you agree to our{" "}
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              Privacy Policy
            </a>
          </Typography>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
