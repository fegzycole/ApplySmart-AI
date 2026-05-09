import { FileText, Sparkles, X, ShieldCheck } from "lucide-react";
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
    <div className="relative group overflow-hidden rounded-[1.75rem] border-2 border-sky-500/20 bg-sky-50/10 p-4 dark:bg-sky-950/5 sm:rounded-[2.5rem] sm:p-6 lg:p-8">
      {/* Active Aura */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent blur-3xl opacity-50" />

      <Button
        variant="ghost"
        size="icon"
        onClick={onClear}
        className="absolute right-3 top-3 h-9 w-9 rounded-xl bg-white/50 backdrop-blur-xl border border-sky-100 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 transition-all dark:bg-zinc-900/50 dark:border-zinc-800 z-20 sm:right-5 sm:top-5 sm:h-11 sm:w-11 sm:rounded-2xl"
      >
        <X className="size-4 sm:size-5" />
      </Button>

      <div className="relative z-10 flex items-center gap-4 sm:gap-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white shadow-xl shadow-sky-500/20 sm:h-16 sm:w-16 sm:rounded-2xl">
          {resume.documentKind === "optimized" ? (
            <Sparkles className="size-6 sm:size-9" />
          ) : (
            <FileText className="size-6 sm:size-9" />
          )}
        </div>
        <div className="min-w-0 pr-10 sm:pr-14">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400 sm:text-[10px] sm:tracking-[0.3em]">
              Active Synthesis Specimen
            </p>
          </div>
          <h4 className="mt-1.5 text-lg font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase leading-none truncate sm:mt-2 sm:text-2xl">
            {resume.name}
          </h4>
          <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-3 sm:gap-3">
            {resume.score > 0 && (
              <div className="flex h-5 items-center px-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest sm:text-[10px]">
                Base Alignment: {resume.score}
              </div>
            )}
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-400 uppercase tracking-widest sm:text-[10px]">
              <ShieldCheck className="size-3 text-sky-500" />
              Verified
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
