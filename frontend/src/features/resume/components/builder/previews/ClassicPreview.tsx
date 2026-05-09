import type { ResumeData } from "../../../types/resume-builder.types";
import { ContactDetails, PreviewSection, ResponsibilitiesList, SummaryText } from "./PreviewPrimitives";
import { formatDateRange, formatEducationDate, getResponsibilities } from "./preview-utils";

const sectionTitleClassName = "text-[12pt] font-bold uppercase mb-4 border-b-2 border-zinc-800 tracking-[0.15em] pb-1";

export function ClassicPreview({ data }: { data: ResumeData }) {
  const { personalInfo, summary, workExperience, education, skills } = data;

  return (
    <div className="bg-white p-12 md:p-20 min-h-[11in] w-full" style={{ fontFamily: '"EB Garamond", "Times New Roman", serif' }}>
      <div className="text-center mb-10">
        <h1 className="text-[28pt] font-bold mb-4 tracking-tight uppercase">{personalInfo.name || "Your Name"}</h1>
        <ContactDetails 
          personalInfo={personalInfo} 
          className="flex justify-center flex-wrap gap-x-6 text-[10.5pt] font-medium text-zinc-700 tracking-wide" 
        />
        <div className="mt-6 h-0.5 w-full bg-zinc-900" />
      </div>

      {summary && (
        <PreviewSection title="Professional Summary" className="mb-8" titleClassName={sectionTitleClassName}>
          <SummaryText summary={summary} className="text-[11.5pt] leading-relaxed text-zinc-900 text-justify italic" />
        </PreviewSection>
      )}

      {workExperience.length > 0 && (
        <PreviewSection title="Professional Experience" className="mb-8" titleClassName={sectionTitleClassName}>
          {workExperience.map((experience) => (
            <div key={experience.id} className="mb-6 last:mb-0">
              <div className="flex justify-between items-baseline font-bold text-[12pt] mb-1">
                <span className="uppercase tracking-tight text-zinc-900">{experience.company || "Company"}</span>
                <span className="text-[10.5pt] text-zinc-800 font-bold uppercase tracking-widest">
                  {formatDateRange(experience.startDate, experience.endDate, "", experience.current)}
                </span>
              </div>
              <div className="flex justify-between items-baseline mb-3">
                <div className="italic text-[11pt] font-semibold text-zinc-800">
                  {experience.position || "Position"}
                </div>
                {experience.location && (
                  <div className="text-[10pt] text-zinc-600 font-medium italic">{experience.location}</div>
                )}
              </div>
              <ResponsibilitiesList
                responsibilities={getResponsibilities(experience)}
                className="list-disc list-outside ml-6 space-y-1.5"
                itemClassName="text-[11pt] leading-relaxed text-zinc-900 pl-1"
              />
            </div>
          ))}
        </PreviewSection>
      )}

      {education.length > 0 && (
        <PreviewSection title="Education" className="mb-8" titleClassName={sectionTitleClassName}>
          {education.map((item) => (
            <div key={item.id} className="mb-4 last:mb-0 flex justify-between items-baseline text-[11.5pt]">
              <div>
                <span className="font-bold uppercase text-zinc-900">{item.institution || "Institution"}</span>
                <div className="italic text-zinc-800 font-medium">{item.degree || "Degree"}{item.field ? ` in ${item.field}` : ""}</div>
              </div>
              <span className="text-[10.5pt] font-bold text-zinc-800">{formatEducationDate(item)}</span>
            </div>
          ))}
        </PreviewSection>
      )}

      {skills.length > 0 && (
        <PreviewSection title="Core Competencies" className="mb-8" titleClassName={sectionTitleClassName}>
          <p className="text-[11.5pt] leading-relaxed text-zinc-900 font-medium tracking-wide">
            {skills.join(" • ")}
          </p>
        </PreviewSection>
      )}
    </div>
  );
}
