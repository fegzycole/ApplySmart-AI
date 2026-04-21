import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface ScoreCardProps {
  label: string;
  score: number;
  rating?: { label: string; color: string };
  icon?: ReactNode;
  variant?: "default" | "highlight";
  prefix?: string;
}

export function ScoreCard({
  label,
  score,
  rating,
  icon,
  variant = "default",
  prefix = "",
}: ScoreCardProps) {
  const isHighlight = variant === "highlight";

  return (
    <div
      className={cn(
        "rounded-2xl p-6 space-y-4",
        isHighlight
          ? "border-2 border-violet-200 dark:border-violet-900 bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/30 dark:to-fuchsia-950/30"
          : "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
      )}
    >
      <div
        className={cn(
          "text-sm font-medium uppercase tracking-wide flex items-center gap-2",
          isHighlight
            ? "text-violet-700 dark:text-violet-400"
            : "text-zinc-500 dark:text-zinc-400"
        )}
      >
        {icon}
        {label}
      </div>
      <div className="space-y-2">
        <div
          className={cn(
            "text-5xl font-bold",
            isHighlight
              ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent"
              : "text-zinc-900 dark:text-white"
          )}
        >
          {prefix}
          {score}
        </div>
        {rating && (
          <div className={cn("text-sm font-medium", rating.color)}>
            {rating.label}
          </div>
        )}
      </div>
    </div>
  );
}
