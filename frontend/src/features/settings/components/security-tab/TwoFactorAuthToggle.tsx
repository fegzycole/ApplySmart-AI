import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/shared/components/ui/button";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/shared/lib/utils";
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
      toast.success("Artifact scan active. Sync with authenticator.");
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
      toast.success("Secondary authentication layer calibrated.");
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
      toast.success("Secondary layer disconnected.");
    } catch (error) {
      const serverFeedback = getSettingsServerFeedback<Record<never, string>>(error, []);
      setFormErrors(serverFeedback.formErrors);
      toast.error(serverFeedback.formErrors[0] ?? "Layer disconnection failure.");
    }
  };

  return (
    <div className="mx-auto w-full space-y-6 xl:w-[92%]">
      {!setup ? <SettingsFormErrorSummary messages={formErrors} /> : null}

      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-4">
          <div className="mt-1 flex size-12 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-xl dark:bg-emerald-600">
            <ShieldCheck className="size-6" />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <p className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight leading-none">{title}</p>
              <div className={cn(
                "flex h-5 shrink-0 items-center whitespace-nowrap px-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                enabled 
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" 
                  : "bg-zinc-900/5 border-zinc-200/50 text-zinc-500"
              )}>
                {enabled ? "Active" : "Uncalibrated"}
              </div>
            </div>
            <p className="text-sm font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          </div>
        </div>
        <Button
          type="button"
          disabled={!available || isSaving}
          onClick={() => {
            if (enabled) {
              void handleDisable();
              return;
            }
            void startSetup();
          }}
          className="group/btn relative h-12 w-full overflow-hidden rounded-2xl bg-zinc-900 px-5 text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-zinc-900/20 transition-all hover:scale-105 active:scale-95 dark:bg-sky-600 sm:h-14 sm:w-auto sm:px-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
          {isSaving ? <Loader2 className="mr-3 size-4 animate-spin" /> : null}
          {enabled ? "Disconnect Layer" : hasSetupPending ? "Regenerate QR" : "Activate 2FA"}
        </Button>
      </div>

      {enabled ? (
        <div className="p-6 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center gap-4">
           <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
           <p className="text-[13px] font-bold text-emerald-700 dark:text-emerald-300 leading-relaxed">
             Secondary neural layer is active. System now requires authenticator verification for all entry sequences.
           </p>
        </div>
      ) : null}

      {!available ? (
        <div className="flex items-start gap-3 rounded-2xl border-2 border-zinc-100 bg-zinc-900/5 p-6 grayscale dark:border-zinc-800 dark:bg-white/5">
           <div className="mt-[0.34rem] h-2 w-2 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700" />
           <p className="text-[13px] font-bold text-zinc-500 dark:text-zinc-400 leading-relaxed">
             2FA protocol is currently exclusive to credential-based identities.
           </p>
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
    </div>
  );
}
