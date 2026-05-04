import type { ResumeData, ResumeTemplate } from "../types/resume-builder.types";

interface ParsedResumePayload {
  personalInfo: ResumeData["personalInfo"];
  summary: string;
  workExperience: Array<{
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    location: string;
    startDate: string;
    graduationDate: string;
    gpa: string;
  }>;
  skills: string[];
  certifications: ResumeData["certifications"];
  projects: ResumeData["projects"];
}

export interface RenderResumePdfPayload {
  name: string;
  template: ResumeTemplate;
  resumeData: ParsedResumePayload;
}

export interface BuildResumeFromDataPayload {
  name: string;
  template: ResumeTemplate;
  resumeData: ParsedResumePayload;
}

function getEndDate(endDate: string, current: boolean) {
  return current ? "Present" : endDate;
}

function getGraduationDate(graduationDate: string, current: boolean) {
  return current ? "Present" : graduationDate;
}

export function buildResumePayload(data: ResumeData, name: string): BuildResumeFromDataPayload {
  return {
    name,
    template: data.template,
    resumeData: {
      personalInfo: data.personalInfo,
      summary: data.summary,
      workExperience: data.workExperience.map((experience) => ({
        company: experience.company,
        position: experience.position,
        location: experience.location,
        startDate: experience.startDate,
        endDate: getEndDate(experience.endDate, experience.current),
        responsibilities: experience.responsibilities.filter(Boolean),
      })),
      education: data.education.map((education) => ({
        institution: education.institution,
        degree: education.degree,
        field: education.field,
        location: education.location,
        startDate: education.startDate,
        graduationDate: getGraduationDate(education.graduationDate, education.current),
        gpa: education.gpa,
      })),
      skills: data.skills,
      certifications: data.certifications,
      projects: data.projects,
    },
  };
}

export function buildResumePdfPayload(data: ResumeData, name: string): RenderResumePdfPayload {
  return buildResumePayload(data, name);
}
