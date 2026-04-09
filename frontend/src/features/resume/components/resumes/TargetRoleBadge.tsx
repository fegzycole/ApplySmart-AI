import { Sparkles } from "lucide-react";

interface TargetRoleBadgeProps {
  role: string;
}

export function TargetRoleBadge({ role }: TargetRoleBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-violet-950/50 dark:to-fuchsia-950/50 border border-violet-200 dark:border-violet-800 whitespace-nowrap">
      <Sparkles className="size-3 text-violet-600 dark:text-violet-400" />
      <span className="text-xs font-medium text-violet-700 dark:text-violet-300">
        {role}
      </span>
    </div>
  );
}
