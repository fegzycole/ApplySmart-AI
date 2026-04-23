import { apiClient } from '@/shared/services/api-client';
import { API_ENDPOINTS } from '@/shared/constants/api-endpoints';
import type {
  Application,
  FunnelStage,
  ConversionMetric,
  StatCardData,
  DashboardData,
  SuccessMetric,
  ApplicationVelocity
} from '../types/dashboard.types';

const ENDPOINTS = API_ENDPOINTS.DASHBOARD;

export const fetchDashboardStats = async (): Promise<StatCardData[]> => {
  return apiClient.get<StatCardData[]>(ENDPOINTS.STATS);
};

export const fetchRecentApplications = async (limit?: number): Promise<Application[]> => {
  const params = limit ? { limit: limit.toString() } : undefined;
  return apiClient.get<Application[]>(ENDPOINTS.RECENT_APPLICATIONS, params);
};

export const fetchApplicationFunnel = async (): Promise<FunnelStage[]> => {
  return apiClient.get<FunnelStage[]>(ENDPOINTS.FUNNEL);
};

export const fetchConversionMetrics = async (): Promise<ConversionMetric[]> => {
  return apiClient.get<ConversionMetric[]>(ENDPOINTS.METRICS);
};

export const fetchSuccessMetrics = async (): Promise<SuccessMetric[]> => {
  return apiClient.get<SuccessMetric[]>(ENDPOINTS.SUCCESS_METRICS);
};

export const fetchApplicationVelocity = async (): Promise<ApplicationVelocity[]> => {
  return apiClient.get<ApplicationVelocity[]>(ENDPOINTS.APPLICATION_VELOCITY);
};

export const fetchDashboardData = async (): Promise<DashboardData> => {
  return apiClient.get<DashboardData>(ENDPOINTS.MAIN);
};
