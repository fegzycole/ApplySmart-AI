import { Card, CardContent } from "@/shared/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  gradient: string;
}

export function StatCard({ title, value, icon: Icon, gradient }: StatCardProps) {
  return (
    <Card className={`border-0 bg-gradient-to-br ${gradient} col-span-3 lg:col-span-1`}>
      <CardContent className="p-6 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm lg:text-sm text-zinc-600 dark:text-zinc-400 mb-2 lg:mb-1 font-medium">
              {title}
            </p>
            <p className="text-4xl lg:text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              {value}
            </p>
          </div>
          <div className="size-16 lg:size-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg flex-shrink-0">
            <Icon className="size-8 lg:size-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
