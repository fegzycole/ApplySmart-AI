import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { CHART_TITLES, CHARTS_STYLES } from "../../constants/admin.constants";
import { useAdminAnalytics } from "../../hooks";
import { FEATURE_FLAGS } from "@/shared/config/feature-flags";
import { ChartWrapper } from "./ChartWrapper";

const COLORS = {
  Free: "#71717a",
  Pro: "#6366f1",
  Enterprise: "#10b981",
};

export function SubscriptionChart() {
  const { data: analytics, isLoading, isError } = useAdminAnalytics();

  if (!FEATURE_FLAGS.ADMIN_SUBSCRIPTION_ANALYTICS) return null;

  const chartData = analytics?.subscriptionData
    ? [
        { name: "Free", value: analytics.subscriptionData.freeUsers, color: COLORS.Free },
        { name: "Pro", value: analytics.subscriptionData.proUsers, color: COLORS.Pro },
        { name: "Enterprise", value: analytics.subscriptionData.enterpriseUsers, color: COLORS.Enterprise },
      ].filter(item => item.value > 0)
    : [];

  const getChartState = () => {
    if (isLoading) return "loading";
    if (isError) return "error";
    if (chartData.length === 0) return "empty";
    return "success";
  };

  return (
    <ChartWrapper
      title={CHART_TITLES.subscriptions.title}
      description={CHART_TITLES.subscriptions.description}
      state={getChartState()}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={CHARTS_STYLES.tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
