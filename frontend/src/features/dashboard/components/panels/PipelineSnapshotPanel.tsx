import type { DashboardData } from "../../types/dashboard.types";
import { DASHBOARD_PIPELINE_COLORS } from "../../constants/dashboard.constants";
import { describeArc } from "../../utils/dashboard-chart.utils";
import { formatPercent } from "../../utils/dashboard-formatters";
import { DashboardSectionCard } from "./DashboardSectionCard";

interface PipelineSnapshotPanelProps {
  data: DashboardData;
}

export function PipelineSnapshotPanel({ data }: PipelineSnapshotPanelProps) {
  const { funnel, overview } = data;
  const centerX = 92;
  const centerY = 92;
  const radius = 62;
  const totalPipelineValue = funnel.reduce((sum, stage) => sum + stage.value, 0);
  const circumferenceFallback = 360 / Math.max(funnel.length, 1);
  let startAngle = 0;

  return (
    <DashboardSectionCard
      title="Pipeline structure"
      description="Understand where most of your roles are sitting right now, not just how many you have logged."
    >
      <div className="grid gap-6 lg:grid-cols-[190px_minmax(0,1fr)] lg:items-center">
        <div className="mx-auto w-full max-w-[190px]">
          <svg viewBox="0 0 184 184" className="h-auto w-full">
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="20"
              className="text-zinc-200 dark:text-zinc-800"
            />
            {funnel.map((stage) => {
              const sweepAngle = totalPipelineValue === 0
                ? circumferenceFallback
                : (stage.value / totalPipelineValue) * 360;

              if (totalPipelineValue > 0 && stage.value === 0) {
                return null;
              }

              const segmentStart = startAngle;
              const segmentEnd = startAngle + sweepAngle;
              startAngle = segmentEnd;

              return (
                <path
                  key={stage.name}
                  d={describeArc(centerX, centerY, radius, segmentStart, segmentEnd)}
                  fill="none"
                  stroke={DASHBOARD_PIPELINE_COLORS[stage.name] ?? "#a1a1aa"}
                  strokeWidth="20"
                  strokeLinecap="round"
                />
              );
            })}
            <text
              x={centerX}
              y={centerY - 6}
              textAnchor="middle"
              className="fill-zinc-500 text-[11px] uppercase tracking-[0.16em] dark:fill-zinc-400"
            >
              In play
            </text>
            <text
              x={centerX}
              y={centerY + 22}
              textAnchor="middle"
              className="fill-zinc-950 text-[28px] font-semibold tracking-[-0.04em] dark:fill-zinc-50"
            >
              {overview.activeApplications}
            </text>
          </svg>
        </div>

        <div className="space-y-3">
          {funnel.map((stage) => (
            <div
              key={stage.name}
              className="flex items-center justify-between gap-3 rounded-[1.2rem] border border-zinc-200/80 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/65"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className="size-3 rounded-full"
                  style={{ backgroundColor: DASHBOARD_PIPELINE_COLORS[stage.name] ?? "#a1a1aa" }}
                />
                <div className="min-w-0">
                  <p className="font-medium text-zinc-900 dark:text-zinc-50">{stage.name}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {formatPercent(stage.percentage)} of tracked roles
                  </p>
                </div>
              </div>
              <span className="text-lg font-semibold tracking-[-0.03em] text-zinc-950 dark:text-zinc-50">
                {stage.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardSectionCard>
  );
}
