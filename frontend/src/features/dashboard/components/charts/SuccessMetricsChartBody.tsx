import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  DASHBOARD_CHART_AXIS,
  DASHBOARD_CHART_GRID,
  DASHBOARD_CHART_HEIGHT,
  DASHBOARD_CHART_LEGEND_STYLE,
  DASHBOARD_CHART_MARGIN,
  DASHBOARD_CHART_TOOLTIP_STYLE,
} from "../../constants/dashboard-chart.constants";
import type { SuccessMetric } from "../../types/dashboard.types";

interface SuccessMetricsChartBodyProps {
  data: SuccessMetric[];
}

export function SuccessMetricsChartBody({ data }: SuccessMetricsChartBodyProps) {
  return (
    <div className={`w-full ${DASHBOARD_CHART_HEIGHT}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={DASHBOARD_CHART_MARGIN}>
          <defs>
            <linearGradient id="dashboard-success-response-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="dashboard-success-interview-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="dashboard-success-offer-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid {...DASHBOARD_CHART_GRID} />
          <XAxis dataKey="month" {...DASHBOARD_CHART_AXIS} />
          <YAxis
            {...DASHBOARD_CHART_AXIS}
            label={{
              value: "%",
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 11 },
            }}
          />
          <Tooltip
            contentStyle={DASHBOARD_CHART_TOOLTIP_STYLE}
            formatter={(value) => `${Number(value).toFixed(1)}%`}
          />
          <Legend wrapperStyle={DASHBOARD_CHART_LEGEND_STYLE} />
          <Area
            type="monotone"
            dataKey="responseRate"
            stroke="#8b5cf6"
            strokeWidth={2}
            fill="url(#dashboard-success-response-gradient)"
            name="Response Rate"
          />
          <Area
            type="monotone"
            dataKey="interviewRate"
            stroke="#06b6d4"
            strokeWidth={2}
            fill="url(#dashboard-success-interview-gradient)"
            name="Interview Rate"
          />
          <Area
            type="monotone"
            dataKey="offerRate"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#dashboard-success-offer-gradient)"
            name="Offer Rate"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
