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

export interface SingleColumnTheme {
  fontFamily: string;
  headerClassName: string;
  nameClassName: string;
  contactClassName: string;
  sectionTitleClassName: string;
  summaryClassName: string;
  expContainerClassName: string;
  expHeaderClassName: string;
  positionClassName: string;
  companyClassName: string;
  dateClassName: string;
  locationClassName: string;
  responsibilitiesClassName: string;
  responsibilityItemClassName: string;
  eduContainerClassName: string;
  degreeClassName: string;
  institutionClassName: string;
  skillsClassName: string;
  skillsItemClassName: string;
}

interface SingleColumnPreviewProps {
  data: ResumeData;
  theme: SingleColumnTheme;
}

export function SingleColumnPreview({ data, theme }: SingleColumnPreviewProps) {
  const { personalInfo, summary, workExperience, education, skills } = data;

  return (
    <div
      className="bg-white p-8 md:p-12 min-h-[11in] w-full"
      style={{ fontFamily: theme.fontFamily }}
    >
      <div className={theme.headerClassName}>
        <h1 className={theme.nameClassName}>{personalInfo.name || "Your Name"}</h1>
        <ContactDetails
          personalInfo={personalInfo}
          className={theme.contactClassName}
        />
      </div>

      {summary && (
        <PreviewSection title="Professional Summary" className="mb-[18px]" titleClassName={theme.sectionTitleClassName}>
          <p className={theme.summaryClassName}>{summary}</p>
        </PreviewSection>
      )}

      {workExperience.length > 0 && (
        <PreviewSection title="Work Experience" className="mb-[18px]" titleClassName={theme.sectionTitleClassName}>
          {workExperience.map((experience) => (
            <div key={experience.id} className={theme.expContainerClassName}>
              <div className={theme.expHeaderClassName}>
                <div>
                  <h3 className={theme.positionClassName}>{experience.position || "Position"}</h3>
                  <div className={theme.companyClassName}>{experience.company || "Company"}</div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className={theme.dateClassName}>
                    {formatDateRange(experience.startDate, experience.endDate, "Date")}
                  </div>
                  {experience.location && (
                    <div className={theme.locationClassName}>{experience.location}</div>
                  )}
                </div>
              </div>
              <ResponsibilitiesList
                responsibilities={getResponsibilities(experience)}
                className={theme.responsibilitiesClassName}
                itemClassName={theme.responsibilityItemClassName}
              />
            </div>
          ))}
        </PreviewSection>
      )}

      {education.length > 0 && (
        <PreviewSection title="Education" className="mb-[18px]" titleClassName={theme.sectionTitleClassName}>
          {education.map((item) => (
            <div key={item.id} className={theme.eduContainerClassName}>
              <div>
                <h3 className={theme.degreeClassName}>{getEducationTitle(item, "field")}</h3>
                <div className={theme.institutionClassName}>{item.institution || "Institution"}</div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <div className={theme.dateClassName}>{item.graduationDate || "Year"}</div>
                {item.location && (
                  <div className={theme.locationClassName}>{item.location}</div>
                )}
                {item.gpa && <div className={theme.dateClassName}>GPA: {item.gpa}</div>}
              </div>
            </div>
          ))}
        </PreviewSection>
      )}

      {skills.length > 0 && (
        <PreviewSection title="Skills" className="mb-[18px]" titleClassName={theme.sectionTitleClassName}>
          <SkillTags
            skills={skills}
            className={theme.skillsClassName}
            itemClassName={theme.skillsItemClassName}
          />
        </PreviewSection>
      )}

      {!hasResumeContent(data) && <EmptyResumeState />}
    </div>
  );
}
