import type { CoverLetter } from "@/features/cover-letter/services/cover-letter.service";
import { DOCUMENT_CARD_STYLES } from "../constants/documents.constants";
import { getCoverLetterPreviewModel } from "../utils/document-preview.utils";
import { DocumentPdfPreview } from "./DocumentPdfPreview";

interface CoverLetterDocumentPreviewProps {
  coverLetter: CoverLetter;
}

export function CoverLetterDocumentPreview({
  coverLetter,
}: CoverLetterDocumentPreviewProps) {
  if (coverLetter.pdfUrl) {
    return (
      <DocumentPdfPreview
        title={`${coverLetter.company} cover letter preview`}
        url={coverLetter.pdfUrl}
      />
    );
  }

  const preview = getCoverLetterPreviewModel(coverLetter);

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
