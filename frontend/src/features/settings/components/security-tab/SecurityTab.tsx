import { KeyRound, ShieldCheck, Lock, AlertTriangle } from "lucide-react";
import { cn } from "@/shared/lib/utils";
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
    <div className="space-y-12">
      <SectionCard
        icon={Lock}
        title="Encryption & Access"
        description="Configure your account's high-security authentication layers."
      >
        <div className="group relative space-y-8 rounded-[2rem] border-0 bg-transparent p-0 dark:bg-transparent sm:overflow-hidden sm:rounded-[2.5rem] sm:border-2 sm:border-zinc-100 sm:bg-zinc-950/[0.02] sm:p-8 sm:space-y-10 dark:sm:border-zinc-800 dark:sm:bg-white/[0.02]">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-1000 group-hover:opacity-100 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent" />
          
          <div className="relative z-10 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="min-w-0 flex-1 space-y-4">
              <div className="flex items-start gap-2">
                 <div className="mt-[0.18rem] h-2 w-2 shrink-0 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-black uppercase leading-[1.1] tracking-[0.22em] text-emerald-600 dark:text-emerald-300">
                   Security Protocol Overview
                 </span>
              </div>
              <h3 className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase leading-none">
                Sign-In <span className="text-emerald-500">Integrity</span>
              </h3>
              <p className="text-base font-medium leading-[1.6] text-zinc-500 dark:text-zinc-400 sm:text-lg">
                Maintain a high-caliber authentication posture. Layered verification ensures your career artifacts remain under absolute control.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 xl:justify-end">
              <div className="flex h-8 items-center px-3 rounded-full bg-zinc-900/5 dark:bg-white/5 border border-zinc-200/50 dark:border-zinc-700/30 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                {hasPassword ? "Password Active" : "External Only"}
              </div>
              <div className={cn(
                "flex h-8 items-center px-3 rounded-full border text-[10px] font-black uppercase tracking-widest",
                twoFactorEnabled 
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" 
                  : "bg-zinc-900/5 border-zinc-200/50 text-zinc-500"
              )}>
                2FA: {twoFactorEnabled ? "Active" : "Inactive"}
              </div>
            </div>
          </div>

          <div className="relative z-10 grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="rounded-2xl border border-zinc-100 bg-white p-5 text-left shadow-sm transition-all hover:border-emerald-500/30 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-xl dark:bg-emerald-600">
                  <KeyRound className="size-6" />
                </div>
                <div className="min-w-0 pt-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Primary Key</p>
                  <p className="mt-1 text-base font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                    {hasPassword ? "Standard Credentials" : "OIDC Federated"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-100 bg-white p-5 text-left shadow-sm transition-all hover:border-emerald-500/30 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-xl dark:bg-emerald-600">
                  <ShieldCheck className="size-6" />
                </div>
                <div className="min-w-0 pt-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Secondary Node</p>
                  <p className="mt-1 text-base font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                    {twoFactorEnabled ? "Multi-Factor Active" : "Uncalibrated Layer"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {securityQuery.isError ? (
          <div className="rounded-2xl border-2 border-rose-100 bg-rose-50/30 p-8 text-center dark:border-rose-900/20 dark:bg-rose-950/10">
            <div className="flex items-center justify-center gap-3 text-rose-700 dark:text-rose-300 font-bold uppercase tracking-widest text-xs">
              <AlertTriangle className="size-4" />
              Node Synchronization Failure
            </div>
          </div>
        ) : null}

        <div className="space-y-10">
          <div className="mt-4 sm:mt-0">
            <SecuritySection {...SECURITY_SECTIONS[0]}>
              {isSecurityReady ? (
                <ChangePasswordForm
                  hasPassword={hasPassword}
                  isSaving={changePasswordMutation.isPending}
                  onSubmit={(data) => changePasswordMutation.mutateAsync(data)}
                />
              ) : (
                <div className="h-40 rounded-[2.5rem] bg-zinc-900/5 animate-pulse" />
              )}
            </SecuritySection>
          </div>

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
              <div className="h-40 rounded-[2.5rem] bg-zinc-900/5 animate-pulse" />
            )}
          </SecuritySection>
        </div>
      </SectionCard>

      <DangerZone isReady={isSecurityReady} />
    </div>
  );
}
