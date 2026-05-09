import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { invalidateQueries } from "@/shared/lib/query-cache";
import { COVER_LETTER_KEYS } from "@/features/cover-letter/hooks/useCoverLetterQueries";
import {
  optimizeResume,
  uploadAndOptimizeResume,
  type ResumeOptimization,
} from "../services/resume.service";
import type { ResumeTemplate } from "../types/resume-builder.types";
import type {
  ResumeOptimizerCoverLetterOptions,
  ResumeOptimizerSource,
} from "../types/resume-optimizer.types";
import { RESUME_KEYS } from "./useResumeQueries";
import { getResumeOptimizerErrorMessage } from "../utils/resume-optimizer.errors";

export function useResumeOptimizer() {
  const queryClient = useQueryClient();
  const [result, setResult] = useState<ResumeOptimization | null>(null);
  const [optimizing, setOptimizing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const optimize = async (
    source: ResumeOptimizerSource,
    jobDescription: string,
    template: ResumeTemplate = "MODERN",
    coverLetter?: ResumeOptimizerCoverLetterOptions,
  ) => {
    setOptimizing(true);
    setErrorMessage(null);

    try {
      const optimizationResult = source.type === "upload"
        ? await uploadAndOptimizeResume(source.file, jobDescription, template, coverLetter)
        : await optimizeResume(source.resumeId, jobDescription, template, coverLetter);

      setResult(optimizationResult);
      await Promise.all([
        invalidateQueries(queryClient, RESUME_KEYS.all),
        invalidateQueries(queryClient, COVER_LETTER_KEYS.all),
      ]);
    } catch (error) {
      const message = getResumeOptimizerErrorMessage(error);
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setOptimizing(false);
    }
  };

  const startOver = () => {
    setResult(null);
    setErrorMessage(null);
  };

  return {
    optimize,
    optimizing,
    result,
    errorMessage,
    startOver,
  };
}
