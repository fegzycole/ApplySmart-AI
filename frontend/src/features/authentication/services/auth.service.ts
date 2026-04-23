import { apiClient } from '@/shared/services/api-client';
import { API_ENDPOINTS } from '@/shared/constants/api-endpoints';
import { tokenStorage } from '@/shared/utils/token-storage';
import type {
  LoginCredentials,
  SignupData,
  PasswordResetRequest,
  OAuthCodeExchangeRequest,
  AuthResponse,
  SignupResponse,
  VerifyEmailRequest,
  ApiResponse,
  User
} from '../types/auth.types';

const ENDPOINTS = API_ENDPOINTS.AUTH;

function persistAuthenticatedSession(response: AuthResponse): void {
  if (!response.token) {
    return;
  }

  apiClient.setAuthToken(response.token);
  if (response.refreshToken) {
    tokenStorage.setRefreshToken(response.refreshToken);
  }
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse, LoginCredentials>(
    ENDPOINTS.LOGIN,
    credentials
  );

  persistAuthenticatedSession(response);

  return response;
};

export const signup = async (data: SignupData): Promise<SignupResponse> => {
  const response = await apiClient.post<SignupResponse, SignupData>(
    ENDPOINTS.SIGNUP,
    data
  );

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

  persistAuthenticatedSession(response);

  return response;
};

export const exchangeOAuthCode = async (code: string): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse, OAuthCodeExchangeRequest>(
    ENDPOINTS.OAUTH_EXCHANGE,
    { code }
  );

  persistAuthenticatedSession(response);

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
