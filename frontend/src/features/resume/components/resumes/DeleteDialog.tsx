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
import type { Resume } from "../../services/resume.service";

interface DeleteDialogProps {
  open: boolean;
  resume: Resume | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteDialog({ open, resume, onOpenChange, onConfirm }: DeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="mx-auto size-12 rounded-full bg-red-100 dark:bg-red-950/30 flex items-center justify-center mb-4">
            <AlertTriangle className="size-6 text-red-600 dark:text-red-400" />
          </div>
          <AlertDialogTitle className="text-center text-xl">
            Delete Resume?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-zinc-900 dark:text-white">
              "{resume?.name}"
            </span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel className="m-0 border-2 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="m-0 bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
          >
            Delete Resume
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
