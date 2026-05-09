import { motion, AnimatePresence } from "framer-motion";
import { StepHeader } from "../StepHeader";
import { OptimizerCoverLetterOptions } from "../OptimizerCoverLetterOptions";
import { TemplateSelector } from "../TemplateSelector";
import { StepNavigation } from "../StepNavigation";
import { OptimizerErrorCard } from "../OptimizerErrorCard";
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
      className="space-y-8 sm:space-y-10 lg:space-y-12"
    >
      <StepHeader
        title="Neural Calibration"
        description="Select a structural blueprint and calibrate secondary narrative artifacts."
      />

      <div className="space-y-6">
        <div className="flex items-center gap-4 ml-1">
          <div className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
          <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400">Blueprint Selection</h4>
        </div>
        <TemplateSelector
          selected={selectedTemplate}
          onSelect={onTemplateSelect}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4 ml-1">
          <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400">Narrative Synthesis</h4>
        </div>
        <OptimizerCoverLetterOptions
          options={coverLetter}
          onChange={onCoverLetterChange}
        />
      </div>

      <AnimatePresence mode="wait">
        {errorMessage ? (
          <OptimizerErrorCard 
            key="error"
            message={errorMessage} 
            onRetry={onSubmit} 
          />
        ) : null}
      </AnimatePresence>

      <div className="pt-8">
        <StepNavigation
          onBack={onBack}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          submitDisabled={isSubmitting}
        />
      </div>
    </motion.div>
  );
}
