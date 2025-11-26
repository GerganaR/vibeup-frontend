import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROUTES } from "@/routes";
import { useAppDispatch } from "@/store/hooks";
import { fetchCurrentUser } from "@/store/userSlice";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <GoogleLogin
      onSuccess={async (resp) => {
        if (resp.credential) {
          login(resp.credential);
          try {
            dispatch(fetchCurrentUser());
            navigate(ROUTES.HOME);
          } catch (err) {
            console.error("Failed to fetch user", err);
            navigate(ROUTES.AUTH_ERROR);
          }
        }
      }}
      onError={() => console.error("Failed to login")}
    />
  );
}
export default LoginPage;
