export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'ADMIN';
  emailVerified: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  tokenType: string;
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

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
