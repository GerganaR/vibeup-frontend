// Base API client for HTTP requests
import { STORAGE_KEYS } from "@/constants/auth";
import { authService } from "@/features/auth/services";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(baseURL?: string) {
    this.baseURL =
      baseURL ||
      import.meta.env.VITE_API_BASE_URL ||
      "http://localhost:3000/api";
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private getAuthToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  private async handleResponse<T>(
    response: Response,
    originalRequest?: () => Promise<Response>,
    retryCount: number = 0
  ): Promise<ApiResponse<T>> {
    if (!response.ok) {
      // Handle 401 Unauthorized - token may be expired
      // Only retry once to avoid infinite loops
      if (response.status === 401 && retryCount === 0) {
        const token = this.getAuthToken();
        if (token) {
          try {
            // Try to refresh the token
            await authService.refreshToken();
            // Retry the original request with new token
            if (originalRequest) {
              const retryResponse = await originalRequest();
              return this.handleResponse<T>(retryResponse, originalRequest, 1);
            }
          } catch {
            // Refresh failed, clear storage and throw error
            authService.logout().catch(() => {
              // Ignore logout errors
            });
          }
        }
      }

      const error: ApiError = await response.json().catch(() => ({
        message: response.statusText,
        status: response.status,
      }));

      throw new Error(
        error.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return {
      data,
      success: true,
    };
  }

  async get<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    const makeRequest = async (): Promise<Response> => {
      const token = this.getAuthToken();
      const headers: HeadersInit = {
        ...this.defaultHeaders,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      };

      return fetch(`${this.baseURL}${endpoint}`, {
        method: "GET",
        headers,
        ...options,
      });
    };

    const response = await makeRequest();
    return this.handleResponse<T>(response, makeRequest);
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    const makeRequest = async (): Promise<Response> => {
      const token = this.getAuthToken();
      const headers: HeadersInit = {
        ...this.defaultHeaders,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      };

      return fetch(`${this.baseURL}${endpoint}`, {
        method: "POST",
        headers,
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      });
    };

    const response = await makeRequest();
    return this.handleResponse<T>(response, makeRequest);
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    const makeRequest = async (): Promise<Response> => {
      const token = this.getAuthToken();
      const headers: HeadersInit = {
        ...this.defaultHeaders,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      };

      return fetch(`${this.baseURL}${endpoint}`, {
        method: "PUT",
        headers,
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      });
    };

    const response = await makeRequest();
    return this.handleResponse<T>(response, makeRequest);
  }

  async delete<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    const makeRequest = async (): Promise<Response> => {
      const token = this.getAuthToken();
      const headers: HeadersInit = {
        ...this.defaultHeaders,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      };

      return fetch(`${this.baseURL}${endpoint}`, {
        method: "DELETE",
        headers,
        ...options,
      });
    };

    const response = await makeRequest();
    return this.handleResponse<T>(response, makeRequest);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
