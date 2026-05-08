import type { Resume } from "@/features/resume/services/resume.service";
import { DOCUMENT_CARD_STYLES } from "../constants/documents.constants";
import { getResumePreviewModel } from "../utils/document-preview.utils";
import { DocumentPdfPreview } from "./DocumentPdfPreview";

interface ResumeDocumentPreviewProps {
  resume: Resume;
  variant?: "modal" | "thumbnail";
}

export function ResumeDocumentPreview({
  resume,
  variant = "thumbnail",
}: ResumeDocumentPreviewProps) {
  if (resume.fileUrl) {
    return (
      <DocumentPdfPreview
        title={`${resume.name} preview`}
        url={resume.fileUrl}
        variant={variant}
      />
    );
  }

  const preview = getResumePreviewModel(resume);

  if (variant === "modal") {
    return (
      <div className="h-full overflow-y-auto rounded-[1.35rem] border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="space-y-2 border-b border-zinc-200 pb-4 dark:border-zinc-800">
            <p className="text-lg font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white sm:text-xl">
              {preview.name}
            </p>
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:text-base">
              {preview.headline}
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <p className={DOCUMENT_CARD_STYLES.previewMuted}>Professional Summary</p>
              <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300 sm:text-[0.95rem]">
                {preview.summary}
              </p>
            </div>

            {preview.bullets.length > 0 ? (
              <div className="space-y-3">
                <p className={DOCUMENT_CARD_STYLES.previewMuted}>Highlights</p>
                <div className="space-y-3">
                  {preview.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="flex items-start gap-3 text-sm leading-7 text-zinc-700 dark:text-zinc-300 sm:text-[0.95rem]"
                    >
                      <span className="mt-2 size-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={DOCUMENT_CARD_STYLES.previewPaper}>
      <div className="space-y-1 border-b border-zinc-200 pb-2 dark:border-zinc-800">
        <p className="truncate text-sm font-semibold tracking-[-0.02em] text-zinc-950 dark:text-white">
          {preview.name}
        </p>
        <p className="line-clamp-2 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
          {preview.headline}
        </p>
      </div>

      <div className="space-y-3 pt-3">
        <div className="space-y-1.5">
          <p className={DOCUMENT_CARD_STYLES.previewMuted}>Snapshot</p>
          <p className="line-clamp-5 text-xs leading-5 text-zinc-600 dark:text-zinc-300">
            {preview.summary}
          </p>
        </div>

        {preview.bullets.length > 0 ? (
          <div className="space-y-1.5">
            <p className={DOCUMENT_CARD_STYLES.previewMuted}>Highlights</p>
            <div className="space-y-1.5">
              {preview.bullets.slice(0, 2).map((bullet) => (
                <div
                  key={bullet}
                  className="flex items-start gap-2 text-xs leading-5 text-zinc-600 dark:text-zinc-300"
                >
                  <span className="mt-1.5 size-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
