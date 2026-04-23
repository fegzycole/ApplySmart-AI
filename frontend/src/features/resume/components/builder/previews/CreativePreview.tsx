import type { ResumeData } from "../../../types/resume-builder.types";
import {
  ContactDetails,
  PreviewSection,
  ResponsibilitiesList,
  SkillTags,
} from "./PreviewPrimitives";
import { formatDateRange, getResponsibilities } from "./preview-utils";

export function CreativePreview({ data }: { data: ResumeData }) {
  const { personalInfo, summary, workExperience, education, skills } = data;

  return (
    <div className="bg-white min-h-[11in] w-full" style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-1/3 bg-gradient-to-b from-fuchsia-600 to-pink-600 p-6 md:p-8 text-white">
          <div className="mb-8">
            <h1 className="text-[24pt] font-bold mb-2">{personalInfo.name || "Your Name"}</h1>
            <ContactDetails
              personalInfo={personalInfo}
              className="space-y-1"
              itemClassName="text-[9pt]"
              direction="stacked"
            />
          </div>

          {skills.length > 0 && (
            <PreviewSection
              title="SKILLS"
              className="mb-6"
              titleClassName="text-[12pt] font-bold mb-3 border-b-2 border-white/30 pb-2"
            >
              <SkillTags
                skills={skills}
                className="space-y-1.5"
                itemClassName="block text-[9pt] px-2 py-1 bg-white/20 rounded"
              />
            </PreviewSection>
          )}

          {education.length > 0 && (
            <PreviewSection
              title="EDUCATION"
              className="mb-6"
              titleClassName="text-[12pt] font-bold mb-3 border-b-2 border-white/30 pb-2"
            >
              {education.map((item) => (
                <div key={item.id} className="mb-3">
                  <div className="font-bold text-[10pt]">{item.degree || "Degree"}</div>
                  <div className="text-[9pt] opacity-90">{item.institution || "Institution"}</div>
                  <div className="text-[8pt] opacity-75">{item.graduationDate || "Year"}</div>
                </div>
              ))}
            </PreviewSection>
          )}
        </aside>

        <main className="w-full md:w-2/3 p-8">
          {summary && (
            <PreviewSection title="PROFILE" className="mb-6" titleClassName="text-[14pt] font-bold text-fuchsia-600 mb-3">
              <p className="text-[10pt] leading-relaxed text-gray-700">{summary}</p>
            </PreviewSection>
          )}

          {workExperience.length > 0 && (
            <PreviewSection title="EXPERIENCE" className="mb-6" titleClassName="text-[14pt] font-bold text-fuchsia-600 mb-3">
              {workExperience.map((experience) => (
                <div key={experience.id} className="mb-4">
                  <h3 className="text-[11pt] font-bold text-gray-900">
                    {experience.position || "Position"}
                  </h3>
                  <div className="text-[10pt] text-fuchsia-600 font-semibold mb-1">
                    {experience.company || "Company"}
                  </div>
                  <div className="text-[9pt] text-gray-500 mb-2">
                    {formatDateRange(experience.startDate, experience.endDate)}
                  </div>
                  <ResponsibilitiesList
                    responsibilities={getResponsibilities(experience)}
                    className="list-disc ml-4 text-[9.5pt] text-gray-700 space-y-0.5"
                  />
                </div>
              ))}
            </PreviewSection>
          )}
        </main>
      </div>
    </div>
  );
}
