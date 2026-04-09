import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CHART_TITLES, CHARTS_STYLES, CHART_COLORS } from "../../constants/admin.constants";

export function UserGrowthChart() {
  const data: any[] = [];

  return (
    <Card className={CHARTS_STYLES.card}>
      <CardHeader>
        <CardTitle>{CHART_TITLES.userGrowth.title}</CardTitle>
        <CardDescription>{CHART_TITLES.userGrowth.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-80 text-zinc-500">
            No data available
          </div>
        ) : (
          <div className={CHARTS_STYLES.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
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
                name="Total Users"
              />
              <Line
                type="monotone"
                dataKey="premium"
                stroke={CHART_COLORS.secondary}
                strokeWidth={2}
                name="Premium Users"
              />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
