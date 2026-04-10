import { useQuery } from '@tanstack/react-query';
import * as adminService from '../services/admin.service';

/**
 * Query keys for admin
 */
export const ADMIN_KEYS = {
  all: ['admin'] as const,
  users: (params?: { page?: number; size?: number }) => [...ADMIN_KEYS.all, 'users', params] as const,
  analytics: () => [...ADMIN_KEYS.all, 'analytics'] as const,
};

/**
 * Fetch all users with statistics
 * Supports pagination via params: { page: 0, size: 20 }
 */
export const useAdminUsers = (params?: { page?: number; size?: number }) => {
  return useQuery({
    queryKey: ADMIN_KEYS.users(params),
    queryFn: () => adminService.fetchAllUsers(params),
  });
};

/**
 * Fetch admin analytics dashboard data
 * Returns comprehensive analytics including overview stats, user growth,
 * subscription distribution, AI usage, and revenue data
 */
export const useAdminAnalytics = () => {
  return useQuery({
    queryKey: ADMIN_KEYS.analytics(),
    queryFn: adminService.fetchAdminAnalytics,
  });
};
