import { getApiErrorMessage, getApiFieldError } from "@/shared/utils/api-error-feedback";

export function getResumeOptimizerErrorMessage(error: unknown) {
  const jobDescriptionError = getApiFieldError(error, "jobDescription");
  if (jobDescriptionError) {
    return jobDescriptionError;
  }

  return getApiErrorMessage(error, "Failed to optimize resume. Please try again.");
}
