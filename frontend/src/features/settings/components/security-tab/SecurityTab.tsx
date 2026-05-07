import { KeyRound, Shield, ShieldCheck } from "lucide-react";
import { SectionCard } from "../shared/SectionCard";
import { SecuritySection } from "./SecuritySection";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { TwoFactorAuthToggle } from "./TwoFactorAuthToggle";
import { DangerZone } from "../danger-zone/DangerZone";
import { SECURITY_SECTIONS } from "../../constants/security.constants";
import { useChangePassword, useSecuritySettings } from "../../hooks/useSettingsSecurity";

export function SecurityTab() {
  const securityQuery = useSecuritySettings();
  const changePasswordMutation = useChangePassword();

  const security = securityQuery.data;
  const twoFactorEnabled = security?.twoFactorEnabled ?? false;
  const hasPassword = security?.hasPassword ?? false;
  const hasSetupPending = security?.twoFactorSetupPending ?? false;
  const isSecurityReady = !securityQuery.isLoading && !!security;

  return (
    <>
      <SectionCard
        icon={Shield}
        title="Security Settings"
        description="Protect your account with stronger credentials and layered verification."
        iconGradient="from-emerald-500 to-teal-500"
      >
        <div className="overflow-hidden rounded-[1.5rem] border border-zinc-200/80 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.14),_transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,244,245,0.92))] dark:border-zinc-800 dark:bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_35%),linear-gradient(180deg,rgba(24,24,27,0.92),rgba(9,9,11,0.9))]">
          <div className="flex flex-col gap-5 px-4 py-4 sm:px-5 sm:py-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-300">
                Security overview
              </p>
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-zinc-950 dark:text-white sm:text-2xl">
                Your sign-in setup at a glance.
              </h3>
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Keep a strong password on the account and add authenticator-based verification when you want a tighter login flow.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200">
                {hasPassword ? "Password account" : "External sign-in"}
              </span>
              <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50/90 px-3 py-1.5 text-xs font-medium text-emerald-700 shadow-sm dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300">
                {twoFactorEnabled ? "Authenticator enabled" : "Authenticator not enabled"}
              </span>
            </div>
          </div>

          <div className="grid gap-px border-t border-zinc-200/80 bg-zinc-200/80 dark:border-zinc-800 dark:bg-zinc-800 sm:grid-cols-2">
            <div className="bg-white/85 px-4 py-4 dark:bg-zinc-950/65">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                  <KeyRound className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                    Sign-in
                  </p>
                  <p className="mt-1 text-base font-semibold text-zinc-950 dark:text-white">
                    {hasPassword ? "Password enabled" : "Provider only"}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {hasPassword
                      ? "You can sign in directly with email and password."
                      : "Add a password if you want direct email sign-in."}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/85 px-4 py-4 dark:bg-zinc-950/65">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                  <ShieldCheck className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                    Authenticator
                  </p>
                  <p className="mt-1 text-base font-semibold text-zinc-950 dark:text-white">
                    {twoFactorEnabled ? "Enabled" : hasPassword ? "Available" : "Unavailable"}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {twoFactorEnabled
                      ? "A one-time code is required after password sign-in."
                      : hasPassword
                        ? "Set up an authenticator app to add a second check."
                        : "Authenticator setup appears after you add a password."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {securityQuery.isError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700 dark:border-red-950 dark:bg-red-950/20 dark:text-red-300">
            We couldn't load your security settings right now. Please refresh and try again.
          </div>
        ) : null}

        <div className="space-y-4 sm:space-y-5">
          <SecuritySection {...SECURITY_SECTIONS[0]}>
            {isSecurityReady ? (
              <ChangePasswordForm
                hasPassword={hasPassword}
                isSaving={changePasswordMutation.isPending}
                onSubmit={(data) => changePasswordMutation.mutateAsync(data)}
              />
            ) : (
              <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50/80 px-4 py-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
                Loading your password settings...
              </div>
            )}
          </SecuritySection>

          <SecuritySection {...SECURITY_SECTIONS[1]}>
            {isSecurityReady ? (
              <TwoFactorAuthToggle
                title={SECURITY_SECTIONS[1].title}
                description={SECURITY_SECTIONS[1].description}
                enabled={twoFactorEnabled}
                available={hasPassword}
                hasSetupPending={hasSetupPending}
              />
            ) : (
              <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50/80 px-4 py-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
                Loading your two-factor authentication settings...
              </div>
            )}
          </SecuritySection>
        </div>
      </SectionCard>

      <DangerZone isReady={isSecurityReady} />
    </>
  );
}
