import type {
  Education,
  PersonalInfo,
  ResumeData,
  WorkExperience,
} from "../../../types/resume-builder.types";

export type ContactField = "email" | "phone" | "location" | "linkedin" | "github" | "website";

export interface ContactEntry {
  field: ContactField;
  value: string;
}

export function getContactEntries(personalInfo: PersonalInfo): ContactEntry[] {
  const fields: ContactEntry[] = [
    { field: "email", value: personalInfo.email },
    { field: "phone", value: personalInfo.phone },
    { field: "location", value: personalInfo.location },
    { field: "linkedin", value: personalInfo.linkedin },
    { field: "github", value: personalInfo.github },
    { field: "website", value: personalInfo.website },
  ];
  return fields.filter(({ value }) => Boolean(value));
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
