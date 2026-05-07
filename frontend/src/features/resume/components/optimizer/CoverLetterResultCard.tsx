import { motion } from "framer-motion";
import { Copy, Download, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { downloadCoverLetterPdf, type CoverLetter } from "@/features/cover-letter/services/cover-letter.service";
import { getDocumentDownloadFilename, triggerBrowserDownload } from "../../utils/resume-download";

interface CoverLetterResultCardProps {
  coverLetter: CoverLetter;
}

export function CoverLetterResultCard({ coverLetter }: CoverLetterResultCardProps) {
  const [downloading, setDownloading] = useState(false);
  const [copying, setCopying] = useState(false);

  const handleDownload = async () => {
    if (!coverLetter.pdfUrl) {
      return;
    }

    setDownloading(true);

    try {
      const blob = await downloadCoverLetterPdf(coverLetter.pdfUrl);
      triggerBrowserDownload(
        blob,
        getDocumentDownloadFilename(coverLetter.pdfUrl, "cover-letter.pdf")
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to download cover letter. Please try again."
      );
    } finally {
      setDownloading(false);
    }
  };

  const handleCopy = async () => {
    setCopying(true);

    try {
      await navigator.clipboard.writeText(coverLetter.content);
      toast.success("Cover letter copied.");
    } catch {
      toast.error("Couldn't copy the cover letter.");
    } finally {
      setCopying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="space-y-4 rounded-[1.75rem] border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6"
    >
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white sm:text-xl">
          Matching Cover Letter
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {coverLetter.position} at {coverLetter.company}
        </p>
      </div>

      <div className="space-y-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
            Preview
          </p>
        </div>

        <div className="relative">
          <p className="line-clamp-8 whitespace-pre-wrap text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            {coverLetter.content}
          </p>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-zinc-50 via-zinc-50/95 to-transparent dark:from-zinc-950/70 dark:via-zinc-950/50" />
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          This preview is shortened. Use copy or download to access the full letter.
        </p>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row">
        <Button
          onClick={() => void handleCopy()}
          variant="outline"
          disabled={copying}
          className="h-11 flex-1 rounded-xl"
        >
          <Copy className="mr-2 size-4" />
          {copying ? "Copying..." : "Copy Full Letter"}
        </Button>

        <Button
          onClick={handleDownload}
          disabled={downloading || !coverLetter.pdfUrl}
          className="h-11 flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-700 hover:to-fuchsia-700"
        >
          <Download className="mr-2 size-4" />
          {downloading ? "Downloading..." : "Download Cover Letter"}
        </Button>

        {coverLetter.pdfUrl ? (
          <Button
            asChild
            variant="outline"
            className="h-11 flex-1 rounded-xl"
          >
            <a href={coverLetter.pdfUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 size-4" />
              Open in New Tab
            </a>
          </Button>
        ) : null}
      </div>
    </motion.div>
  );
}
