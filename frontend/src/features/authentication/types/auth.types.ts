export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl?: string | null;
  role: 'USER' | 'ADMIN';
  emailVerified: boolean;
  twoFactorEnabled?: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export type LoginStage = 'credentials' | 'twoFactor';

export interface TwoFactorLoginVerifyRequest {
  challengeToken: string;
  code: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RequestPasswordResetRequest {
  email: string;
}

export interface ResetPasswordRequest extends RequestPasswordResetRequest {
  code: string;
  newPassword: string;
}

export interface OAuthCodeExchangeRequest {
  code: string;
}

export interface AuthResponse {
  user?: User | null;
  token?: string | null;
  refreshToken?: string | null;
  tokenType?: string | null;
  requiresTwoFactor?: boolean;
  challengeEmail?: string | null;
  twoFactorChallengeToken?: string | null;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}
