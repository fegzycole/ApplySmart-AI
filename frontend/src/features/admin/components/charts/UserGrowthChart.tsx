import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CHART_TITLES, CHARTS_STYLES, CHART_COLORS } from "../../constants/admin.constants";
import { useAdminAnalytics } from "../../hooks";
import { ChartWrapper } from "./ChartWrapper";

export function UserGrowthChart() {
  const { data: analytics, isLoading, isError } = useAdminAnalytics();

  const chartData = analytics?.userGrowthData
    ? analytics.userGrowthData.labels.map((label, index) => ({
        month: label,
        users: analytics.userGrowthData.data[index],
      }))
    : [];

  const getChartState = () => {
    if (isLoading) return "loading";
    if (isError) return "error";
    if (chartData.length === 0) return "empty";
    return "success";
  };

  return (
    <ChartWrapper
      title={CHART_TITLES.userGrowth.title}
      description={CHART_TITLES.userGrowth.description}
      state={getChartState()}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.gridStroke} />
          <XAxis dataKey="month" stroke={CHART_COLORS.axisStroke} fontSize={12} />
          <YAxis stroke={CHART_COLORS.axisStroke} fontSize={12} />
          <Tooltip contentStyle={CHARTS_STYLES.tooltipStyle} />
          <Legend />
          <Line
            type="monotone"
            dataKey="users"
            stroke={CHART_COLORS.primary}
            strokeWidth={2}
            name="New Users"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
