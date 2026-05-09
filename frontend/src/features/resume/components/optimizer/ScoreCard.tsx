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
        "group relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border-2 p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 transition-all duration-700 hover:-translate-y-1",
        isHighlight
          ? "border-amber-500/20 bg-amber-500/5 shadow-[0_20px_50px_-12px_rgba(245,158,11,0.2)] dark:bg-amber-500/10"
          : "border-white/60 bg-white/40 shadow-2xl backdrop-blur-3xl dark:border-zinc-800/60 dark:bg-zinc-900/40"
      )}
    >
      {/* Decorative Aura for Highlight */}
      {isHighlight && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent blur-3xl opacity-50 pointer-events-none" />
      )}

      <div
        className={cn(
          "text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] flex items-center gap-3 sm:gap-4",
          isHighlight
            ? "text-amber-600 dark:text-amber-400"
            : "text-zinc-400 dark:text-zinc-500"
        )}
      >
        <div className={cn(
          "flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl shadow-inner transition-transform duration-500 group-hover:scale-110",
          isHighlight 
            ? "bg-amber-500 text-white shadow-amber-500/20" 
            : "bg-zinc-100 text-zinc-500 dark:bg-zinc-950 dark:border dark:border-zinc-800"
        )}>
          {icon}
        </div>
        <span className="truncate">{label}</span>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        <div
          className={cn(
            "text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-none",
            isHighlight
              ? "text-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]"
              : "text-zinc-900 dark:text-zinc-50"
          )}
        >
          {prefix}{score}
        </div>
        
        {rating && (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={cn("h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full", isHighlight ? "bg-amber-500 animate-pulse" : "bg-sky-500")} />
            <div className={cn("text-[10px] sm:text-xs font-black uppercase tracking-widest leading-none", rating.color)}>
              {rating.label}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
