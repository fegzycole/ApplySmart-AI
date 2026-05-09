import { motion } from "framer-motion";
import { Copy, Download, ExternalLink, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { downloadCoverLetterPdf, type CoverLetter } from "@/features/cover-letter/services/cover-letter.service";
import { getDocumentDownloadFilename, triggerBrowserDownload } from "../../utils/resume-download";
import { OPTIMIZER_STYLES } from "../../constants/optimizer.constants";

interface CoverLetterResultCardProps {
  coverLetter: CoverLetter;
}

export function CoverLetterResultCard({ coverLetter }: CoverLetterResultCardProps) {
  const [downloading, setDownloading] = useState(false);
  const [copying, setCopying] = useState(false);

  const handleDownload = async () => {
    if (!coverLetter.pdfUrl) return;
    setDownloading(true);
    try {
      const blob = await downloadCoverLetterPdf(coverLetter.pdfUrl);
      triggerBrowserDownload(
        blob,
        getDocumentDownloadFilename(coverLetter.pdfUrl, "cover-letter.pdf")
      );
      toast.success("Artifact exported successfully.");
    } catch (error) {
      toast.error("Failed to export narrative artifact.");
    } finally {
      setDownloading(false);
    }
  };

  const handleCopy = async () => {
    setCopying(true);
    try {
      await navigator.clipboard.writeText(coverLetter.content);
      toast.success("Narrative fragment copied.");
    } catch {
      toast.error("Couldn't sync fragment to clipboard.");
    } finally {
      setCopying(false);
    }
  };

  return (
    <div className={OPTIMIZER_STYLES.cardClassName}>
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 bg-amber-500/5 dark:bg-amber-500/10 backdrop-blur-xl sm:p-6 lg:p-10">
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white shadow-xl shadow-amber-500/20 sm:h-14 sm:w-14 sm:rounded-2xl">
            <FileText className="size-6 sm:size-8" />
            <motion.div
              className="absolute inset-0 rounded-full bg-amber-500/20 sm:rounded-2xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase leading-none sm:text-2xl">Narrative <span className="text-amber-500">Specimen</span></h3>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mt-1 truncate sm:text-[10px] sm:tracking-[0.3em] sm:mt-2">
              {coverLetter.position} • {coverLetter.company}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 sm:p-6 sm:space-y-8 lg:p-10 lg:space-y-10">
        <div className="relative group">
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-b from-amber-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100 blur-[60px] sm:rounded-[3rem]" />

          <div className="relative rounded-[1.5rem] border-2 border-zinc-100 bg-zinc-950/[0.02] dark:bg-white/[0.02] p-4 shadow-inner overflow-hidden dark:border-zinc-800 sm:rounded-[2.5rem] sm:p-6 lg:p-10">
            <div className="relative">
              <p className="line-clamp-[10] whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium sm:line-clamp-[15] sm:text-base">
                {coverLetter.content}
              </p>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-50 dark:from-zinc-900 via-zinc-50/90 to-transparent sm:h-32" />
            </div>

            <div className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 sm:mt-6 sm:gap-3 sm:text-[10px] sm:tracking-[0.3em]">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              Full synthesis available via deployment
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              onClick={() => void handleCopy()}
              variant="ghost"
              disabled={copying}
              className="h-10 px-4 rounded-xl bg-zinc-900/5 dark:bg-white/5 border-2 border-zinc-100 dark:border-zinc-800 font-black uppercase tracking-widest text-[10px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all active:scale-95 sm:h-14 sm:px-8 sm:rounded-2xl sm:text-[11px]"
            >
              <Copy className="mr-2 size-3.5 sm:mr-3 sm:size-4" />
              {copying ? "Syncing..." : "Copy"}
            </Button>

            <Button
              asChild
              variant="ghost"
              className="h-10 px-4 rounded-xl bg-zinc-900/5 dark:bg-white/5 border-2 border-zinc-100 dark:border-zinc-800 font-black uppercase tracking-widest text-[10px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all active:scale-95 sm:h-14 sm:px-8 sm:rounded-2xl sm:text-[11px]"
            >
              <a href={coverLetter.pdfUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 size-3.5 sm:mr-3 sm:size-4" />
                Preview
              </a>
            </Button>
          </div>

          <Button
            onClick={handleDownload}
            disabled={downloading || !coverLetter.pdfUrl}
            className="h-10 px-5 rounded-xl bg-amber-500 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all sm:h-14 sm:px-10 sm:rounded-2xl sm:text-[11px]"
          >
            <Download className="mr-2 size-3.5 sm:mr-3 sm:size-5" />
            {downloading ? "Processing..." : "Deploy Artifact"}
          </Button>
        </div>
      </div>
    </div>
  );
}
