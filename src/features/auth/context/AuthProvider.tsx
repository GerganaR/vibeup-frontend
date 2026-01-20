import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "@/store/hooks";
import { fetchCurrentUser } from "@/features/user/store/userThunk";
import { AuthContext } from "./AuthContext";

type GooglePayload = {
  name?: string;
  email?: string;
  picture?: string;
  sub: string;
  exp?: number;
};

function isTokenExpired(token: string): boolean {
  try {
    const payload = jwtDecode<GooglePayload>(token);
    if (!payload.exp) return false;
    // exp is in seconds, Date.now() is in milliseconds
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

function getValidToken(): string | null {
  const token = localStorage.getItem("googleToken");
  if (!token) return null;
  if (isTokenExpired(token)) {
    localStorage.removeItem("googleToken");
    return null;
  }
  return token;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  const [token, setToken] = useState<string | null>(() => getValidToken());
  const [user, setUser] = useState<GooglePayload | null>(() =>
    token ? jwtDecode<GooglePayload>(token) : null
  );

  const login = async (googleIdToken: string): Promise<void> => {
    return new Promise((resolve) => {
      setToken(googleIdToken);
      localStorage.setItem("googleToken", googleIdToken);
      const payload = jwtDecode<GooglePayload>(googleIdToken);
      setUser(payload);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => resolve());
      });
    });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("googleToken");
  };

  // Check token expiry periodically and on focus
  useEffect(() => {
    const checkExpiry = () => {
      if (token && isTokenExpired(token)) {
        logout();
        window.location.href = "/login";
      }
    };

    // Check on window focus (user returns to tab)
    window.addEventListener("focus", checkExpiry);

    // Check every minute
    const interval = setInterval(checkExpiry, 60000);

    return () => {
      window.removeEventListener("focus", checkExpiry);
      clearInterval(interval);
    };
  }, [token]);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [token, dispatch]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
