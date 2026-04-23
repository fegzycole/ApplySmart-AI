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
