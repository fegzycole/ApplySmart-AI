import { getApiServerFeedback } from "@/shared/utils/api-error-feedback";
import type { ChangePasswordFormData } from "../types/settings.types";

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
  return getApiServerFeedback<T>(error, fields);
}
