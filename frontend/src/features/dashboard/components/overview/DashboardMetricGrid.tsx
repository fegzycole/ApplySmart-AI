import type { DashboardData } from "../../types/dashboard.types";
import { buildDashboardMetricCards } from "../../utils/dashboard-insights";
import { DashboardMetricCard } from "./DashboardMetricCard";

interface DashboardMetricGridProps {
  data: DashboardData;
}

export function DashboardMetricGrid({ data }: DashboardMetricGridProps) {
  return (
    <>
      {buildDashboardMetricCards(data).map((metric) => (
        <DashboardMetricCard
          key={metric.label}
          label={metric.label}
          value={metric.value}
          hint={metric.hint}
          icon={metric.icon}
        />
      ))}
    </>
  );
}
