import { createContext, useContext, useState, ReactNode } from "react";

export type ResumeTemplate = 'MODERN' | 'PROFESSIONAL' | 'CLASSIC' | 'CREATIVE';

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  graduationDate: string;
  gpa: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  template: ResumeTemplate;
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  certifications: Certification[];
  projects: Project[];
}

interface ResumeBuilderContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;
  updateTemplate: (template: ResumeTemplate) => void;
  addWorkExperience: () => void;
  updateWorkExperience: (id: string, data: Partial<WorkExperience>) => void;
  deleteWorkExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  updateSkills: (skills: string[]) => void;
  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addCertification: () => void;
  updateCertification: (id: string, data: Partial<Certification>) => void;
  deleteCertification: (id: string) => void;
}

const ResumeBuilderContext = createContext<ResumeBuilderContextType | undefined>(undefined);

const defaultResumeData: ResumeData = {
  template: 'MODERN',
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
  },
  summary: '',
  workExperience: [],
  education: [],
  skills: [],
  certifications: [],
  projects: [],
};

export function ResumeBuilderProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const updateSummary = (summary: string) => {
    setResumeData((prev) => ({ ...prev, summary }));
  };

  const updateTemplate = (template: ResumeTemplate) => {
    setResumeData((prev) => ({ ...prev, template }));
  };

  const addWorkExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      responsibilities: [''],
    };
    setResumeData((prev) => ({
      ...prev,
      workExperience: [...prev.workExperience, newExp],
    }));
  };

  const updateWorkExperience = (id: string, data: Partial<WorkExperience>) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((exp) =>
        exp.id === id ? { ...exp, ...data } : exp
      ),
    }));
  };

  const deleteWorkExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      graduationDate: '',
      gpa: '',
    };
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const updateEducation = (id: string, data: Partial<Education>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, ...data } : edu
      ),
    }));
  };

  const deleteEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const updateSkills = (skills: string[]) => {
    setResumeData((prev) => ({ ...prev, skills }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
    };
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  };

  const updateProject = (id: string, data: Partial<Project>) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, ...data } : proj
      ),
    }));
  };

  const deleteProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
    };
    setResumeData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCert],
    }));
  };

  const updateCertification = (id: string, data: Partial<Certification>) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert) =>
        cert.id === id ? { ...cert, ...data } : cert
      ),
    }));
  };

  const deleteCertification = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }));
  };

  return (
    <ResumeBuilderContext.Provider
      value={{
        resumeData,
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
      }}
    >
      {children}
    </ResumeBuilderContext.Provider>
  );
}

export function useResumeBuilder() {
  const context = useContext(ResumeBuilderContext);
  if (!context) {
    throw new Error('useResumeBuilder must be used within ResumeBuilderProvider');
  }
  return context;
}
