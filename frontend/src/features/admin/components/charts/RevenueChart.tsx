import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CHART_TITLES, CHARTS_STYLES, CHART_COLORS } from "../../constants/admin.constants";

export function RevenueChart() {
  const data: any[] = [];

  return (
    <Card className={CHARTS_STYLES.card}>
      <CardHeader>
        <CardTitle>{CHART_TITLES.revenue.title}</CardTitle>
        <CardDescription>{CHART_TITLES.revenue.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-80 text-zinc-500">
            No data available
          </div>
        ) : (
          <div className={CHARTS_STYLES.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}
