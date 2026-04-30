import type { ResumeData } from "../../../types/resume-builder.types";
import { SingleColumnPreview, type SingleColumnTheme } from "./SingleColumnPreview";

interface ModernPreviewProps {
  data: ResumeData;
}

const MODERN_THEME: SingleColumnTheme = {
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  headerClassName: "text-center mb-5 pb-3 border-b-[3px] border-[#3498db]",
  nameClassName: "text-[28pt] font-bold text-[#2c3e50] mb-2 tracking-wide",
  contactClassName: "flex justify-center flex-wrap gap-x-4 text-[10pt] text-[#555]",
  sectionTitleClassName: "text-[14pt] font-bold text-[#3498db] mb-3 uppercase tracking-wide border-b-2 border-[#ecf0f1] pb-1.5",
  summaryClassName: "text-[10.5pt] leading-relaxed text-[#555] text-justify",
  expContainerClassName: "mb-[18px]",
  expHeaderClassName: "flex justify-between mb-2",
  positionClassName: "text-[12pt] font-bold text-[#2c3e50]",
  companyClassName: "text-[11pt] text-[#34495e] font-medium",
  dateClassName: "text-[10pt] text-[#7f8c8d]",
  locationClassName: "text-[10pt] text-[#95a5a6]",
  responsibilitiesClassName: "list-disc list-outside ml-5 space-y-1",
  responsibilityItemClassName: "text-[10pt] leading-relaxed text-[#555] pl-1",
  eduContainerClassName: "mb-3 flex justify-between",
  degreeClassName: "text-[11.5pt] font-bold text-[#2c3e50]",
  institutionClassName: "text-[10.5pt] text-[#34495e]",
  skillsClassName: "flex flex-wrap gap-2",
  skillsItemClassName: "inline-block px-3 py-1 bg-[#ecf0f1] text-[#2c3e50] text-[9.5pt] rounded font-medium",
};

export function ModernPreview({ data }: ModernPreviewProps) {
  return <SingleColumnPreview data={data} theme={MODERN_THEME} />;
}
