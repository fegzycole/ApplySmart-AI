import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ProgressSteps } from "./ProgressSteps";
import { StepOne } from "./steps/StepOne";
import { StepTwo } from "./steps/StepTwo";
import { StepThree } from "./steps/StepThree";
import type { ResumeTemplate } from "../../types/resume-builder.types";

interface OptimizationUploadViewProps {
  onOptimize: (file: File, jobDescription: string, template: ResumeTemplate) => void;
  optimizing: boolean;
}

export function OptimizationUploadView({ onOptimize, optimizing }: OptimizationUploadViewProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [template, setTemplate] = useState<ResumeTemplate>("MODERN");

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setStep(2);
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  const handleSubmit = () => {
    if (file && jobDescription.trim()) {
      onOptimize(file, jobDescription, template);
    }
  };

  const canProceedToStep3 = jobDescription.trim().length > 50;

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressSteps currentStep={step} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <StepOne
            file={file}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
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
