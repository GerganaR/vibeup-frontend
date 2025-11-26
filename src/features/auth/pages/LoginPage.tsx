import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROUTES } from "@/routes";
import { useAppDispatch } from "@/store/hooks";
import { fetchCurrentUser } from "@/store/userSlice";
import { FiLogIn } from "react-icons/fi";

const LoginPage: React.FC = () => {
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
    <div className="h-screen w-full p-10 flex items-center justify-center bg-[#f2f8fe]">
      <Card className="w-full h-full rounded-3xl shadow-2xl flex flex-row items-center overflow-hidden">
        
        {/* Left Column */}
        <div className="w-1/2 h-full flex flex-col items-center justify-center px-10">
          <div className="flex flex-col items-center text-center">
            
            {/* Icon */}
            <FiLogIn className="text-green-600 mb-4" size={48} />

            <Typography variant="h4" className="text-slate-800 font-bold">
              Welcome to VIBE UP
            </Typography>

            <Typography className="text-slate-600 mb-6 mt-1">
              Sign in to your account with Google to continue
            </Typography>

            <div className="w-[90%]">
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
          </div>
        </div>

        {/* Right Gradient Column */}
        <div
          className="w-1/2 h-full"
          style={{
            background:
              "linear-gradient(135deg, #e0f8f1 0%, #9ae6d3 35%, #5bbad5 70%, #3b82f6 100%)",
          }}
        ></div>
      </Card>
    </div>
  );
};

export default LoginPage;
