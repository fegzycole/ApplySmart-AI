import { z } from "zod";

export interface SettingsValidationFeedback<T extends object> {
  fieldErrors: Partial<Record<keyof T, string>>;
  formErrors: string[];
}

export function toValidationFeedback<T extends object>(
  error: z.ZodError<T>,
): SettingsValidationFeedback<T> {
  const fieldErrors = {} as Partial<Record<keyof T, string>>;
  const formErrors: string[] = [];
  const seenFieldPaths = new Set<string>();

  error.issues.forEach((issue: z.ZodIssue) => {
    const path = issue.path[0];

    if (typeof path === "string") {
      if (seenFieldPaths.has(path)) {
        return;
      }

      fieldErrors[path as keyof T] = issue.message;
      seenFieldPaths.add(path);
      return;
    }

    formErrors.push(issue.message);
  });

  return {
    fieldErrors,
    formErrors,
  };
}

export function getSettingsErrorSummary<T extends object>(
  validation: SettingsValidationFeedback<T> | null,
) {
  if (!validation) {
    return [];
  }

  return Array.from(
    new Set(
      [...Object.values(validation.fieldErrors), ...validation.formErrors].filter(
        (message): message is string => typeof message === "string" && message.length > 0,
      ),
    ),
  );
}
