export const JOB_DESCRIPTION_VALIDATION = {
  minCharacters: 120,
  minWords: 25,
} as const;

const REQUIRED_MESSAGE = "Job description is required";
const TOO_SHORT_MESSAGE =
  "Please paste the full job description, not just the job title or a short summary.";
const INVALID_MESSAGE =
  "Please paste a real job description that includes responsibilities, requirements, or qualifications.";

const SIGNAL_PATTERNS = [
  /\b(responsibilit(?:y|ies)|duties|what you'll do|what you will do|role overview)\b/i,
  /\b(requirements?|qualifications?|must[- ]have|what we're looking for|what we are looking for|about you)\b/i,
  /\b(skills?|experience with|proficient in|knowledge of|familiarity with|tech stack|technologies)\b/i,
  /\b(benefits?|compensation|salary|remote|hybrid|full[- ]time|part[- ]time|about us|about the company)\b/i,
] as const;

const BULLET_PATTERN = /(^|\n)\s*(?:[-*•]|\d+\.)\s+\S/m;

export interface JobDescriptionStats {
  characterCount: number;
  nonEmptyLineCount: number;
  wordCount: number;
}

export function getJobDescriptionStats(value: string): JobDescriptionStats {
  const normalizedValue = value.trim();

  return {
    characterCount: normalizedValue.length,
    wordCount: normalizedValue ? normalizedValue.split(/\s+/).length : 0,
    nonEmptyLineCount: normalizedValue
      ? normalizedValue.split(/\n/).map((line) => line.trim()).filter(Boolean).length
      : 0,
  };
}

export function getJobDescriptionValidationMessage(value: string): string | null {
  const normalizedValue = value.trim();
  if (!normalizedValue) {
    return REQUIRED_MESSAGE;
  }

  const { characterCount, wordCount, nonEmptyLineCount } = getJobDescriptionStats(normalizedValue);
  if (
    characterCount < JOB_DESCRIPTION_VALIDATION.minCharacters
    || wordCount < JOB_DESCRIPTION_VALIDATION.minWords
  ) {
    return TOO_SHORT_MESSAGE;
  }

  const signalMatchCount = SIGNAL_PATTERNS.reduce(
    (count, pattern) => count + (pattern.test(normalizedValue) ? 1 : 0),
    0,
  );
  const hasStructuredContent =
    nonEmptyLineCount >= 3 || BULLET_PATTERN.test(normalizedValue);

  if (signalMatchCount >= 2 || (signalMatchCount >= 1 && hasStructuredContent)) {
    return null;
  }

  return INVALID_MESSAGE;
}

export function isValidJobDescription(value: string) {
  return getJobDescriptionValidationMessage(value) === null;
}
