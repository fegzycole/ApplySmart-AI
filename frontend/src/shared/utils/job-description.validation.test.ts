import { describe, expect, it } from "vitest";

import {
  getJobDescriptionStats,
  getJobDescriptionValidationMessage,
  isValidJobDescription,
  JOB_DESCRIPTION_VALIDATION,
} from "./job-description.validation";

const REALISTIC_JOB_DESCRIPTION = `
Senior Frontend Engineer

Responsibilities:
- Build accessible React interfaces for customer-facing workflows.
- Collaborate with product, design, and backend teams to ship reliable features.
- Improve frontend performance, testing coverage, and developer tooling.

Requirements:
- 5+ years of experience with TypeScript, React, and modern browser APIs.
- Strong communication skills and familiarity with REST APIs, CI, and monitoring.
`;

describe("job description validation utilities", () => {
  it("counts trimmed characters, words, and non-empty lines", () => {
    expect(getJobDescriptionStats("  First line\n\nSecond line here  ")).toEqual({
      characterCount: 28,
      wordCount: 5,
      nonEmptyLineCount: 2,
    });
  });

  it("requires a non-empty job description", () => {
    expect(getJobDescriptionValidationMessage("   ")).toBe("Job description is required");
    expect(isValidJobDescription("   ")).toBe(false);
  });

  it("rejects descriptions below the minimum size thresholds", () => {
    expect(getJobDescriptionValidationMessage("Frontend engineer with React experience.")).toBe(
      "Please paste the full job description, not just the job title or a short summary.",
    );

    expect(JOB_DESCRIPTION_VALIDATION).toEqual({
      minCharacters: 120,
      minWords: 25,
    });
  });

  it("rejects long text without job-description signals", () => {
    const repeatedText = Array.from({ length: 40 }, (_, index) => `generic sentence ${index}`)
      .join(" ");

    expect(getJobDescriptionValidationMessage(repeatedText)).toBe(
      "Please paste a real job description that includes responsibilities, requirements, or qualifications.",
    );
    expect(isValidJobDescription(repeatedText)).toBe(false);
  });

  it("accepts structured descriptions with responsibilities and requirements", () => {
    expect(getJobDescriptionValidationMessage(REALISTIC_JOB_DESCRIPTION)).toBeNull();
    expect(isValidJobDescription(REALISTIC_JOB_DESCRIPTION)).toBe(true);
  });

  it("accepts one strong signal when the content is structured", () => {
    const structuredDescription = `
What you will do
- Own roadmap delivery across multiple customer onboarding surfaces.
- Partner with support and operations teams to clarify high-impact workflow gaps.
- Maintain implementation notes, review telemetry, and communicate product tradeoffs.
`;

    expect(getJobDescriptionValidationMessage(structuredDescription)).toBeNull();
  });
});
