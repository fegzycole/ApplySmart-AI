import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/shared/components/ui/button";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useDisableTwoFactor, useEnableTwoFactor, useSetupTwoFactor } from "../../hooks/useSettingsSecurity";
import type { TwoFactorSetup, TwoFactorSetupFormData } from "../../types/settings.types";
import { getSettingsServerFeedback } from "../../utils/settings-security.errors";
import {
  getSettingsErrorSummary,
  validateTwoFactorSetupForm,
} from "../../utils/settings-security.validation";
import { TwoFactorSetupForm } from "./TwoFactorSetupForm";
import { SettingsFormErrorSummary } from "../shared";

interface TwoFactorAuthToggleProps {
  title: string;
  description: string;
  enabled: boolean;
  available: boolean;
  hasSetupPending: boolean;
}

export function TwoFactorAuthToggle({
  title,
  description,
  enabled,
  available,
  hasSetupPending,
}: TwoFactorAuthToggleProps) {
  const setupMutation = useSetupTwoFactor();
  const enableMutation = useEnableTwoFactor();
  const disableMutation = useDisableTwoFactor();
  const [setup, setSetup] = useState<TwoFactorSetup | null>(null);
  const [values, setValues] = useState<TwoFactorSetupFormData>({ code: "" });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof TwoFactorSetupFormData, string>>>({});
  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    if (enabled) {
      setSetup(null);
      setValues({ code: "" });
      setFieldErrors({});
      setFormErrors([]);
    }
  }, [enabled]);

  const isSaving = setupMutation.isPending || enableMutation.isPending || disableMutation.isPending;

  const startSetup = async () => {
    try {
      const nextSetup = await setupMutation.mutateAsync();
      setSetup(nextSetup);
      setValues({ code: "" });
      setFieldErrors({});
      setFormErrors([]);
      toast.success("Scan the QR code in your authenticator app.");
    } catch (error) {
      const serverFeedback = getSettingsServerFeedback<Record<never, string>>(error, []);
      setFormErrors(serverFeedback.formErrors);
    }
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setValues({ code: nextValue });
    setFieldErrors({});
    setFormErrors([]);
  };

  const handleEnable = async (event: FormEvent) => {
    event.preventDefault();

    const validation = validateTwoFactorSetupForm(values);
    if (validation) {
      setFieldErrors(validation.fieldErrors);
      setFormErrors(getSettingsErrorSummary(validation));
      return;
    }

    try {
      await enableMutation.mutateAsync({ code: values.code });
      setSetup(null);
      setValues({ code: "" });
      setFieldErrors({});
      setFormErrors([]);
      toast.success("Authenticator app two-factor authentication enabled.");
    } catch (error) {
      const serverFeedback = getSettingsServerFeedback<TwoFactorSetupFormData>(error, ["code"]);
      setFieldErrors(serverFeedback.fieldErrors);
      setFormErrors(serverFeedback.formErrors);
    }
  };

  const handleDisable = async () => {
    try {
      await disableMutation.mutateAsync();
      setSetup(null);
      setValues({ code: "" });
      setFieldErrors({});
      setFormErrors([]);
      toast.success("Two-factor authentication disabled.");
    } catch (error) {
      const serverFeedback = getSettingsServerFeedback<Record<never, string>>(error, []);
      setFormErrors(serverFeedback.formErrors);
      toast.error(serverFeedback.formErrors[0] ?? "Failed to disable two-factor authentication.");
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {!setup ? <SettingsFormErrorSummary messages={formErrors} /> : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            <ShieldCheck className="size-5" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-base font-semibold text-zinc-950 dark:text-white">{title}</p>
              <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                {enabled ? "Enabled" : "Inactive"}
              </span>
            </div>
            <p className="max-w-lg text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          disabled={!available || isSaving}
          onClick={() => {
            if (enabled) {
              void handleDisable();
              return;
            }

            void startSetup();
          }}
          className="h-11 w-full rounded-xl border-zinc-200 bg-white px-5 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 sm:w-auto"
        >
          {isSaving ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
          {enabled ? "Disable 2FA" : hasSetupPending ? "Generate New QR" : "Set Up 2FA"}
        </Button>
      </div>

      {enabled ? (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-4 text-sm leading-6 text-emerald-800 dark:border-emerald-950/70 dark:bg-emerald-950/20 dark:text-emerald-300">
          Your account now requires a 6-digit code from your authenticator app after password sign-in.
        </div>
      ) : null}

      {!enabled && available && hasSetupPending && !setup ? (
        <div className="rounded-2xl border border-cyan-100 bg-cyan-50/70 px-4 py-4 text-sm leading-6 text-cyan-900 dark:border-cyan-950/70 dark:bg-cyan-950/20 dark:text-cyan-200">
          Authenticator setup was started for this account but not confirmed. Generate a fresh QR code and finish verification to activate two-factor authentication.
        </div>
      ) : null}

      {!available ? (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50/80 px-4 py-4 text-sm leading-6 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300">
          Two-factor authentication is currently available for password-based accounts only.
        </div>
      ) : null}

      {setup ? (
        <TwoFactorSetupForm
          setup={setup}
          code={values.code}
          error={fieldErrors.code}
          formErrors={formErrors}
          isSubmitting={enableMutation.isPending}
          onCodeChange={handleCodeChange}
          onSubmit={handleEnable}
          onCancel={() => {
            setSetup(null);
            setValues({ code: "" });
            setFieldErrors({});
            setFormErrors([]);
          }}
        />
      ) : null}

      {!enabled && available && !setup ? (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-4 text-sm leading-6 text-emerald-800 dark:border-emerald-950/70 dark:bg-emerald-950/20 dark:text-emerald-300">
          Use an authenticator app like Google Authenticator, 1Password, or Authy to generate 6-digit codes for sign-in.
        </div>
      ) : null}
    </div>
  );
}
