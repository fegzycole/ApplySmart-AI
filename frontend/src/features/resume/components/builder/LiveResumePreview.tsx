import { useState } from "react";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";
import { ModernPreview } from "./previews/ModernPreview";
import { ProfessionalPreview } from "./previews/ProfessionalPreview";
import { ClassicPreview } from "./previews/ClassicPreview";
import { CreativePreview } from "./previews/CreativePreview";
import { PreviewHeader } from "./PreviewHeader";
import { uploadBuiltResume } from "../../services/resume.service";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

async function generatePDF(): Promise<Blob> {
  const el = document.getElementById("resume-preview");
  if (!el) throw new Error("Preview element not found");

  const canvas = await html2canvas(el, { scale: 2, useCORS: true, logging: false });
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const w = pdf.internal.pageSize.getWidth();
  const h = pdf.internal.pageSize.getHeight();
  const ratio = Math.min(w / canvas.width, h / canvas.height);

  pdf.addImage(canvas.toDataURL("image/png"), "PNG", (w - canvas.width * ratio) / 2, 0, canvas.width * ratio, canvas.height * ratio);
  return pdf.output("blob");
}

export function LiveResumePreview() {
  const { resumeData } = useResumeBuilder();
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleSave = async () => {
    if (!resumeData.personalInfo.name) {
      toast.error("Please enter your name before saving");
      return;
    }
    setSaving(true);
    try {
      const name = `${resumeData.personalInfo.name.replace(/\s+/g, "_")}_Resume`;
      await uploadBuiltResume(await generatePDF(), name);
      toast.success("Resume saved successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save resume");
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const url = URL.createObjectURL(await generatePDF());
      const link = Object.assign(document.createElement("a"), {
        href: url,
        download: resumeData.personalInfo.name
          ? `${resumeData.personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`
          : "Resume.pdf",
      });
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Resume downloaded successfully!");
    } catch {
      toast.error("Failed to download resume");
    } finally {
      setDownloading(false);
    }
  };

  const renderPreview = () => {
    switch (resumeData.template) {
      case "PROFESSIONAL": return <ProfessionalPreview data={resumeData} />;
      case "CLASSIC":      return <ClassicPreview data={resumeData} />;
      case "CREATIVE":     return <CreativePreview data={resumeData} />;
      default:             return <ModernPreview data={resumeData} />;
    }
  };

  return (
    <div className="sticky top-6 space-y-4">
      <PreviewHeader onSave={handleSave} onDownload={handleDownload} saving={saving} downloading={downloading} />
      <div
        key={resumeData.template}
        className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-700 p-4"
        style={{ height: "calc(100vh - 180px)" }}
      >
        <div className="w-full h-full overflow-auto bg-white rounded-xl shadow-inner flex items-start justify-center p-4">
          <div id="resume-preview" className="w-full max-w-[8.5in]">
            {renderPreview()}
          </div>
        </div>
      </div>
    </div>
  );
}
