import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CHART_TITLES, CHARTS_STYLES, CHART_COLORS } from "../../constants/admin.constants";
import { useAdminAnalytics } from "../../hooks";
import { ChartWrapper } from "./ChartWrapper";

export function RevenueChart() {
  const { data: analytics, isLoading, isError } = useAdminAnalytics();

  const chartData = analytics?.revenueData
    ? analytics.revenueData.labels.map((label, index) => ({
        month: label,
        revenue: analytics.revenueData.data[index],
      }))
    : [];

  return (
    <ChartWrapper
      title={CHART_TITLES.revenue.title}
      description={CHART_TITLES.revenue.description}
      isLoading={isLoading}
      isError={isError}
      hasData={chartData.length > 0}
      emptyMessage="No data available (Stripe integration pending)"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.gridStroke} />
          <XAxis dataKey="month" stroke={CHART_COLORS.axisStroke} fontSize={12} />
          <YAxis stroke={CHART_COLORS.axisStroke} fontSize={12} />
          <Tooltip
            contentStyle={CHARTS_STYLES.tooltipStyle}
            formatter={(value) => `$${(value as number).toLocaleString()}`}
          />
          <Bar dataKey="revenue" fill={CHART_COLORS.primary} radius={[8, 8, 0, 0]} name="Revenue" />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
