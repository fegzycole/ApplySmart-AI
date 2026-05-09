import { motion } from "framer-motion";
import { CardTitle } from "@/shared/components/ui/card";
import { ResumeActions } from "@/features/resume/components/resumes/ResumeActions";
import { ResumeScoreBadge } from "@/features/resume/components/resumes/ResumeScoreBadge";
import type { Resume } from "@/features/resume/services/resume.service";
import { 
  DOCUMENT_ARTIFACT_STYLES, 
  RESUME_DOCUMENT_SECTIONS 
} from "../constants/documents.constants";
import {
  formatDocumentDate,
  getResumeStorageLabel,
} from "../utils/documents.utils";
import { ResumeDocumentPreview } from "./ResumeDocumentPreview";
import { cn } from "@/shared/lib/utils";
import { FileText, Database, ShieldCheck } from "lucide-react";

interface ResumeDocumentCardProps {
  onDelete: (resume: Resume) => void;
  onPreview: (resume: Resume) => void;
  resume: Resume;
}

export function ResumeDocumentCard({
  onDelete,
  onPreview,
  resume,
}: ResumeDocumentCardProps) {
  const sectionKey = resume.fileUrl ? (resume.score > 0 ? "optimized" : "original") : "built";
  const section = RESUME_DOCUMENT_SECTIONS[sectionKey];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      className={DOCUMENT_ARTIFACT_STYLES.card.wrapper}
    >
      {/* Dynamic Aura Background */}
      <div className={cn(DOCUMENT_ARTIFACT_STYLES.card.aura, "bg-gradient-to-br", section.aura)} />
      
      {/* Frosted Grain Texture */}
      <div 
        className={cn(DOCUMENT_ARTIFACT_STYLES.card.grain, "pointer-events-none")} 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className={cn(DOCUMENT_ARTIFACT_STYLES.card.layout, "xl:grid-cols-[1fr_240px]")}>
        <div className={cn(DOCUMENT_ARTIFACT_STYLES.content.body, "p-5 sm:p-8 lg:p-10")}>
          <div className={DOCUMENT_ARTIFACT_STYLES.content.header}>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="inline-flex h-6 sm:h-7 min-w-0 max-w-full items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-3 sm:px-3.5">
                <span className={cn(DOCUMENT_ARTIFACT_STYLES.content.eyebrow, "block truncate text-sky-600 dark:text-sky-400 leading-none tracking-[0.14em] text-[9px] sm:text-[11px]")}>
                  {section.shortLabel}
                </span>
              </div>
              {resume.score > 0 && <ResumeScoreBadge score={resume.score} />}
            </div>
            
            <CardTitle className={cn(DOCUMENT_ARTIFACT_STYLES.content.title, "text-xl sm:text-2xl lg:text-3xl line-clamp-1")}>
              {resume.name}
            </CardTitle>
            
            <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Vault Entry: {formatDocumentDate(resume.lastModified)}
            </p>
          </div>

          <div className={cn(DOCUMENT_ARTIFACT_STYLES.content.metaRow, "gap-3 sm:gap-4")}>
            <div className={cn(DOCUMENT_ARTIFACT_STYLES.content.pill, "px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-sm")}>
              <Database className="size-3 sm:size-3.5 text-zinc-400" />
              {getResumeStorageLabel(resume)}
            </div>
            <div className={cn(DOCUMENT_ARTIFACT_STYLES.content.pill, "px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-sm")}>
              <ShieldCheck className="size-3 sm:size-3.5 text-emerald-500" />
              Verified Artifact
            </div>
          </div>
        </div>

        {/* Glimpse Section (Preview) */}
        <div className={cn(DOCUMENT_ARTIFACT_STYLES.preview.shell, "p-4 sm:p-6 xl:border-l-2")}>
          <button
            type="button"
            className="group/preview relative mx-auto block w-full max-w-[200px] transition-all duration-500 hover:scale-105 active:scale-95 xl:max-w-none"
            onClick={() => onPreview(resume)}
          >
            <div className={cn(DOCUMENT_ARTIFACT_STYLES.preview.frame, "max-w-[140px] sm:max-w-[180px]")}>
              <ResumeDocumentPreview resume={resume} />
            </div>
            <div className={cn(DOCUMENT_ARTIFACT_STYLES.preview.overlay, "flex items-center justify-center")}>
              <div className="bg-white dark:bg-zinc-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-2xl border-2 border-sky-500 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-sky-500">
                Inspect Specimen
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Action Deck - Revealed on Hover */}
      <div className={cn(DOCUMENT_ARTIFACT_STYLES.actionDeck, "bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 xl:right-[260px]")}>
        <div className={cn(DOCUMENT_ARTIFACT_STYLES.controlBar, "z-50 flex-col items-stretch p-2 sm:p-3 md:flex-row md:items-center")}>
          <div className="hidden sm:flex items-center gap-2 pl-2">
             <FileText className="size-4 text-zinc-400" />
             <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-zinc-500">Control Interface</span>
          </div>
          <ResumeActions
            resume={resume}
            onDelete={() => onDelete(resume)}
          />
        </div>
      </div>
    </motion.div>
  );
}
