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
      className="space-y-6"
    >
      <StepHeader
        title="Job Description"
        description="Paste the full job description to tailor your resume"
      />

      <Textarea
        placeholder="Paste the complete job description here...&#10;&#10;Include requirements, responsibilities, qualifications, and skills for best optimization results."
        value={jobDescription}
        onChange={(e) => onJobDescriptionChange(e.target.value)}
        aria-invalid={Boolean(jobDescriptionError)}
        aria-describedby={jobDescriptionError ? "optimizer-job-description-error" : undefined}
        className={cn(
          "min-h-[400px] resize-none rounded-2xl bg-white text-zinc-900 focus:ring-2 focus:ring-violet-500/20 dark:bg-zinc-900 dark:text-white",
          jobDescriptionError
            ? "border-red-300 focus:border-red-500 dark:border-red-900 dark:focus:border-red-500"
            : "border-zinc-200 focus:border-violet-500 dark:border-zinc-800 dark:focus:border-violet-500",
        )}
      />

      {jobDescriptionError ? (
        <p
          id="optimizer-job-description-error"
          className="text-sm leading-6 text-red-600 dark:text-red-400"
        >
          {jobDescriptionError}
        </p>
      ) : null}

      <div className="flex items-center justify-between text-sm">
        <span
          className={cn(
            "font-medium",
            canProceed
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-zinc-500 dark:text-zinc-400"
          )}
        >
          {jobDescriptionStats.wordCount} words • {jobDescriptionStats.characterCount} characters
          {canProceed
            ? " • Looks like a complete job description"
            : " • Paste the full posting with responsibilities, requirements, or qualifications"}
        </span>
      </div>

      <StepNavigation
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!canProceed}
      />
    </motion.div>
  );
}
