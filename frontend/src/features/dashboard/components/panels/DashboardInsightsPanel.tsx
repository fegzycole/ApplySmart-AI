import { Sparkles } from "lucide-react";
import type { DashboardData } from "../../types/dashboard.types";
import { buildDashboardInsights } from "../../utils/dashboard-insights";
import { DashboardSectionCard } from "./DashboardSectionCard";

interface DashboardInsightsPanelProps {
  data: DashboardData;
}

const TONE_STYLES = {
  violet: "from-primary/10 to-transparent border-primary/20 text-primary",
  cyan: "from-primary/5 to-transparent border-primary/10 text-primary/80",
  emerald: "from-emerald-500/10 to-transparent border-emerald-200/50 text-emerald-700 dark:text-emerald-300",
  amber: "from-amber-500/10 to-transparent border-amber-200/50 text-amber-700 dark:text-amber-300",
};

export function DashboardInsightsPanel({ data }: DashboardInsightsPanelProps) {
  const insights = buildDashboardInsights(data);

  return (
    <DashboardSectionCard
      title="AI Intelligence Hub"
      description="System-generated suggestions and search signals."
      className="bg-gradient-to-b from-secondary/50 to-card"
      action={
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
          <Sparkles className="size-4" />
        </div>
      }
    >
      <div className="space-y-4">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div
              key={insight.id}
              className={`relative overflow-hidden rounded-[1.25rem] border bg-gradient-to-br p-4 transition-all hover:scale-[1.02] sm:rounded-[1.5rem] sm:p-5 ${TONE_STYLES[insight.tone]}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.15em] opacity-60 sm:text-[0.65rem] sm:tracking-[0.2em]">
                    {insight.label}
                  </p>
                  <p className="text-xl font-bold tracking-tight sm:text-2xl">{insight.value}</p>
                </div>
                {Icon && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/50 backdrop-blur-sm">
                    <Icon className="size-5" />
                  </div>
                )}
              </div>
              <p className="mt-4 text-xs font-medium leading-relaxed opacity-80">
                {insight.description}
              </p>
            </div>
          );
        })}
      </div>
    </DashboardSectionCard>
  );
}
