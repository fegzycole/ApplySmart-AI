import { useEffect, useState, type FormEvent } from "react";
import { Copy, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/lib/utils";
import { SettingsFormErrorSummary } from "../shared";
import type { TwoFactorSetup } from "../../types/settings.types";
import { MODULE_ARTIFACT_STYLES } from "../../constants/settings.constants";

interface TwoFactorSetupFormProps {
  setup: TwoFactorSetup;
  code: string;
  error?: string;
  formErrors: string[];
  isSubmitting: boolean;
  onCodeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent) => void;
  onCancel: () => void;
}

export function TwoFactorSetupForm({
  setup,
  code,
  error,
  formErrors,
  isSubmitting,
  onCodeChange,
  onSubmit,
  onCancel,
}: TwoFactorSetupFormProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    void import("qrcode")
      .then(({ default: QRCode }) =>
        QRCode.toDataURL(setup.otpAuthUri, {
          errorCorrectionLevel: "M",
          margin: 1,
          width: 192,
        })
      )
      .then((dataUrl: string) => {
        if (active) setQrCodeDataUrl(dataUrl);
      })
      .catch(() => {
        if (active) setQrCodeDataUrl(null);
      });

    return () => {
      active = false;
    };
  }, [setup.otpAuthUri]);

  const copySecret = async () => {
    try {
      await navigator.clipboard.writeText(setup.secret);
      toast.success("Authenticator secret copied.");
    } catch {
      toast.error("Couldn't copy secret.");
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8 mt-10">
      <SettingsFormErrorSummary messages={formErrors} />

      <div className="grid gap-8 lg:grid-cols-[240px,1fr]">
        <div className="space-y-4 text-left">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 ml-1">
            Visual Calibration
          </p>
          <div className="relative mx-auto aspect-square w-full max-w-[210px] flex items-center justify-center overflow-hidden rounded-[2rem] border-2 border-zinc-100 bg-white p-3 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
             <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent blur-2xl" />
            {qrCodeDataUrl ? (
              <img
                src={qrCodeDataUrl}
                alt="Authenticator app QR code"
                className="relative z-10 size-full rounded-[1.35rem] grayscale dark:invert"
              />
            ) : (
              <div className="flex flex-col items-center gap-4 text-sm text-zinc-400">
                <Loader2 className="size-8 animate-spin text-sky-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">Scanning...</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8 text-left">
          <div className="flex items-start gap-3 rounded-2xl border-2 border-sky-500/20 bg-sky-500/5 p-6 dark:bg-sky-500/10">
             <div className="mt-[0.34rem] h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500 animate-pulse" />
             <span className="text-[13px] font-bold leading-[1.45] text-sky-700 dark:text-sky-300">
               Scan the code via your secure authenticator app. If optical scan fails, manually inject the secret artifact below.
             </span>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 ml-1">
              Manual Setup Artifact
            </p>
            <div className="rounded-2xl border-2 border-zinc-100 bg-zinc-950/[0.02] dark:bg-white/[0.02] p-6 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-inner">
               <div className="min-w-0">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest leading-none">Secret Identity Key</p>
                  <p className="mt-3 font-mono text-sm font-black text-zinc-900 dark:text-zinc-50 break-all tracking-[0.2em]">{setup.secret}</p>
               </div>
               <Button
                  type="button"
                  variant="ghost"
                  className="h-12 rounded-xl bg-zinc-900/5 dark:bg-white/5 border-2 border-zinc-100 dark:border-zinc-800 font-black uppercase tracking-widest text-[10px] hover:bg-zinc-900 hover:text-white transition-all"
                  onClick={() => void copySecret()}
                >
                  <Copy className="mr-2 size-4" />
                  Sync Key
                </Button>
            </div>
          </div>

          <div className="space-y-3 group">
            <Label htmlFor="two-factor-code" className={MODULE_ARTIFACT_STYLES.label}>
              Verification Token
            </Label>
            <div className="relative">
              <Input
                id="two-factor-code"
                value={code}
                onChange={onCodeChange}
                inputMode="numeric"
                placeholder="000 000"
                maxLength={6}
                aria-invalid={Boolean(error)}
                className={cn(
                  MODULE_ARTIFACT_STYLES.input,
                  "text-center text-3xl font-black tracking-[0.5em] placeholder:tracking-normal placeholder:text-zinc-200",
                  error && "border-rose-500 focus-visible:ring-rose-500/10"
                )}
              />
            </div>
            {error ? (
              <p className="text-[10px] font-bold uppercase tracking-widest text-rose-500 ml-1">
                {error}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row pt-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="relative h-16 flex-1 rounded-2xl bg-sky-600 text-white font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-sky-900/20 hover:scale-105 active:scale-95 transition-all overflow-hidden group/btn"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
          {isSubmitting ? <Loader2 className="mr-3 size-5 animate-spin" /> : <ShieldCheck className="mr-3 size-5" />}
          {isSubmitting ? "Verifying..." : "Initialize 2FA Node"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="h-16 flex-1 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 font-black uppercase tracking-widest text-[11px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all active:scale-95"
          onClick={onCancel}
        >
          Abort Calibration
        </Button>
      </div>
    </form>
  );
}
