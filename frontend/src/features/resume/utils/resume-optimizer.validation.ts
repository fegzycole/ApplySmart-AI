import { z } from "zod";
import { getJobDescriptionValidationMessage } from "@/shared/utils/job-description.validation";

export interface ResumeOptimizerValidationFeedback {
  fieldErrors: {
    jobDescription?: string;
  };
  formErrors: string[];
}

const resumeOptimizerSchema = z.object({
  jobDescription: z.string().superRefine((value, context) => {
    const validationMessage = getJobDescriptionValidationMessage(value);
    if (validationMessage) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: validationMessage,
      });
    }
  }),
});

export function validateResumeOptimizerInput(jobDescription: string): ResumeOptimizerValidationFeedback | null {
  const result = resumeOptimizerSchema.safeParse({ jobDescription });

  if (result.success) {
    return null;
  }

  const fieldErrors: ResumeOptimizerValidationFeedback["fieldErrors"] = {};
  const formErrors: string[] = [];

  result.error.issues.forEach((issue) => {
    const path = issue.path[0];
    if (path === "jobDescription" && !fieldErrors.jobDescription) {
      fieldErrors.jobDescription = issue.message;
      return;
    }

    formErrors.push(issue.message);
  });

  return {
    fieldErrors,
    formErrors,
  };
}
