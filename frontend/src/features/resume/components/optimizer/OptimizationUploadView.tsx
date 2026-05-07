import { AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { ProgressSteps } from "./ProgressSteps";
import { StepOne } from "./steps/StepOne";
import { StepTwo } from "./steps/StepTwo";
import { StepThree } from "./steps/StepThree";
import { useResumeOptimizerDraft } from "../../hooks/useResumeOptimizerDraft";
import { useResumes } from "../../hooks/useResumeQueries";
import type { ResumeTemplate } from "../../types/resume-builder.types";
import type {
  ResumeOptimizerCoverLetterOptions,
  ResumeOptimizerSource,
} from "../../types/resume-optimizer.types";

interface OptimizationUploadViewProps {
  onOptimize: (
    source: ResumeOptimizerSource,
    jobDescription: string,
    template: ResumeTemplate,
    coverLetter?: ResumeOptimizerCoverLetterOptions
  ) => void;
  optimizing: boolean;
  errorMessage?: string | null;
}

export function OptimizationUploadView({
  onOptimize,
  optimizing,
  errorMessage,
}: OptimizationUploadViewProps) {
  const {
    step,
    setStep,
    sourceMode,
    setSourceMode,
    file,
    selectedResumeId,
    jobDescription,
    setJobDescription,
    template,
    setTemplate,
    coverLetter,
    setCoverLetter,
    selectFile,
    selectExistingResume,
    removeFile,
    clearSelectedResume,
  } = useResumeOptimizerDraft();
  const { data: resumes = [], isLoading: resumesLoading } = useResumes();

  const existingResumes = useMemo(
    () => resumes.filter((resume) => Boolean(resume.fileUrl)),
    [resumes]
  );

  const selectedResume = useMemo(
    () => existingResumes.find((resume) => resume.id === selectedResumeId) ?? null,
    [existingResumes, selectedResumeId]
  );

  const handleSubmit = () => {
    if (!jobDescription.trim()) {
      return;
    }

    if (sourceMode === "upload" && file) {
      onOptimize({ type: "upload", file }, jobDescription, template, coverLetter);
    }

    if (sourceMode === "existing" && selectedResume?.fileUrl) {
      onOptimize(
        {
          type: "existing",
          resumeId: selectedResume.id,
        },
        jobDescription,
        template,
        coverLetter
      );
    }
  };

  const canProceedToStep3 = jobDescription.trim().length > 50;

  return (
    <div className="min-w-0 max-w-5xl mx-auto rounded-[2rem] border border-zinc-200/80 bg-white/75 p-4 shadow-xl shadow-zinc-200/40 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/75 dark:shadow-black/20 sm:p-6 lg:p-8">
      <ProgressSteps currentStep={step} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <StepOne
            file={file}
            existingResumes={existingResumes}
            existingResumesLoading={resumesLoading}
            selectedResume={selectedResume}
            sourceMode={sourceMode}
            onFileSelect={selectFile}
            onFileRemove={removeFile}
            onResumeSelect={selectExistingResume}
            onSelectedResumeClear={clearSelectedResume}
            onSourceModeChange={setSourceMode}
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
            coverLetter={coverLetter}
            onCoverLetterChange={setCoverLetter}
            errorMessage={errorMessage}
            onBack={() => setStep(2)}
            onSubmit={handleSubmit}
            isSubmitting={optimizing}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
