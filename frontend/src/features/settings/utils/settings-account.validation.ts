import { z } from "zod";
import type { DeleteAccountFormData } from "../types/settings.types";
import {
  getSettingsErrorSummary,
  toValidationFeedback,
} from "./settings-validation";

function createDeleteAccountSchema() {
  return z.object({
    confirmationText: z
      .string()
      .trim()
      .min(1, "Type DELETE to confirm account deletion")
      .refine((value) => value.toUpperCase() === "DELETE", {
        message: "Type DELETE to confirm account deletion",
      }),
  });
}

export function validateDeleteAccountForm(values: DeleteAccountFormData) {
  const result = createDeleteAccountSchema().safeParse(values);
  return result.success ? null : toValidationFeedback(result.error);
}

export { getSettingsErrorSummary };
