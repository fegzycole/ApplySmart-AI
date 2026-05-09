import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { SettingsFormErrorSummary } from "../shared";
import { useDeleteAccountFlow } from "../../hooks/useDeleteAccountFlow";

interface DeleteAccountActionProps {
  isReady: boolean;
}

export function DeleteAccountAction({ isReady }: DeleteAccountActionProps) {
  const {
    open,
    values,
    fieldErrors,
    formErrors,
    isDeleting,
    handleOpenChange,
    handleChange,
    handleSubmit,
  } = useDeleteAccountFlow();

  return (
    <>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 space-y-2 pl-2 sm:pl-0">
          <p className="pl-0.5 text-lg font-black uppercase tracking-tight leading-[1.05] text-rose-600 dark:text-rose-400">
            Purge Account Node
          </p>
          <p className="max-w-xl text-sm font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Irreversibly terminate your career engine node. This will permanently de-index your profile, artifacts, and trajectory logs.
          </p>
        </div>
        <Button
          type="button"
          disabled={!isReady}
          className="relative h-14 px-8 rounded-2xl bg-rose-600 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-rose-900/20 hover:scale-105 active:scale-95 transition-all overflow-hidden group/btn"
          onClick={() => handleOpenChange(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
          <Trash2 className="mr-3 size-4.5" />
          Initialize Purge
        </Button>
      </div>

      <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogContent className="max-h-[min(92vh,48rem)] max-w-[calc(100vw-1.5rem)] overflow-y-auto rounded-[2rem] border-0 bg-white p-0 shadow-2xl shadow-rose-900/20 dark:bg-zinc-950 sm:max-w-2xl sm:rounded-[2.5rem]">
            <DialogHeader className="px-5 pt-12 pb-0 sm:px-8 sm:pt-10">
              <DialogTitle className="text-2xl leading-[0.95] font-black tracking-tighter text-rose-600 uppercase sm:text-4xl">
                Confirm <span className="text-zinc-900 dark:text-white">System Override</span>
              </DialogTitle>
              <DialogDescription className="mt-4 text-sm leading-relaxed font-medium text-zinc-500 sm:mt-6 sm:text-lg">
                This termination sequence is irreversible. To authorize purge, inject the token <span className="font-black text-rose-600 underline decoration-rose-500/30">DELETE</span> below.
              </DialogDescription>
            </DialogHeader>

          <form onSubmit={handleSubmit} noValidate className="space-y-6 px-5 pt-6 pb-5 sm:space-y-8 sm:px-8 sm:pt-8 sm:pb-8">
            <SettingsFormErrorSummary messages={formErrors} />

            <div className="flex items-start gap-3 rounded-[1.5rem] border-2 border-rose-100 bg-rose-50/30 p-4 dark:border-rose-900/20 dark:bg-rose-950/10 sm:gap-4 sm:rounded-[2rem] sm:p-6">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-500 text-white shadow-lg sm:h-10 sm:w-10">
                 <AlertTriangle className="size-4.5 sm:size-5" />
              </div>
              <p className="text-[12px] leading-relaxed font-bold text-rose-700 dark:text-rose-300 sm:text-[13px]">
                Termination results in the total loss of all career artifacts, synthesized narratives, and pipeline telemetry. This cannot be recovered.
              </p>
            </div>

            <div className="space-y-3 group">
              <Label htmlFor="confirmationText" className="ml-1 text-[10px] font-black uppercase tracking-[0.24em] text-rose-600/60">
                Authorization Token
              </Label>
              <Input
                id="confirmationText"
                value={values.confirmationText}
                onChange={handleChange}
                placeholder="DELETE"
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck={false}
                aria-invalid={Boolean(fieldErrors.confirmationText)}
                className="h-14 rounded-2xl border-2 border-rose-100 bg-rose-50/[0.02] px-4 text-center text-xl font-black uppercase tracking-[0.35em] focus-visible:border-rose-500 focus-visible:ring-4 focus-visible:ring-rose-500/5 transition-all dark:border-rose-900/30 sm:h-16 sm:px-6 sm:text-2xl sm:tracking-[0.5em]"
              />
              {fieldErrors.confirmationText ? (
                <p id="delete-account-confirmation-error" className="text-[10px] font-bold uppercase tracking-widest text-rose-500 ml-1">
                  {fieldErrors.confirmationText}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end sm:gap-4 sm:pt-4">
              <Button
                type="button"
                variant="ghost"
                className="h-12 rounded-2xl border-2 border-zinc-100 px-5 text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500 transition-all active:scale-95 hover:text-zinc-900 dark:border-zinc-800 dark:hover:text-zinc-100 sm:h-14 sm:px-8 sm:text-[11px] sm:tracking-widest"
                onClick={() => handleOpenChange(false)}
              >
                Abort Protocol
              </Button>
              <Button
                type="submit"
                disabled={isDeleting}
                className="h-12 rounded-2xl bg-rose-600 px-5 text-[10px] font-black uppercase tracking-[0.22em] text-white shadow-2xl shadow-rose-900/20 transition-all active:scale-95 hover:scale-105 sm:h-14 sm:px-8 sm:text-[11px] sm:tracking-widest"
              >
                {isDeleting ? <Loader2 className="mr-2 size-4 animate-spin sm:mr-3 sm:size-5" /> : <Trash2 className="mr-2 size-4 sm:mr-3 sm:size-5" />}
                {isDeleting ? "Terminating Node..." : "Authorize Full Purge"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
