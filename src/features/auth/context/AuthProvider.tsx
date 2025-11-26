import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";

// declare global {
//   interface Window {
//     google?: any;
//   }
// }

type GooglePayload = {
  name?: string;
  email?: string;
  picture?: string;
  sub: string;
  exp?: number;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("googleToken")
  );
  const [user, setUser] = useState<GooglePayload | null>(() =>
    token ? jwtDecode<GooglePayload>(token) : null
  );

  const handleCredentialResponse = (googleIdToken: string) => {
    setToken(googleIdToken);
    localStorage.setItem("googleToken", googleIdToken);

    const payload = jwtDecode<GooglePayload>(googleIdToken);
    setUser(payload);
  };

  const login = (googleIdToken: string) => {
    handleCredentialResponse(googleIdToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("googleToken");
  };

  // // Silent refresh on mount
  // useEffect(() => {
  //   if (!window.google) return;

  //   window.google.accounts.id.initialize({
  //     client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  //     callback: (response: any) => {
  //       if (response.credential) {
  //         handleCredentialResponse(response.credential);
  //         console.log("Token refreshed silently");
  //       }
  //     },
  //   });

  //   window.google.accounts.id.prompt((notification: any) => {
  //     if (!notification.isNotDisplayed() && !notification.isSkippedMoment()) {
  //       console.log("Silent refresh triggered");
  //     }
  //   });
  // }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
