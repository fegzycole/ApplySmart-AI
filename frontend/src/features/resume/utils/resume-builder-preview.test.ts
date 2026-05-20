import { describe, expect, it } from "vitest";

import { createDefaultResumeData } from "../constants/resume-builder.defaults";
import type { ResumeData } from "../types/resume-builder.types";
import {
  getResumeBuilderValidationError,
  isResumeDraftPristine,
} from "./resume-builder-preview";

function createValidResumeData(): ResumeData {
  return {
    ...createDefaultResumeData(),
    personalInfo: {
      ...createDefaultResumeData().personalInfo,
      name: "Ada Lovelace",
      email: "ada@example.com",
    },
    workExperience: [{
      id: "work-1",
      company: "Analytical Engines Ltd",
      position: "Principal Engineer",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      responsibilities: [],
    }],
    education: [{
      id: "education-1",
      institution: "University of London",
      degree: "Mathematics",
      field: "",
      location: "",
      startDate: "",
      graduationDate: "",
      current: false,
      gpa: "",
    }],
    skills: ["TypeScript"],
  };
}

describe("resume builder preview utilities", () => {
  it("reports required top-level resume fields in save order", () => {
    expect(getResumeBuilderValidationError(createDefaultResumeData())).toBe(
      "Please enter your full name.",
    );

    expect(getResumeBuilderValidationError({
      ...createDefaultResumeData(),
      personalInfo: {
        ...createDefaultResumeData().personalInfo,
        name: "Ada Lovelace",
      },
    })).toBe("Please enter your email address.");
  });

  it("reports incomplete work and education entries before missing collection errors", () => {
    expect(getResumeBuilderValidationError({
      ...createValidResumeData(),
      workExperience: [{
        ...createValidResumeData().workExperience[0],
        company: "",
      }],
    })).toBe("One of your work experience entries is missing a company name.");

    expect(getResumeBuilderValidationError({
      ...createValidResumeData(),
      education: [{
        ...createValidResumeData().education[0],
        degree: "",
      }],
    })).toBe("One of your education entries is missing a degree.");
  });

  it("requires work experience, education, and skills to save", () => {
    expect(getResumeBuilderValidationError({
      ...createValidResumeData(),
      workExperience: [],
    })).toBe("Please add at least one work experience entry.");

    expect(getResumeBuilderValidationError({
      ...createValidResumeData(),
      education: [],
    })).toBe("Please add at least one education entry.");

    expect(getResumeBuilderValidationError({
      ...createValidResumeData(),
      skills: [],
    })).toBe("Please add at least one skill.");
  });

  it("accepts valid resume data", () => {
    expect(getResumeBuilderValidationError(createValidResumeData())).toBeNull();
  });

  it("treats empty draft data as pristine", () => {
    expect(isResumeDraftPristine(createDefaultResumeData())).toBe(true);
  });

  it("detects non-empty draft fields across optional sections", () => {
    expect(isResumeDraftPristine({
      ...createDefaultResumeData(),
      personalInfo: {
        ...createDefaultResumeData().personalInfo,
        github: "github.com/ada",
      },
    })).toBe(false);

    expect(isResumeDraftPristine({
      ...createDefaultResumeData(),
      projects: [{
        id: "project-1",
        name: "",
        description: "",
        technologies: ["React"],
        link: "",
      }],
    })).toBe(false);

    expect(isResumeDraftPristine({
      ...createDefaultResumeData(),
      certifications: [{
        id: "certification-1",
        name: "",
        issuer: "AWS",
        date: "",
      }],
    })).toBe(false);
  });
});
