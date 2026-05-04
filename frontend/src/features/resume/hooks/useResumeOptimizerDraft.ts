import { useEffect, useMemo, useState } from "react";
import type { ResumeTemplate } from "../types/resume-builder.types";
import type { OptimizerStep } from "../types/resume-optimizer.types";
import {
  loadResumeOptimizerState,
  saveResumeOptimizerDraft,
} from "../utils/resume-optimizer-storage";

export function useResumeOptimizerDraft() {
  const storedState = useMemo(() => loadResumeOptimizerState(), []);
  const [step, setStep] = useState<OptimizerStep>(1);
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState(storedState.draft.jobDescription);
  const [template, setTemplate] = useState<ResumeTemplate>(storedState.draft.template);
  const [savedFileName, setSavedFileName] = useState<string | null>(storedState.draft.fileName);

  useEffect(() => {
    saveResumeOptimizerDraft({
      jobDescription,
      template,
      fileName: file?.name ?? savedFileName,
    });
  }, [file, jobDescription, savedFileName, template]);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setSavedFileName(selectedFile.name);
    setStep(2);
  };

  const handleFileRemove = () => {
    setFile(null);
    setSavedFileName(null);
    setStep(1);
  };

  return {
    step,
    setStep,
    file,
    jobDescription,
    setJobDescription,
    template,
    setTemplate,
    savedFileName,
    selectFile: handleFileSelect,
    removeFile: handleFileRemove,
  };
}
