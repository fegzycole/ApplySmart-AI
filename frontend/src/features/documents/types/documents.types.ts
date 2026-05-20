import type { CoverLetter } from "@/features/cover-letter/services/cover-letter.service";
import type { Resume } from "@/features/resume/services/resume.service";
import type { ResumeDocumentKind } from "@/shared/types/document.types";

export type { ResumeDocumentKind };
export type DocumentsTabId = ResumeDocumentKind | "coverLetters";

export interface DocumentsTabDefinition {
  count: number;
  description: string;
  id: DocumentsTabId;
  label: string;
}

export interface DocumentsOverview {
  builtResumes: number;
  coverLetters: number;
  optimizedResumes: number;
  originalResumes: number;
  totalDocuments: number;
}

export interface DocumentsTabData {
  built: Resume[];
  coverLetters: CoverLetter[];
  optimized: Resume[];
  original: Resume[];
}

export type DocumentsPreviewTarget =
  | { type: "resume"; resume: Resume }
  | { type: "coverLetter"; coverLetter: CoverLetter };

export interface DocumentsTabPaginationState {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  loadMore: () => void;
}
