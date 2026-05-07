import { useState, useRef, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Download, ExternalLink, FileCheck2 } from "lucide-react";
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
  const showSavedResumePreview = Boolean(savedResume?.fileUrl) && isResumeDraftPristine(resumeData);
  const savedResumeFileUrl = savedResume?.fileUrl ?? null;

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const update = () => {
      const newScale = Math.min(1, container.clientWidth / PREVIEW_WIDTH);
      setScale(newScale);
      setScaledHeight(content.scrollHeight * newScale);
    };

    const ro = new ResizeObserver(update);
    ro.observe(container);
    ro.observe(content);
    update();
    return () => ro.disconnect();
  }, [resumeData.template]);

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
    <div className="min-w-0 space-y-4 xl:sticky xl:top-6">
      <PreviewHeader
        onSave={handleSave}
        saving={saving}
        disabled={!isValid}
      />

      {showSavedResumePreview && savedResume && savedResumeFileUrl ? (
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-col gap-3 border-b border-zinc-200 px-4 py-4 dark:border-zinc-800 sm:flex-row sm:items-start sm:justify-between sm:px-5">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                <FileCheck2 className="size-3.5" />
                Saved Resume
              </div>
              <h3 className="mt-3 text-base font-semibold text-zinc-950 dark:text-zinc-50 sm:text-lg">
                {savedResume.name || "Built Resume"}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Your built resume is ready. Preview it here or download the PDF.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:w-auto sm:min-w-[12rem]">
              <Button
                type="button"
                onClick={() => void handleSavedResumeDownload()}
                disabled={downloadingSavedResume}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 text-white shadow-lg shadow-violet-500/30 hover:from-violet-700 hover:via-fuchsia-700 hover:to-cyan-700"
              >
                <Download className="mr-2 size-4" />
                {downloadingSavedResume ? "Downloading..." : "Download Resume"}
              </Button>

              <Button
                asChild
                type="button"
                variant="outline"
                className="w-full rounded-xl border-zinc-300 bg-white/80 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950/70 dark:hover:bg-zinc-900"
              >
                <a href={savedResumeFileUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 size-4" />
                  Open PDF
                </a>
              </Button>
            </div>
          </div>

          <div className="bg-zinc-100 p-2 dark:bg-zinc-900 sm:p-3">
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
              <div className="aspect-[8.5/11] bg-zinc-50 dark:bg-zinc-950">
                <iframe
                  src={`${savedResumeFileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="h-full w-full"
                  title="Saved resume preview"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {!showSavedResumePreview ? (
        <div
          key={resumeData.template}
          className="min-w-0 overflow-hidden bg-zinc-100 dark:bg-zinc-800 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-700 p-2 sm:p-4"
          style={{ height: "clamp(24rem, 72vh, calc(100vh - 180px))" }}
        >
          <div
            ref={containerRef}
            className="min-w-0 w-full h-full overflow-x-hidden overflow-y-auto rounded-xl bg-zinc-200 dark:bg-zinc-900"
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
                <div className="shadow-lg">
                  {renderPreviewComponent(resumeData)}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
