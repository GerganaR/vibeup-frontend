import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./store/index.ts";
import { AuthProvider } from "@/features";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import App from "./app/App.tsx";
import "./i18n/i18n";
import "./index.css";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <Provider store={store}>
          <BrowserRouter>
            <GoogleOAuthProvider clientId={googleClientId}>
              <AuthProvider>
                <App />
                <Toaster
                  position="top-right"
                  containerStyle={{
                    zIndex: 99999,
                  }}
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: "#fff",
                      color: "#363636",
                    },
                    error: {
                      iconTheme: {
                        primary: "#ef4444",
                        secondary: "#fff",
                      },
                    },
                  }}
                />
              </AuthProvider>
            </GoogleOAuthProvider>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);
