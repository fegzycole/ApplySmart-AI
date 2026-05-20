import { DestructiveConfirmationDialog } from "@/shared/components";
import type { Resume } from "../../services/resume.service";

interface DeleteDialogProps {
  open: boolean;
  resume: Resume | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteDialog({ open, resume, onOpenChange, onConfirm }: DeleteDialogProps) {
  return (
    <DestructiveConfirmationDialog
      open={open}
      title="Delete Resume?"
      confirmLabel="Delete Resume"
      description={(
        <>
          Are you sure you want to delete{" "}
          <span className="font-semibold text-zinc-900 dark:text-white">
            "{resume?.name}"
          </span>
          ? This action cannot be undone.
        </>
      )}
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
    />
  );
}
