import type { ResumeDocumentKind } from "@/shared/types/document.types";
import type { Resume } from "../services/resume.service";

type ResumeDocumentKindFields = Pick<Resume, "content" | "documentKind" | "fileUrl" | "status">;

export function getResumeDocumentKind(resume: ResumeDocumentKindFields): ResumeDocumentKind {
  if (resume.documentKind) {
    return resume.documentKind;
  }

  if (resume.status === "optimized") {
    return "optimized";
  }

  if (resume.status === "published" || (resume.status === "draft" && !resume.content && Boolean(resume.fileUrl))) {
    return "built";
  }

  return "original";
}

export function isOriginalResumeDocument(resume: ResumeDocumentKindFields) {
  return getResumeDocumentKind(resume) === "original";
}
