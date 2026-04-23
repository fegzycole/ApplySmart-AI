import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
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
import type { ApplicationVelocity } from "../../types/dashboard.types";

interface ApplicationVelocityChartBodyProps {
  data: ApplicationVelocity[];
}

export function ApplicationVelocityChartBody({ data }: ApplicationVelocityChartBodyProps) {
  return (
    <div className={`w-full ${DASHBOARD_CHART_HEIGHT}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={DASHBOARD_CHART_MARGIN}>
          <defs>
            <linearGradient id="dashboard-velocity-bar-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>
          <CartesianGrid {...DASHBOARD_CHART_GRID} />
          <XAxis dataKey="week" {...DASHBOARD_CHART_AXIS} />
          <YAxis {...DASHBOARD_CHART_AXIS} />
          <Tooltip
            contentStyle={DASHBOARD_CHART_TOOLTIP_STYLE}
            labelFormatter={(label) => {
              const item = data.find((velocity) => velocity.week === label);
              return item?.fullWeek || label;
            }}
          />
          <Legend wrapperStyle={DASHBOARD_CHART_LEGEND_STYLE} />
          <Bar
            dataKey="applications"
            fill="url(#dashboard-velocity-bar-gradient)"
            radius={[6, 6, 0, 0]}
            name="Applications"
            maxBarSize={60}
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="#f59e0b"
            strokeWidth={2}
            name="Target"
            strokeDasharray="5 5"
            dot={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
