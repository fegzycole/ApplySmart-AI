import type { CoverLetter } from "@/features/cover-letter/services/cover-letter.service";
import type { Resume } from "@/features/resume/services/resume.service";
import { contentToResumeData } from "@/features/resume/utils/resume-builder-payload";

function getNormalizedLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function truncateLine(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trimEnd()}...`;
}

export function getResumePreviewModel(resume: Resume) {
  const builderResume = resume.content ? contentToResumeData(resume.content) : null;

  if (builderResume) {
    return {
      name: builderResume.personalInfo.name || resume.name,
      headline:
        builderResume.workExperience[0]?.position ||
        builderResume.education[0]?.field ||
        "Resume preview",
      summary: truncateLine(builderResume.summary || "Structured resume content available.", 240),
      bullets: [
        ...builderResume.skills.slice(0, 3),
        ...builderResume.workExperience
          .flatMap((experience) => experience.responsibilities)
          .filter(Boolean)
          .slice(0, 2),
      ].map((line) => truncateLine(line, 72)),
    };
  }

  const lines = getNormalizedLines(resume.content ?? "");
  const headline = lines[0] || "Resume preview";
  const summary = lines.slice(1, 4).join(" ");

  return {
    name: resume.name,
    headline: truncateLine(headline, 88),
    summary: truncateLine(summary || "This document is stored as uploaded resume content.", 240),
    bullets: lines.slice(4, 8).map((line) => truncateLine(line, 72)),
  };
}

export function getCoverLetterPreviewModel(coverLetter: CoverLetter) {
  const lines = getNormalizedLines(coverLetter.content);
  const greetingLine = lines[0] || `Dear ${coverLetter.company} team,`;
  const bodyLines = lines.slice(1, 5);
  const closingLine = lines[lines.length - 1] || "Sincerely,";

  return {
    company: coverLetter.company,
    role: coverLetter.position,
    greeting: truncateLine(greetingLine, 80),
    paragraph: truncateLine(bodyLines.join(" "), 260),
    closing: truncateLine(closingLine, 80),
  };
}
