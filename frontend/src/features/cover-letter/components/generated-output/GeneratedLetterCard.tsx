import { Button } from "@/shared/components/ui/button";
import { RefreshCw, Download, Copy, ShieldCheck, ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { NARRATIVE_ARTIFACT_STYLES } from "../../constants/cover-letter.constants";
import { downloadCoverLetterPdf, type CoverLetter } from "../../services/cover-letter.service";
import { getDocumentDownloadFilename, triggerBrowserDownload } from "@/features/resume/utils/resume-download";

interface GeneratedLetterCardProps {
  onNewLetter: () => void;
  generatedLetter?: CoverLetter;
}

export function GeneratedLetterCard({ onNewLetter, generatedLetter }: GeneratedLetterCardProps) {
  const content = generatedLetter?.content || "";
  const [downloading, setDownloading] = useState(false);
  const [copying, setCopying] = useState(false);

  const handleDownload = async () => {
    if (!generatedLetter?.pdfUrl) return;
    setDownloading(true);
    try {
      const blob = await downloadCoverLetterPdf(generatedLetter.pdfUrl);
      triggerBrowserDownload(
        blob,
        getDocumentDownloadFilename(generatedLetter.pdfUrl, "cover-letter.pdf")
      );
      toast.success("Artifact downloaded.");
    } catch (error) {
      toast.error("Failed to download narrative artifact.");
    } finally {
      setDownloading(false);
    }
  };

  const handleCopy = async () => {
    setCopying(true);
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Narrative fragment copied.");
    } catch {
      toast.error("Couldn't copy fragment.");
    } finally {
      setCopying(false);
    }
  };

  return (
    <div className={NARRATIVE_ARTIFACT_STYLES.wrapper}>
      {/* Dynamic Amber Aura */}
      <div className={NARRATIVE_ARTIFACT_STYLES.aura} />
      
      {/* Frosted Grain Texture */}
      <div 
        className={NARRATIVE_ARTIFACT_STYLES.grain} 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className={NARRATIVE_ARTIFACT_STYLES.body}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-4 min-w-0">
            <div className="flex flex-wrap items-start gap-3">
              <div className="inline-flex h-7 min-w-0 max-w-full items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5">
                <span className="block truncate text-[10px] font-black uppercase tracking-[0.14em] leading-none text-amber-600 dark:text-amber-400">
                  Synthesized Narrative
                </span>
              </div>
              <div className="inline-flex h-7 min-w-0 max-w-full items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5">
                <ShieldCheck className="mr-2 size-3.5 shrink-0 text-emerald-500" />
                <span className="block truncate text-[10px] font-black uppercase tracking-[0.14em] leading-none text-emerald-600 dark:text-emerald-400">
                  Verified
                </span>
              </div>
            </div>
            
            <h2 className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none truncate sm:text-3xl lg:text-4xl">
              {generatedLetter?.company || "Anonymous Artifact"}
            </h2>
            <p className="text-lg font-bold text-zinc-500 dark:text-zinc-400 tracking-tight">
              {generatedLetter?.position || "Target Position"}
            </p>
          </div>

          <Button
            variant="ghost"
            onClick={onNewLetter}
            className="h-11 w-11 shrink-0 rounded-xl bg-zinc-900/5 dark:bg-white/5 border-2 border-zinc-100 dark:border-zinc-800 hover:border-amber-500/50 hover:text-amber-500 transition-all active:scale-90 sm:h-14 sm:w-14 sm:rounded-2xl"
          >
            <RefreshCw className="size-5 sm:size-6" />
          </Button>
        </div>

        <div className={NARRATIVE_ARTIFACT_STYLES.specimenFrame}>
          <div className="absolute right-6 top-4 flex items-start gap-2">
            <div className="mt-[0.18rem] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-widest leading-[1.1] text-zinc-400">Specimen ID-CL</span>
          </div>
          
          <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-amber-500/20 pr-4">
            <p className={NARRATIVE_ARTIFACT_STYLES.specimenContent}>
              {content}
            </p>
          </div>
        </div>

        <div className={NARRATIVE_ARTIFACT_STYLES.actionDeck}>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              className="h-11 px-5 rounded-xl bg-amber-500 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all sm:h-14 sm:px-8 sm:rounded-2xl sm:text-[11px]"
              onClick={() => void handleDownload()}
              disabled={downloading || !generatedLetter?.pdfUrl}
            >
              {downloading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Download className="size-4 mr-2" />}
              Export PDF
            </Button>

            {generatedLetter?.pdfUrl && (
              <Button asChild variant="outline" className="h-11 px-5 rounded-xl border-2 border-zinc-100 font-black uppercase tracking-widest text-[10px] hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 transition-all sm:h-14 sm:px-8 sm:rounded-2xl sm:text-[11px]">
                <a href={generatedLetter.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4 mr-2" />
                  Inspect Render
                </a>
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            className="h-11 px-5 rounded-xl bg-zinc-900/5 dark:bg-white/5 font-black uppercase tracking-widest text-[10px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all sm:h-14 sm:px-8 sm:rounded-2xl sm:text-[11px]"
            onClick={() => void handleCopy()}
            disabled={copying}
          >
            {copying ? "Syncing..." : "Copy Fragment"}
            <Copy className="size-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
