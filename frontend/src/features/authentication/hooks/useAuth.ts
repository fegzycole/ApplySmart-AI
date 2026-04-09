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
    try {
      await loginMutation.mutateAsync(credentials);
      navigate(ROUTES.DASHBOARD.HOME);
    } catch (err) {
      throw new Error('Login failed. Please try again.');
    }
  };

  const signup = async (data: SignupData) => {
    try {
      await signupMutation.mutateAsync(data);
      navigate(ROUTES.DASHBOARD.HOME);
    } catch (err) {
      throw new Error('Signup failed. Please try again.');
    }
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate(ROUTES.HOME);
    } catch (err) {
      throw new Error('Logout failed.');
    }
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
