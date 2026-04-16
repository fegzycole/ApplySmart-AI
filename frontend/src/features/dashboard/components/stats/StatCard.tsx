import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  trend: {
    value: string;
    isPositive: boolean;
  };
  gradient: {
    from: string;
    to: string;
  };
  shadowColor: string;
}

export function StatCard({ title, value, trend, gradient, shadowColor }: StatCardProps) {
  return (
    <Card className={`border-0 bg-gradient-to-br from-white ${gradient.to} dark:from-zinc-900 ${gradient.to.replace('to-', 'dark:to-').replace('/30', '/30')} shadow-xl ${shadowColor} backdrop-blur-sm hover:shadow-2xl ${shadowColor.replace('shadow-', 'hover:shadow-').replace('/10', '/20')} transition-all duration-300`}>
      <CardHeader className="pb-3">
        <CardDescription className="text-xs">{title}</CardDescription>
        <CardTitle className={`text-3xl sm:text-4xl bg-gradient-to-r ${gradient.from} ${gradient.to.replace('to-', 'to-').replace('-50', '-600').replace('/30', '')} bg-clip-text text-transparent`}>
          {value}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`flex items-center gap-1 text-xs sm:text-sm ${trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'} font-medium`}>
          {trend.isPositive ? <TrendingUp className="size-3 sm:size-4" /> : <TrendingDown className="size-3 sm:size-4" />}
          <span>{trend.value}</span>
        </div>
      </CardContent>
    </Card>
  );
}
