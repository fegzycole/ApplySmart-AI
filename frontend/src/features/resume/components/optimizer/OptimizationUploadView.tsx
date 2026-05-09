import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { getJobDescriptionStats, getJobDescriptionValidationMessage } from "@/shared/utils/job-description.validation";
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
import { validateResumeOptimizerInput } from "../../utils/resume-optimizer.validation";

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
  const [jobDescriptionError, setJobDescriptionError] = useState<string | null>(null);
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

  const jobDescriptionStats = useMemo(
    () => getJobDescriptionStats(jobDescription),
    [jobDescription],
  );
  const jobDescriptionValidationMessage = useMemo(
    () => getJobDescriptionValidationMessage(jobDescription),
    [jobDescription],
  );

  const handleJobDescriptionChange = (value: string) => {
    setJobDescription(value);

    if (jobDescriptionError) {
      setJobDescriptionError(null);
    }
  };

  const handleStepTwoNext = () => {
    const validation = validateResumeOptimizerInput(jobDescription);
    if (validation?.fieldErrors.jobDescription) {
      setJobDescriptionError(validation.fieldErrors.jobDescription);
      return;
    }

    setStep(3);
  };

  const handleSubmit = () => {
    const validation = validateResumeOptimizerInput(jobDescription);
    if (validation?.fieldErrors.jobDescription) {
      setJobDescriptionError(validation.fieldErrors.jobDescription);
      setStep(2);
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

  const canProceedToStep3 = jobDescriptionValidationMessage === null;

  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Cinematic Background Glow */}
      <div className="absolute -inset-20 pointer-events-none overflow-hidden opacity-30">
        <motion.div 
          animate={{ 
            backgroundColor: errorMessage ? "rgba(239, 68, 68, 0.15)" : "rgba(14, 165, 233, 0.15)",
            scale: errorMessage ? 1.2 : 1
          }}
          className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] transition-colors duration-1000" 
        />
      </div>

      <div className={cn(
        "relative rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem] border-2 transition-all duration-1000 bg-white/40 dark:bg-zinc-900/40 p-4 sm:p-10 lg:p-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] backdrop-blur-3xl",
        errorMessage ? "border-rose-500/20 shadow-rose-500/5" : "border-white/60 dark:border-zinc-800/60 shadow-sky-500/5"
      )}>
        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 -mr-1 -mt-1 h-16 w-16 sm:h-24 sm:w-24 lg:h-32 lg:w-32 bg-gradient-to-br from-white/40 to-transparent dark:from-zinc-800/40 rounded-bl-[2rem] sm:rounded-bl-[3rem] lg:rounded-bl-[4rem] border-b-2 border-l-2 border-white/20 dark:border-zinc-700/20 pointer-events-none" />

        <ProgressSteps currentStep={step} />

        <div className="mt-8 sm:mt-14 lg:mt-24">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <StepOne
                key="step1"
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
                key="step2"
                jobDescription={jobDescription}
                jobDescriptionError={jobDescriptionError}
                jobDescriptionStats={jobDescriptionStats}
                onJobDescriptionChange={handleJobDescriptionChange}
                onBack={() => setStep(1)}
                onNext={handleStepTwoNext}
                canProceed={canProceedToStep3}
              />
            )}

            {step === 3 && (
              <StepThree
                key="step3"
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
      </div>
    </div>
  );
}
