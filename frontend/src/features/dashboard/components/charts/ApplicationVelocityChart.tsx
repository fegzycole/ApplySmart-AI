import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { EmptyState } from "@/shared/components/EmptyState";
import { LoadingSkeleton } from "@/shared/components/skeletons";
import { Zap } from "lucide-react";
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useApplicationVelocity } from "../../hooks";

export function ApplicationVelocityChart() {
  const { data: applicationVelocity, isLoading } = useApplicationVelocity();

  return (
    <Card className="border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg flex-shrink-0">
              <Zap className="size-5 text-white" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-lg sm:text-xl">
                Application Velocity
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Weekly applications vs. your target goal
              </CardDescription>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 self-start sm:self-center flex-shrink-0">
            <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
              Last 12 weeks
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        {isLoading ? (
          <LoadingSkeleton variant="chart" height="h-72 sm:h-80" />
        ) : !applicationVelocity || applicationVelocity.length === 0 ? (
          <EmptyState message="No data available" height="h-72 sm:h-80" />
        ) : (
          <div className="w-full h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={applicationVelocity}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="dashboard-velocity-bar-gradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#d4d4d8"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="week"
                  stroke="#71717a"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                />
                <YAxis
                  stroke="#71717a"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.98)",
                    border: "1px solid #e4e4e7",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                    fontSize: "12px",
                  }}
                  labelFormatter={(label) => {
                    const item = applicationVelocity.find(
                      (d) => d.week === label,
                    );
                    return item?.fullWeek || label;
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                />
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
        )}
      </CardContent>
    </Card>
  );
}
