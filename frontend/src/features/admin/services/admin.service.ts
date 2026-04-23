import { apiClient } from '@/shared/services/api-client';
import { API_ENDPOINTS } from '@/shared/constants/api-endpoints';
import type {
  AdminAnalyticsResponse,
  AdminUsersResponse,
  UserAdminDto
} from '../types/admin.types';

const ENDPOINTS = API_ENDPOINTS.ADMIN;

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

export const fetchAdminAnalytics = async (): Promise<AdminAnalyticsResponse> => {
  return apiClient.get<AdminAnalyticsResponse>(ENDPOINTS.ANALYTICS);
};
