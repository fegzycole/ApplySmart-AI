import type { ResumeData } from "../../../types/resume-builder.types";
import { ContactDetails, PreviewSection, ResponsibilitiesList } from "./PreviewPrimitives";
import { formatDateRange, getEducationTitle, getResponsibilities } from "./preview-utils";

const sectionTitleClassName = "text-[12pt] font-bold uppercase mb-2 border-b border-gray-400";

export function ClassicPreview({ data }: { data: ResumeData }) {
  const { personalInfo, summary, workExperience, education, skills } = data;

  return (
    <div className="bg-white p-8 md:p-12 min-h-[11in] w-full" style={{ fontFamily: 'Times New Roman, serif' }}>
      <div className="text-center mb-6 pb-4 border-b-2 border-black">
        <h1 className="text-[26pt] font-bold mb-2">{personalInfo.name || "Your Name"}</h1>
        <ContactDetails personalInfo={personalInfo} className="text-[10pt] space-x-2" />
      </div>

      {summary && (
        <PreviewSection title="Summary" className="mb-4" titleClassName={sectionTitleClassName}>
          <p className="text-[11pt] text-justify">{summary}</p>
        </PreviewSection>
      )}

      {workExperience.length > 0 && (
        <PreviewSection title="Experience" className="mb-4" titleClassName={sectionTitleClassName}>
          {workExperience.map((experience) => (
            <div key={experience.id} className="mb-3">
              <div className="flex justify-between font-bold text-[11pt]">
                <span>{experience.position || "Position"}</span>
                <span>{formatDateRange(experience.startDate, experience.endDate)}</span>
              </div>
              <div className="italic text-[10.5pt] mb-1">{experience.company || "Company"}</div>
              <ResponsibilitiesList
                responsibilities={getResponsibilities(experience)}
                className="list-disc ml-5 text-[10pt]"
              />
            </div>
          ))}
        </PreviewSection>
      )}

      {education.length > 0 && (
        <PreviewSection title="Education" className="mb-4" titleClassName={sectionTitleClassName}>
          {education.map((item) => (
            <div key={item.id} className="mb-2 flex justify-between text-[10.5pt]">
              <span className="font-semibold">{getEducationTitle(item, "dash")}</span>
              <span>{item.graduationDate || "Year"}</span>
            </div>
          ))}
        </PreviewSection>
      )}

      {skills.length > 0 && (
        <PreviewSection title="Skills" className="mb-4" titleClassName={sectionTitleClassName}>
          <p className="text-[10.5pt]">{skills.join(", ")}</p>
        </PreviewSection>
      )}
    </div>
  );
}
