import axios from "axios";
import { clearToken, getToken } from "./authToken";
import { normalizeHttpError } from "./httpError";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

// Add interceptor to attach token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const err = normalizeHttpError(error);

    // 401 → auto logout
    const status = error.response?.status || err.status;

    // 401 (Unauthorized) or 403 (Forbidden) → auto logout
    if (
      (status === 401 || status === 403) &&
      !window.location.pathname.includes("/login")
    ) {
      clearToken();
      toast.error("Session expired. Please log in again.");
      window.location.replace("/login");
      return Promise.reject(err);
    }

    // Network error (status 0)
    if (err.status === 0) {
      toast.error(err.message);
      return Promise.reject(err);
    }

    // Client errors (4xx)
    if (err.status >= 400 && err.status < 500) {
      toast.error(err.message);
    } else {
      // Server errors (5xx) or other errors
      toast.error("Something went wrong. Try again later.");
    }

    return Promise.reject(err);
  },
);

export default api;
