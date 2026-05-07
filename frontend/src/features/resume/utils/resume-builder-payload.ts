import type { ResumeData, ResumeTemplate, WorkExperience, Education, Certification, Project } from "../types/resume-builder.types";

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

// Parses content stored by the backend (serialized BuildResumeFromDataRequest) back into ResumeData.
// Returns null if the content is not a valid builder payload (e.g. uploaded/optimized resume plain text).
export function contentToResumeData(content: string): ResumeData | null {
  try {
    const payload = JSON.parse(content) as { template?: ResumeTemplate; resumeData?: ParsedResumePayload };
    if (!payload.resumeData?.personalInfo) return null;

    const d = payload.resumeData;
    return {
      template: payload.template ?? "MODERN",
      personalInfo: d.personalInfo,
      summary: d.summary ?? "",
      workExperience: (d.workExperience ?? []).map((exp): WorkExperience => ({
        id: crypto.randomUUID(),
        company: exp.company ?? "",
        position: exp.position ?? "",
        location: exp.location ?? "",
        startDate: exp.startDate ?? "",
        endDate: exp.endDate === "Present" ? "" : (exp.endDate ?? ""),
        current: exp.endDate === "Present",
        responsibilities: exp.responsibilities ?? [],
      })),
      education: (d.education ?? []).map((edu): Education => ({
        id: crypto.randomUUID(),
        institution: edu.institution ?? "",
        degree: edu.degree ?? "",
        field: edu.field ?? "",
        location: edu.location ?? "",
        startDate: edu.startDate ?? "",
        graduationDate: edu.graduationDate === "Present" ? "" : (edu.graduationDate ?? ""),
        current: edu.graduationDate === "Present",
        gpa: edu.gpa ?? "",
      })),
      skills: d.skills ?? [],
      certifications: (d.certifications ?? []).map((cert): Certification => ({
        id: crypto.randomUUID(),
        name: cert.name ?? "",
        issuer: cert.issuer ?? "",
        date: cert.date ?? "",
      })),
      projects: (d.projects ?? []).map((proj): Project => ({
        id: crypto.randomUUID(),
        name: proj.name ?? "",
        description: proj.description ?? "",
        technologies: proj.technologies ?? [],
        link: proj.link ?? "",
      })),
    };
  } catch {
    return null;
  }
}
