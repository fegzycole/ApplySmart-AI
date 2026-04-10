import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CHART_TITLES, CHARTS_STYLES, CHART_COLORS } from "../../constants/admin.constants";
import { useAdminAnalytics } from "../../hooks";
import { ChartWrapper } from "./ChartWrapper";

export function AIUsageChart() {
  const { data: analytics, isLoading, isError } = useAdminAnalytics();

  const chartData = analytics?.aiUsageData
    ? [
        { feature: "Resume Analyses", count: analytics.aiUsageData.resumeAnalyses },
        { feature: "Resume Optimizations", count: analytics.aiUsageData.resumeOptimizations },
        { feature: "Cover Letters", count: analytics.aiUsageData.coverLettersGenerated },
      ]
    : [];

  return (
    <ChartWrapper
      title={CHART_TITLES.aiUsage.title}
      description={CHART_TITLES.aiUsage.description}
      isLoading={isLoading}
      isError={isError}
      hasData={chartData.length > 0}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.gridStroke} />
          <XAxis type="number" stroke={CHART_COLORS.axisStroke} fontSize={12} />
          <YAxis
            type="category"
            dataKey="feature"
            stroke={CHART_COLORS.axisStroke}
            fontSize={12}
            width={150}
          />
          <Tooltip contentStyle={CHARTS_STYLES.tooltipStyle} />
          <Bar dataKey="count" fill={CHART_COLORS.tertiary} radius={[0, 8, 8, 0]} name="Requests" />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
