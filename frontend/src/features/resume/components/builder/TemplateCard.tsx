import { Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { ResumeTemplate } from "../../types/resume-builder.types";

interface TemplateCardProps {
  id: ResumeTemplate;
  name: string;
  description: string;
  color: string;
  gradient: string;
  isSelected: boolean;
  onSelect: (id: ResumeTemplate) => void;
}

export function TemplateCard({ id, name, description, color, gradient, isSelected, onSelect }: TemplateCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={cn(
        "group relative w-full rounded-[1.75rem] border-2 p-3 text-left transition-all sm:rounded-3xl sm:p-4",
        isSelected
          ? "border-primary bg-background shadow-2xl shadow-primary/10"
          : "border-border bg-background/50 hover:border-primary/30 hover:bg-background dark:bg-card/30 dark:hover:bg-card/50",
      )}
      aria-pressed={isSelected}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-3xl",
          gradient,
          "transition-opacity",
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-60",
        )}
      />

      <div className="relative z-10 flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
        <div
          className={cn(
            "relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-gradient-to-br",
            color,
            "shadow-lg ring-1 ring-black/5 sm:aspect-[4/5] sm:w-20 sm:rounded-2xl xl:w-24",
          )}
        >
          <div className="absolute inset-[10%] rounded-lg bg-white/95 shadow-sm">
            <div className="flex h-full">
              <div className="w-[18%] bg-zinc-100" />
              <div className="flex-1 px-2 py-2">
                <div className="h-1.5 w-3/4 rounded-full bg-zinc-800/80" />
                <div className="mt-2 h-1 w-full rounded-full bg-zinc-300" />
                <div className="mt-1 h-1 w-5/6 rounded-full bg-zinc-300" />
                <div className="mt-3 h-1 w-2/3 rounded-full bg-zinc-400" />
                <div className="mt-1 h-1 w-full rounded-full bg-zinc-200" />
                <div className="mt-1 h-1 w-4/5 rounded-full bg-zinc-200" />
                <div className="mt-3 h-1 w-1/2 rounded-full bg-zinc-400" />
                <div className="mt-1 h-1 w-full rounded-full bg-zinc-200" />
                <div className="mt-1 h-1 w-3/4 rounded-full bg-zinc-200" />
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1 pt-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="truncate text-sm font-bold tracking-tight text-foreground sm:text-base">{name}</h4>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                {description}
              </p>
            </div>

            <div
              className={cn(
                "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                isSelected
                  ? "border-primary bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20"
                  : "border-muted-foreground/20 bg-background text-transparent",
              )}
            >
              <Check className="size-3.5" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 sm:mt-5">
            <div className={cn("h-2 flex-1 rounded-full bg-gradient-to-r", color, "opacity-90")} />
            <span
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.2em]",
                isSelected ? "text-primary" : "text-muted-foreground/40",
              )}
            >
              {isSelected ? "Active" : "Select"}
            </span>
          </div>
        </div>

      </div>
    </button>
  );
}
