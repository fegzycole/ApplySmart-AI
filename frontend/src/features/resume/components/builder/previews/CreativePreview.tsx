import type { ResumeData } from "../../../types/resume-builder.types";
import { SingleColumnPreview, type SingleColumnTheme } from "./SingleColumnPreview";

interface CreativePreviewProps {
  data: ResumeData;
}

const CREATIVE_THEME: SingleColumnTheme = {
  fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
  headerClassName: "mb-10 pb-8 relative",
  nameClassName: "text-[42pt] font-black text-[#0f172a] mb-2 tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-[#0ea5e9] to-[#2563eb]",
  contactClassName: "flex flex-wrap gap-x-6 text-[10.5pt] font-bold text-[#64748b] uppercase tracking-widest",
  sectionTitleClassName: "text-[16pt] font-black text-[#0f172a] mb-6 uppercase tracking-[0.2em] relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:h-1.5 after:w-12 after:bg-[#0ea5e9]",
  summaryClassName: "text-[11.5pt] leading-relaxed text-[#334155] font-medium",
  expContainerClassName: "mb-8 relative pl-8 border-l-4 border-[#e2e8f0]",
  expHeaderClassName: "flex flex-col mb-3",
  positionClassName: "text-[14pt] font-extrabold text-[#0f172a] tracking-tight",
  companyClassName: "text-[12pt] text-[#0ea5e9] font-black uppercase tracking-wider mt-1",
  dateClassName: "text-[10pt] font-black text-[#94a3b8] uppercase tracking-widest mt-2",
  locationClassName: "text-[10pt] text-[#64748b] font-bold",
  responsibilitiesClassName: "list-none space-y-3",
  responsibilityItemClassName: "text-[11pt] leading-relaxed text-[#475569] font-medium before:content-['→'] before:mr-3 before:text-[#0ea5e9] before:font-black",
  eduContainerClassName: "mb-6 last:mb-0",
  degreeClassName: "text-[13pt] font-extrabold text-[#0f172a]",
  institutionClassName: "text-[11.5pt] text-[#64748b] font-bold uppercase tracking-wide",
  skillsClassName: "flex flex-wrap gap-3",
  skillsItemClassName: "inline-block px-5 py-2 bg-gradient-to-br from-[#0ea5e9]/10 to-[#2563eb]/10 text-[#0369a1] text-[10pt] rounded-2xl font-black border-2 border-[#bae6fd] shadow-sm",
};

export function CreativePreview({ data }: CreativePreviewProps) {
  return <SingleColumnPreview data={data} theme={CREATIVE_THEME} />;
}
