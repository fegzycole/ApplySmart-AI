import type { ResumeData } from "../../../types/resume-builder.types";
import {
  ContactDetails,
  EmptyResumeState,
  PreviewSection,
  ResponsibilitiesList,
  SkillTags,
} from "./PreviewPrimitives";
import {
  formatDateRange,
  getEducationTitle,
  getResponsibilities,
  hasResumeContent,
} from "./preview-utils";

interface ModernPreviewProps {
  data: ResumeData;
}

const sectionTitleClassName = "text-[14pt] font-bold text-[#3498db] mb-3 uppercase tracking-wide border-b-2 border-[#ecf0f1] pb-1.5";

export function ModernPreview({ data }: ModernPreviewProps) {
  const { personalInfo, summary, workExperience, education, skills } = data;

  return (
    <div className="bg-white p-8 md:p-12 min-h-[11in] w-full" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      <div className="text-center mb-5 pb-3 border-b-[3px] border-[#3498db]">
        <h1 className="text-[28pt] font-bold text-[#2c3e50] mb-2 tracking-wide">
          {personalInfo.name || "Your Name"}
        </h1>
        <ContactDetails
          personalInfo={personalInfo}
          className="flex justify-center flex-wrap gap-x-4 text-[10pt] text-[#555]"
        />
      </div>

      {summary && (
        <PreviewSection title="Professional Summary" className="mb-[18px]" titleClassName={sectionTitleClassName}>
          <p className="text-[10.5pt] leading-relaxed text-[#555] text-justify">{summary}</p>
        </PreviewSection>
      )}

      {workExperience.length > 0 && (
        <PreviewSection title="Work Experience" className="mb-[18px]" titleClassName={sectionTitleClassName}>
          {workExperience.map((experience) => (
            <div key={experience.id} className="mb-[18px]">
              <div className="flex justify-between mb-2">
                <div>
                  <h3 className="text-[12pt] font-bold text-[#2c3e50]">
                    {experience.position || "Position"}
                  </h3>
                  <div className="text-[11pt] text-[#34495e] font-medium">
                    {experience.company || "Company"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10pt] text-[#7f8c8d]">
                    {formatDateRange(experience.startDate, experience.endDate, "Date")}
                  </div>
                  {experience.location && (
                    <div className="text-[10pt] text-[#95a5a6]">{experience.location}</div>
                  )}
                </div>
              </div>
              <ResponsibilitiesList
                responsibilities={getResponsibilities(experience)}
                className="list-disc list-outside ml-5 space-y-1"
                itemClassName="text-[10pt] leading-relaxed text-[#555] pl-1"
              />
            </div>
          ))}
        </PreviewSection>
      )}

      {education.length > 0 && (
        <PreviewSection title="Education" className="mb-[18px]" titleClassName={sectionTitleClassName}>
          {education.map((item) => (
            <div key={item.id} className="mb-3">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-[11.5pt] font-bold text-[#2c3e50]">
                    {getEducationTitle(item, "field")}
                  </h3>
                  <div className="text-[10.5pt] text-[#34495e]">
                    {item.institution || "Institution"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10pt] text-[#7f8c8d]">
                    {item.graduationDate || "Year"}
                  </div>
                  {item.location && (
                    <div className="text-[10pt] text-[#95a5a6]">{item.location}</div>
                  )}
                </div>
              </div>
              {item.gpa && <div className="text-[10pt] text-[#555] mt-1">GPA: {item.gpa}</div>}
            </div>
          ))}
        </PreviewSection>
      )}

      {skills.length > 0 && (
        <PreviewSection title="Skills" className="mb-[18px]" titleClassName={sectionTitleClassName}>
          <SkillTags
            skills={skills}
            className="flex flex-wrap gap-2"
            itemClassName="inline-block px-3 py-1 bg-[#ecf0f1] text-[#2c3e50] text-[9.5pt] rounded font-medium"
          />
        </PreviewSection>
      )}

      {!hasResumeContent(data) && <EmptyResumeState />}
    </div>
  );
}
