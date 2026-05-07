import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";
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
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/30">
            <AlertTriangle className="size-6 text-red-600 dark:text-red-400" />
          </div>
          <AlertDialogTitle className="text-center text-xl">
            Delete Cover Letter?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base">
            Are you sure you want to delete the letter for{" "}
            <span className="font-semibold text-zinc-900 dark:text-white">
              {coverLetter?.company}
            </span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
          <AlertDialogCancel className="m-0 border-2 border-zinc-200 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="m-0 bg-red-600 text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete Cover Letter
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
