import type { ToneOption } from "@/features/cover-letter/types/cover-letter.types";

export type OptimizerStep = 1 | 2 | 3;
export type OptimizerView = "upload" | "result";
export type ResumeOptimizerSourceMode = "upload" | "existing";

export interface ResumeOptimizerCoverLetterOptions {
  enabled: boolean;
  tone: ToneOption;
  highlights: string;
}

export interface UploadedResumeSource {
  file: File;
  type: "upload";
}

export interface ExistingResumeSource {
  resumeId: number;
  type: "existing";
}

export type ResumeOptimizerSource = UploadedResumeSource | ExistingResumeSource;
