import type {
  Education,
  PersonalInfo,
  ResumeData,
  WorkExperience,
} from "../../../types/resume-builder.types";

export function getContactItems(personalInfo: PersonalInfo) {
  return [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.github,
    personalInfo.website,
  ].filter(Boolean);
}

export function formatDateRange(startDate: string, endDate: string, fallback = "") {
  if (startDate && endDate) {
    return `${startDate} - ${endDate}`;
  }

  return startDate || endDate || fallback;
}

export function getResponsibilities(experience: WorkExperience) {
  return experience.responsibilities.filter(Boolean);
}

export function getEducationTitle(education: Education, separator: "dash" | "field") {
  if (separator === "field") {
    return `${education.degree || "Degree"}${education.field ? ` in ${education.field}` : ""}`;
  }

  return `${education.degree || "Degree"} - ${education.institution || "Institution"}`;
}

export function hasResumeContent(data: ResumeData) {
  return Boolean(
    data.personalInfo.name ||
      data.summary ||
      data.workExperience.length ||
      data.education.length ||
      data.skills.length
  );
}
