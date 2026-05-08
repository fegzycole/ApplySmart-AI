import type { DashboardSuccessMetric } from "../../types/dashboard.types";
import { buildAreaPath, buildLinePath } from "../../utils/dashboard-chart.utils";
import { DashboardSectionCard } from "./DashboardSectionCard";

interface OutcomeTrendPanelProps {
  data: DashboardSuccessMetric[];
}

export function OutcomeTrendPanel({ data }: OutcomeTrendPanelProps) {
  const width = 560;
  const height = 220;
  const padding = { top: 20, right: 20, bottom: 34, left: 28 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxY = 100;
  const stepX = data.length > 1 ? chartWidth / (data.length - 1) : chartWidth;
  const baselineY = padding.top + chartHeight;

  const toPoint = (value: number, index: number) => ({
    x: padding.left + stepX * index,
    y: padding.top + chartHeight - (value / maxY) * chartHeight,
  });

  const responsePoints = data.map((item, index) => toPoint(item.responseRate, index));
  const interviewPoints = data.map((item, index) => toPoint(item.interviewRate, index));
  const offerPoints = data.map((item, index) => toPoint(item.offerRate, index));

  return (
    <DashboardSectionCard
      title="Monthly conversion trend"
      description="Track whether your submission quality is translating into interviews and offers."
    >
      <div className="space-y-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full">
          <defs>
            <linearGradient id="dashboard-response-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(139,92,246,0.28)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0)" />
            </linearGradient>
          </defs>

          {[0, 25, 50, 75, 100].map((value) => {
            const y = padding.top + chartHeight - (value / maxY) * chartHeight;
            return (
              <g key={value}>
                <line
                  x1={padding.left}
                  x2={width - padding.right}
                  y1={y}
                  y2={y}
                  stroke="currentColor"
                  className="text-zinc-200 dark:text-zinc-800"
                  strokeDasharray="4 6"
                />
                <text
                  x={4}
                  y={y + 4}
                  className="fill-zinc-400 text-[11px] dark:fill-zinc-500"
                >
                  {value}%
                </text>
              </g>
            );
          })}

          <path d={buildAreaPath(responsePoints, baselineY)} fill="url(#dashboard-response-area)" />
          <path d={buildLinePath(responsePoints)} fill="none" stroke="#8b5cf6" strokeWidth="3" />
          <path d={buildLinePath(interviewPoints)} fill="none" stroke="#06b6d4" strokeWidth="3" />
          <path d={buildLinePath(offerPoints)} fill="none" stroke="#10b981" strokeWidth="3" />

          {data.map((item, index) => (
            <text
              key={item.month}
              x={padding.left + stepX * index}
              y={height - 10}
              textAnchor="middle"
              className="fill-zinc-500 text-[11px] dark:fill-zinc-400"
            >
              {item.month}
            </text>
          ))}
        </svg>

        <div className="flex flex-wrap gap-3 text-sm text-zinc-600 dark:text-zinc-400">
          <LegendDot color="#8b5cf6" label="Response rate" />
          <LegendDot color="#06b6d4" label="Interview rate" />
          <LegendDot color="#10b981" label="Offer rate" />
        </div>
      </div>
    </DashboardSectionCard>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="size-2.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
