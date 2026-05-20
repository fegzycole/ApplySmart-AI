import { apiClient } from '@/shared/services/api-client';
import { API_ENDPOINTS } from '@/shared/constants/api-endpoints';
import { tokenStorage } from '@/shared/utils/token-storage';
import type {
  LoginCredentials,
  SignupData,
  RequestPasswordResetRequest,
  ResetPasswordRequest,
  OAuthCodeExchangeRequest,
  TwoFactorLoginVerifyRequest,
  AuthResponse,
  SignupResponse,
  VerifyEmailRequest,
  User
} from '../types/auth.types';
import type { ApiSuccessResponse } from '@/shared/types/api-response.types';

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

export const verifyTwoFactorLogin = async (
  data: TwoFactorLoginVerifyRequest,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse, TwoFactorLoginVerifyRequest>(
    ENDPOINTS.LOGIN_2FA_VERIFY,
    data,
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
  try {
    await apiClient.post<void>(ENDPOINTS.LOGOUT);
  } finally {
    apiClient.clearAuthToken();
  }
};

export const requestPasswordReset = async (
  data: RequestPasswordResetRequest,
): Promise<ApiSuccessResponse> => {
  return apiClient.post<ApiSuccessResponse, RequestPasswordResetRequest>(
    ENDPOINTS.REQUEST_PASSWORD_RESET,
    data,
  );
};

export const resetPassword = async (data: ResetPasswordRequest): Promise<ApiSuccessResponse> => {
  return apiClient.post<ApiSuccessResponse, ResetPasswordRequest>(
    ENDPOINTS.RESET_PASSWORD,
    data,
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

export const verifyEmail = async (data: VerifyEmailRequest): Promise<ApiSuccessResponse> => {
  return apiClient.post<ApiSuccessResponse, VerifyEmailRequest>(
    ENDPOINTS.VERIFY_EMAIL,
    data
  );
};

export const resendVerificationCode = async (email: string): Promise<ApiSuccessResponse> => {
  return apiClient.post<ApiSuccessResponse, { email: string }>(
    ENDPOINTS.RESEND_VERIFICATION,
    { email }
  );
};
