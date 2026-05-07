import { ApiError } from "@/shared/services/api-client";

type AuthFieldErrors<T extends Record<string, string>> = Partial<Record<keyof T, string>>;

export interface AuthServerFeedback<T extends Record<string, string>> {
  fieldErrors: AuthFieldErrors<T>;
  formErrors: string[];
}

interface ErrorPayload {
  message?: unknown;
  details?: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function getAuthServerFeedback<T extends Record<string, string>>(
  error: unknown,
  knownFields: Array<keyof T>,
): AuthServerFeedback<T> {
  const fieldErrors = {} as AuthFieldErrors<T>;
  const formErrors: string[] = [];

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      formErrors: ["Something went wrong. Please try again."],
    };
  }

  const payload = isRecord(error.data) ? (error.data as ErrorPayload) : null;
  const details = payload && isRecord(payload.details) ? payload.details : null;

  if (details) {
    knownFields.forEach((field) => {
      const message = details[field as string];
      if (typeof message === "string") {
        fieldErrors[field] = message;
      }
    });
  }

  const serverMessage = typeof payload?.message === "string" ? payload.message : error.message;
  if (serverMessage && serverMessage !== `HTTP Error ${error.status}` && serverMessage !== "Invalid request data") {
    formErrors.push(serverMessage);
  }

  if (formErrors.length === 0 && Object.keys(fieldErrors).length === 0) {
    formErrors.push(error.message || "Something went wrong. Please try again.");
  }

  return {
    fieldErrors,
    formErrors: Array.from(new Set(formErrors)),
  };
}
