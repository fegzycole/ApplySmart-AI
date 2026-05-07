import { ZodError, z } from "zod";
import type {
  CreateJobRequest,
  JobFormData,
  JobStatus,
  JobValidationFeedback,
  UpdateJobRequest,
} from "../types/job.types";

const JOB_STATUS_VALUES = ["SAVED", "APPLIED", "INTERVIEW", "OFFER", "REJECTED"] as const;
const JOB_LINK_PATTERN = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(:[0-9]{1,5})?(\/.*)?$/;
const DATE_TIME_LOCAL_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

const optionalTrimmedString = (maxLength: number) =>
  z.string().trim().max(maxLength, `Must be ${maxLength} characters or less`);

const requiredTrimmedString = (label: string, maxLength: number) =>
  z.string()
    .trim()
    .min(1, `${label} is required`)
    .max(maxLength, `${label} must be ${maxLength} characters or less`);

const requiredJobLink = z.string()
  .trim()
  .max(500, "Job posting URL must be 500 characters or less")
  .superRefine((value, context) => {
    if (value.length === 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Job posting URL is required",
      });
      return;
    }

    if (!JOB_LINK_PATTERN.test(value)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid URL format",
      });
    }
  });

const optionalJobLink = z.string()
  .trim()
  .max(500, "Job posting URL must be 500 characters or less")
  .superRefine((value, context) => {
    if (value.length === 0) {
      return;
    }

    if (!JOB_LINK_PATTERN.test(value)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid URL format",
      });
    }
  });

const jobStatusSchema = z.enum(JOB_STATUS_VALUES);

const jobRequestSchema = z.object({
  company: requiredTrimmedString("Company", 255),
  role: requiredTrimmedString("Role", 255),
  link: requiredJobLink,
  status: jobStatusSchema,
  notes: optionalTrimmedString(5000),
  salary: optionalTrimmedString(100),
  location: optionalTrimmedString(255),
  applicationDeadline: z.string().trim().refine(
    (value) => value.length === 0 || DATE_TIME_LOCAL_PATTERN.test(value),
    "Enter a valid application deadline"
  ),
});

const jobPatchRequestSchema = z.object({
  company: requiredTrimmedString("Company", 255).optional(),
  role: requiredTrimmedString("Role", 255).optional(),
  link: optionalJobLink.refine((value) => value.length > 0, "Job posting URL is required").optional(),
  status: jobStatusSchema.optional(),
  notes: optionalTrimmedString(5000).optional(),
  salary: optionalTrimmedString(100).optional(),
  location: optionalTrimmedString(255).optional(),
  applicationDeadline: z.string().trim().refine(
    (value) => value.length === 0 || DATE_TIME_LOCAL_PATTERN.test(value),
    "Enter a valid application deadline"
  ).optional(),
}).refine(
  (value) => Object.keys(value).length > 0,
  "Provide at least one field to update"
);

export function parseCreateJobRequest(input: JobFormData | CreateJobRequest): CreateJobRequest {
  return jobRequestSchema.parse(input);
}

export function parseUpdateJobRequest(input: JobFormData | UpdateJobRequest): UpdateJobRequest {
  return jobPatchRequestSchema.parse(input);
}

export function getJobValidationFeedback(error: unknown): JobValidationFeedback | null {
  if (!(error instanceof ZodError)) {
    return null;
  }

  const fieldErrors: JobValidationFeedback["fieldErrors"] = {};
  const formErrors: string[] = [];

  error.issues.forEach((issue) => {
    const path = issue.path[0];

    if (typeof path === "string" && !(path in fieldErrors)) {
      fieldErrors[path as keyof JobFormData] = issue.message;
      return;
    }

    formErrors.push(issue.message);
  });

  return {
    fieldErrors,
    formErrors,
  };
}

export function getJobValidationSummary(validation: JobValidationFeedback | null): string[] {
  if (!validation) {
    return [];
  }

  return Array.from(
    new Set([...Object.values(validation.fieldErrors), ...validation.formErrors].filter(Boolean))
  );
}

export function getJobStatusOptions(): Array<{ value: JobStatus; label: string }> {
  return JOB_STATUS_VALUES.map((value) => ({
    value,
    label: value.charAt(0) + value.slice(1).toLowerCase(),
  }));
}
