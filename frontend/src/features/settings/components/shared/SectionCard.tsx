import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";

interface SectionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
  iconGradient?: string;
}

export function SectionCard({
  icon: Icon,
  title,
  description,
  children,
  iconGradient = "from-violet-500 to-fuchsia-500"
}: SectionCardProps) {
  return (
    <Card className="overflow-hidden rounded-[1.5rem] border border-zinc-200/80 bg-white/85 shadow-[0_16px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/80 sm:rounded-[1.75rem]">
      <div className="h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent dark:via-violet-800" />
      <CardHeader className="px-4 pb-4 pt-5 sm:px-6 sm:pt-6">
        <div className="flex items-center gap-3">
          <div className={`flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br ${iconGradient} shadow-lg sm:size-11`}>
            <Icon className="size-5 text-white" />
          </div>
          <div className="min-w-0">
            <CardTitle className="text-lg tracking-[-0.01em] sm:text-xl">{title}</CardTitle>
            <CardDescription className="mt-1 text-sm leading-6">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 px-4 pb-4 pt-0 sm:space-y-6 sm:px-6 sm:pb-6">
        {children}
      </CardContent>
    </Card>
  );
}
