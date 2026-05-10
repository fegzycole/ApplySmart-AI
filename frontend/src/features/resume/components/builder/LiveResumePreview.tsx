import { useState, useRef, useLayoutEffect, useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Download, ExternalLink, FileCheck2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { invalidateQueries } from "@/shared/lib/query-cache";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";
import { RESUME_KEYS } from "../../hooks/useResumeQueries";
import type { ResumeData } from "../../types/resume-builder.types";
import {
  buildResumeFromData,
  downloadResumeFile,
  type Resume,
} from "../../services/resume.service";
import { buildResumePayload } from "../../utils/resume-builder-payload";
import { getResumeDownloadFilename, triggerBrowserDownload } from "../../utils/resume-download";
import { ModernPreview } from "./previews/ModernPreview";
import { ProfessionalPreview } from "./previews/ProfessionalPreview";
import { ClassicPreview } from "./previews/ClassicPreview";
import { CreativePreview } from "./previews/CreativePreview";
import { PreviewHeader } from "./PreviewHeader";

const PREVIEW_WIDTH = 816;

function getValidationError(data: ResumeData): string | null {
  if (!data.personalInfo.name.trim()) return "Please enter your full name.";
  if (!data.personalInfo.email.trim()) return "Please enter your email address.";

  for (const exp of data.workExperience) {
    if (!exp.company.trim()) return "One of your work experience entries is missing a company name.";
    if (!exp.position.trim()) return "One of your work experience entries is missing a job title.";
  }

  for (const edu of data.education) {
    if (!edu.institution.trim()) return "One of your education entries is missing an institution name.";
    if (!edu.degree.trim()) return "One of your education entries is missing a degree.";
  }

  if (data.workExperience.length === 0) return "Please add at least one work experience entry.";
  if (data.education.length === 0) return "Please add at least one education entry.";
  if (data.skills.length === 0) return "Please add at least one skill.";

  return null;
}

function renderPreviewComponent(data: ResumeData) {
  switch (data.template) {
    case "PROFESSIONAL": return <ProfessionalPreview data={data} />;
    case "CLASSIC":      return <ClassicPreview data={data} />;
    case "CREATIVE":     return <CreativePreview data={data} />;
    default:             return <ModernPreview data={data} />;
  }
}

function isResumeDraftPristine(data: ResumeData) {
  const { personalInfo } = data;

  return (
    !personalInfo.name.trim() &&
    !personalInfo.email.trim() &&
    !personalInfo.phone.trim() &&
    !personalInfo.location.trim() &&
    !personalInfo.linkedin.trim() &&
    !personalInfo.website.trim() &&
    !data.summary.trim() &&
    data.workExperience.every((experience) => (
      !experience.company.trim() &&
      !experience.position.trim() &&
      !experience.location.trim() &&
      !experience.startDate.trim() &&
      !experience.endDate.trim() &&
      experience.responsibilities.every((responsibility) => !responsibility.trim())
    )) &&
    data.education.every((education) => (
      !education.institution.trim() &&
      !education.degree.trim() &&
      !education.field.trim() &&
      !education.location.trim() &&
      !education.startDate.trim() &&
      !education.graduationDate.trim() &&
      !education.gpa.trim()
    )) &&
    data.skills.length === 0 &&
    data.projects.every((project) => (
      !project.name.trim() &&
      !project.description.trim() &&
      project.technologies.every((technology) => !technology.trim()) &&
      !project.link.trim()
    )) &&
    data.certifications.every((certification) => (
      !certification.name.trim() &&
      !certification.issuer.trim() &&
      !certification.date.trim()
    ))
  );
}

export function LiveResumePreview() {
  const queryClient = useQueryClient();
  const { resumeData, resetResumeData } = useResumeBuilder();
  const [saving, setSaving] = useState(false);
  const [savedResume, setSavedResume] = useState<Resume | null>(null);
  const [downloadingSavedResume, setDownloadingSavedResume] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState(0);

  const isValid = getValidationError(resumeData) === null;
  const isDraftPristine = useMemo(() => isResumeDraftPristine(resumeData), [resumeData]);
  const showSavedResumePreview = Boolean(savedResume?.fileUrl) && isDraftPristine;
  const savedResumeFileUrl = savedResume?.fileUrl ?? null;

  const updatePreviewLayout = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const styles = window.getComputedStyle(container);
    const horizontalPadding =
      Number.parseFloat(styles.paddingLeft) + Number.parseFloat(styles.paddingRight);
    const availableWidth = Math.max(container.clientWidth - horizontalPadding, 0);
    const newScale = Math.min(1, availableWidth / PREVIEW_WIDTH);

    setScale(newScale);
    setScaledHeight(content.scrollHeight * newScale);
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    let frameId = 0;

    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updatePreviewLayout);
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    const mutationObserver = new MutationObserver(scheduleUpdate);

    resizeObserver.observe(container);
    resizeObserver.observe(content);
    mutationObserver.observe(content, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    scheduleUpdate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [updatePreviewLayout]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const name = resumeData.personalInfo.name.replace(/\s+/g, "_") + "_Resume";
      const createdResume = await buildResumeFromData(buildResumePayload(resumeData, name));
      await invalidateQueries(queryClient, RESUME_KEYS.lists());
      setSavedResume(createdResume);
      resetResumeData();
      toast.success("Resume saved.");
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save resume. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSavedResumeDownload = async () => {
    if (!savedResume?.fileUrl) {
      toast.error("No saved resume file is available to download.");
      return;
    }

    setDownloadingSavedResume(true);

    try {
      const blob = await downloadResumeFile(savedResume.fileUrl);
      triggerBrowserDownload(blob, getResumeDownloadFilename(savedResume.fileUrl));
    } catch (error) {
      console.error("Saved resume download failed:", error);
      toast.error("Failed to download resume. Please try again.");
    } finally {
      setDownloadingSavedResume(false);
    }
  };

  return (
    <div className="min-w-0 space-y-4 pb-8 sm:space-y-6 lg:pb-0">
      <div className="group relative">
        {/* Immersive Background Glow */}
        <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <PreviewHeader
          onSave={handleSave}
          saving={saving}
          disabled={!isValid}
        />
      </div>

      <AnimatePresence mode="wait">
        {showSavedResumePreview && savedResume && savedResumeFileUrl ? (
          <motion.div
            key="saved-preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="canvas-card relative z-10 overflow-hidden rounded-[2rem] border-2 border-primary/20 bg-card/50 shadow-2xl backdrop-blur-3xl sm:rounded-[3rem]"
          >
            <div className="flex flex-col gap-4 border-b border-primary/10 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-8">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 sm:px-4 py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  <FileCheck2 className="size-3 sm:size-3.5" />
                  Synthesis Verified
                </div>
                <h3 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold tracking-tight text-foreground truncate">
                  {savedResume.name || "Synthesized Output"}
                </h3>
                <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground line-clamp-2">
                  Your professional narrative has been successfully committed to the workspace.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4 sm:w-auto">
                <Button
                  type="button"
                  onClick={() => void handleSavedResumeDownload()}
                  disabled={downloadingSavedResume}
                  className="h-12 sm:h-14 flex-1 sm:flex-none px-6 sm:px-8 rounded-[1.25rem] sm:rounded-2xl bg-primary text-white font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 text-xs sm:text-base"
                >
                  <Download className="mr-2 sm:mr-3 size-4 sm:size-5" />
                  {downloadingSavedResume ? "Wait" : "Deploy"}
                </Button>

                <Button
                  asChild
                  type="button"
                  variant="outline"
                  className="h-12 sm:h-14 flex-1 sm:flex-none px-6 sm:px-8 rounded-[1.25rem] sm:rounded-2xl border-2 font-bold transition-all hover:bg-background/50 active:scale-95 text-xs sm:text-base"
                >
                  <a href={savedResumeFileUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 sm:mr-3 size-4 sm:size-5" />
                    Inspect
                  </a>
                </Button>
              </div>
            </div>

            <div className="p-3 sm:p-8">
              <div className="overflow-hidden rounded-2xl sm:rounded-[2rem] border-2 border-border bg-background shadow-inner">
                <div className="aspect-[8.5/11] bg-zinc-50 dark:bg-zinc-950/50">
                  <iframe
                    src={`${savedResumeFileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="h-full w-full"
                    title="Saved resume preview"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ) : !showSavedResumePreview ? (
          <motion.div
            key="live-preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="canvas-card relative z-10 min-w-0 overflow-hidden rounded-[2rem] border-2 border-border/50 bg-card/30 p-1.5 shadow-2xl backdrop-blur-3xl sm:rounded-[3rem] sm:p-4 lg:p-6"
            style={{ height: "clamp(22rem, 72vh, calc(100vh - 180px))" }}
          >
            <div className="absolute right-3 top-3 z-20 hidden items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary animate-pulse sm:flex">
              <Sparkles className="size-3" />
              Live Synthesis
            </div>

            <div
              ref={containerRef}
              className="h-full w-full overflow-x-hidden overflow-y-auto rounded-[1.5rem] bg-zinc-50/50 p-2 shadow-inner dark:bg-zinc-950/50 sm:rounded-[2.5rem] sm:p-5 lg:p-6"
            >
              <div
                style={{
                  width: `${PREVIEW_WIDTH * scale}px`,
                  height: scaledHeight > 0 ? `${scaledHeight}px` : "auto",
                  margin: "0 auto",
                  position: "relative",
                }}
              >
                <div
                  ref={contentRef}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${PREVIEW_WIDTH}px`,
                    transformOrigin: "top left",
                    transform: `scale(${scale})`,
                  }}
                >
                  <div className="shadow-2xl shadow-black/10 overflow-hidden rounded-sm">
                    {renderPreviewComponent(resumeData)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
