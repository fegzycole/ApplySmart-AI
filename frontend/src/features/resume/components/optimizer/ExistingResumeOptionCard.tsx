import { FileText, Sparkles } from "lucide-react";
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
        "w-full min-w-0 rounded-[1.25rem] border p-4 text-left transition-all",
        selected
          ? "border-violet-300 bg-gradient-to-r from-violet-50 to-cyan-50 shadow-sm dark:border-violet-800 dark:from-violet-950/40 dark:to-cyan-950/20"
          : "border-zinc-200 bg-white/80 hover:border-violet-200 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-violet-900 dark:hover:bg-zinc-900"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
          {resume.documentKind === "optimized" ? (
            <Sparkles className="size-4" />
          ) : (
            <FileText className="size-4" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
            {resume.name}
          </div>
          <div className="mt-1 flex flex-wrap gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            {typeof resume.score === "number" && resume.score > 0 ? <span>Score {resume.score}</span> : null}
            {resume.fileUrl ? <span>File ready</span> : null}
          </div>
        </div>
      </div>
    </button>
  );
}
