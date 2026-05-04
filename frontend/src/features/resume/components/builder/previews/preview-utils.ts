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

export function formatDateRange(startDate: string, endDate: string, fallback = "", current = false) {
  const end = current ? "Present" : endDate;

  if (startDate && end) {
    return `${startDate} - ${end}`;
  }

  return startDate || end || fallback;
}

export function getResponsibilities(experience: WorkExperience) {
  return experience.responsibilities.filter(Boolean);
}

export function formatEducationDate(education: Education) {
  return formatDateRange(education.startDate, education.graduationDate, "Year", education.current);
}

function isFieldFirstCredential(credential: string) {
  const normalized = credential.trim().toLowerCase();
  return (
    normalized.includes("certificate") ||
    normalized.includes("diploma") ||
    normalized.includes("program") ||
    normalized.includes("bootcamp") ||
    normalized.includes("nanodegree") ||
    normalized.includes("fellowship")
  );
}

function getEducationCredential(education: Education) {
  const credential = education.degree.trim();
  const field = education.field.trim();

  if (credential && field) {
    if (isFieldFirstCredential(credential)) {
      return `${field} ${credential}`;
    }

    return `${credential} in ${field}`;
  }

  return credential || field || "Credential";
}

export function getEducationTitle(education: Education, separator: "dash" | "field") {
  const credential = getEducationCredential(education);

  if (separator === "field") {
    return credential;
  }

  return `${credential} - ${education.institution || "Institution"}`;
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
