import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROUTES } from "@/routes";
import { useAppDispatch } from "@/store/hooks";
import { fetchCurrentUser } from "@/features/user/store/userThunk";
import {
  CalendarDaysIcon,
  SparklesIcon,
  UsersIcon,
  MapPinIcon,
  HeartIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSuccess = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      login(credentialResponse.credential);
      try {
        const result = await dispatch(fetchCurrentUser()).unwrap();
        if (result) navigate(ROUTES.HOME);
      } catch (err) {
        console.error("Failed to fetch user", err);
        navigate(ROUTES.AUTH_ERROR);
      }
    }
  };

  const handleError = () => {
    console.error("Google login failed");
    navigate(ROUTES.AUTH_ERROR);
  };

  return (
    <div className="min-h-screen md:h-screen w-full p-4 md:p-10 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <Card className="w-full h-full md:max-h-full rounded-2xl md:rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Column */}
        <div className="w-full md:w-1/2 md:h-full flex flex-col items-center justify-center px-6 md:px-10 py-8 md:py-0 relative order-2 md:order-1">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-10 left-10">
              <CalendarDaysIcon className="w-24 h-24 text-slate-800" />
            </div>
            <div className="absolute bottom-20 right-10">
              <MusicalNoteIcon className="w-20 h-20 text-slate-800" />
            </div>
          </div>

          <div className="flex flex-col items-center text-center relative z-10">
            {/* Logo/Icon with gradient background */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-teal-200">
              <RocketLaunchIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>

            <Typography
              variant="h4"
              className="text-slate-800 font-bold tracking-tight md:text-3xl"
            >
              {t("Welcome to VIBE UP")}
            </Typography>

            <Typography className="text-slate-500 mb-6 md:mb-8 mt-2 text-base md:text-lg max-w-sm px-4 md:px-0">
              {t("Sign in to your account with Google to continue")}
            </Typography>

            <div className="w-full max-w-xs flex justify-center">
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                useOneTap={false}
                shape="pill"
                theme="outline"
                size="large"
                text="continue_with"
                locale="en"
              />
            </div>

            {/* Trust badges */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-6 md:mt-10 text-slate-400">
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-4 h-4" />
                <span className="text-sm">{t("Free to use")}</span>
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="w-4 h-4" />
                <span className="text-sm">{t("Join the community")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Gradient Column with decorative elements */}
        <div
          className="w-full md:w-1/2 h-48 md:h-full relative overflow-hidden order-1 md:order-2"
          style={{
            background:
              "linear-gradient(135deg, #e0f8f1 0%, #86efac 25%, #5eead4 50%, #38bdf8 75%, #818cf8 100%)",
          }}
        >
          {/* Floating decorative icons - hidden on mobile, shown on md+ */}
          <div className="absolute inset-0 hidden md:block">
            {/* Top left cluster */}
            <div className="absolute top-[10%] left-[15%] animate-pulse">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <CalendarDaysIcon className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Top right */}
            <div
              className="absolute top-[20%] right-[20%] animate-pulse"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="w-14 h-14 rounded-xl bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <MusicalNoteIcon className="w-7 h-7 text-white" />
              </div>
            </div>

            {/* Center left */}
            <div
              className="absolute top-[40%] left-[25%] animate-pulse"
              style={{ animationDelay: "1s" }}
            >
              <div className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <UsersIcon className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Center */}
            <div
              className="absolute top-[35%] right-[30%] animate-pulse"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Bottom area */}
            <div
              className="absolute bottom-[25%] left-[35%] animate-pulse"
              style={{ animationDelay: "0.7s" }}
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <HeartIcon className="w-8 h-8 text-white" />
              </div>
            </div>

            <div
              className="absolute bottom-[15%] right-[15%] animate-pulse"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="w-18 h-18 rounded-2xl bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-lg p-4">
                <MapPinIcon className="w-9 h-9 text-white" />
              </div>
            </div>

            {/* Small floating circles */}
            <div
              className="absolute top-[60%] left-[10%] w-6 h-6 rounded-full bg-white/20 animate-bounce"
              style={{ animationDuration: "3s" }}
            />
            <div
              className="absolute top-[15%] left-[40%] w-4 h-4 rounded-full bg-white/25 animate-bounce"
              style={{ animationDuration: "4s", animationDelay: "0.5s" }}
            />
            <div
              className="absolute bottom-[40%] right-[10%] w-5 h-5 rounded-full bg-white/20 animate-bounce"
              style={{ animationDuration: "3.5s", animationDelay: "1s" }}
            />
          </div>

          {/* Mobile floating icons - smaller and fewer */}
          <div className="absolute inset-0 md:hidden">
            <div className="absolute top-4 left-6 animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <CalendarDaysIcon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div
              className="absolute top-6 right-8 animate-pulse"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-10 h-10 rounded-xl bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <MusicalNoteIcon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-pulse"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Tagline overlay at bottom */}
          <div className="absolute bottom-4 md:bottom-12 left-0 right-0 text-center">
            <Typography
              variant="h5"
              className="text-white font-bold drop-shadow-lg md:text-2xl"
            >
              {t("Discover Events Near You")}
            </Typography>
            <Typography className="text-white/80 mt-1 md:mt-2 text-sm md:text-lg drop-shadow hidden md:block">
              {t("Connect, Explore, Experience")}
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
