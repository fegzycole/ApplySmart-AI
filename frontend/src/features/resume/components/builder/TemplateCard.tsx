import { Check } from "lucide-react";
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
      className={`group relative min-w-[220px] w-[220px] xl:min-w-0 xl:w-auto rounded-2xl border p-3 text-left transition-all ${
        isSelected
          ? "border-violet-500 bg-white shadow-lg shadow-violet-500/15 dark:border-violet-400 dark:bg-zinc-900"
          : "border-zinc-200 bg-white/80 hover:border-violet-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-violet-700 dark:hover:bg-zinc-900"
      }`}
      aria-pressed={isSelected}
    >
      <div className={`pointer-events-none absolute inset-0 rounded-2xl ${gradient} transition-opacity ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`} />

      <div className="relative z-10 flex items-start gap-3">
        <div className={`relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br ${color} ring-1 ring-black/5`}>
          <div className="absolute inset-[10%] rounded-lg bg-white/95 shadow-sm">
            <div className="flex h-full">
              <div className="w-[18%] bg-black/5" />
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

        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="truncate text-sm sm:text-base font-semibold text-zinc-900 dark:text-white">{name}</h4>
              <p className="mt-1 text-[11px] sm:text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                {description}
              </p>
            </div>

            <div
              className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                isSelected
                  ? "border-violet-500 bg-violet-500 text-white"
                  : "border-zinc-300 bg-white text-transparent dark:border-zinc-700 dark:bg-zinc-950"
              }`}
            >
              <Check className="size-3.5" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-2">
            <div className={`h-1.5 flex-1 rounded-full bg-gradient-to-r ${color} opacity-90`} />
            <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
              {isSelected ? "Active" : "Select"}
            </span>
          </div>
        </div>

      </div>
    </button>
  );
}
