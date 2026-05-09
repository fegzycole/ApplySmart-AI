import type { DashboardSuccessMetric } from "../../types/dashboard.types";
import { buildAreaPath, buildLinePath } from "../../utils/dashboard-chart.utils";
import { DashboardSectionCard } from "./DashboardSectionCard";

interface OutcomeTrendPanelProps {
  data: DashboardSuccessMetric[];
}

export function OutcomeTrendPanel({ data }: OutcomeTrendPanelProps) {
  const width = 560;
  const height = 240;
  const padding = { top: 30, right: 30, bottom: 40, left: 40 };
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
      <div className="space-y-6">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full overflow-visible">
          <defs>
            <linearGradient id="trend-area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
            <filter id="line-glow">
               <feGaussianBlur stdDeviation="1.5" result="blur" />
               <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid Lines */}
          {[0, 50, 100].map((value) => {
            const y = padding.top + chartHeight - (value / maxY) * chartHeight;
            return (
              <g key={value}>
                <line
                  x1={padding.left}
                  x2={width - padding.right}
                  y1={y}
                  y2={y}
                  stroke="currentColor"
                  className="text-zinc-100 dark:text-zinc-800"
                  strokeWidth="1"
                />
                <text
                  x={8}
                  y={y + 4}
                  className="fill-zinc-400 text-[10px] font-black uppercase tracking-widest"
                >
                  {value}%
                </text>
              </g>
            );
          })}

          <path d={buildAreaPath(responsePoints, baselineY)} fill="url(#trend-area-grad)" />
          
          {/* High Fidelity Glow Lines */}
          <path d={buildLinePath(responsePoints)} fill="none" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round" filter="url(#line-glow)" />
          <path d={buildLinePath(interviewPoints)} fill="none" stroke="#0ea5e9" strokeWidth="4" strokeLinecap="round" filter="url(#line-glow)" />
          <path d={buildLinePath(offerPoints)} fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" filter="url(#line-glow)" />

          {/* Data Points */}
          {responsePoints.map((p, i) => (
             <circle key={`resp-${i}`} cx={p.x} cy={p.y} r="3" fill="#8b5cf6" className="shadow-lg" />
          ))}

          {data.map((item, index) => (
            <text
              key={item.month}
              x={padding.left + stepX * index}
              y={height - 12}
              textAnchor="middle"
              className="fill-zinc-400 text-[10px] font-black uppercase tracking-widest"
            >
              {item.month}
            </text>
          ))}
        </svg>

        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <LegendItem color="#8b5cf6" label="Response" />
          <LegendItem color="#0ea5e9" label="Interview" />
          <LegendItem color="#10b981" label="Offer" />
        </div>
      </div>
    </DashboardSectionCard>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-2 w-2">
         <div className="absolute inset-0 rounded-full bg-current opacity-20 animate-ping" style={{ color }} />
         <div className="relative h-full w-full rounded-full bg-current" style={{ color }} />
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label} Sector</span>
    </div>
  );
}
