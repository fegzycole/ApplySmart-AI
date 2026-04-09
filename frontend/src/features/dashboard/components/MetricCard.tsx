import { Card, CardContent } from "@/shared/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  iconBg,
  trend,
}: MetricCardProps) {
  return (
    <Card className="border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-white">{value}</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">{subtitle}</p>
          </div>
          <div className={`size-12 rounded-xl ${iconBg} flex items-center justify-center shadow-lg`}>
            <Icon className={`size-6 ${iconColor}`} />
          </div>
        </div>
        {trend && (
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${trend.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
              {trend.value}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-500">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
