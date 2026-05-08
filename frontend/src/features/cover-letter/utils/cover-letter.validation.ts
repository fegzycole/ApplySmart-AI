import { z } from "zod";
import { getJobDescriptionValidationMessage } from "@/shared/utils/job-description.validation";
import type { CoverLetterFormData } from "../types/cover-letter.types";

export interface CoverLetterValidationFeedback {
  fieldErrors: Partial<Record<keyof CoverLetterFormData, string>>;
  formErrors: string[];
}

const jobDescriptionSchema = z.string().superRefine((value, context) => {
  const validationMessage = getJobDescriptionValidationMessage(value);
  if (validationMessage) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: validationMessage,
    });
  }
});

const coverLetterSchema = z.object({
  company: z.string().trim().min(1, "Company is required"),
  position: z.string().trim().min(1, "Position is required"),
  tone: z.enum(["professional", "enthusiastic", "formal", "friendly"]),
  jobDescription: jobDescriptionSchema,
  highlights: z.string(),
});

export function validateCoverLetterForm(
  values: CoverLetterFormData,
): CoverLetterValidationFeedback | null {
  const result = coverLetterSchema.safeParse(values);

  if (result.success) {
    return null;
  }

  const fieldErrors: Partial<Record<keyof CoverLetterFormData, string>> = {};
  const formErrors: string[] = [];
  const seenFieldPaths = new Set<string>();

  result.error.issues.forEach((issue: z.ZodIssue) => {
    const path = issue.path[0];

    if (typeof path === "string") {
      if (seenFieldPaths.has(path)) {
        return;
      }

      fieldErrors[path as keyof CoverLetterFormData] = issue.message;
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

export function getCoverLetterErrorSummary(validation: CoverLetterValidationFeedback | null) {
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
