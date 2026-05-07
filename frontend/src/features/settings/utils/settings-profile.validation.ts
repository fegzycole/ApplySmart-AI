import { z } from "zod";
import type { UpdateProfileRequest } from "../types/settings.types";
import {
  getSettingsErrorSummary,
  toValidationFeedback,
} from "./settings-validation";

const profileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .min(2, "First name must be between 2 and 50 characters")
    .max(50, "First name must be between 2 and 50 characters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .min(2, "Last name must be between 2 and 50 characters")
    .max(50, "Last name must be between 2 and 50 characters"),
});

export function validateProfileForm(values: UpdateProfileRequest) {
  const result = profileSchema.safeParse(values);
  return result.success ? null : toValidationFeedback(result.error);
}

export { getSettingsErrorSummary };
