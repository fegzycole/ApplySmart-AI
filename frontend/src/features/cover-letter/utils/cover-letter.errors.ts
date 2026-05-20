import { getApiServerFeedback } from "@/shared/utils/api-error-feedback";
import type { CoverLetterFormData } from "../types/cover-letter.types";

export function getCoverLetterServerFeedback(error: unknown) {
  return getApiServerFeedback<CoverLetterFormData>(
    error,
    ["company", "position", "jobDescription", "tone", "highlights"],
  );
}
