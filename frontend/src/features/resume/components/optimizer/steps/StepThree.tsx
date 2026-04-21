import { motion } from "framer-motion";
import { StepHeader } from "../StepHeader";
import { TemplateSelector } from "../TemplateSelector";
import { StepNavigation } from "../StepNavigation";

type ResumeTemplate = "MODERN" | "PROFESSIONAL" | "CLASSIC" | "CREATIVE";

interface StepThreeProps {
  selectedTemplate: ResumeTemplate;
  onTemplateSelect: (template: ResumeTemplate) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function StepThree({
  selectedTemplate,
  onTemplateSelect,
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

      <StepNavigation
        onBack={onBack}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        submitDisabled={isSubmitting}
      />
    </motion.div>
  );
}
