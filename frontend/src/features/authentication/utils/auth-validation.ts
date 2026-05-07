import { z } from "zod";
import type { LoginCredentials, SignupData, TwoFactorLoginVerifyRequest } from "../types/auth.types";

type AuthFieldErrors<T extends Record<string, string>> = Partial<Record<keyof T, string>>;

export interface AuthValidationFeedback<T extends Record<string, string>> {
  fieldErrors: AuthFieldErrors<T>;
  formErrors: string[];
}

const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Email must be valid"),
  password: z.string().trim().min(1, "Password is required"),
});

const twoFactorLoginSchema = z.object({
  challengeToken: z.string().trim().min(1, "Two-factor challenge is required"),
  code: z.string().trim().regex(/^\d{6}$/, "Authenticator code must be 6 digits"),
});

const signupSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").min(2, "First name must be between 2 and 50 characters").max(50, "First name must be between 2 and 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").min(2, "Last name must be between 2 and 50 characters").max(50, "Last name must be between 2 and 50 characters"),
  email: z.string().trim().min(1, "Email is required").email("Email must be valid"),
  password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must be between 8 and 100 characters")
    .max(100, "Password must be between 8 and 100 characters")
    .regex(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/,
      "Password must contain at least one digit, one lowercase, one uppercase letter, and one special character",
    ),
});

function toValidationFeedback<T extends Record<string, string>>(
  error: z.ZodError<T>,
): AuthValidationFeedback<T> {
  const fieldErrors = {} as AuthFieldErrors<T>;
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

export function validateLoginCredentials(values: LoginCredentials) {
  const result = loginSchema.safeParse(values);
  return result.success ? null : toValidationFeedback(result.error);
}

export function validateTwoFactorLogin(values: TwoFactorLoginVerifyRequest) {
  const result = twoFactorLoginSchema.safeParse(values);
  return result.success ? null : toValidationFeedback(result.error);
}

export function validateSignupData(values: SignupData) {
  const result = signupSchema.safeParse(values);
  return result.success ? null : toValidationFeedback(result.error);
}

export function getAuthErrorSummary<T extends Record<string, string>>(
  validation: AuthValidationFeedback<T> | null,
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
