import { API_ENDPOINTS } from '../constants/api-endpoints';
import { tokenStorage } from '../utils/token-storage';

export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),
  headers: {
    'Content-Type': 'application/json',
  },
};

export function resolveBackendUrl(path: string): string {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return path;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export class ApiClient {
  private baseURL: string;
  private headers: Record<string, string>;
  private timeout: number;

  constructor(config = API_CONFIG) {
    this.baseURL = config.baseURL;
    this.headers = { ...config.headers };
    this.timeout = config.timeout;

    const token = tokenStorage.getToken();
    if (token) {
      this.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));

      if (response.status === 401) {
        this.clearAuthToken();

        const currentPath = window.location.pathname;
        const publicPaths = ['/login', '/signup', '/verify-email', '/password-reset', '/auth/oauth2/callback', '/'];

        if (!publicPaths.includes(currentPath)) {
          window.location.href = '/login';
        }
      }

      throw new ApiError(
        error.message || `HTTP Error ${response.status}`,
        response.status,
        error
      );
    }

    return response.json();
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit,
    customTimeout?: number
  ): Promise<Response> {
    const timeout = customTimeout || this.timeout;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408);
      }
      throw error;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    let urlString = `${this.baseURL}${endpoint}`;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, value);
      });
      urlString += `?${searchParams.toString()}`;
    }

    const response = await this.fetchWithTimeout(urlString, {
      method: 'GET',
      headers: this.headers,
    });

    return this.handleResponse<T>(response);
  }

  async post<T, D = unknown>(endpoint: string, data?: D, customTimeout?: number): Promise<T> {
    const isFormData = data instanceof FormData;

    const headers: Record<string, string> = {};
    Object.keys(this.headers).forEach(key => {
      if (isFormData && key === 'Content-Type') {
        return;
      }
      headers[key] = this.headers[key];
    });

    const response = await this.fetchWithTimeout(
      `${this.baseURL}${endpoint}`,
      {
        method: 'POST',
        headers,
        body: isFormData ? (data as FormData) : (data ? JSON.stringify(data) : undefined),
      },
      customTimeout
    );

    return this.handleResponse<T>(response);
  }

  async put<T, D = unknown>(endpoint: string, data?: D): Promise<T> {
    const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async patch<T, D = unknown>(endpoint: string, data?: D): Promise<T> {
    const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.headers,
    });

    return this.handleResponse<T>(response);
  }

  setAuthToken(token: string) {
    this.headers['Authorization'] = `Bearer ${token}`;
    tokenStorage.setToken(token);
  }

  clearAuthToken() {
    delete this.headers['Authorization'];
    tokenStorage.clearTokens();
  }

  setHeader(key: string, value: string) {
    this.headers[key] = value;
  }

  removeHeader(key: string) {
    delete this.headers[key];
  }
}

export const apiClient = new ApiClient();

export { API_ENDPOINTS };
