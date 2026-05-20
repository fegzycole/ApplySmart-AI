import { DestructiveConfirmationDialog } from "@/shared/components";
import type { CoverLetter } from "@/features/cover-letter/services/cover-letter.service";

interface CoverLetterDeleteDialogProps {
  coverLetter: CoverLetter | null;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export function CoverLetterDeleteDialog({
  coverLetter,
  onConfirm,
  onOpenChange,
  open,
}: CoverLetterDeleteDialogProps) {
  return (
    <DestructiveConfirmationDialog
      open={open}
      title="Delete Cover Letter?"
      confirmLabel="Delete Cover Letter"
      description={(
        <>
          Are you sure you want to delete the letter for{" "}
          <span className="font-semibold text-zinc-900 dark:text-white">
            {coverLetter?.company}
          </span>
          ? This action cannot be undone.
        </>
      )}
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
    />
  );
}
