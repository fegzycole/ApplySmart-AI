import type { ResumeData } from "../types/resume-builder.types";

export function getResumeBuilderValidationError(data: ResumeData): string | null {
  return [
    getPersonalInfoValidationError(data),
    getWorkExperienceValidationError(data),
    getEducationValidationError(data),
    getRequiredCollectionValidationError(data),
  ].find((error): error is string => Boolean(error)) ?? null;
}

export function isResumeDraftPristine(data: ResumeData): boolean {
  return (
    isPersonalInfoEmpty(data) &&
    !data.summary.trim() &&
    data.workExperience.every(isWorkExperienceEmpty) &&
    data.education.every(isEducationEmpty) &&
    data.skills.length === 0 &&
    data.projects.every(isProjectEmpty) &&
    data.certifications.every(isCertificationEmpty)
  );
}

function getPersonalInfoValidationError(data: ResumeData): string | null {
  if (!data.personalInfo.name.trim()) return "Please enter your full name.";
  if (!data.personalInfo.email.trim()) return "Please enter your email address.";

  return null;
}

function getWorkExperienceValidationError(data: ResumeData): string | null {
  const incompleteEntry = data.workExperience.find((experience) => (
    !experience.company.trim() || !experience.position.trim()
  ));

  if (!incompleteEntry) return null;

  return incompleteEntry.company.trim()
    ? "One of your work experience entries is missing a job title."
    : "One of your work experience entries is missing a company name.";
}

function getEducationValidationError(data: ResumeData): string | null {
  const incompleteEntry = data.education.find((education) => (
    !education.institution.trim() || !education.degree.trim()
  ));

  if (!incompleteEntry) return null;

  return incompleteEntry.institution.trim()
    ? "One of your education entries is missing a degree."
    : "One of your education entries is missing an institution name.";
}

function getRequiredCollectionValidationError(data: ResumeData): string | null {
  const missingRule = [
    {
      missing: data.workExperience.length === 0,
      message: "Please add at least one work experience entry.",
    },
    {
      missing: data.education.length === 0,
      message: "Please add at least one education entry.",
    },
    {
      missing: data.skills.length === 0,
      message: "Please add at least one skill.",
    },
  ].find((rule) => rule.missing);

  return missingRule?.message ?? null;
}

function isPersonalInfoEmpty(data: ResumeData): boolean {
  const { personalInfo } = data;

  return [
    personalInfo.name,
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.github,
    personalInfo.website,
  ].every(isBlank);
}

function isWorkExperienceEmpty(experience: ResumeData["workExperience"][number]): boolean {
  return [
    experience.company,
    experience.position,
    experience.location,
    experience.startDate,
    experience.endDate,
    ...experience.responsibilities,
  ].every(isBlank);
}

function isEducationEmpty(education: ResumeData["education"][number]): boolean {
  return [
    education.institution,
    education.degree,
    education.field,
    education.location,
    education.startDate,
    education.graduationDate,
    education.gpa,
  ].every(isBlank);
}

function isProjectEmpty(project: ResumeData["projects"][number]): boolean {
  return [
    project.name,
    project.description,
    project.link,
    ...project.technologies,
  ].every(isBlank);
}

function isCertificationEmpty(certification: ResumeData["certifications"][number]): boolean {
  return [
    certification.name,
    certification.issuer,
    certification.date,
  ].every(isBlank);
}

function isBlank(value: string): boolean {
  return !value.trim();
}
