import type { ResumeData } from "../../../types/resume-builder.types";
import { ContactDetails, PreviewSection, ResponsibilitiesList, SummaryText } from "./PreviewPrimitives";
import {
  formatDateRange,
  formatEducationDate,
  getEducationTitle,
  getResponsibilities,
  getTechnologies,
  hasCertificationContent,
  hasProjectContent,
} from "./preview-utils";

interface ProfessionalPreviewProps {
  data: ResumeData;
}

const sectionTitleClassName = "text-[14pt] font-bold text-[#1e293b] mb-4 uppercase border-b-2 border-[#e2e8f0] pb-2 tracking-[0.1em]";

export function ProfessionalPreview({ data }: ProfessionalPreviewProps) {
  const { personalInfo, summary, workExperience, education, skills, certifications, projects } = data;
  const visibleCertifications = certifications.filter(hasCertificationContent);
  const visibleProjects = projects.filter(hasProjectContent);

  return (
    <div className="bg-white p-10 md:p-16 min-h-[11in] w-full" style={{ fontFamily: '"Libre Baskerville", "Georgia", serif' }}>
      <div className="mb-10 pb-8 border-b-4 border-[#1e293b]">
        <h1 className="text-[36pt] font-bold text-[#1e293b] mb-4 tracking-tight leading-tight">
          {personalInfo.name || "Your Name"}
        </h1>
        <ContactDetails
          personalInfo={personalInfo}
          className="flex flex-wrap gap-x-6 text-[10.5pt] text-[#475569] font-medium"
        />
      </div>

      {summary && (
        <PreviewSection title="Professional Summary" className="mb-8" titleClassName={sectionTitleClassName}>
          <SummaryText summary={summary} className="text-[11pt] leading-relaxed text-[#334155] text-justify" />
        </PreviewSection>
      )}

      {workExperience.length > 0 && (
        <PreviewSection title="Experience History" className="mb-8" titleClassName={sectionTitleClassName}>
          {workExperience.map((experience) => (
            <div key={experience.id} className="mb-6 last:mb-0">
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <h3 className="text-[12.5pt] font-bold text-[#0f172a]">
                    {experience.position || "Position"}
                  </h3>
                  <div className="text-[11.5pt] text-[#334155] font-semibold">{experience.company || "Company"}</div>
                </div>
                <div className="text-right shrink-0 ml-6">
                  <div className="text-[10.5pt] font-bold text-[#1e293b]">
                    {formatDateRange(experience.startDate, experience.endDate, "Date", experience.current)}
                  </div>
                  {experience.location && (
                    <div className="text-[10pt] text-[#64748b] italic">{experience.location}</div>
                  )}
                </div>
              </div>
              <ResponsibilitiesList
                responsibilities={getResponsibilities(experience)}
                className="list-disc list-outside ml-6 space-y-1.5"
                itemClassName="text-[10.5pt] text-[#334155]"
              />
            </div>
          ))}
        </PreviewSection>
      )}

      {education.length > 0 && (
        <PreviewSection title="Education" className="mb-8" titleClassName={sectionTitleClassName}>
          {education.map((item) => (
            <div key={item.id} className="mb-4 last:mb-0">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-[12pt] font-bold text-[#0f172a]">
                    {getEducationTitle(item, "dash")}
                  </h3>
                  {item.location && <div className="text-[10pt] text-[#64748b] italic">{item.location}</div>}
                </div>
                <div className="text-right shrink-0 ml-6">
                  <span className="text-[10.5pt] font-bold text-[#1e293b]">{formatEducationDate(item)}</span>
                </div>
              </div>
            </div>
          ))}
        </PreviewSection>
      )}

      {skills.length > 0 && (
        <PreviewSection title="Core Competencies" className="mb-8" titleClassName={sectionTitleClassName}>
          <p className="text-[11pt] text-[#334155] leading-relaxed font-medium">{skills.join("  •  ")}</p>
        </PreviewSection>
      )}

      {visibleCertifications.length > 0 && (
        <PreviewSection title="Certifications" className="mb-8" titleClassName={sectionTitleClassName}>
          {visibleCertifications.map((certification) => (
            <div key={certification.id} className="mb-3 text-[10.5pt] leading-[1.6] text-[#334155] last:mb-0">
              <strong className="text-[#0f172a]">{certification.name || "Certification"}</strong>
              {certification.issuer && ` - ${certification.issuer}`}
              {certification.date && ` (${certification.date})`}
            </div>
          ))}
        </PreviewSection>
      )}

      {visibleProjects.length > 0 && (
        <PreviewSection title="Projects" className="mb-8" titleClassName={sectionTitleClassName}>
          {visibleProjects.map((project) => {
            const technologies = getTechnologies(project);

            return (
              <div key={project.id} className="mb-[18px] last:mb-0">
                <h3 className="text-[12pt] font-bold text-[#0f172a]">{project.name || "Project"}</h3>
                {project.description && (
                  <p className="mt-1.5 text-[10.5pt] leading-[1.6] text-[#334155]">{project.description}</p>
                )}
                {technologies.length > 0 && (
                  <div className="mt-1.5 text-[10pt] leading-normal text-[#475569]">
                    <strong>Technologies:</strong> {technologies.join(", ")}
                  </div>
                )}
                {project.link && (
                  <div className="mt-1.5 text-[10pt] leading-normal text-[#475569]">{project.link}</div>
                )}
              </div>
            );
          })}
        </PreviewSection>
      )}
    </div>
  );
}
