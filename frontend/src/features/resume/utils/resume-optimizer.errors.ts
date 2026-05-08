import { ApiError } from "@/shared/services/api-client";

interface ErrorPayload {
  message?: unknown;
  details?: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function getResumeOptimizerErrorMessage(error: unknown) {
  if (!(error instanceof ApiError)) {
    return error instanceof Error
      ? error.message
      : "Failed to optimize resume. Please try again.";
  }

  const payload = isRecord(error.data) ? (error.data as ErrorPayload) : null;
  const details = payload && isRecord(payload.details) ? payload.details : null;

  if (typeof details?.jobDescription === "string") {
    return details.jobDescription;
  }

  if (typeof payload?.message === "string" && payload.message !== "Invalid request data") {
    return payload.message;
  }

  return error.message || "Failed to optimize resume. Please try again.";
}
