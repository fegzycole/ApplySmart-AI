import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

interface DashboardSectionCardProps {
  title: string;
  description: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function DashboardSectionCard({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
}: DashboardSectionCardProps) {
  return (
    <Card className={`overflow-hidden rounded-[2.5rem] border-zinc-200/50 bg-white shadow-2xl shadow-zinc-200/30 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none ${className ?? ""}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-zinc-100 px-4 py-4 sm:items-center sm:gap-4 sm:px-6 sm:py-6 dark:border-zinc-900 lg:px-8">
        <div className="space-y-1 sm:space-y-1.5">
          <CardTitle className="text-base font-bold tracking-tight text-zinc-950 sm:text-xl dark:text-zinc-50">
            {title}
          </CardTitle>
          <p className="text-xs font-medium leading-relaxed text-zinc-500 sm:text-sm dark:text-zinc-400">{description}</p>
        </div>
        {action ? <div className="mt-0.5 shrink-0 sm:mt-0">{action}</div> : null}
      </CardHeader>
      <CardContent className={`px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 ${contentClassName ?? ""}`}>{children}</CardContent>
    </Card>
  );
}
