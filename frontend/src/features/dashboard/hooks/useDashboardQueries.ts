import { useQuery } from '@tanstack/react-query';
import * as dashboardService from '../services/dashboard.service';

/**
 * Query keys for dashboard
 */
export const DASHBOARD_KEYS = {
  all: ['dashboard'] as const,
  stats: () => [...DASHBOARD_KEYS.all, 'stats'] as const,
  recentApps: (limit?: number) => [...DASHBOARD_KEYS.all, 'recent-apps', limit] as const,
  funnel: () => [...DASHBOARD_KEYS.all, 'funnel'] as const,
  metrics: () => [...DASHBOARD_KEYS.all, 'metrics'] as const,
  successMetrics: () => [...DASHBOARD_KEYS.all, 'success-metrics'] as const,
  velocity: () => [...DASHBOARD_KEYS.all, 'application-velocity'] as const,
  allData: () => [...DASHBOARD_KEYS.all, 'all-data'] as const,
};

/**
 * Fetch dashboard statistics
 */
export const useDashboardStats = () => {
  return useQuery({
    queryKey: DASHBOARD_KEYS.stats(),
    queryFn: dashboardService.fetchDashboardStats,
  });
};

/**
 * Fetch recent applications
 */
export const useRecentApplications = (limit?: number) => {
  return useQuery({
    queryKey: DASHBOARD_KEYS.recentApps(limit),
    queryFn: () => dashboardService.fetchRecentApplications(limit),
  });
};

/**
 * Fetch application funnel
 */
export const useApplicationFunnel = () => {
  return useQuery({
    queryKey: DASHBOARD_KEYS.funnel(),
    queryFn: dashboardService.fetchApplicationFunnel,
  });
};

/**
 * Fetch conversion metrics
 */
export const useConversionMetrics = () => {
  return useQuery({
    queryKey: DASHBOARD_KEYS.metrics(),
    queryFn: dashboardService.fetchConversionMetrics,
  });
};

/**
 * Fetch success metrics trend data
 */
export const useSuccessMetrics = () => {
  return useQuery({
    queryKey: DASHBOARD_KEYS.successMetrics(),
    queryFn: dashboardService.fetchSuccessMetrics,
  });
};

/**
 * Fetch application velocity data
 */
export const useApplicationVelocity = () => {
  return useQuery({
    queryKey: DASHBOARD_KEYS.velocity(),
    queryFn: dashboardService.fetchApplicationVelocity,
  });
};

/**
 * Fetch all dashboard data at once
 */
export const useDashboardData = () => {
  return useQuery({
    queryKey: DASHBOARD_KEYS.allData(),
    queryFn: dashboardService.fetchDashboardData,
  });
};
