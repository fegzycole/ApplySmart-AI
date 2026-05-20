import type { Resume } from "../services/resume.service";
import { isOriginalResumeDocument } from "./resume-document-kind";

function normalizeResumeSearchQuery(searchQuery: string) {
  return searchQuery.trim().toLowerCase();
}

function matchesResumeSearchQuery(resume: Resume, normalizedQuery: string) {
  return resume.name.trim().toLowerCase().includes(normalizedQuery);
}

export function getOriginalResumeOptionCount(resumes: Resume[]) {
  return resumes.filter(isOriginalResumeDocument).length;
}

export function getVisibleExistingResumeOptions(
  resumes: Resume[],
  searchQuery: string,
  defaultVisibleCount: number,
) {
  const normalizedQuery = normalizeResumeSearchQuery(searchQuery);

  if (normalizedQuery) {
    return resumes.filter((resume) => matchesResumeSearchQuery(resume, normalizedQuery));
  }

  return resumes.filter(isOriginalResumeDocument).slice(0, defaultVisibleCount);
}
