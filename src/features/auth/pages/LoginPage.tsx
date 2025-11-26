import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROUTES } from "@/routes";
import api from "@/api/axios";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <GoogleLogin
      onSuccess={async (resp) => {
        if (resp.credential) {
          login(resp.credential);
          try {
            const { data } = await api.get("/auth/me");
            console.log("DB user:", data);
          } catch (err) {
            console.error("Failed to fetch user", err);
          }
          navigate(ROUTES.HOME);
        }
      }}
      onError={() => console.log("Google Login Failed")}
    />
  );
}
export default LoginPage;
