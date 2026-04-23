import { useQuery } from '@tanstack/react-query';
import * as adminService from '../services/admin.service';

export const ADMIN_KEYS = {
  all: ['admin'] as const,
  users: (params?: { page?: number; size?: number }) => [...ADMIN_KEYS.all, 'users', params] as const,
  analytics: () => [...ADMIN_KEYS.all, 'analytics'] as const,
};

export const useAdminUsers = (params?: { page?: number; size?: number }) => {
  return useQuery({
    queryKey: ADMIN_KEYS.users(params),
    queryFn: () => adminService.fetchAllUsers(params),
  });
};

export const useAdminAnalytics = () => {
  return useQuery({
    queryKey: ADMIN_KEYS.analytics(),
    queryFn: adminService.fetchAdminAnalytics,
  });
};
