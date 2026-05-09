import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, Trash2, FileText, Database, Mail } from "lucide-react";
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      className={DOCUMENT_ARTIFACT_STYLES.card.wrapper}
    >
      {/* Dynamic Amber Aura for Letters */}
      <div className={cn(DOCUMENT_ARTIFACT_STYLES.card.aura, "bg-gradient-to-br from-amber-400/20 via-orange-500/10 to-transparent")} />
      
      {/* Frosted Grain Texture */}
      <div 
        className={cn(DOCUMENT_ARTIFACT_STYLES.card.grain, "pointer-events-none")} 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className={cn(DOCUMENT_ARTIFACT_STYLES.card.layout, "xl:grid-cols-[1fr_240px]")}>
        <div className={cn(DOCUMENT_ARTIFACT_STYLES.content.body, "p-5 sm:p-8 lg:p-10")}>
          <div className={DOCUMENT_ARTIFACT_STYLES.content.header}>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="inline-flex h-6 sm:h-7 min-w-0 max-w-full items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3 sm:px-3.5">
                <span className={cn(DOCUMENT_ARTIFACT_STYLES.content.eyebrow, "block truncate text-amber-600 dark:text-amber-400 leading-none tracking-[0.14em] text-[9px] sm:text-[11px]")}>
                  Narrative Artifact
                </span>
              </div>
              <div className="inline-flex h-6 sm:h-7 min-w-0 max-w-full items-center rounded-full border border-zinc-200/50 bg-zinc-900/5 px-2.5 sm:px-3 dark:border-zinc-700/30 dark:bg-white/5">
                <span className="block truncate text-[9px] sm:text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500 capitalize leading-none">
                  {coverLetter.tone} Tone
                </span>
              </div>
            </div>
            
            <CardTitle className={cn(DOCUMENT_ARTIFACT_STYLES.content.title, "text-xl sm:text-2xl lg:text-3xl line-clamp-1")}>
              {coverLetter.company}
            </CardTitle>
            
            <p className="text-base sm:text-lg font-bold text-zinc-500 dark:text-zinc-400 tracking-tight line-clamp-1">
              {coverLetter.position}
            </p>
          </div>

          <div className={cn(DOCUMENT_ARTIFACT_STYLES.content.metaRow, "gap-3 sm:gap-4")}>
            <div className={cn(DOCUMENT_ARTIFACT_STYLES.content.pill, "px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-sm")}>
              <Mail className="size-3 sm:size-3.5 text-amber-500" />
              {coverLetter.wordCount} words
            </div>
            <div className={cn(DOCUMENT_ARTIFACT_STYLES.content.pill, "px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-sm")}>
              <Database className="size-3 sm:size-3.5 text-zinc-400" />
              {formatDocumentDate(coverLetter.lastModified)}
            </div>
          </div>
        </div>

        {/* Glimpse Section (Preview) */}
        <div className={cn(DOCUMENT_ARTIFACT_STYLES.preview.shell, "p-4 sm:p-6 xl:border-l-2")}>
          <button
            type="button"
            className="group/preview relative mx-auto block w-full max-w-[200px] transition-all duration-500 hover:scale-105 active:scale-95 xl:max-w-none"
            onClick={() => onPreview(coverLetter)}
          >
            <div className={cn(DOCUMENT_ARTIFACT_STYLES.preview.frame, "max-w-[140px] sm:max-w-[180px]")}>
              <CoverLetterDocumentPreview coverLetter={coverLetter} />
            </div>
            <div className={cn(DOCUMENT_ARTIFACT_STYLES.preview.overlay, "flex items-center justify-center")}>
              <div className="bg-white dark:bg-zinc-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-2xl border-2 border-amber-500 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-amber-500">
                Read Narrative
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Action Deck - Revealed on Hover */}
      <div className={cn(DOCUMENT_ARTIFACT_STYLES.actionDeck, "bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 xl:right-[260px]")}>
        <div className={cn(DOCUMENT_ARTIFACT_STYLES.controlBar, "z-50 flex-col items-center p-2 sm:p-3 md:flex-row md:items-center md:justify-between")}>
          <div className="hidden sm:flex items-center gap-2 pl-2">
             <FileText className="size-4 text-zinc-400" />
             <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-zinc-500">Letter Interface</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-10 rounded-xl bg-amber-500 px-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-amber-500/20 transition-all active:scale-95 hover:bg-amber-600 sm:px-4"
              onClick={handleDownload}
              disabled={!coverLetter.pdfUrl || downloading}
            >
              {downloading ? <Loader2 className="size-3.5 animate-spin" /> : <Download className="size-3.5 mr-1.5 sm:mr-2" />}
              {downloading ? "Sync" : "Export"}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 shrink-0 rounded-xl bg-zinc-900/5 dark:bg-white/5 border border-zinc-100 dark:border-zinc-800 text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 transition-all active:scale-90"
              onClick={(e) => { e.stopPropagation(); onDelete(coverLetter); }}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
