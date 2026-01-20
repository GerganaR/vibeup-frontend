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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("googleToken")
  );
  const [user, setUser] = useState<GooglePayload | null>(() =>
    token ? jwtDecode<GooglePayload>(token) : null
  );

  const login = async (googleIdToken: string): Promise<void> => {
    return new Promise((resolve) => {
      setToken(googleIdToken);
      localStorage.setItem("googleToken", googleIdToken);
      const payload = jwtDecode<GooglePayload>(googleIdToken);
      setUser(payload);
  };
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
