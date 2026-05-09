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
    <Card className={`overflow-hidden rounded-[3rem] border-zinc-100 bg-white shadow-[0_40px_80px_-24px_rgba(0,0,0,0.06)] dark:border-zinc-800 dark:bg-zinc-900/60 backdrop-blur-3xl transition-all duration-700 hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.1)] ${className ?? ""}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-6 px-6 py-8 sm:px-10 sm:py-10 dark:border-zinc-800 lg:px-12">
        <div className="space-y-3 min-w-0">
          <div className="flex items-center gap-3">
             <div className="h-2 w-2 rounded-full bg-sky-500 animate-pulse shadow-[0_0_12px_rgba(14,165,233,0.6)]" />
             <CardTitle className="text-xl font-black tracking-tighter text-zinc-900 sm:text-2xl lg:text-3xl dark:text-zinc-50 uppercase">
               {title}
             </CardTitle>
          </div>
          <p className="text-sm font-medium leading-relaxed text-zinc-500 sm:text-base dark:text-zinc-400 max-w-2xl">{description}</p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </CardHeader>
      <CardContent className={`px-6 pb-10 sm:px-10 sm:pb-12 lg:px-12 lg:pb-16 ${contentClassName ?? ""}`}>{children}</CardContent>
    </Card>
  );
}
