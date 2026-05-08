import type { DocumentsPreviewTarget } from "../types/documents.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { CoverLetterDocumentPreview } from "./CoverLetterDocumentPreview";
import { ResumeDocumentPreview } from "./ResumeDocumentPreview";

interface DocumentPreviewDialogProps {
  onOpenChange: (open: boolean) => void;
  previewTarget: DocumentsPreviewTarget | null;
}

function getDialogCopy(previewTarget: DocumentsPreviewTarget | null) {
  if (!previewTarget) {
    return null;
  }

  if (previewTarget.type === "resume") {
    return {
      title: previewTarget.resume.name,
      description: "Magnified document preview",
    };
  }

  return {
    title: `${previewTarget.coverLetter.company} cover letter`,
    description: previewTarget.coverLetter.position,
  };
}

export function DocumentPreviewDialog({
  onOpenChange,
  previewTarget,
}: DocumentPreviewDialogProps) {
  const dialogCopy = getDialogCopy(previewTarget);

  return (
    <Dialog open={Boolean(previewTarget)} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[min(92vh,56rem)] w-[min(96vw,72rem)] max-w-none flex-col gap-0 overflow-hidden rounded-[1.5rem] border-zinc-200/80 bg-zinc-50 p-0 shadow-2xl shadow-zinc-950/15 dark:border-zinc-800 dark:bg-zinc-950">
        {dialogCopy ? (
          <>
            <DialogHeader className="shrink-0 border-b border-zinc-200/80 px-5 py-4 pr-14 text-left dark:border-zinc-800 sm:px-6">
              <DialogTitle className="truncate text-base font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white sm:text-lg">
                {dialogCopy.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-zinc-600 dark:text-zinc-400">
                {dialogCopy.description}
              </DialogDescription>
            </DialogHeader>

            <div className="min-h-0 flex-1 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.08),transparent_30%)] p-3 sm:p-4">
              {previewTarget?.type === "resume" ? (
                <ResumeDocumentPreview resume={previewTarget.resume} variant="modal" />
              ) : previewTarget ? (
                <CoverLetterDocumentPreview coverLetter={previewTarget.coverLetter} variant="modal" />
              ) : null}
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
