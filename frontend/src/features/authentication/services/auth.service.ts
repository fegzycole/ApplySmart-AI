import { apiClient } from '@/shared/services/api-client';
import { tokenStorage } from '@/shared/utils/token-storage';
import type {
  LoginCredentials,
  SignupData,
  PasswordResetRequest,
  AuthResponse,
  SignupResponse,
  VerifyEmailRequest,
  ApiResponse,
  User
} from '../types/auth.types';

const ENDPOINTS = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  RESET_PASSWORD: '/auth/reset-password',
  CURRENT_USER: '/auth/me',
  REFRESH_TOKEN: '/auth/refresh',
  VERIFY_EMAIL: '/auth/verify-email',
  RESEND_VERIFICATION: '/auth/resend-verification',
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse, LoginCredentials>(
    ENDPOINTS.LOGIN,
    credentials
  );

  if (response.token) {
    apiClient.setAuthToken(response.token);
    if (response.refreshToken) {
      tokenStorage.setRefreshToken(response.refreshToken);
    }
  }

  return response;
};

export const signup = async (data: SignupData): Promise<SignupResponse> => {
  const response = await apiClient.post<SignupResponse, SignupData>(
    ENDPOINTS.SIGNUP,
    data
  );

  // Don't set auth token - user must verify email and login
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
  const refreshToken = tokenStorage.getRefreshToken();
  const response = await apiClient.post<AuthResponse, { refreshToken: string }>(
    ENDPOINTS.REFRESH_TOKEN,
    { refreshToken: refreshToken || '' }
  );

  if (response.token) {
    apiClient.setAuthToken(response.token);
    if (response.refreshToken) {
      tokenStorage.setRefreshToken(response.refreshToken);
    }
  }

  return response;
};

export const verifyEmail = async (data: VerifyEmailRequest): Promise<ApiResponse<void>> => {
  return apiClient.post<ApiResponse<void>, VerifyEmailRequest>(
    ENDPOINTS.VERIFY_EMAIL,
    data
  );
};

export const resendVerificationCode = async (email: string): Promise<ApiResponse<void>> => {
  return apiClient.post<ApiResponse<void>, { email: string }>(
    ENDPOINTS.RESEND_VERIFICATION,
    { email }
  );
};
