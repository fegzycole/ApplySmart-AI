import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";

interface DashboardMetricCardProps {
  label: string;
  value: string;
  hint: string;
  icon?: LucideIcon;
}

export function DashboardMetricCard({ label, value, hint, icon: Icon }: DashboardMetricCardProps) {
  return (
    <Card className="group relative overflow-hidden rounded-[2rem] border-border bg-card shadow-xl shadow-primary/5 transition-all hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10 dark:shadow-none">
      <CardContent className="relative space-y-3 p-4 sm:space-y-4 sm:p-5 lg:p-6">
        <div className="flex items-start justify-between">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-muted-foreground transition-colors group-hover:text-primary sm:text-[0.65rem] sm:tracking-[0.2em]">
            {label}
          </p>
          {Icon && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="size-4" />
            </div>
          )}
        </div>

        <div className="space-y-1">
          <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {value}
          </span>
          <p className="text-xs font-medium leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/80">
            {hint}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
