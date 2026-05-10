import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { ArrowLeft, Download, ExternalLink, ShieldCheck, FileCheck2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { toast } from "sonner";
import { OPTIMIZER_RESULT_STYLES } from "../../constants/optimizer.constants";
import type { ResumeOptimization } from "../../services/resume.service";
import { downloadResumeFile } from "../../services/resume.service";
import { getResumeDownloadFilename, triggerBrowserDownload } from "../../utils/resume-download";
import { CoverLetterResultCard } from "./CoverLetterResultCard";
import { ResultHeader } from "./ResultHeader";
import { ScoreComparison } from "./ScoreComparison";
import { ChangesList } from "./ChangesList";
import { PdfPreview } from "./PdfPreview";
import { StrengthsCard } from "./StrengthsCard";
import { ImprovementsCard } from "./ImprovementsCard";
import { KeywordAnalysisCard } from "./KeywordAnalysisCard";
import { MISSION_CONTROL_ANIMATIONS } from "@/shared/constants/animations";

interface OptimizationResultProps {
  result: ResumeOptimization;
  onStartOver: () => void;
}

export function OptimizationResultView({ result, onStartOver }: OptimizationResultProps) {
  const [downloading, setDownloading] = useState(false);
  const originalScore = result.originalScore ?? 0;
  const optimizedScore = result.optimizedScore ?? 0;
  const changes = result.changes ?? [];
  const analysis = result.analysis;
  const fileUrl = result.fileUrl;

  const handleDownload = async () => {
    if (!fileUrl) return;
    setDownloading(true);
    try {
      const blob = await downloadResumeFile(fileUrl);
      triggerBrowserDownload(blob, getResumeDownloadFilename(fileUrl));
      toast.success("Artifact exported successfully.");
    } catch {
      toast.error("Failed to export professional artifact.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <motion.div
      variants={MISSION_CONTROL_ANIMATIONS.stagger.container}
      initial="hidden"
      animate="visible"
      className={OPTIMIZER_RESULT_STYLES.container}
    >
      <div className={OPTIMIZER_RESULT_STYLES.wrapper}>
        <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
          <ResultHeader includesCoverLetter={Boolean(result.coverLetter)} />
        </motion.div>

        <div className={OPTIMIZER_RESULT_STYLES.bentoGrid}>
          {/* Top: Score Hero - Full Width Bento Item */}
          <motion.div 
            variants={MISSION_CONTROL_ANIMATIONS.stagger.item}
            className={cn(OPTIMIZER_RESULT_STYLES.heroSection, "min-w-0")}
          >
            <ScoreComparison
              originalScore={originalScore}
              optimizedScore={optimizedScore}
            />
          </motion.div>

          {/* Main Stage: Deep Dive Preview */}
          <div className={cn(OPTIMIZER_RESULT_STYLES.mainStage, "min-w-0")}>
            <motion.div 
              variants={MISSION_CONTROL_ANIMATIONS.stagger.item}
              className="group relative overflow-hidden rounded-[2rem] border-2 border-white/60 bg-white shadow-2xl dark:bg-zinc-900 dark:border-zinc-800 sm:rounded-[3rem] lg:rounded-[3.5rem]"
            >
              {/* Dynamic Aura Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-sky-500/5 to-transparent blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="relative z-10 border-b border-zinc-100 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 sm:px-6 sm:py-6 lg:px-10 lg:py-8">
                <div className="flex items-center gap-3 min-w-0 sm:gap-5">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 sm:h-16 sm:w-16 sm:rounded-2xl">
                    <ShieldCheck className="size-6 sm:size-9" />
                    <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background p-0.5 shadow-lg sm:-top-1.5 sm:-right-1.5 sm:h-5 sm:w-5 sm:p-1">
                      <div className="h-full w-full rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase leading-none truncate sm:text-2xl">
                      Calibrated <span className="text-emerald-500">Specimen</span>
                    </h3>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mt-1 truncate sm:text-[10px] sm:tracking-[0.3em] sm:mt-2">Neural Synthesis • Verified</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 sm:gap-4">
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl bg-zinc-900/5 dark:bg-white/5 border-2 border-zinc-100 dark:border-zinc-800 hover:border-sky-500/50 hover:text-sky-500 transition-all active:scale-90 sm:h-14 sm:w-14 sm:rounded-2xl"
                    disabled={!fileUrl}
                  >
                    <a href={fileUrl ?? "#"} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="size-4 sm:size-6" />
                    </a>
                  </Button>
                  <Button
                    onClick={handleDownload}
                    disabled={!fileUrl || downloading}
                    className="h-10 px-4 rounded-xl bg-emerald-500 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all sm:h-14 sm:px-8 sm:rounded-2xl sm:text-[11px]"
                  >
                    <Download className="size-3.5 mr-2 sm:size-4 sm:mr-3" />
                    {downloading ? "Exporting..." : "Deploy PDF"}
                  </Button>
                </div>
              </div>

              <div className="p-4 sm:p-6 lg:p-10">
                {fileUrl ? (
                  <PdfPreview fileUrl={fileUrl} hideHeader />
                ) : (
                  <div className="rounded-[2.5rem] border-2 border-dashed border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 p-12 text-center">
                    <p className="text-lg font-medium text-zinc-500 dark:text-zinc-400">
                      Synthesis completed, but artifact preview is currently offline.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {result.coverLetter && (
              <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item} className="min-w-0">
                <CoverLetterResultCard coverLetter={result.coverLetter} />
              </motion.div>
            )}
          </div>

          {/* Side Stage: Intelligence & Adjustments */}
          <div className={cn(OPTIMIZER_RESULT_STYLES.sideStage, "min-w-0")}>
            <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
              <ChangesList changes={changes} />
            </motion.div>
            
            {analysis && (
              <div className="space-y-12 min-w-0">
                <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
                  <StrengthsCard strengths={analysis.strengths ?? []} />
                </motion.div>
                <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
                  <ImprovementsCard improvements={analysis.improvements ?? []} />
                </motion.div>
                <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
                  <KeywordAnalysisCard keywords={analysis.keywords ?? []} />
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <motion.div
          variants={MISSION_CONTROL_ANIMATIONS.stagger.item}
          className="flex flex-col items-center gap-6 pt-10 border-t border-zinc-100 dark:border-zinc-800 mt-10 sm:gap-8 sm:pt-14 sm:mt-14 lg:gap-10 lg:pt-20 lg:mt-20"
        >
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-widest border border-emerald-100 sm:gap-2.5 sm:px-5 sm:py-2.5 sm:text-[10px]">
              <FileCheck2 className="size-3 sm:size-3.5" />
              Calibration Session Complete
            </div>
            <p className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
              Your artifact is ready for high-stakes deployment.
            </p>
          </div>

          <Button
            onClick={onStartOver}
            variant="outline"
            className="h-14 rounded-[2rem] px-6 text-sm font-black uppercase tracking-[0.15em] border-2 border-zinc-200 bg-white/50 backdrop-blur-xl transition-all hover:bg-zinc-900 hover:text-white hover:border-zinc-900 active:scale-95 shadow-2xl shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:shadow-none sm:h-16 sm:rounded-[2.5rem] sm:px-10 sm:text-base sm:tracking-[0.2em] lg:h-20 lg:px-12 lg:text-lg"
          >
            <ArrowLeft className="size-4 mr-3 sm:size-5 sm:mr-4 lg:size-6 lg:mr-6" />
            Initialize New Calibration
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
