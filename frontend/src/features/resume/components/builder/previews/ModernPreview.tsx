import type { ResumeData } from "../../../types/resume-builder.types";
import { SingleColumnPreview, type SingleColumnTheme } from "./SingleColumnPreview";

interface ModernPreviewProps {
  data: ResumeData;
}

const MODERN_THEME: SingleColumnTheme = {
  fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
  headerClassName: "text-center mb-8 pb-6 border-b-[4px] border-[#4f46e5]", // Indigo 600
  nameClassName: "text-[32pt] font-black text-[#1e293b] mb-2 tracking-tighter leading-none",
  contactClassName: "flex justify-center flex-wrap gap-x-6 text-[10.5pt] font-medium text-[#64748b]",
  sectionTitleClassName: "text-[14pt] font-extrabold text-[#4f46e5] mb-4 uppercase tracking-[0.2em] border-b-2 border-[#f1f5f9] pb-2",
  summaryClassName: "text-[11pt] leading-relaxed text-[#475569] text-justify",
  expContainerClassName: "mb-[24px]",
  expHeaderClassName: "flex justify-between items-baseline mb-2",
  positionClassName: "text-[13pt] font-bold text-[#1e293b] tracking-tight",
  companyClassName: "text-[11.5pt] text-[#4f46e5] font-semibold",
  dateClassName: "text-[10pt] font-bold text-[#64748b] uppercase tracking-wider",
  locationClassName: "text-[10pt] text-[#94a3b8]",
  responsibilitiesClassName: "list-disc list-outside ml-6 space-y-2",
  responsibilityItemClassName: "text-[10.5pt] leading-relaxed text-[#475569] pl-1",
  eduContainerClassName: "mb-4 flex justify-between items-baseline",
  degreeClassName: "text-[12pt] font-bold text-[#1e293b]",
  institutionClassName: "text-[11pt] text-[#64748b] font-medium",
  skillsClassName: "flex flex-wrap gap-2.5",
  skillsItemClassName: "inline-block px-4 py-1.5 bg-[#f1f5f9] text-[#475569] text-[10pt] rounded-lg font-semibold border border-[#e2e8f0]",
  certificationClassName: "mb-3 last:mb-0 text-[10.5pt] leading-[1.6] text-[#475569]",
  certificationNameClassName: "text-[#1e293b] font-bold",
  projectContainerClassName: "mb-[18px] last:mb-0",
  projectNameClassName: "text-[12pt] font-bold text-[#1e293b]",
  projectDescriptionClassName: "mt-1.5 text-[10.5pt] leading-relaxed text-[#475569]",
  projectMetaClassName: "mt-1.5 text-[10pt] leading-normal text-[#64748b]",
  projectMetaLabelClassName: "text-[#4f46e5] font-bold",
};

export function ModernPreview({ data }: ModernPreviewProps) {
  return <SingleColumnPreview data={data} theme={MODERN_THEME} />;
}
