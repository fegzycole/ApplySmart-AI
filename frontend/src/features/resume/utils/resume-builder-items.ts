import type { Certification, Education, Project, WorkExperience } from "../types/resume-builder.types";

function createBuilderItemId() {
  return Date.now().toString();
}

export function createWorkExperience(): WorkExperience {
  return {
    id: createBuilderItemId(),
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    responsibilities: [""],
  };
}

export function createEducation(): Education {
  return {
    id: createBuilderItemId(),
    institution: "",
    degree: "",
    field: "",
    location: "",
    startDate: "",
    graduationDate: "",
    gpa: "",
  };
}

export function createProject(): Project {
  return {
    id: createBuilderItemId(),
    name: "",
    description: "",
    technologies: [],
    link: "",
  };
}

export function createCertification(): Certification {
  return {
    id: createBuilderItemId(),
    name: "",
    issuer: "",
    date: "",
  };
}
