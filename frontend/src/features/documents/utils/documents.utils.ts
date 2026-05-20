import type { CoverLetter } from "@/features/cover-letter/services/cover-letter.service";
import type { Resume } from "@/features/resume/services/resume.service";
import { getResumeDocumentKind } from "@/features/resume/utils/resume-document-kind";
import { RESUME_DOCUMENT_SECTIONS } from "../constants/documents.constants";

export function getResumeDocumentLabel(resume: Resume) {
  return RESUME_DOCUMENT_SECTIONS[getResumeDocumentKind(resume)].shortLabel;
}

export function getResumeStorageLabel(resume: Resume) {
  const kind = getResumeDocumentKind(resume);

  if (kind === "built") {
    return resume.fileUrl ? "Builder PDF ready" : "Builder content only";
  }

  if (kind === "optimized") {
    return resume.fileUrl ? "Optimized PDF ready" : "Optimized content only";
  }

  return resume.fileUrl ? "Source file saved" : "Text content only";
}

export function formatDocumentDate(value: string) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export function getCoverLetterDownloadFilename(coverLetter: CoverLetter) {
  const company = coverLetter.company.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const position = coverLetter.position.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const baseName = [company, position, "cover-letter"].filter(Boolean).join("-");

  return `${baseName || "cover-letter"}.pdf`;
}
