import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";
import { tokenStorage } from "@/shared/utils/token-storage";

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

  const apiRoot = API_CONFIG.baseURL.replace(/\/api\/v1\/?$/, '');
  return `${apiRoot}${path}`;
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

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

function findHeaderValue(headers: Record<string, string>, headerName: string): string | undefined {
  const normalizedHeaderName = headerName.toLowerCase();
  const matchingHeader = Object.entries(headers).find(([key]) => key.toLowerCase() === normalizedHeaderName);

  return matchingHeader?.[1];
}

interface RequestOptions<D = unknown> {
  method: RequestMethod;
  data?: D;
  params?: Record<string, string>;
  customTimeout?: number;
}

export class ApiClient {
  private baseURL: string;
  private headers: Record<string, string>;
  private timeout: number;

  constructor(config = API_CONFIG) {
    this.baseURL = config.baseURL;
    this.headers = { ...config.headers };
    this.timeout = config.timeout;
  }

  private buildHeaders(options: { isFormData?: boolean } = {}): {
    headers: Record<string, string>;
    usedAuth: boolean;
  } {
    const headers: Record<string, string> = {};
    const token = tokenStorage.getToken();

    Object.entries(this.headers).forEach(([key, value]) => {
      const normalizedKey = key.toLowerCase();

      if (options.isFormData && normalizedKey === 'content-type') {
        return;
      }

      if (normalizedKey === 'authorization' && token) {
        return;
      }

      headers[key] = value;
    });

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return {
      headers,
      usedAuth: Boolean(token || findHeaderValue(headers, 'authorization')),
    };
  }

  private handleUnauthorizedResponse(usedAuth: boolean) {
    if (!usedAuth) {
      return;
    }

    this.clearAuthToken();

    const currentPath = window.location.pathname;
    const publicPaths = ['/login', '/signup', '/verify-email', '/password-reset', '/auth/oauth2/callback', '/'];

    if (!publicPaths.includes(currentPath)) {
      window.location.href = '/login';
    }
  }

  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    let urlString = `${this.baseURL}${endpoint}`;

    if (!params) {
      return urlString;
    }

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, value);
    });

    return `${urlString}?${searchParams.toString()}`;
  }

  private buildBody<D>(data: D | undefined, isFormData: boolean): BodyInit | undefined {
    if (!data) {
      return undefined;
    }

    return isFormData ? (data as unknown as FormData) : JSON.stringify(data);
  }

  private async parseErrorBody(response: Response): Promise<unknown> {
    return response.json().catch(() => ({}));
  }

  private getErrorMessage(error: unknown, status: number): string {
    if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
      return error.message;
    }

    return `HTTP Error ${status}`;
  }

  private async throwForError(response: Response, usedAuth: boolean): Promise<void> {
    if (response.ok) {
      return;
    }

    const error = await this.parseErrorBody(response);

    if (response.status === 401) {
      this.handleUnauthorizedResponse(usedAuth);
    }

    throw new ApiError(this.getErrorMessage(error, response.status), response.status, error);
  }

  private async parseJsonResponse<T>(response: Response, usedAuth: boolean): Promise<T> {
    await this.throwForError(response, usedAuth);

    if (response.status === 204) {
      return undefined as T;
    }

    const responseText = await response.text();
    if (!responseText) {
      return undefined as T;
    }

    return JSON.parse(responseText) as T;
  }

  private async parseBlobResponse(response: Response, usedAuth: boolean): Promise<Blob> {
    await this.throwForError(response, usedAuth);
    return response.blob();
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

  private async request<T, D = unknown>(endpoint: string, options: RequestOptions<D>): Promise<T> {
    const isFormData = options.data instanceof FormData;
    const { headers, usedAuth } = this.buildHeaders({ isFormData });

    const response = await this.fetchWithTimeout(
      this.buildUrl(endpoint, options.params),
      {
        method: options.method,
        headers,
        body: this.buildBody(options.data, isFormData),
      },
      options.customTimeout
    );

    return this.parseJsonResponse<T>(response, usedAuth);
  }

  private async requestBlob<D = unknown>(url: string, options: RequestOptions<D>): Promise<Blob> {
    const { headers, usedAuth } = this.buildHeaders();
    const response = await this.fetchWithTimeout(
      url,
      {
        method: options.method,
        headers,
        body: this.buildBody(options.data, false),
      },
      options.customTimeout
    );

    return this.parseBlobResponse(response, usedAuth);
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  async post<T, D = unknown>(
    endpoint: string,
    data?: D,
    customTimeout?: number,
    params?: Record<string, string>,
  ): Promise<T> {
    return this.request<T, D>(endpoint, { method: 'POST', data, customTimeout, params });
  }

  async postBlob<D = unknown>(endpoint: string, data?: D, customTimeout?: number): Promise<Blob> {
    return this.requestBlob<D>(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      data,
      customTimeout,
    });
  }

  async getBlobByUrl(pathOrUrl: string, customTimeout?: number): Promise<Blob> {
    return this.requestBlob(
      resolveBackendUrl(pathOrUrl),
      { method: 'GET', customTimeout }
    );
  }

  async put<T, D = unknown>(endpoint: string, data?: D): Promise<T> {
    return this.request<T, D>(endpoint, { method: 'PUT', data });
  }

  async patch<T, D = unknown>(endpoint: string, data?: D): Promise<T> {
    return this.request<T, D>(endpoint, { method: 'PATCH', data });
  }

  async delete<T, D = unknown>(endpoint: string, data?: D): Promise<T> {
    return this.request<T, D>(endpoint, { method: 'DELETE', data });
  }

  setAuthToken(token: string) {
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
