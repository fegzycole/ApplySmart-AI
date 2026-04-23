import { Activity } from "lucide-react";
import { useSuccessMetrics } from "../../hooks";
import { DashboardChartCard } from "./DashboardChartCard";
import { SuccessMetricsChartBody } from "./SuccessMetricsChartBody";

export function SuccessMetricsChart() {
  const { data: successMetrics = [], isLoading } = useSuccessMetrics();

  return (
    <DashboardChartCard
      className="lg:col-span-2"
      description="Response, interview, and offer rates over time"
      empty={successMetrics.length === 0}
      icon={Activity}
      iconGradient="from-violet-500 to-fuchsia-500"
      loading={isLoading}
      title="Success Metrics Trend"
    >
      <SuccessMetricsChartBody data={successMetrics} />
    </DashboardChartCard>
  );
}
