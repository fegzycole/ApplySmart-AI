import type { DashboardApplicationVelocity } from "../../types/dashboard.types";
import { DashboardSectionCard } from "./DashboardSectionCard";

interface ApplicationVelocityPanelProps {
  data: DashboardApplicationVelocity[];
}

export function ApplicationVelocityPanel({ data }: ApplicationVelocityPanelProps) {
  const width = 560;
  const height = 220;
  const padding = { top: 18, right: 18, bottom: 34, left: 18 };
  const chartHeight = height - padding.top - padding.bottom;
  const chartWidth = width - padding.left - padding.right;
  const maxValue = Math.max(
    1,
    ...data.map((item) => item.applications),
    ...data.map((item) => item.target),
  );
  const slotWidth = chartWidth / Math.max(data.length, 1);
  const barWidth = Math.max(14, slotWidth * 0.54);
  const targetValue = data[data.length - 1]?.target ?? 0;
  const targetY = padding.top + chartHeight - (targetValue / maxValue) * chartHeight;

  return (
    <DashboardSectionCard
      title="Weekly application pace"
      description="See whether your weekly submission rhythm is keeping up with your target."
    >
      <div className="space-y-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full">
          <defs>
            <linearGradient id="dashboard-velocity-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="oklch(0.65 0.18 200)" />
            </linearGradient>
          </defs>

          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padding.top + chartHeight - chartHeight * ratio;
            return (
              <g key={ratio}>
                <line
                  x1={padding.left}
                  x2={width - padding.right}
                  y1={y}
                  y2={y}
                  stroke="currentColor"
                  className="text-border"
                  strokeDasharray="4 6"
                />
              </g>
            );
          })}

          {targetValue > 0 ? (
            <line
              x1={padding.left}
              x2={width - padding.right}
              y1={targetY}
              y2={targetY}
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="8 8"
            />
          ) : null}

          {data.map((item, index) => {
            const x = padding.left + slotWidth * index + (slotWidth - barWidth) / 2;
            const barHeight = (item.applications / maxValue) * chartHeight;
            const y = padding.top + chartHeight - barHeight;

            return (
              <g key={item.fullWeek}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="10"
                  fill="url(#dashboard-velocity-gradient)"
                  opacity={index === data.length - 1 ? 1 : 0.82}
                />
                <text
                  x={x + barWidth / 2}
                  y={height - 10}
                  textAnchor="middle"
                  className="fill-muted-foreground text-[11px]"
                >
                  {item.week}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-primary" />
            Applications logged
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-0.5 w-5 bg-amber-500" />
            Weekly target
          </span>
        </div>
      </div>
    </DashboardSectionCard>
  );
}
