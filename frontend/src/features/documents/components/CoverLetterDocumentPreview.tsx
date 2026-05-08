import type { CoverLetter } from "@/features/cover-letter/services/cover-letter.service";
import { DOCUMENT_CARD_STYLES } from "../constants/documents.constants";
import { getCoverLetterPreviewModel } from "../utils/document-preview.utils";
import { DocumentPdfPreview } from "./DocumentPdfPreview";

interface CoverLetterDocumentPreviewProps {
  coverLetter: CoverLetter;
  variant?: "modal" | "thumbnail";
}

export function CoverLetterDocumentPreview({
  coverLetter,
  variant = "thumbnail",
}: CoverLetterDocumentPreviewProps) {
  if (coverLetter.pdfUrl) {
    return (
      <DocumentPdfPreview
        title={`${coverLetter.company} cover letter preview`}
        url={coverLetter.pdfUrl}
        variant={variant}
      />
    );
  }

  const preview = getCoverLetterPreviewModel(coverLetter);

  if (variant === "modal") {
    return (
      <div className="h-full overflow-y-auto rounded-[1.35rem] border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="space-y-2 border-b border-zinc-200 pb-4 dark:border-zinc-800">
            <p className="text-lg font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white sm:text-xl">
              {preview.company}
            </p>
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:text-base">
              {preview.role}
            </p>
          </div>

          <div className="space-y-4 text-sm leading-7 text-zinc-700 dark:text-zinc-300 sm:text-[0.95rem]">
            <p>{preview.greeting}</p>
            <p>{preview.paragraph}</p>
            <p>{preview.closing}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={DOCUMENT_CARD_STYLES.previewPaper}>
      <div className="space-y-1 border-b border-zinc-200 pb-2 dark:border-zinc-800">
        <p className="truncate text-sm font-semibold tracking-[-0.02em] text-zinc-950 dark:text-white">
          {preview.company}
        </p>
        <p className="line-clamp-2 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
          {preview.role}
        </p>
      </div>

      <div className="space-y-3 pt-3 text-xs leading-5 text-zinc-600 dark:text-zinc-300">
        <p className="line-clamp-2">{preview.greeting}</p>
        <p className="line-clamp-6">{preview.paragraph}</p>
        <p className="pt-1 text-zinc-500 dark:text-zinc-400">
          {preview.closing}
        </p>
      </div>
    </div>
  );
}
