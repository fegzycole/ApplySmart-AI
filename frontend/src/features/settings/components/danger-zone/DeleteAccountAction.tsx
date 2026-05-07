import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Loader2, Trash2 } from "lucide-react";
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
      <div className="flex flex-col gap-4 rounded-[1.25rem] border border-red-200/80 bg-white/80 p-4 dark:border-red-950/60 dark:bg-zinc-950/30 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 space-y-1">
          <p className="text-base font-semibold text-zinc-950 dark:text-white">
            Delete Account
          </p>
          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Permanently remove your account, profile image, resumes, cover letters, jobs, and active sessions.
          </p>
        </div>
        <Button
          type="button"
          variant="destructive"
          disabled={!isReady}
          className="w-full cursor-pointer rounded-xl sm:w-auto"
          onClick={() => handleOpenChange(true)}
        >
          <Trash2 className="mr-2 size-4" />
          Delete Account
        </Button>
      </div>

      <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Delete your account?</DialogTitle>
              <DialogDescription className="leading-6">
                This action cannot be undone. To confirm, type <span className="font-semibold text-zinc-950 dark:text-white">DELETE</span> below.
              </DialogDescription>
            </DialogHeader>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <SettingsFormErrorSummary messages={formErrors} />

            <div className="rounded-2xl border border-red-200/80 bg-red-50/80 px-4 py-4 text-sm leading-6 text-red-800 dark:border-red-950/70 dark:bg-red-950/20 dark:text-red-300">
              Your profile, uploaded files, generated documents, job applications, and account access will be permanently removed.
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmationText">Confirmation</Label>
              <Input
                id="confirmationText"
                value={values.confirmationText}
                onChange={handleChange}
                placeholder="DELETE"
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck={false}
                aria-invalid={Boolean(fieldErrors.confirmationText)}
                aria-describedby={fieldErrors.confirmationText ? "delete-account-confirmation-error" : undefined}
                className="h-12 rounded-xl border-red-200 bg-white font-mono text-sm uppercase tracking-[0.28em] placeholder:font-sans placeholder:normal-case placeholder:tracking-normal dark:border-red-900/70"
              />
              {fieldErrors.confirmationText ? (
                <p id="delete-account-confirmation-error" className="text-xs text-red-600 dark:text-red-400">
                  {fieldErrors.confirmationText}
                </p>
              ) : null}
            </div>

            <DialogFooter className="gap-3 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                className="w-full cursor-pointer rounded-xl sm:w-auto"
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={isDeleting}
                className="w-full cursor-pointer rounded-xl sm:w-auto"
              >
                {isDeleting ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Trash2 className="mr-2 size-4" />}
                {isDeleting ? "Deleting..." : "Delete this account"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
