import { createDefaultResumeData, DEFAULT_RESUME_DATA } from "../constants/resume-builder.defaults";
import type {
  Certification,
  Education,
  PersonalInfo,
  Project,
  ResumeData,
  ResumeTemplate,
  WorkExperience,
} from "../types/resume-builder.types";
import { dedupeSkills } from "./resume-builder-skills";

const RESUME_BUILDER_STORAGE_KEY = "applysmart.resume-builder-draft";

function isResumeTemplate(value: unknown): value is ResumeTemplate {
  return value === "MODERN" || value === "PROFESSIONAL" || value === "CLASSIC" || value === "CREATIVE";
}

function sanitizeString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function sanitizeBoolean(value: unknown) {
  return value === true;
}

function createStoredItemId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function sanitizePersonalInfo(value: unknown): PersonalInfo {
  if (!value || typeof value !== "object") {
    return DEFAULT_RESUME_DATA.personalInfo;
  }

  const personalInfo = value as Partial<PersonalInfo>;

  return {
    name: sanitizeString(personalInfo.name),
    email: sanitizeString(personalInfo.email),
    phone: sanitizeString(personalInfo.phone),
    location: sanitizeString(personalInfo.location),
    linkedin: sanitizeString(personalInfo.linkedin),
    github: sanitizeString(personalInfo.github),
    website: sanitizeString(personalInfo.website),
  };
}

function sanitizeResponsibilities(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function sanitizeWorkExperience(value: unknown): WorkExperience[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const experience = item as Partial<WorkExperience>;
    return [{
      id: sanitizeString(experience.id) || createStoredItemId("work"),
      company: sanitizeString(experience.company),
      position: sanitizeString(experience.position),
      location: sanitizeString(experience.location),
      startDate: sanitizeString(experience.startDate),
      endDate: sanitizeString(experience.endDate),
      current: sanitizeBoolean(experience.current),
      responsibilities: sanitizeResponsibilities(experience.responsibilities),
    }];
  });
}

function sanitizeEducation(value: unknown): Education[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const education = item as Partial<Education>;
    return [{
      id: sanitizeString(education.id) || createStoredItemId("education"),
      institution: sanitizeString(education.institution),
      degree: sanitizeString(education.degree),
      field: sanitizeString(education.field),
      location: sanitizeString(education.location),
      startDate: sanitizeString(education.startDate),
      graduationDate: sanitizeString(education.graduationDate),
      current: sanitizeBoolean(education.current),
      gpa: sanitizeString(education.gpa),
    }];
  });
}

function sanitizeProjects(value: unknown): Project[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const project = item as Partial<Project>;
    return [{
      id: sanitizeString(project.id) || createStoredItemId("project"),
      name: sanitizeString(project.name),
      description: sanitizeString(project.description),
      technologies: Array.isArray(project.technologies)
        ? project.technologies.filter((technology): technology is string => typeof technology === "string")
        : [],
      link: sanitizeString(project.link),
    }];
  });
}

function sanitizeCertifications(value: unknown): Certification[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const certification = item as Partial<Certification>;
    return [{
      id: sanitizeString(certification.id) || createStoredItemId("certification"),
      name: sanitizeString(certification.name),
      issuer: sanitizeString(certification.issuer),
      date: sanitizeString(certification.date),
    }];
  });
}

export function loadResumeBuilderData(): ResumeData {
  if (typeof window === "undefined") {
    return createDefaultResumeData();
  }

  try {
    const rawDraft = window.localStorage.getItem(RESUME_BUILDER_STORAGE_KEY);
    if (!rawDraft) {
      return createDefaultResumeData();
    }

    const parsedDraft = JSON.parse(rawDraft) as Partial<ResumeData>;
    return {
      template: isResumeTemplate(parsedDraft.template) ? parsedDraft.template : DEFAULT_RESUME_DATA.template,
      personalInfo: sanitizePersonalInfo(parsedDraft.personalInfo),
      summary: sanitizeString(parsedDraft.summary),
      workExperience: sanitizeWorkExperience(parsedDraft.workExperience),
      education: sanitizeEducation(parsedDraft.education),
      skills: dedupeSkills(Array.isArray(parsedDraft.skills) ? parsedDraft.skills.filter((skill): skill is string => typeof skill === "string") : []),
      certifications: sanitizeCertifications(parsedDraft.certifications),
      projects: sanitizeProjects(parsedDraft.projects),
    };
  } catch {
    return createDefaultResumeData();
  }
}

export function saveResumeBuilderData(data: ResumeData) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(RESUME_BUILDER_STORAGE_KEY, JSON.stringify(data));
}

export function clearResumeBuilderData() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(RESUME_BUILDER_STORAGE_KEY);
}
