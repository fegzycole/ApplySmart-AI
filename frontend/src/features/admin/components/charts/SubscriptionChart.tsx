import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { CHART_TITLES, CHARTS_STYLES } from "../../constants/admin.constants";

export function SubscriptionChart() {
  const data: any[] = [];

  return (
    <Card className={CHARTS_STYLES.card}>
      <CardHeader>
        <CardTitle>{CHART_TITLES.subscriptions.title}</CardTitle>
        <CardDescription>{CHART_TITLES.subscriptions.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-80 text-zinc-500">
            No data available
          </div>
        ) : (
          <div className={CHARTS_STYLES.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={CHARTS_STYLES.tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
