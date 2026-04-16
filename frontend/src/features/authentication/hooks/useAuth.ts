import { useNavigate } from 'react-router';
import { ROUTES } from '@/shared/constants';
import { useLogin, useSignup, useLogout, useCurrentUser } from './useAuthQueries';
import type { LoginCredentials, SignupData } from '../types/auth.types';

export function useAuth() {
  const navigate = useNavigate();

  const { data: user, isLoading: userLoading } = useCurrentUser();

  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const logoutMutation = useLogout();

  const login = async (credentials: LoginCredentials) => {
    await loginMutation.mutateAsync(credentials);
    navigate(ROUTES.DASHBOARD.HOME);
  };

  const signup = async (data: SignupData) => {
    await signupMutation.mutateAsync(data);
    navigate(ROUTES.DASHBOARD.HOME);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
    navigate(ROUTES.HOME);
  };

  return {
    user,
    loading: userLoading || loginMutation.isPending || signupMutation.isPending || logoutMutation.isPending,
    error: loginMutation.error || signupMutation.error || logoutMutation.error,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };
}
