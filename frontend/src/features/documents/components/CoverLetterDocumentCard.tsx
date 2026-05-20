import { useState } from "react";
import { Download, Loader2, Trash2, Database, Mail } from "lucide-react";
import { toast } from "sonner";
import { CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import {
  downloadCoverLetterPdf,
  type CoverLetter,
} from "@/features/cover-letter/services/cover-letter.service";
import { triggerBrowserDownload } from "@/features/resume/utils/resume-download";
import { DOCUMENT_ARTIFACT_STYLES } from "../constants/documents.constants";
import {
  formatDocumentDate,
  getCoverLetterDownloadFilename,
} from "../utils/documents.utils";
import { CoverLetterDocumentPreview } from "./CoverLetterDocumentPreview";
import { DocumentArtifactCardFrame } from "./DocumentArtifactCardFrame";
import { cn } from "@/shared/lib/utils";

interface CoverLetterDocumentCardProps {
  coverLetter: CoverLetter;
  onDelete: (coverLetter: CoverLetter) => void;
  onPreview: (coverLetter: CoverLetter) => void;
}

export function CoverLetterDocumentCard({
  coverLetter,
  onDelete,
  onPreview,
}: CoverLetterDocumentCardProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!coverLetter.pdfUrl) return;

    setDownloading(true);
    try {
      const blob = await downloadCoverLetterPdf(coverLetter.pdfUrl);
      triggerBrowserDownload(blob, getCoverLetterDownloadFilename(coverLetter));
      toast.success("Cover letter downloaded.");
    } catch {
      toast.error("Failed to download cover letter.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <DocumentArtifactCardFrame
      actionLabel="Letter Interface"
      actions={(
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-10 rounded-xl bg-amber-500 px-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-amber-500/20 transition-all active:scale-95 hover:bg-amber-600 sm:px-4"
            onClick={handleDownload}
            disabled={!coverLetter.pdfUrl || downloading}
          >
            {downloading ? <Loader2 className="size-3.5 animate-spin" /> : <Download className="mr-1.5 size-3.5 sm:mr-2" />}
            {downloading ? "Sync" : "Export"}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-xl border border-zinc-100 bg-zinc-900/5 text-zinc-500 transition-all active:scale-90 hover:bg-rose-500/10 hover:text-rose-500 dark:border-zinc-800 dark:bg-white/5"
            onClick={(event) => {
              event.stopPropagation();
              onDelete(coverLetter);
            }}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      )}
      auraClassName="from-amber-400/20 via-orange-500/10 to-transparent"
      controlBarClassName="z-50 flex-col items-center p-2 sm:p-3 md:flex-row md:items-center md:justify-between"
      onPreview={() => onPreview(coverLetter)}
      preview={<CoverLetterDocumentPreview coverLetter={coverLetter} />}
      previewLabel="Read Narrative"
      previewLabelClassName="rounded-full border-2 border-amber-500 bg-white px-3 py-1.5 text-[8px] font-black uppercase tracking-widest text-amber-500 shadow-2xl dark:bg-zinc-900 sm:px-4 sm:py-2 sm:text-[10px]"
    >
      <div className={DOCUMENT_ARTIFACT_STYLES.content.header}>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="inline-flex h-6 min-w-0 max-w-full items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3 sm:h-7 sm:px-3.5">
            <span className={cn(DOCUMENT_ARTIFACT_STYLES.content.eyebrow, "block truncate text-[9px] leading-none tracking-[0.14em] text-amber-600 dark:text-amber-400 sm:text-[11px]")}>
              Narrative Artifact
            </span>
          </div>
          <div className="inline-flex h-6 min-w-0 max-w-full items-center rounded-full border border-zinc-200/50 bg-zinc-900/5 px-2.5 dark:border-zinc-700/30 dark:bg-white/5 sm:h-7 sm:px-3">
            <span className="block truncate text-[9px] font-black uppercase leading-none tracking-[0.14em] text-zinc-500 capitalize sm:text-[10px]">
              {coverLetter.tone} Tone
            </span>
          </div>
        </div>

        <CardTitle className={cn(DOCUMENT_ARTIFACT_STYLES.content.title, "line-clamp-1 text-xl sm:text-2xl lg:text-3xl")}>
          {coverLetter.company}
        </CardTitle>

        <p className="line-clamp-1 text-base font-bold tracking-tight text-zinc-500 dark:text-zinc-400 sm:text-lg">
          {coverLetter.position}
        </p>
      </div>

      <div className={cn(DOCUMENT_ARTIFACT_STYLES.content.metaRow, "gap-3 sm:gap-4")}>
        <div className={cn(DOCUMENT_ARTIFACT_STYLES.content.pill, "px-3 py-1.5 text-[11px] sm:px-4 sm:py-2 sm:text-sm")}>
          <Mail className="size-3 text-amber-500 sm:size-3.5" />
          {coverLetter.wordCount} words
        </div>
        <div className={cn(DOCUMENT_ARTIFACT_STYLES.content.pill, "px-3 py-1.5 text-[11px] sm:px-4 sm:py-2 sm:text-sm")}>
          <Database className="size-3 text-zinc-400 sm:size-3.5" />
          {formatDocumentDate(coverLetter.lastModified)}
        </div>
      </div>
    </DocumentArtifactCardFrame>
  );
}
