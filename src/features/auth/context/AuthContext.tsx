import { createContext } from "react";

type GooglePayload = {
  name?: string;
  email?: string;
  picture?: string;
  sub: string;
  exp?: number;
};

export type AuthContextType = {
  user: GooglePayload | null;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
