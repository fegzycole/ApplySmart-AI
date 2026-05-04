import { useState } from "react";
import { toast } from "sonner";
import {
  uploadAndOptimizeResume,
  type ResumeOptimization,
} from "../services/resume.service";
import type { ResumeTemplate } from "../types/resume-builder.types";
import type { OptimizerView } from "../types/resume-optimizer.types";
import {
  clearResumeOptimizerState,
  loadResumeOptimizerState,
  saveResumeOptimizerResult,
} from "../utils/resume-optimizer-storage";

export function useResumeOptimizer() {
  const [result, setResult] = useState<ResumeOptimization | null>(() => loadResumeOptimizerState().result);
  const [optimizing, setOptimizing] = useState(false);

  const optimize = async (
    file: File,
    jobDescription: string,
    template: ResumeTemplate = "MODERN",
  ) => {
    setOptimizing(true);

    try {
      const optimizationResult = await uploadAndOptimizeResume(file, jobDescription, template);
      setResult(optimizationResult);
      saveResumeOptimizerResult(optimizationResult);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to optimize resume. Please try again.",
      );
    } finally {
      setOptimizing(false);
    }
  };

  const startOver = () => {
    setResult(null);
    clearResumeOptimizerState();
  };

  const view: OptimizerView = result ? "result" : "upload";

  return {
    optimize,
    optimizing,
    result,
    startOver,
    view,
  };
}
