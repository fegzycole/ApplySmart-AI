import { FileText, Sparkles, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import type { Resume } from "../../services/resume.service";

interface SelectedResumeCardProps {
  onClear: () => void;
  resume: Resume;
}

export function SelectedResumeCard({
  onClear,
  resume,
}: SelectedResumeCardProps) {
  return (
    <div className="relative min-w-0 rounded-[1.5rem] border border-violet-200 bg-gradient-to-r from-violet-50 to-cyan-50 p-4 shadow-sm dark:border-violet-900 dark:from-violet-950/40 dark:to-cyan-950/20 sm:p-5">
      <Button
        variant="ghost"
        size="icon"
        onClick={onClear}
        className="absolute right-3 top-3 size-8 rounded-full"
      >
        <X className="size-4" />
      </Button>

      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-violet-600 shadow-sm dark:bg-zinc-900/80 dark:text-violet-300">
          {resume.documentKind === "optimized" ? (
            <Sparkles className="size-5" />
          ) : (
            <FileText className="size-5" />
          )}
        </div>
        <div className="min-w-0 pr-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
            Selected Resume
          </p>
          <p className="mt-2 break-words text-sm font-semibold text-zinc-900 dark:text-white sm:text-base">
            {resume.name}
          </p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-600 dark:text-zinc-300">
            {resume.score > 0 ? <span>Score {resume.score}</span> : null}
            {resume.fileUrl ? <span>File ready</span> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
