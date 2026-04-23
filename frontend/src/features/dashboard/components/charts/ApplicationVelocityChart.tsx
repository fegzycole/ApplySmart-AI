import { Zap } from "lucide-react";
import { useApplicationVelocity } from "../../hooks";
import { ApplicationVelocityChartBody } from "./ApplicationVelocityChartBody";
import { DashboardChartCard } from "./DashboardChartCard";

export function ApplicationVelocityChart() {
  const { data: applicationVelocity = [], isLoading } = useApplicationVelocity();

  return (
    <DashboardChartCard
      badge="Last 12 weeks"
      description="Weekly applications vs. your target goal"
      empty={applicationVelocity.length === 0}
      icon={Zap}
      iconGradient="from-cyan-500 to-teal-500"
      loading={isLoading}
      title="Application Velocity"
    >
      <ApplicationVelocityChartBody data={applicationVelocity} />
    </DashboardChartCard>
  );
}
