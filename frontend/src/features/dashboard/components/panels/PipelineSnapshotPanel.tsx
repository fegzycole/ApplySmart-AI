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
      className="lg:col-span-2 2xl:col-span-1"
    >
      <div className="grid grid-cols-1 gap-8 sm:gap-12 2xl:grid-cols-[220px_minmax(0,1fr)] items-center">
        {/* Donut chart — centred, bounded so it never dominates on wide screens */}
        <div className="mx-auto w-full max-w-[160px] sm:max-w-[220px]">
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
              className="fill-zinc-500 text-[11px] uppercase font-black tracking-[0.2em] dark:fill-zinc-400"
            >
              In play
            </text>
            <text
              x={centerX}
              y={centerY + 22}
              textAnchor="middle"
              className="fill-zinc-950 text-[32px] font-black tracking-[-0.04em] dark:fill-zinc-50"
            >
              {overview.activeApplications}
            </text>
          </svg>
        </div>

        {/* Stage rows — adaptive legend */}
        <div className="space-y-3">
          {funnel.map((stage) => (
            <div
              key={stage.name}
              className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-100 bg-white/50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900/40 transition-all hover:bg-white dark:hover:bg-zinc-800/60"
            >
              <div className="flex min-w-0 items-center gap-4">
                <span
                  className="size-3 shrink-0 rounded-full shadow-lg"
                  style={{ backgroundColor: DASHBOARD_PIPELINE_COLORS[stage.name] ?? "#a1a1aa", boxShadow: `0 0 12px ${DASHBOARD_PIPELINE_COLORS[stage.name]}40` }}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-tight">{stage.name}</p>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                    {formatPercent(stage.percentage)} Impact
                  </p>
                </div>
              </div>
              <span className="shrink-0 text-lg font-black tracking-tighter text-zinc-900 dark:text-zinc-50">
                {stage.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardSectionCard>
  );
}
