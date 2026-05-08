import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import {
  downloadCoverLetterPdf,
  type CoverLetter,
} from "@/features/cover-letter/services/cover-letter.service";
import { triggerBrowserDownload } from "@/features/resume/utils/resume-download";
import { DOCUMENT_CARD_STYLES } from "../constants/documents.constants";
import {
  formatDocumentDate,
  getCoverLetterDownloadFilename,
} from "../utils/documents.utils";
import { CoverLetterDocumentPreview } from "./CoverLetterDocumentPreview";

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

  const handleDownload = async () => {
    if (!coverLetter.pdfUrl) {
      return;
    }

    setDownloading(true);

    try {
      const blob = await downloadCoverLetterPdf(coverLetter.pdfUrl);
      triggerBrowserDownload(blob, getCoverLetterDownloadFilename(coverLetter));
      toast.success("Cover letter downloaded.");
    } catch {
      toast.error("Failed to download cover letter. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Card className={DOCUMENT_CARD_STYLES.card}>
      <div className={DOCUMENT_CARD_STYLES.layout}>
        <CardContent className={DOCUMENT_CARD_STYLES.body}>
          <CardHeader className={DOCUMENT_CARD_STYLES.header}>
            <div className="min-w-0 space-y-1.5">
              <p className={DOCUMENT_CARD_STYLES.eyebrow}>Cover letter</p>
              <CardTitle className={`${DOCUMENT_CARD_STYLES.title} truncate`}>
                {coverLetter.company}
              </CardTitle>
              <p className={DOCUMENT_CARD_STYLES.subtitle}>
                {coverLetter.position}
              </p>
            </div>

            <div className={DOCUMENT_CARD_STYLES.metaRow}>
              <span className={DOCUMENT_CARD_STYLES.metaPill}>
                Updated {formatDocumentDate(coverLetter.lastModified)}
              </span>
              <span className={`${DOCUMENT_CARD_STYLES.metaPill} capitalize`}>
                {coverLetter.tone}
              </span>
              {coverLetter.wordCount ? (
                <span className={DOCUMENT_CARD_STYLES.metaPill}>
                  {coverLetter.wordCount} words
                </span>
              ) : null}
            </div>
          </CardHeader>

          <div className={`${DOCUMENT_CARD_STYLES.footer} flex flex-wrap gap-2`}>
            <Button
              variant="outline"
              className="h-9 rounded-lg border-zinc-300 bg-white px-3 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              onClick={handleDownload}
              disabled={!coverLetter.pdfUrl || downloading}
            >
              {downloading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="mr-2 size-4" />
                  Download PDF
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              className="h-9 rounded-lg px-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30 dark:hover:text-red-300"
              onClick={() => onDelete(coverLetter)}
            >
              Delete
            </Button>
          </div>
        </CardContent>

        <div className={DOCUMENT_CARD_STYLES.previewShell}>
          <button
            type="button"
            className={DOCUMENT_CARD_STYLES.previewButton}
            onClick={() => onPreview(coverLetter)}
            aria-label={`Open preview for ${coverLetter.company} cover letter`}
          >
            <CoverLetterDocumentPreview coverLetter={coverLetter} />
          </button>
        </div>
      </div>
    </Card>
  );
}
