import type { ResumeData } from "../types/resume-builder.types";

export const DEFAULT_RESUME_DATA: ResumeData = {
  template: "MODERN",
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
  },
  summary: "",
  workExperience: [],
  education: [],
  skills: [],
  certifications: [],
  projects: [],
};

export function createDefaultResumeData(): ResumeData {
  return {
    template: DEFAULT_RESUME_DATA.template,
    personalInfo: { ...DEFAULT_RESUME_DATA.personalInfo },
    summary: DEFAULT_RESUME_DATA.summary,
    workExperience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: [],
  };
}
