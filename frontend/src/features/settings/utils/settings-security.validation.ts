import { z } from "zod";
import type {
  ChangePasswordFormData,
  TwoFactorSetupFormData,
} from "../types/settings.types";
import {
  getSettingsErrorSummary,
  toValidationFeedback,
} from "./settings-validation";

function createChangePasswordSchema(hasPassword: boolean) {
  return z
    .object({
      currentPassword: hasPassword
        ? z.string().trim().min(1, "Current password is required")
        : z.string().optional().default(""),
      newPassword: z
        .string()
        .min(1, "New password is required")
        .min(8, "Password must be at least 8 characters"),
      confirmNewPassword: z.string().min(1, "Please confirm your new password"),
    })
    .superRefine((values, context) => {
      if (
        hasPassword &&
        values.currentPassword &&
        values.newPassword &&
        values.currentPassword === values.newPassword
      ) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["newPassword"],
          message: "New password must be different from your current password",
        });
      }

      if (values.newPassword && values.confirmNewPassword && values.newPassword !== values.confirmNewPassword) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["confirmNewPassword"],
          message: "Passwords do not match",
        });
      }
    });
}

const twoFactorSetupSchema = z.object({
  code: z.string().trim().regex(/^\d{6}$/, "Authenticator code must be 6 digits"),
});

export function validateChangePasswordForm(values: ChangePasswordFormData, hasPassword: boolean) {
  const result = createChangePasswordSchema(hasPassword).safeParse(values);
  return result.success ? null : toValidationFeedback(result.error);
}

export function validateTwoFactorSetupForm(values: TwoFactorSetupFormData) {
  const result = twoFactorSetupSchema.safeParse(values);
  return result.success ? null : toValidationFeedback(result.error);
}

export { getSettingsErrorSummary };
