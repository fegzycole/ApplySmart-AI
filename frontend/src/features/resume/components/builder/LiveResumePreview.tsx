import { useMemo } from "react";
import { AnimatePresence } from "framer-motion";

import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";
import { useResumePreviewActions } from "../../hooks/useResumePreviewActions";
import { useResumePreviewLayout } from "../../hooks/useResumePreviewLayout";
import {
  getResumeBuilderValidationError,
  isResumeDraftPristine,
} from "../../utils/resume-builder-preview";
import { LiveDraftPreview } from "./LiveDraftPreview";
import { PreviewHeader } from "./PreviewHeader";
import { SavedResumePreview } from "./SavedResumePreview";

export function LiveResumePreview() {
  const { resumeData, resetResumeData } = useResumeBuilder();
  const previewLayout = useResumePreviewLayout();
  const {
    downloadingSavedResume,
    handleSave,
    handleSavedResumeDownload,
    savedResume,
    saving,
  } = useResumePreviewActions({ resumeData, resetResumeData });

  const isValid = getResumeBuilderValidationError(resumeData) === null;
  const isDraftPristine = useMemo(() => isResumeDraftPristine(resumeData), [resumeData]);
  const showSavedResumePreview = Boolean(savedResume?.fileUrl) && isDraftPristine;
  const savedResumeFileUrl = savedResume?.fileUrl ?? null;

  return (
    <div className="min-w-0 space-y-4 pb-8 sm:space-y-6 lg:pb-0">
      <div className="group relative">
        <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

        <PreviewHeader
          onSave={handleSave}
          saving={saving}
          disabled={!isValid}
        />
      </div>

      <AnimatePresence mode="wait">
        {showSavedResumePreview && savedResume && savedResumeFileUrl ? (
          <SavedResumePreview
            downloading={downloadingSavedResume}
            fileUrl={savedResumeFileUrl}
            name={savedResume.name}
            onDownload={handleSavedResumeDownload}
          />
        ) : !showSavedResumePreview ? (
          <LiveDraftPreview
            containerRef={previewLayout.containerRef}
            contentRef={previewLayout.contentRef}
            data={resumeData}
            previewWidth={previewLayout.previewWidth}
            scale={previewLayout.scale}
            scaledHeight={previewLayout.scaledHeight}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
