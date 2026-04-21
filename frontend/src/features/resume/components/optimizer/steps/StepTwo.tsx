import { motion } from "framer-motion";
import { Textarea } from "@/shared/components/ui/textarea";
import { cn } from "@/shared/lib/utils";
import { StepHeader } from "../StepHeader";
import { StepNavigation } from "../StepNavigation";

interface StepTwoProps {
  jobDescription: string;
  onJobDescriptionChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
  canProceed: boolean;
}

export function StepTwo({
  jobDescription,
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
        className="min-h-[400px] resize-none rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:border-violet-500 dark:focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
      />

      <div className="flex items-center justify-between text-sm">
        <span
          className={cn(
            "font-medium",
            jobDescription.length >= 50
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-zinc-400"
          )}
        >
          {jobDescription.length} characters{" "}
          {jobDescription.length < 50 &&
            `• ${50 - jobDescription.length} more required`}
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
