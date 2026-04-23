import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { EmptyState } from "@/shared/components/EmptyState";
import { LoadingSkeleton } from "@/shared/components/skeletons";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { DASHBOARD_CHART_HEIGHT } from "../../constants/dashboard-chart.constants";

interface DashboardChartCardProps {
  badge?: string;
  children: ReactNode;
  className?: string;
  description: string;
  empty: boolean;
  icon: LucideIcon;
  iconGradient: string;
  loading: boolean;
  title: string;
}

export function DashboardChartCard({
  badge,
  children,
  className = "",
  description,
  empty,
  icon: Icon,
  iconGradient,
  loading,
  title,
}: DashboardChartCardProps) {
  return (
    <Card className={`border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={`size-10 rounded-xl bg-gradient-to-br ${iconGradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
              <Icon className="size-5 text-white" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {description}
              </CardDescription>
            </div>
          </div>
          {badge ? (
            <div className="px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 self-start sm:self-center flex-shrink-0">
              <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
                {badge}
              </span>
            </div>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        {loading ? (
          <LoadingSkeleton variant="chart" height={DASHBOARD_CHART_HEIGHT} />
        ) : empty ? (
          <EmptyState message="No data available" height={DASHBOARD_CHART_HEIGHT} />
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}
