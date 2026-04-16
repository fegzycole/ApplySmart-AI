import { API_ENDPOINTS } from '../constants/api-endpoints';
import { tokenStorage } from '../utils/token-storage';

/**
 * Base API configuration
 */
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * API Response type
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

/**
 * API Error class
 */
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

/**
 * API Client class for making HTTP requests
 */
export class ApiClient {
  private baseURL: string;
  private headers: Record<string, string>;
  private timeout: number;

  constructor(config = API_CONFIG) {
    this.baseURL = config.baseURL;
    this.headers = { ...config.headers };
    this.timeout = config.timeout;

    // Load token from storage on initialization
    const token = tokenStorage.getToken();
    if (token) {
      this.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  /**
   * Handle API response
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new ApiError(
        error.message || `HTTP Error ${response.status}`,
        response.status,
        error
      );
    }

    return response.json();
  }

  /**
   * Create fetch request with timeout
   */
  private async fetchWithTimeout(
    url: string,
    options: RequestInit
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

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

  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await this.fetchWithTimeout(url.toString(), {
      method: 'GET',
      headers: this.headers,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * POST request
   */
  async post<T, D = unknown>(endpoint: string, data?: D): Promise<T> {
    const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * PUT request
   */
  async put<T, D = unknown>(endpoint: string, data?: D): Promise<T> {
    const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * PATCH request
   */
  async patch<T, D = unknown>(endpoint: string, data?: D): Promise<T> {
    const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.headers,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Set authorization token
   */
  setAuthToken(token: string) {
    this.headers['Authorization'] = `Bearer ${token}`;
    tokenStorage.setToken(token);
  }

  /**
   * Clear authorization token
   */
  clearAuthToken() {
    delete this.headers['Authorization'];
    tokenStorage.clearTokens();
  }

  /**
   * Update headers
   */
  setHeader(key: string, value: string) {
    this.headers[key] = value;
  }

  /**
   * Remove header
   */
  removeHeader(key: string) {
    delete this.headers[key];
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export endpoints for easy access
export { API_ENDPOINTS };
