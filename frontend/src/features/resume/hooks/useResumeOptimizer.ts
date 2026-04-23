import { useState } from "react";
import { toast } from "sonner";
import {
  uploadAndOptimizeResume,
  type ResumeOptimization,
} from "../services/resume.service";
import type { ResumeTemplate } from "../types/resume-builder.types";

type OptimizerView = "upload" | "result";

export function useResumeOptimizer() {
  const [view, setView] = useState<OptimizerView>("upload");
  const [optimizing, setOptimizing] = useState(false);
  const [result, setResult] = useState<ResumeOptimization | null>(null);

  const optimize = async (
    file: File,
    jobDescription: string,
    template: ResumeTemplate = "MODERN",
  ) => {
    setOptimizing(true);

    try {
      const optimizationResult = await uploadAndOptimizeResume(file, jobDescription, template);
      setResult(optimizationResult);
      setView("result");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to optimize resume. Please try again.",
      );
    } finally {
      setOptimizing(false);
    }
  };

  const startOver = () => {
    setView("upload");
    setResult(null);
  };

  return {
    optimize,
    optimizing,
    result,
    startOver,
    view,
  };
}
