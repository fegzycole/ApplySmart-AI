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
import { DocumentArtifactCardFrame } from "./DocumentArtifactCardFrame";
import { ResumeDocumentPreview } from "./ResumeDocumentPreview";
import { cn } from "@/shared/lib/utils";
import { Database, ShieldCheck } from "lucide-react";

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
    <DocumentArtifactCardFrame
      actionLabel="Control Interface"
      actions={(
        <ResumeActions
          resume={resume}
          onDelete={() => onDelete(resume)}
        />
      )}
      auraClassName={section.aura}
      controlBarClassName="z-50 flex-col items-stretch p-2 sm:p-3 md:flex-row md:items-center"
      onPreview={() => onPreview(resume)}
      preview={<ResumeDocumentPreview resume={resume} />}
      previewLabel="Inspect Specimen"
      previewLabelClassName="rounded-full border-2 border-sky-500 bg-white px-3 py-1.5 text-[8px] font-black uppercase tracking-widest text-sky-500 shadow-2xl dark:bg-zinc-900 sm:px-4 sm:py-2 sm:text-[10px]"
    >
      <div className={DOCUMENT_ARTIFACT_STYLES.content.header}>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="inline-flex h-6 min-w-0 max-w-full items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-3 sm:h-7 sm:px-3.5">
            <span className={cn(DOCUMENT_ARTIFACT_STYLES.content.eyebrow, "block truncate text-[9px] leading-none tracking-[0.14em] text-sky-600 dark:text-sky-400 sm:text-[11px]")}>
              {section.shortLabel}
            </span>
          </div>
          {resume.score > 0 && <ResumeScoreBadge score={resume.score} />}
        </div>

        <CardTitle className={cn(DOCUMENT_ARTIFACT_STYLES.content.title, "line-clamp-1 text-xl sm:text-2xl lg:text-3xl")}>
          {resume.name}
        </CardTitle>

        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 sm:text-sm">
          Vault Entry: {formatDocumentDate(resume.lastModified)}
        </p>
      </div>

      <div className={cn(DOCUMENT_ARTIFACT_STYLES.content.metaRow, "gap-3 sm:gap-4")}>
        <div className={cn(DOCUMENT_ARTIFACT_STYLES.content.pill, "px-3 py-1.5 text-[11px] sm:px-4 sm:py-2 sm:text-sm")}>
          <Database className="size-3 text-zinc-400 sm:size-3.5" />
          {getResumeStorageLabel(resume)}
        </div>
        <div className={cn(DOCUMENT_ARTIFACT_STYLES.content.pill, "px-3 py-1.5 text-[11px] sm:px-4 sm:py-2 sm:text-sm")}>
          <ShieldCheck className="size-3 text-emerald-500 sm:size-3.5" />
          Verified Artifact
        </div>
      </div>
    </DocumentArtifactCardFrame>
  );
}
