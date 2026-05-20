import { describe, expect, it } from "vitest";
import { formatTechnologyInput, parseTechnologyInput } from "./resume-builder-technologies";

describe("resume builder technology input", () => {
  it("formats technologies for the textarea", () => {
    expect(formatTechnologyInput(["React", "TypeScript", "Spring Boot"])).toBe(
      "React, TypeScript, Spring Boot",
    );
  });

  it("parses comma and newline separated technologies", () => {
    expect(parseTechnologyInput("React, TypeScript\nSpring Boot")).toEqual([
      "React",
      "TypeScript",
      "Spring Boot",
    ]);
  });

  it("ignores empty technology entries while preserving valid values", () => {
    expect(parseTechnologyInput("React, , \n TypeScript, ")).toEqual(["React", "TypeScript"]);
  });
});
