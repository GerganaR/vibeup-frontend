import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { AuthProvider } from "@/features";
import App from "./app/App.tsx";
import "./index.css";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <GoogleOAuthProvider clientId={googleClientId}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </GoogleOAuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
