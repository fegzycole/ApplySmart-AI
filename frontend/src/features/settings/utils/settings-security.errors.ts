import { ApiError } from "@/shared/services/api-client";
import type { ChangePasswordFormData } from "../types/settings.types";

interface ErrorPayload {
  message?: unknown;
  details?: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function getSecurityServerFeedback(error: unknown) {
  return getSettingsServerFeedback<ChangePasswordFormData>(
    error,
    ["currentPassword", "newPassword", "confirmNewPassword"],
  );
}

export function getSettingsServerFeedback<T extends object>(
  error: unknown,
  fields: readonly (keyof T)[],
) {
  const fieldErrors: Partial<Record<keyof T, string>> = {};
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
    fields.forEach((field) => {
      const fieldName = String(field);
      const message = details[fieldName];
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
