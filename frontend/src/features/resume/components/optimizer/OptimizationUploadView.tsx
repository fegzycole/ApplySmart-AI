import { AnimatePresence } from "framer-motion";
import { ProgressSteps } from "./ProgressSteps";
import { StepOne } from "./steps/StepOne";
import { StepTwo } from "./steps/StepTwo";
import { StepThree } from "./steps/StepThree";
import { useResumeOptimizerDraft } from "../../hooks/useResumeOptimizerDraft";
import type { ResumeTemplate } from "../../types/resume-builder.types";

interface OptimizationUploadViewProps {
  onOptimize: (file: File, jobDescription: string, template: ResumeTemplate) => void;
  optimizing: boolean;
}

export function OptimizationUploadView({ onOptimize, optimizing }: OptimizationUploadViewProps) {
  const {
    step,
    setStep,
    file,
    jobDescription,
    setJobDescription,
    template,
    setTemplate,
    savedFileName,
    selectFile,
    removeFile,
  } = useResumeOptimizerDraft();

  const handleSubmit = () => {
    if (file && jobDescription.trim()) {
      onOptimize(file, jobDescription, template);
    }
  };

  const canProceedToStep3 = jobDescription.trim().length > 50;

  return (
    <div className="min-w-0 max-w-4xl mx-auto">
      <ProgressSteps currentStep={step} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <StepOne
            file={file}
            savedFileName={savedFileName}
            onFileSelect={selectFile}
            onFileRemove={removeFile}
          />
        )}

        {step === 2 && (
          <StepTwo
            jobDescription={jobDescription}
            onJobDescriptionChange={setJobDescription}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
            canProceed={canProceedToStep3}
          />
        )}

        {step === 3 && (
          <StepThree
            selectedTemplate={template}
            onTemplateSelect={setTemplate}
            onBack={() => setStep(2)}
            onSubmit={handleSubmit}
            isSubmitting={optimizing}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
