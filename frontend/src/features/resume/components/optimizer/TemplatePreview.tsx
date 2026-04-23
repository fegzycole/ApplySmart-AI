import { ModernTemplatePreview } from "./previews/ModernTemplatePreview";
import { ProfessionalTemplatePreview } from "./previews/ProfessionalTemplatePreview";
import { ClassicTemplatePreview } from "./previews/ClassicTemplatePreview";
import { CreativeTemplatePreview } from "./previews/CreativeTemplatePreview";
import type { ResumeTemplate } from "../../types/resume-builder.types";

interface TemplatePreviewProps {
  type: ResumeTemplate;
}

export function TemplatePreview({ type }: TemplatePreviewProps) {
  switch (type) {
    case "MODERN":
      return <ModernTemplatePreview />;
    case "PROFESSIONAL":
      return <ProfessionalTemplatePreview />;
    case "CLASSIC":
      return <ClassicTemplatePreview />;
    case "CREATIVE":
      return <CreativeTemplatePreview />;
  }
}
