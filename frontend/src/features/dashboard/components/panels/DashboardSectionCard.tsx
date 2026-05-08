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
    <Card className={`overflow-hidden rounded-[1.75rem] border-zinc-200/80 bg-white/80 shadow-xl shadow-zinc-200/35 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/75 dark:shadow-black/20 ${className ?? ""}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-zinc-200/80 px-5 pb-5 pt-5 dark:border-zinc-800 sm:px-6">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold tracking-[-0.03em] text-zinc-950 dark:text-zinc-50">
            {title}
          </CardTitle>
          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </CardHeader>
      <CardContent className={`px-5 py-5 sm:px-6 ${contentClassName ?? ""}`}>{children}</CardContent>
    </Card>
  );
}
