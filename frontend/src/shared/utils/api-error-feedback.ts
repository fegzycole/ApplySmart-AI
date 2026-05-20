import { ApiError } from "@/shared/services/api-client";

interface ErrorPayload {
  message?: unknown;
  details?: unknown;
}

export interface ServerFeedback<T extends object> {
  fieldErrors: Partial<Record<keyof T, string>>;
  formErrors: string[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getErrorPayload(error: ApiError): ErrorPayload | null {
  return isRecord(error.data) ? (error.data as ErrorPayload) : null;
}

export function getApiServerFeedback<T extends object>(
  error: unknown,
  knownFields: readonly (keyof T)[],
  fallbackMessage = "Something went wrong. Please try again.",
): ServerFeedback<T> {
  const fieldErrors: Partial<Record<keyof T, string>> = {};
  const formErrors: string[] = [];

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      formErrors: [fallbackMessage],
    };
  }

  const payload = getErrorPayload(error);
  const details = payload && isRecord(payload.details) ? payload.details : null;

  if (details) {
    knownFields.forEach((field) => {
      const message = details[String(field)];
      if (typeof message === "string") {
        fieldErrors[field] = message;
      }
    });
  }

  const serverMessage = typeof payload?.message === "string" ? payload.message : error.message;
  if (
    serverMessage
    && serverMessage !== `HTTP Error ${error.status}`
    && serverMessage !== "Invalid request data"
  ) {
    formErrors.push(serverMessage);
  }

  if (formErrors.length === 0 && Object.keys(fieldErrors).length === 0) {
    formErrors.push(error.message || fallbackMessage);
  }

  return {
    fieldErrors,
    formErrors: Array.from(new Set(formErrors)),
  };
}

export function getApiFieldError(error: unknown, fieldName: string): string | null {
  if (!(error instanceof ApiError)) {
    return null;
  }

  const payload = getErrorPayload(error);
  const details = payload && isRecord(payload.details) ? payload.details : null;
  const message = details?.[fieldName];

  return typeof message === "string" ? message : null;
}

export function getApiErrorMessage(error: unknown, fallbackMessage: string): string {
  if (!(error instanceof ApiError)) {
    return error instanceof Error ? error.message : fallbackMessage;
  }

  const payload = getErrorPayload(error);
  if (typeof payload?.message === "string" && payload.message !== "Invalid request data") {
    return payload.message;
  }

  return error.message || fallbackMessage;
}
