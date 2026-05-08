import { apiClient } from "@/shared/services/api-client";
import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";
import type { DashboardData } from "../types/dashboard.types";

const ENDPOINTS = API_ENDPOINTS.DASHBOARD;

export const fetchDashboardData = async (): Promise<DashboardData> => {
  return apiClient.get<DashboardData>(ENDPOINTS.MAIN);
};
