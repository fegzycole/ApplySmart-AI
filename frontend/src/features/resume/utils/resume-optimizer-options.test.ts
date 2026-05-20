import { describe, expect, it } from "vitest";
import type { Resume } from "../services/resume.service";
import {
  getOriginalResumeOptionCount,
  getVisibleExistingResumeOptions,
} from "./resume-optimizer-options";

function createResume(overrides: Partial<Resume> = {}): Resume {
  return {
    id: overrides.id ?? 1,
    name: overrides.name ?? "Source Resume",
    lastModified: overrides.lastModified ?? "2026-05-20T00:00:00Z",
    score: overrides.score ?? 0,
    ...overrides,
  };
}

describe("resume optimizer existing resume options", () => {
  it("shows only original resumes by default", () => {
    const resumes = [
      createResume({ id: 1, name: "Original A", documentKind: "original" }),
      createResume({ id: 2, name: "Optimized A", documentKind: "optimized" }),
      createResume({ id: 3, name: "Built A", documentKind: "built" }),
      createResume({ id: 4, name: "Original B", documentKind: "original" }),
    ];

    expect(getVisibleExistingResumeOptions(resumes, "", 5).map((resume) => resume.id)).toEqual([1, 4]);
  });

  it("limits the default original list", () => {
    const resumes = [
      createResume({ id: 1, documentKind: "original" }),
      createResume({ id: 2, documentKind: "original" }),
      createResume({ id: 3, documentKind: "original" }),
    ];

    expect(getVisibleExistingResumeOptions(resumes, "", 2).map((resume) => resume.id)).toEqual([1, 2]);
  });

  it("includes all matching resume kinds when search is active", () => {
    const resumes = [
      createResume({ id: 1, name: "Product Resume", documentKind: "original" }),
      createResume({ id: 2, name: "Product Resume Optimized", documentKind: "optimized" }),
      createResume({ id: 3, name: "Engineering Resume", documentKind: "built" }),
    ];

    expect(getVisibleExistingResumeOptions(resumes, "product", 5).map((resume) => resume.id)).toEqual([1, 2]);
  });

  it("counts originals using legacy status fallbacks", () => {
    const resumes = [
      createResume({ id: 1, status: "draft", content: "plain text", fileUrl: "/resume.pdf" }),
      createResume({ id: 2, status: "optimized" }),
      createResume({ id: 3, status: "published" }),
      createResume({ id: 4, status: "draft", content: undefined, fileUrl: "/built.pdf" }),
    ];

    expect(getOriginalResumeOptionCount(resumes)).toBe(1);
  });
});
