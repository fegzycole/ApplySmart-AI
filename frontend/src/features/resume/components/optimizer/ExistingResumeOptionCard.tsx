import { FileText, Sparkles, ShieldCheck } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { Resume } from "../../services/resume.service";

interface ExistingResumeOptionCardProps {
  onSelect: (resumeId: number) => void;
  resume: Resume;
  selected: boolean;
}

export function ExistingResumeOptionCard({
  onSelect,
  resume,
  selected,
}: ExistingResumeOptionCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(resume.id)}
      className={cn(
        "group relative w-full min-w-0 rounded-[1.75rem] border-2 p-5 text-left transition-all duration-500",
        selected
          ? "border-sky-500 bg-white shadow-2xl dark:bg-zinc-800 dark:border-sky-500 shadow-sky-500/10"
          : "border-zinc-100 bg-white/40 dark:border-zinc-800 dark:bg-zinc-900/40 hover:border-zinc-200 dark:hover:border-zinc-700"
      )}
    >
      {/* Selection Aura */}
      {selected && (
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent blur-2xl pointer-events-none" />
      )}

      <div className="relative z-10 flex items-center gap-4">
        <div className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-xl transition-all duration-500",
          selected 
            ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20" 
            : "bg-zinc-50 text-zinc-400 dark:bg-zinc-950 dark:border dark:border-zinc-800 group-hover:bg-zinc-100"
        )}>
          {resume.documentKind === "optimized" ? (
            <Sparkles className="size-6" />
          ) : (
            <FileText className="size-6" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className={cn(
            "truncate text-sm font-black tracking-tight uppercase leading-none transition-colors duration-500 sm:text-base",
            selected ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-500 dark:text-zinc-400"
          )}>
            {resume.name}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5">
            {typeof resume.score === "number" && resume.score > 0 && (
              <div className="inline-flex h-5 items-center px-2 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider shrink-0">
                Score: {resume.score}
              </div>
            )}
            <div className="inline-flex items-center gap-1 text-[9px] font-bold text-zinc-400 uppercase tracking-wider shrink-0">
              <ShieldCheck className="size-3 text-sky-500 shrink-0" />
              <span>Verified</span>
            </div>
          </div>
        </div>

        {selected && (
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg shadow-sky-500/20">
            <ShieldCheck className="size-3.5" />
          </div>
        )}
      </div>
    </button>
  );
}
