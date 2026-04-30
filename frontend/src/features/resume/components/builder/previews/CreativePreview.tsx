import type { ResumeData } from "../../../types/resume-builder.types";
import { SingleColumnPreview, type SingleColumnTheme } from "./SingleColumnPreview";

interface CreativePreviewProps {
  data: ResumeData;
}

const CREATIVE_THEME: SingleColumnTheme = {
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  headerClassName: "mb-6 pb-4 border-b-2 border-[#6366f1]",
  nameClassName: "text-[28pt] font-black text-[#1e1e2e] mb-2 tracking-tight",
  contactClassName: "flex flex-wrap gap-x-2 text-[10pt] text-[#555]",
  sectionTitleClassName: "text-[13pt] font-extrabold text-[#6366f1] mb-3 uppercase tracking-wide border-b-2 border-[#e5e7eb] pb-1",
  summaryClassName: "text-[10.5pt] leading-relaxed text-[#374151]",
  expContainerClassName: "mb-5",
  expHeaderClassName: "flex justify-between items-start mb-1",
  positionClassName: "text-[12pt] font-bold text-[#1e1e2e]",
  companyClassName: "text-[10.5pt] text-[#6366f1] font-semibold",
  dateClassName: "text-[10pt] text-[#6b7280]",
  locationClassName: "text-[10pt] text-[#9ca3af]",
  responsibilitiesClassName: "list-disc list-outside ml-5 space-y-0.5",
  responsibilityItemClassName: "text-[10pt] text-[#374151] leading-relaxed",
  eduContainerClassName: "mb-3 flex justify-between",
  degreeClassName: "text-[11pt] font-bold text-[#1e1e2e]",
  institutionClassName: "text-[10pt] text-[#4b5563]",
  skillsClassName: "flex flex-wrap gap-2",
  skillsItemClassName: "text-[9.5pt] px-3 py-1 rounded font-medium bg-[#eff6ff] text-[#1e40af] border border-[#bfdbfe]",
};

export function CreativePreview({ data }: CreativePreviewProps) {
  return <SingleColumnPreview data={data} theme={CREATIVE_THEME} />;
}
