import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "../services/dashboard.service";

export const DASHBOARD_KEYS = {
  all: ["dashboard"] as const,
  allData: () => [...DASHBOARD_KEYS.all, "all-data"] as const,
};

export const useDashboardData = () => {
  return useQuery({
    queryKey: DASHBOARD_KEYS.allData(),
    queryFn: fetchDashboardData,
  });
};
