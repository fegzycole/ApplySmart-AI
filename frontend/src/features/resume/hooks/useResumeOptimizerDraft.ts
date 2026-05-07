import { useState } from "react";
import type { ResumeTemplate } from "../types/resume-builder.types";
import type {
  OptimizerStep,
  ResumeOptimizerCoverLetterOptions,
  ResumeOptimizerSourceMode,
} from "../types/resume-optimizer.types";

const DEFAULT_COVER_LETTER_OPTIONS: ResumeOptimizerCoverLetterOptions = {
  enabled: false,
  tone: "professional",
  highlights: "",
};

export function useResumeOptimizerDraft() {
  const [step, setStep] = useState<OptimizerStep>(1);
  const [sourceMode, setSourceMode] = useState<ResumeOptimizerSourceMode>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [selectedResumeId, setSelectedResumeId] = useState<number | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [template, setTemplate] = useState<ResumeTemplate>("MODERN");
  const [coverLetter, setCoverLetter] = useState<ResumeOptimizerCoverLetterOptions>(
    DEFAULT_COVER_LETTER_OPTIONS
  );

  const handleSourceModeChange = (mode: ResumeOptimizerSourceMode) => {
    setSourceMode(mode);
    setFile(null);
    setSelectedResumeId(null);
    setStep(1);
  };

  const handleFileSelect = (selectedFile: File) => {
    setSourceMode("upload");
    setFile(selectedFile);
    setSelectedResumeId(null);
    setStep(2);
  };

  const handleExistingResumeSelect = (resumeId: number) => {
    setSourceMode("existing");
    setSelectedResumeId(resumeId);
    setFile(null);
    setStep(2);
  };

  const handleFileRemove = () => {
    setFile(null);
    setStep(1);
  };

  const handleSelectedResumeClear = () => {
    setSelectedResumeId(null);
    setStep(1);
  };

  const updateCoverLetter = (updates: Partial<ResumeOptimizerCoverLetterOptions>) => {
    setCoverLetter((current) => ({
      ...current,
      ...updates,
    }));
  };

  return {
    step,
    setStep,
    sourceMode,
    setSourceMode: handleSourceModeChange,
    file,
    selectedResumeId,
    jobDescription,
    setJobDescription,
    template,
    setTemplate,
    coverLetter,
    setCoverLetter: updateCoverLetter,
    selectFile: handleFileSelect,
    selectExistingResume: handleExistingResumeSelect,
    removeFile: handleFileRemove,
    clearSelectedResume: handleSelectedResumeClear,
  };
}
