import type { DashboardApplicationVelocity } from "../../types/dashboard.types";
import { DashboardSectionCard } from "./DashboardSectionCard";

interface ApplicationVelocityPanelProps {
  data: DashboardApplicationVelocity[];
}

export function ApplicationVelocityPanel({ data }: ApplicationVelocityPanelProps) {
  const width = 560;
  const height = 240;
  const padding = { top: 30, right: 20, bottom: 40, left: 20 };
  const chartHeight = height - padding.top - padding.bottom;
  const chartWidth = width - padding.left - padding.right;
  const maxValue = Math.max(
    1,
    ...data.map((item) => item.applications),
    ...data.map((item) => item.target),
  );
  const slotWidth = chartWidth / Math.max(data.length, 1);
  const barWidth = Math.max(16, slotWidth * 0.48);
  const targetValue = data[data.length - 1]?.target ?? 0;
  const targetY = padding.top + chartHeight - (targetValue / maxValue) * chartHeight;

  return (
    <DashboardSectionCard
      title="Weekly application pace"
      description="See whether your weekly submission rhythm is keeping up with your system target."
    >
      <div className="space-y-6">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full overflow-visible">
          <defs>
            <linearGradient id="velocity-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
            <filter id="glow-bar">
               <feGaussianBlur stdDeviation="2" result="blur" />
               <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padding.top + chartHeight - chartHeight * ratio;
            return (
              <line
                key={ratio}
                x1={padding.left}
                x2={width - padding.right}
                y1={y}
                y2={y}
                stroke="currentColor"
                className="text-zinc-100 dark:text-zinc-800"
                strokeWidth="1"
              />
            );
          })}

          {/* Target Threshold */}
          {targetValue > 0 ? (
            <g className="group/target">
               <line
                 x1={padding.left}
                 x2={width - padding.right}
                 y1={targetY}
                 y2={targetY}
                 stroke="#f59e0b"
                 strokeWidth="2"
                 strokeDasharray="6 4"
                 className="opacity-40"
               />
               <circle cx={width - padding.right} cy={targetY} r="3" fill="#f59e0b" className="animate-pulse shadow-lg" />
            </g>
          ) : null}

          {/* Data Bars */}
          {data.map((item, index) => {
            const x = padding.left + slotWidth * index + (slotWidth - barWidth) / 2;
            const barHeight = (item.applications / maxValue) * chartHeight;
            const y = padding.top + chartHeight - barHeight;

            return (
              <g key={item.fullWeek} className="group/bar transition-all duration-700">
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="8"
                  fill="url(#velocity-grad)"
                  className="transition-all duration-500 group-hover/bar:brightness-110"
                />
                {/* Interaction Overlay */}
                <rect
                  x={x}
                  y={padding.top}
                  width={barWidth}
                  height={chartHeight}
                  fill="transparent"
                  className="cursor-pointer"
                />
                <text
                  x={x + barWidth / 2}
                  y={height - 12}
                  textAnchor="middle"
                  className="fill-zinc-400 text-[10px] font-black uppercase tracking-widest"
                >
                  {item.week}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-3">
             <div className="h-2 w-2 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.6)]" />
             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Transmission Log</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="h-0.5 w-6 bg-amber-500/50 rounded-full" />
             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Target Pulse</span>
          </div>
        </div>
      </div>
    </DashboardSectionCard>
  );
}
