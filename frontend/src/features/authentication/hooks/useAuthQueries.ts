import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tokenStorage } from '@/shared/utils/token-storage';
import * as authService from '../services/auth.service';
import type {
  LoginCredentials,
  SignupData,
  PasswordResetRequest,
  TwoFactorLoginVerifyRequest,
  VerifyEmailRequest,
} from '../types/auth.types';

export const AUTH_KEYS = {
  all: ['auth'] as const,
  currentUser: () => [...AUTH_KEYS.all, 'current-user'] as const,
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: AUTH_KEYS.currentUser(),
    queryFn: authService.getCurrentUser,
    enabled: tokenStorage.hasToken(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      if (data.user && data.token) {
        queryClient.setQueryData(AUTH_KEYS.currentUser(), data.user);
      }
    },
  });
};

export const useVerifyTwoFactorLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TwoFactorLoginVerifyRequest) => authService.verifyTwoFactorLogin(data),
    onSuccess: (data) => {
      if (data.user && data.token) {
        queryClient.setQueryData(AUTH_KEYS.currentUser(), data.user);
      }
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupData) => authService.signup(data),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSettled: () => {
      queryClient.clear();
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: PasswordResetRequest) => authService.resetPassword(data),
  });
};

export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.refreshToken,
    onSuccess: (data) => {
      if (data.user && data.token) {
        queryClient.setQueryData(AUTH_KEYS.currentUser(), data.user);
      }
    },
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (data: VerifyEmailRequest) => authService.verifyEmail(data),
  });
};

export const useResendVerification = () => {
  return useMutation({
    mutationFn: (email: string) => authService.resendVerificationCode(email),
  });
};
