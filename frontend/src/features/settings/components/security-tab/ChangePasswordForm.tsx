import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Check, LockKeyhole } from "lucide-react";
import { AUTH_KEYS } from "@/features/authentication/hooks/useAuthQueries";
import { apiClient } from "@/shared/services/api-client";
import { Button } from "@/shared/components/ui/button";
import { SettingsFormErrorSummary } from "../shared";
import { PasswordField } from "./PasswordField";
import type { ChangePasswordFormData, ChangePasswordRequest } from "../../types/settings.types";
import { getSecurityServerFeedback } from "../../utils/settings-security.errors";
import {
  getSettingsErrorSummary,
  validateChangePasswordForm,
} from "../../utils/settings-security.validation";

interface ChangePasswordFormProps {
  hasPassword: boolean;
  isSaving: boolean;
  onSubmit: (data: ChangePasswordRequest) => Promise<void>;
}

const EMPTY_FORM: ChangePasswordFormData = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const PASSWORD_FIELD_IDS: Array<keyof ChangePasswordFormData> = [
  "newPassword",
  "confirmNewPassword",
];

export function ChangePasswordForm({
  hasPassword,
  isSaving,
  onSubmit,
}: ChangePasswordFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [values, setValues] = useState<ChangePasswordFormData>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ChangePasswordFormData, string>>
  >({});
  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    if (hasPassword) {
      return;
    }

    setValues(EMPTY_FORM);
    setFieldErrors({});
    setFormErrors([]);
  }, [hasPassword]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const field = event.target.id as keyof ChangePasswordFormData;
    const nextValue = event.target.value;

    setValues((currentValues) => ({
      ...currentValues,
      [field]: nextValue,
    }));

    setFieldErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
    setFormErrors([]);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const validation = validateChangePasswordForm(values, hasPassword);
    if (validation) {
      setFieldErrors(validation.fieldErrors);
      setFormErrors(getSettingsErrorSummary(validation));
      return;
    }

    try {
      const request: ChangePasswordRequest = {
        newPassword: values.newPassword,
      };

      if (hasPassword) {
        request.currentPassword = values.currentPassword;
      }

      await onSubmit(request);
      queryClient.removeQueries({ queryKey: AUTH_KEYS.currentUser() });
      apiClient.clearAuthToken();
      navigate("/login?passwordChanged=1", { replace: true });
    } catch (error) {
      const serverFeedback = getSecurityServerFeedback(error);
      setFieldErrors(serverFeedback.fieldErrors);
      setFormErrors(serverFeedback.formErrors);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5">
      <SettingsFormErrorSummary messages={formErrors} />

      {!hasPassword ? (
        <div className="rounded-2xl border border-blue-200/80 bg-blue-50/70 px-4 py-4 text-sm leading-6 text-blue-900 dark:border-blue-950/70 dark:bg-blue-950/20 dark:text-blue-200">
          Set a password to enable direct email sign-in in addition to your external provider.
        </div>
      ) : null}

      {hasPassword ? (
        <PasswordField
          id="currentPassword"
          label="Current Password"
          value={values.currentPassword}
          onChange={handleChange}
          error={fieldErrors.currentPassword}
          disabled={isSaving}
        />
      ) : null}

      {PASSWORD_FIELD_IDS.map((fieldId) => (
        <PasswordField
          key={fieldId}
          id={fieldId}
          label={fieldId === "newPassword" ? "New Password" : "Confirm New Password"}
          value={values[fieldId]}
          onChange={handleChange}
          error={fieldErrors[fieldId]}
          disabled={isSaving}
          helperText={
            fieldId === "newPassword"
              ? hasPassword
                ? "Use at least 8 characters and avoid reusing your current password."
                : "Use at least 8 characters so you can sign in directly with email and password."
              : undefined
          }
        />
      ))}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
          Choose a strong password with a mix of letters, numbers, and symbols.
        </p>
        <Button
          type="submit"
          disabled={isSaving}
          className="h-11 w-full rounded-xl bg-zinc-950 px-5 text-white shadow-sm transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 sm:w-auto"
        >
          {isSaving ? <LockKeyhole className="mr-2 size-4 animate-pulse" /> : <Check className="mr-2 size-4" />}
          {isSaving ? "Updating..." : hasPassword ? "Update Password" : "Set Password"}
        </Button>
      </div>
    </form>
  );
}
