import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { EmptyState } from "@/shared/components/EmptyState";
import { LoadingSkeleton } from "@/shared/components/skeletons";
import { Activity } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSuccessMetrics } from "../../hooks";

export function SuccessMetricsChart() {
  const { data: successMetrics, isLoading } = useSuccessMetrics();

  return (
    <Card className="lg:col-span-2 border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg flex-shrink-0">
            <Activity className="size-5 text-white" />
          </div>
          <div className="min-w-0">
            <CardTitle className="text-lg sm:text-xl">
              Success Metrics Trend
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Response, interview, and offer rates over time
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        {isLoading ? (
          <LoadingSkeleton variant="chart" height="h-72 sm:h-80" />
        ) : !successMetrics || successMetrics.length === 0 ? (
          <EmptyState message="No data available" height="h-72 sm:h-80" />
        ) : (
          <div className="w-full h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={successMetrics}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="dashboard-success-response-gradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient
                    id="dashboard-success-interview-gradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient
                    id="dashboard-success-offer-gradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#d4d4d8"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="month"
                  stroke="#71717a"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                />
                <YAxis
                  stroke="#71717a"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  label={{
                    value: "%",
                    angle: -90,
                    position: "insideLeft",
                    style: { fontSize: 11 },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.98)",
                    border: "1px solid #e4e4e7",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                    fontSize: "12px",
                  }}
                  formatter={(value) => `${Number(value).toFixed(1)}%`}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                />
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
        )}
      </CardContent>
    </Card>
  );
}
