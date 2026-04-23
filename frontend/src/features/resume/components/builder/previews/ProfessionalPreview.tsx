import type { ResumeData } from "../../../types/resume-builder.types";
import { ContactDetails, PreviewSection, ResponsibilitiesList } from "./PreviewPrimitives";
import { formatDateRange, getEducationTitle, getResponsibilities } from "./preview-utils";

interface ProfessionalPreviewProps {
  data: ResumeData;
}

const sectionTitleClassName = "text-[13pt] font-bold text-[#2c3e50] mb-2 uppercase border-b border-gray-300 pb-1";

export function ProfessionalPreview({ data }: ProfessionalPreviewProps) {
  const { personalInfo, summary, workExperience, education, skills } = data;

  return (
    <div className="bg-white p-8 md:p-12 min-h-[11in] w-full" style={{ fontFamily: 'Georgia, serif' }}>
      <div className="mb-6 pb-4 border-b-2 border-[#2c3e50]">
        <h1 className="text-[32pt] font-bold text-[#2c3e50] mb-3">
          {personalInfo.name || "Your Name"}
        </h1>
        <ContactDetails
          personalInfo={personalInfo}
          className="flex flex-wrap gap-x-3 text-[10pt] text-[#555]"
          separator="|"
        />
      </div>

      {summary && (
        <PreviewSection title="Professional Summary" className="mb-5" titleClassName={sectionTitleClassName}>
          <p className="text-[10.5pt] leading-relaxed text-[#555]">{summary}</p>
        </PreviewSection>
      )}

      {workExperience.length > 0 && (
        <PreviewSection title="Work Experience" className="mb-5" titleClassName={`${sectionTitleClassName} mb-3`}>
          {workExperience.map((experience) => (
            <div key={experience.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-[11.5pt] font-bold text-[#2c3e50]">
                  {experience.position || "Position"} - {experience.company || "Company"}
                </h3>
                <span className="text-[10pt] text-[#666]">
                  {formatDateRange(experience.startDate, experience.endDate, "Date")}
                </span>
              </div>
              <ResponsibilitiesList
                responsibilities={getResponsibilities(experience)}
                className="list-disc list-outside ml-5 space-y-0.5"
                itemClassName="text-[10pt] text-[#555]"
              />
            </div>
          ))}
        </PreviewSection>
      )}

      {education.length > 0 && (
        <PreviewSection title="Education" className="mb-5" titleClassName={sectionTitleClassName}>
          {education.map((item) => (
            <div key={item.id} className="mb-2">
              <div className="flex justify-between">
                <span className="text-[11pt] font-semibold text-[#2c3e50]">
                  {getEducationTitle(item, "dash")}
                </span>
                <span className="text-[10pt] text-[#666]">{item.graduationDate || "Year"}</span>
              </div>
            </div>
          ))}
        </PreviewSection>
      )}

      {skills.length > 0 && (
        <PreviewSection title="Skills" className="mb-5" titleClassName={sectionTitleClassName}>
          <p className="text-[10pt] text-[#555]">{skills.join(" • ")}</p>
        </PreviewSection>
      )}
    </div>
  );
}
