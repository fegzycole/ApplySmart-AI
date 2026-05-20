import { getApiErrorMessage, getApiServerFeedback } from "@/shared/utils/api-error-feedback";

type AuthFieldErrors<T extends Record<string, string>> = Partial<Record<keyof T, string>>;

export interface AuthServerFeedback<T extends Record<string, string>> {
  fieldErrors: AuthFieldErrors<T>;
  formErrors: string[];
}

export function getAuthServerFeedback<T extends Record<string, string>>(
  error: unknown,
  knownFields: Array<keyof T>,
): AuthServerFeedback<T> {
  return getApiServerFeedback<T>(error, knownFields);
}

export function getAuthErrorMessage(error: unknown, fallbackMessage: string): string {
  return getApiErrorMessage(error, fallbackMessage);
}
