import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";
import type { ResumeData } from "../../types/resume-builder.types";
import {
  buildResumeFromData,
  renderResumePdf,
} from "../../services/resume.service";
import { buildResumePdfPayload, buildResumePayload } from "../../utils/resume-builder-payload";
import { triggerBrowserDownload } from "../../utils/resume-download";
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

export function LiveResumePreview() {
  const { resumeData, resetResumeData } = useResumeBuilder();
  const [downloading, setDownloading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState(0);

  const isValid = getValidationError(resumeData) === null;

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

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const name = resumeData.personalInfo.name.replace(/\s+/g, "_") + "_Resume";
      await buildResumeFromData(buildResumePayload(resumeData, name));
      const blob = await renderResumePdf(buildResumePdfPayload(resumeData, name));
      triggerBrowserDownload(blob, `${name}.pdf`);
      resetResumeData();
      toast.success("Resume saved and downloaded!");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download resume. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-w-0 space-y-4 xl:sticky xl:top-6">
      <PreviewHeader
        onDownload={handleDownload}
        downloading={downloading}
        disabled={!isValid}
      />
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
    </div>
  );
}
