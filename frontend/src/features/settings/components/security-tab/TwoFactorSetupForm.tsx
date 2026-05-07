import { useEffect, useState, type FormEvent } from "react";
import QRCode from "qrcode";
import { Copy, Loader2, QrCode, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { SettingsFormErrorSummary } from "../shared";
import type { TwoFactorSetup } from "../../types/settings.types";

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

    void QRCode.toDataURL(setup.otpAuthUri, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 224,
    })
      .then((dataUrl: string) => {
        if (active) {
          setQrCodeDataUrl(dataUrl);
        }
      })
      .catch(() => {
        if (active) {
          setQrCodeDataUrl(null);
        }
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
      toast.error("Couldn't copy the authenticator secret.");
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <SettingsFormErrorSummary messages={formErrors} />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,224px),minmax(0,1fr)]">
        <div className="rounded-[1.5rem] border border-zinc-200/80 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/70">
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <QrCode className="size-4" />
            Scan in your authenticator app
          </div>
          <div className="mt-4 flex min-h-56 items-center justify-center rounded-[1.25rem] border border-dashed border-zinc-300 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-950/80">
            {qrCodeDataUrl ? (
              <img
                src={qrCodeDataUrl}
                alt="Authenticator app QR code"
                className="size-56 rounded-xl"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <Loader2 className="size-5 animate-spin" />
                Generating QR code...
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-cyan-100 bg-cyan-50/70 p-4 text-sm leading-6 text-cyan-900 dark:border-cyan-950/70 dark:bg-cyan-950/20 dark:text-cyan-200">
            Scan the QR code with Google Authenticator, 1Password, Authy, or another TOTP app. If scanning is unavailable, enter the setup key manually.
          </div>

          <div className="rounded-[1.5rem] border border-zinc-200/80 bg-white/90 p-4 dark:border-zinc-800 dark:bg-zinc-950/60">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                  Manual setup key
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Issuer: {setup.issuer} · Account: {setup.accountName}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer rounded-xl"
                onClick={() => void copySecret()}
              >
                <Copy className="mr-2 size-4" />
                Copy
              </Button>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-mono text-xs leading-6 tracking-[0.16em] break-all text-zinc-900 sm:text-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
              {setup.secret}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="two-factor-code" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Authenticator Code
            </Label>
            <Input
              id="two-factor-code"
              value={code}
              onChange={onCodeChange}
              inputMode="numeric"
              placeholder="Enter 6-digit code"
              maxLength={6}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "two-factor-code-error" : undefined}
              className="h-12 rounded-xl border-zinc-200 bg-white/90 px-4 shadow-sm transition-colors placeholder:text-zinc-400 focus-visible:border-cyan-500 focus-visible:ring-cyan-500/20 dark:border-zinc-800 dark:bg-zinc-900/80"
            />
            {error ? (
              <p id="two-factor-code-error" className="text-xs text-red-600 dark:text-red-400">
                {error}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          {isSubmitting ? <Loader2 className="mr-2 size-4 animate-spin" /> : <ShieldCheck className="mr-2 size-4" />}
          {isSubmitting ? "Verifying..." : "Enable Authenticator App"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1 cursor-pointer rounded-xl"
          onClick={onCancel}
        >
          Cancel Setup
        </Button>
      </div>
    </form>
  );
}
