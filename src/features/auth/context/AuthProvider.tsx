import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";

type GooglePayload = {
  name?: string;
  email?: string;
  picture?: string;
  sub: string;
  exp?: number;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<GooglePayload | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (googleIdToken: string) => {
    setToken(googleIdToken);
    localStorage.setItem("googleToken", googleIdToken); // persist
    const payload = jwtDecode<GooglePayload>(googleIdToken);
    setUser(payload);
  };
  
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("googleToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
