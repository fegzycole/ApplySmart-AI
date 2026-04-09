import { apiClient } from '@/shared/services/api-client';
import type {
  LoginCredentials,
  SignupData,
  PasswordResetRequest,
  AuthResponse,
  User
} from '../types/auth.types';

const ENDPOINTS = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  RESET_PASSWORD: '/auth/reset-password',
  CURRENT_USER: '/auth/me',
  REFRESH_TOKEN: '/auth/refresh',
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse, LoginCredentials>(
    ENDPOINTS.LOGIN,
    credentials
  );

  if (response.token) {
    apiClient.setAuthToken(response.token);
  }

  return response;
};

export const signup = async (data: SignupData): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse, SignupData>(
    ENDPOINTS.SIGNUP,
    data
  );

  if (response.token) {
    apiClient.setAuthToken(response.token);
  }

  return response;
};

export const logout = async (): Promise<void> => {
  await apiClient.post<void>(ENDPOINTS.LOGOUT);

  apiClient.clearAuthToken();
};

export const resetPassword = async (data: PasswordResetRequest): Promise<void> => {
  await apiClient.post<void, PasswordResetRequest>(
    ENDPOINTS.RESET_PASSWORD,
    data
  );
};

export const getCurrentUser = async (): Promise<User> => {
  return apiClient.get<User>(ENDPOINTS.CURRENT_USER);
};

export const refreshToken = async (): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(ENDPOINTS.REFRESH_TOKEN);

  if (response.token) {
    apiClient.setAuthToken(response.token);
  }

  return response;
};
