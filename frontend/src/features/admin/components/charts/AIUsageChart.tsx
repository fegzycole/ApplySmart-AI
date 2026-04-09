import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CHART_TITLES, CHARTS_STYLES, CHART_COLORS } from "../../constants/admin.constants";

export function AIUsageChart() {
  const data: any[] = [];

  return (
    <Card className={CHARTS_STYLES.card}>
      <CardHeader>
        <CardTitle>{CHART_TITLES.aiUsage.title}</CardTitle>
        <CardDescription>{CHART_TITLES.aiUsage.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-80 text-zinc-500">
            No data available
          </div>
        ) : (
          <div className={CHARTS_STYLES.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.gridStroke} />
                <XAxis type="number" stroke={CHART_COLORS.axisStroke} fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="feature"
                  stroke={CHART_COLORS.axisStroke}
                  fontSize={12}
                  width={120}
                />
                <Tooltip contentStyle={CHARTS_STYLES.tooltipStyle} />
                <Bar dataKey="count" fill={CHART_COLORS.tertiary} radius={[0, 8, 8, 0]} name="Requests" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
