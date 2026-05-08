import type { DashboardData } from "../../types/dashboard.types";
import { DASHBOARD_INSIGHT_TONE_STYLES } from "../../constants/dashboard.constants";
import { buildDashboardInsights } from "../../utils/dashboard-insights";
import { DashboardSectionCard } from "./DashboardSectionCard";

interface DashboardInsightsPanelProps {
  data: DashboardData;
}

export function DashboardInsightsPanel({ data }: DashboardInsightsPanelProps) {
  const insights = buildDashboardInsights(data);

  return (
    <DashboardSectionCard
      title="What needs attention"
      description="Use these signals to decide where to spend your next block of time."
    >
      <div className="space-y-3">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`rounded-[1.3rem] border p-4 ${DASHBOARD_INSIGHT_TONE_STYLES[insight.tone]}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] opacity-80">
                  {insight.label}
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{insight.value}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 opacity-90">{insight.description}</p>
          </div>
        ))}
      </div>
    </DashboardSectionCard>
  );
}
