import { apiClient } from '@/shared/services/api-client';
import type {
  Application,
  FunnelStage,
  ConversionMetric,
  StatCardData,
  DashboardData,
  SuccessMetric,
  ApplicationVelocity
} from '../types/dashboard.types';

/**
 * Dashboard API Service
 * Makes real API calls to backend endpoints
 */

const ENDPOINTS = {
  STATS: '/dashboard/stats',
  RECENT_APPLICATIONS: '/dashboard/recent-applications',
  FUNNEL: '/dashboard/funnel',
  METRICS: '/dashboard/metrics',
  SUCCESS_METRICS: '/dashboard/success-metrics',
  APPLICATION_VELOCITY: '/dashboard/application-velocity',
  ALL_DATA: '/dashboard',
};

/**
 * Fetch dashboard statistics
 */
export const fetchDashboardStats = async (): Promise<StatCardData[]> => {
  return apiClient.get<StatCardData[]>(ENDPOINTS.STATS);
};

/**
 * Fetch recent applications
 */
export const fetchRecentApplications = async (limit?: number): Promise<Application[]> => {
  const params = limit ? { limit: limit.toString() } : undefined;
  return apiClient.get<Application[]>(ENDPOINTS.RECENT_APPLICATIONS, params);
};

/**
 * Fetch application funnel data
 */
export const fetchApplicationFunnel = async (): Promise<FunnelStage[]> => {
  return apiClient.get<FunnelStage[]>(ENDPOINTS.FUNNEL);
};

/**
 * Fetch conversion metrics
 */
export const fetchConversionMetrics = async (): Promise<ConversionMetric[]> => {
  return apiClient.get<ConversionMetric[]>(ENDPOINTS.METRICS);
};

/**
 * Fetch success metrics trend data
 */
export const fetchSuccessMetrics = async (): Promise<SuccessMetric[]> => {
  return apiClient.get<SuccessMetric[]>(ENDPOINTS.SUCCESS_METRICS);
};

/**
 * Fetch application velocity data
 */
export const fetchApplicationVelocity = async (): Promise<ApplicationVelocity[]> => {
  return apiClient.get<ApplicationVelocity[]>(ENDPOINTS.APPLICATION_VELOCITY);
};

/**
 * Fetch all dashboard data at once
 */
export const fetchDashboardData = async (): Promise<DashboardData> => {
  return apiClient.get<DashboardData>(ENDPOINTS.ALL_DATA);
};
