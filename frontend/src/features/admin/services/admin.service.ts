import { apiClient } from '@/shared/services/api-client';
import type {
  AdminAnalyticsResponse,
  AdminUsersResponse,
  UserAdminDto
} from '../types/admin.types';

/**
 * Admin API Service
 * Makes API calls to admin endpoints (requires ADMIN role)
 */

const ENDPOINTS = {
  USERS: '/admin/users',
  ANALYTICS: '/admin/analytics',
};

/**
 * Fetch all users with their statistics
 * Supports pagination: ?page=0&size=20
 */
export const fetchAllUsers = async (params?: { page?: number; size?: number }): Promise<UserAdminDto[] | AdminUsersResponse> => {
  const queryParams = params
    ? Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value.toString();
        }
        return acc;
      }, {} as Record<string, string>)
    : undefined;

  return apiClient.get<UserAdminDto[] | AdminUsersResponse>(ENDPOINTS.USERS, queryParams);
};

/**
 * Fetch admin analytics dashboard data
 * Returns comprehensive analytics including:
 * - Overview stats (total users, active users, resumes, cover letters, jobs)
 * - User growth data (12-month trend)
 * - Subscription distribution
 * - AI usage statistics
 * - Revenue data
 */
export const fetchAdminAnalytics = async (): Promise<AdminAnalyticsResponse> => {
  return apiClient.get<AdminAnalyticsResponse>(ENDPOINTS.ANALYTICS);
};
