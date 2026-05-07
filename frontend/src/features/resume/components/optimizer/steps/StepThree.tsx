import { motion } from "framer-motion";
import { StepHeader } from "../StepHeader";
import { OptimizerCoverLetterOptions } from "../OptimizerCoverLetterOptions";
import { TemplateSelector } from "../TemplateSelector";
import { StepNavigation } from "../StepNavigation";
import type { ResumeTemplate } from "../../../types/resume-builder.types";
import type { ResumeOptimizerCoverLetterOptions } from "../../../types/resume-optimizer.types";

interface StepThreeProps {
  selectedTemplate: ResumeTemplate;
  onTemplateSelect: (template: ResumeTemplate) => void;
  coverLetter: ResumeOptimizerCoverLetterOptions;
  onCoverLetterChange: (updates: Partial<ResumeOptimizerCoverLetterOptions>) => void;
  errorMessage?: string | null;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function StepThree({
  selectedTemplate,
  onTemplateSelect,
  coverLetter,
  onCoverLetterChange,
  errorMessage,
  onBack,
  onSubmit,
  isSubmitting,
}: StepThreeProps) {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <StepHeader
        title="Choose Template"
        description="Select a design that fits your industry"
      />

      <TemplateSelector
        selected={selectedTemplate}
        onSelect={onTemplateSelect}
      />

      <OptimizerCoverLetterOptions
        options={coverLetter}
        onChange={onCoverLetterChange}
      />

      {errorMessage ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          {errorMessage}
        </div>
      ) : null}

      <StepNavigation
        onBack={onBack}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        submitDisabled={isSubmitting}
      />
    </motion.div>
  );
}
