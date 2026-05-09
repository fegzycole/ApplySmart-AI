import { motion } from "framer-motion";
import { Textarea } from "@/shared/components/ui/textarea";
import { cn } from "@/shared/lib/utils";
import type { JobDescriptionStats } from "@/shared/utils/job-description.validation";
import { StepHeader } from "../StepHeader";
import { StepNavigation } from "../StepNavigation";

interface StepTwoProps {
  jobDescription: string;
  jobDescriptionError?: string | null;
  jobDescriptionStats: JobDescriptionStats;
  onJobDescriptionChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
  canProceed: boolean;
}

export function StepTwo({
  jobDescription,
  jobDescriptionError,
  jobDescriptionStats,
  onJobDescriptionChange,
  onBack,
  onNext,
  canProceed,
}: StepTwoProps) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 sm:space-y-8 lg:space-y-10"
    >
      <StepHeader
        title="Blueprint Definition"
        description="Scan and index target role parameters to calibrate the neural alignment engine."
      />

      <div className="relative group">
        <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-sky-500/20 to-transparent opacity-0 transition-opacity group-focus-within:opacity-100 blur-sm sm:rounded-[3rem]" />
        <Textarea
          placeholder="Paste the complete role blueprint here...&#10;&#10;Inject requirements, responsibilities, and qualifications for surgical calibration."
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
          aria-invalid={Boolean(jobDescriptionError)}
          aria-describedby={jobDescriptionError ? "optimizer-job-description-error" : undefined}
          className={cn(
            "relative min-h-[200px] resize-none rounded-[1.5rem] border-2 bg-background/50 p-4 text-sm leading-relaxed backdrop-blur-3xl transition-all duration-500 shadow-inner sm:min-h-[320px] sm:rounded-[2.5rem] sm:p-6 sm:text-base lg:min-h-[480px] lg:p-10 lg:text-lg",
            jobDescriptionError
              ? "border-rose-500 focus-visible:ring-rose-500/10"
              : "border-zinc-100 dark:border-zinc-800 focus-visible:border-sky-500 focus-visible:ring-4 focus-visible:ring-sky-500/5",
          )}
        />

        {/* Scanned Artifact Overlay Decorator */}
        <div className="absolute bottom-3 right-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/5 dark:bg-white/5 border border-zinc-100 dark:border-zinc-800 backdrop-blur-md pointer-events-none sm:bottom-5 sm:right-6 sm:gap-3 sm:px-4 sm:py-2">
          <div className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 sm:text-[10px]">Spec-Scan Active</span>
        </div>
      </div>

      {jobDescriptionError ? (
        <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-rose-50 border-2 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30">
          <div className="h-2 w-2 rounded-full bg-rose-500" />
          <p id="optimizer-job-description-error" className="text-sm font-black uppercase tracking-tight text-rose-600 dark:text-rose-400">
            Scanning Failure: {jobDescriptionError}
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border-2 border-zinc-100 bg-white/40 p-4 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-900/40 sm:rounded-[2rem] sm:gap-6 sm:p-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 sm:text-[10px]">Word Count</span>
            <span className="text-lg font-black text-zinc-900 dark:text-zinc-50 tabular-nums sm:text-xl">{jobDescriptionStats.wordCount}</span>
          </div>
          <div className="h-8 w-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full sm:h-10" />
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 sm:text-[10px]">Characters</span>
            <span className="text-lg font-black text-zinc-900 dark:text-zinc-50 tabular-nums sm:text-xl">{jobDescriptionStats.characterCount}</span>
          </div>
        </div>

        <div className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-full border-2 transition-all duration-700 sm:gap-3 sm:px-5 sm:py-2.5",
          canProceed
            ? "border-emerald-500/20 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
            : "border-zinc-100 bg-zinc-50 text-zinc-400 dark:bg-zinc-800/40"
        )}>
          <div className={cn("h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2", canProceed ? "bg-emerald-500 animate-pulse" : "bg-zinc-300 dark:bg-zinc-700")} />
          <span className="text-[9px] font-black uppercase tracking-[0.15em] sm:text-[11px] sm:tracking-[0.2em]">
            {canProceed ? "Calibrated • Ready" : "Awaiting parameters..."}
          </span>
        </div>
      </div>

      <div className="pt-4">
        <StepNavigation
          onBack={onBack}
          onNext={onNext}
          nextDisabled={!canProceed}
        />
      </div>
    </motion.div>
  );
}
