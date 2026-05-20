import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import {
  DOCUMENT_ARTIFACT_STYLES,
  DOCUMENT_GRAIN_BACKGROUND,
} from "../constants/documents.constants";

interface DocumentArtifactCardFrameProps {
  actionLabel: string;
  actions: ReactNode;
  auraClassName: string;
  children: ReactNode;
  onPreview: () => void;
  preview: ReactNode;
  previewLabel: string;
  previewLabelClassName: string;
  controlBarClassName?: string;
}

export function DocumentArtifactCardFrame({
  actionLabel,
  actions,
  auraClassName,
  children,
  controlBarClassName,
  onPreview,
  preview,
  previewLabel,
  previewLabelClassName,
}: DocumentArtifactCardFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      className={DOCUMENT_ARTIFACT_STYLES.card.wrapper}
    >
      <div className={cn(DOCUMENT_ARTIFACT_STYLES.card.aura, "bg-gradient-to-br", auraClassName)} />
      <div
        className={cn(DOCUMENT_ARTIFACT_STYLES.card.grain, "pointer-events-none")}
        style={{ backgroundImage: DOCUMENT_GRAIN_BACKGROUND }}
      />

      <div className={cn(DOCUMENT_ARTIFACT_STYLES.card.layout, "xl:grid-cols-[1fr_240px]")}>
        <div className={cn(DOCUMENT_ARTIFACT_STYLES.content.body, "p-5 sm:p-8 lg:p-10")}>
          {children}
        </div>

        <div className={cn(DOCUMENT_ARTIFACT_STYLES.preview.shell, "p-4 sm:p-6 xl:border-l-2")}>
          <button
            type="button"
            className="group/preview relative mx-auto block w-full max-w-[200px] transition-all duration-500 hover:scale-105 active:scale-95 xl:max-w-none"
            onClick={onPreview}
          >
            <div className={cn(DOCUMENT_ARTIFACT_STYLES.preview.frame, "max-w-[140px] sm:max-w-[180px]")}>
              {preview}
            </div>
            <div className={cn(DOCUMENT_ARTIFACT_STYLES.preview.overlay, "flex items-center justify-center")}>
              <div className={previewLabelClassName}>{previewLabel}</div>
            </div>
          </button>
        </div>
      </div>

      <div className={cn(DOCUMENT_ARTIFACT_STYLES.actionDeck, "bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 xl:right-[260px]")}>
        <div className={cn(DOCUMENT_ARTIFACT_STYLES.controlBar, controlBarClassName)}>
          <div className="hidden items-center gap-2 pl-2 sm:flex">
            <FileText className="size-4 text-zinc-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 sm:text-[11px]">
              {actionLabel}
            </span>
          </div>
          {actions}
        </div>
      </div>
    </motion.div>
  );
}
