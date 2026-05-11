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
      <div className="grid grid-cols-1 gap-12 2xl:grid-cols-1 items-center">
        {/* Donut chart — "Core Pulse" visualizer */}
        <div className="relative mx-auto w-full max-w-[200px] sm:max-w-[240px]">
           {/* Background Glow */}
          <div className="absolute inset-0 bg-sky-500/5 blur-[40px] rounded-full animate-pulse" />
          
          <svg viewBox="0 0 184 184" className="relative h-auto w-full z-10 drop-shadow-[0_0_20px_rgba(14,165,233,0.1)]">
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="16"
              className="text-zinc-100 dark:text-zinc-800/60"
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

              const color = DASHBOARD_PIPELINE_COLORS[stage.name] ?? "#a1a1aa";

              return (
                <g key={stage.name} className="group/segment">
                  <path
                    d={describeArc(centerX, centerY, radius, segmentStart, segmentEnd)}
                    fill="none"
                    stroke={color}
                    strokeWidth="16"
                    strokeLinecap="round"
                    className="transition-all duration-700 hover:stroke-width-[20]"
                  />
                  {/* Subtle Glow Path */}
                  <path
                    d={describeArc(centerX, centerY, radius, segmentStart, segmentEnd)}
                    fill="none"
                    stroke={color}
                    strokeWidth="24"
                    strokeLinecap="round"
                    className="opacity-0 blur-sm group-hover/segment:opacity-20 transition-all duration-700"
                  />
                </g>
              );
            })}
            <text
              x={centerX}
              y={centerY - 10}
              textAnchor="middle"
              className="fill-zinc-400 text-[10px] font-black uppercase tracking-[0.3em] dark:fill-zinc-500"
            >
              In Play
            </text>
            <text
              x={centerX}
              y={centerY + 24}
              textAnchor="middle"
              className="fill-zinc-900 text-[36px] font-black tracking-[-0.05em] dark:fill-zinc-50 leading-none"
            >
              {overview.activeApplications}
            </text>
          </svg>
        </div>

        {/* Stage rows — "System Readout" legend */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 mb-4">
             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Sector Breakdown</h4>
             <div className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
          </div>
          
          <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-1">
            {funnel.map((stage) => (
              <div
                key={stage.name}
                className="group/row flex items-center justify-between gap-4 rounded-2xl border border-zinc-100 bg-white/50 px-5 py-4 dark:border-zinc-800/40 dark:bg-zinc-900/40 transition-all hover:bg-white dark:hover:bg-zinc-800 shadow-sm hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.08)]"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="relative">
                    <span
                      className="block size-3 shrink-0 rounded-full shadow-lg transition-transform duration-500 group-hover/row:scale-125"
                      style={{ backgroundColor: DASHBOARD_PIPELINE_COLORS[stage.name] ?? "#a1a1aa", boxShadow: `0 0 12px ${DASHBOARD_PIPELINE_COLORS[stage.name]}40` }}
                    />
                    <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: DASHBOARD_PIPELINE_COLORS[stage.name] ?? "#a1a1aa" }} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-tight">{stage.name}</p>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5 opacity-60">
                      {formatPercent(stage.percentage)} of pipeline
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 transition-colors group-hover/row:text-sky-500">
                  {stage.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardSectionCard>
  );
}
