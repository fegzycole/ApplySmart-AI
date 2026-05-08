import { Card, CardContent } from "@/shared/components/ui/card";

interface DashboardMetricCardProps {
  label: string;
  value: string;
  hint: string;
}

export function DashboardMetricCard({ label, value, hint }: DashboardMetricCardProps) {
  return (
    <Card className="overflow-hidden rounded-[1.6rem] border-zinc-200/80 bg-white/80 shadow-lg shadow-zinc-200/40 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/75 dark:shadow-black/20">
      <CardContent className="space-y-3 p-5">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
        <div className="flex items-end justify-between gap-3">
          <span className="text-3xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">
            {value}
          </span>
        </div>
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{hint}</p>
      </CardContent>
    </Card>
  );
}
