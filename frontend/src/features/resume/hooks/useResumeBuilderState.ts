import { useEffect, useState } from "react";
import { createDefaultResumeData } from "../constants/resume-builder.defaults";
import {
  createCertification,
  createEducation,
  createProject,
  createWorkExperience,
} from "../utils/resume-builder-items";
import { dedupeSkills } from "../utils/resume-builder-skills";
import {
  clearResumeBuilderData,
  loadResumeBuilderData,
  saveResumeBuilderData,
} from "../utils/resume-builder-storage";
import type {
  Certification,
  Education,
  PersonalInfo,
  Project,
  ResumeBuilderContextValue,
  ResumeData,
  ResumeTemplate,
  WorkExperience,
} from "../types/resume-builder.types";

export function useResumeBuilderState(initialData?: ResumeData): ResumeBuilderContextValue {
  const [resumeData, setResumeData] = useState<ResumeData>(() => initialData ?? loadResumeBuilderData());

  useEffect(() => {
    const timer = setTimeout(() => {
      saveResumeBuilderData(resumeData);
    }, 400);
    return () => clearTimeout(timer);
  }, [resumeData]);

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const updateSummary = (summary: string) => {
    setResumeData((prev) => ({ ...prev, summary }));
  };

  const resetResumeData = () => {
    clearResumeBuilderData();
    setResumeData(createDefaultResumeData());
  };

  const updateTemplate = (template: ResumeTemplate) => {
    setResumeData((prev) => ({ ...prev, template }));
  };

  const addWorkExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: [...prev.workExperience, createWorkExperience()],
    }));
  };

  const updateWorkExperience = (id: string, data: Partial<WorkExperience>) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((experience) =>
        experience.id === id ? { ...experience, ...data } : experience,
      ),
    }));
  };

  const deleteWorkExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((experience) => experience.id !== id),
    }));
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, createEducation()],
    }));
  };

  const updateEducation = (id: string, data: Partial<Education>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((education) =>
        education.id === id ? { ...education, ...data } : education,
      ),
    }));
  };

  const deleteEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((education) => education.id !== id),
    }));
  };

  const updateSkills = (skills: string[]) => {
    setResumeData((prev) => ({ ...prev, skills: dedupeSkills(skills) }));
  };

  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, createProject()],
    }));
  };

  const updateProject = (id: string, data: Partial<Project>) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) =>
        project.id === id ? { ...project, ...data } : project,
      ),
    }));
  };

  const deleteProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((project) => project.id !== id),
    }));
  };

  const addCertification = () => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, createCertification()],
    }));
  };

  const updateCertification = (id: string, data: Partial<Certification>) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((certification) =>
        certification.id === id ? { ...certification, ...data } : certification,
      ),
    }));
  };

  const deleteCertification = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((certification) => certification.id !== id),
    }));
  };

  return {
    resumeData,
    resetResumeData,
    updatePersonalInfo,
    updateSummary,
    updateTemplate,
    addWorkExperience,
    updateWorkExperience,
    deleteWorkExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    updateSkills,
    addProject,
    updateProject,
    deleteProject,
    addCertification,
    updateCertification,
    deleteCertification,
  };
}
