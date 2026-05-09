import { OptimizationResultView } from "./OptimizationResultView";
import { OptimizationUploadView } from "./OptimizationUploadView";
import type { ResumeOptimization } from "../../services/resume.service";
import type { ResumeTemplate } from "../../types/resume-builder.types";
import type {
  ResumeOptimizerCoverLetterOptions,
  ResumeOptimizerSource,
} from "../../types/resume-optimizer.types";

interface OptimizerWorkspaceProps {
  onOptimize: (
    source: ResumeOptimizerSource,
    jobDescription: string,
    template: ResumeTemplate,
    coverLetter?: ResumeOptimizerCoverLetterOptions
  ) => void;
  onStartOver: () => void;
  optimizing: boolean;
  errorMessage?: string | null;
  result: ResumeOptimization | null;
}

export function OptimizerWorkspace({
  onOptimize,
  onStartOver,
  optimizing,
  errorMessage,
  result,
}: OptimizerWorkspaceProps) {
  if (result) {
    return <OptimizationResultView result={result} onStartOver={onStartOver} />;
  }

  return (
    <OptimizationUploadView
      onOptimize={onOptimize}
      optimizing={optimizing}
      errorMessage={errorMessage}
    />
  );
}
