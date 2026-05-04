import type { ResumeOptimization } from "../services/resume.service";
import type { ResumeTemplate } from "./resume-builder.types";

export type OptimizerStep = 1 | 2 | 3;
export type OptimizerView = "upload" | "result";

export interface ResumeOptimizerDraft {
  jobDescription: string;
  template: ResumeTemplate;
  fileName: string | null;
}

export interface StoredResumeOptimizerState {
  draft: ResumeOptimizerDraft;
  result: ResumeOptimization | null;
}
