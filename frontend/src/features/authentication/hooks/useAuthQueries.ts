import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as authService from '../services/auth.service';
import type {
  LoginCredentials,
  SignupData,
  PasswordResetRequest,
} from '../types/auth.types';

export const AUTH_KEYS = {
  all: ['auth'] as const,
  currentUser: () => [...AUTH_KEYS.all, 'current-user'] as const,
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: AUTH_KEYS.currentUser(),
    queryFn: authService.getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(AUTH_KEYS.currentUser(), data.user);
    },
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignupData) => authService.signup(data),
    onSuccess: (data) => {
      queryClient.setQueryData(AUTH_KEYS.currentUser(), data.user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
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
      queryClient.setQueryData(AUTH_KEYS.currentUser(), data.user);
    },
  });
};
