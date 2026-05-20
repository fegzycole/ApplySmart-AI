import { describe, expect, it } from "vitest";

import { ApiError } from "@/shared/services/api-client";
import {
  getApiErrorMessage,
  getApiFieldError,
  getApiServerFeedback,
} from "./api-error-feedback";

interface ProfileForm {
  email: string;
  name: string;
}

describe("api error feedback utilities", () => {
  it("returns a fallback form error for non-API errors", () => {
    const feedback = getApiServerFeedback<ProfileForm>(
      new Error("Network unavailable"),
      ["email", "name"],
      "Could not save profile.",
    );

    expect(feedback).toEqual({
      fieldErrors: {},
      formErrors: ["Could not save profile."],
    });
  });

  it("maps known field errors and suppresses generic validation messages", () => {
    const error = new ApiError("Invalid request data", 400, {
      message: "Invalid request data",
      details: {
        email: "Email is invalid",
        name: 123,
        password: "Password is too short",
      },
    });

    const feedback = getApiServerFeedback<ProfileForm>(error, ["email", "name"]);

    expect(feedback).toEqual({
      fieldErrors: {
        email: "Email is invalid",
      },
      formErrors: [],
    });
  });

  it("deduplicates server form errors while preserving field errors", () => {
    const error = new ApiError("Please try again", 409, {
      message: "Please try again",
      details: {
        name: "Name is already taken",
      },
    });

    const feedback = getApiServerFeedback<ProfileForm>(error, ["email", "name"]);

    expect(feedback).toEqual({
      fieldErrors: {
        name: "Name is already taken",
      },
      formErrors: ["Please try again"],
    });
  });

  it("reads an individual API field error", () => {
    const error = new ApiError("Invalid request data", 400, {
      details: {
        email: "Email is required",
      },
    });

    expect(getApiFieldError(error, "email")).toBe("Email is required");
    expect(getApiFieldError(error, "name")).toBeNull();
    expect(getApiFieldError(new Error("No response"), "email")).toBeNull();
  });

  it("prefers meaningful API messages for display", () => {
    expect(
      getApiErrorMessage(
        new ApiError("HTTP Error 500", 500, { message: "Service unavailable" }),
        "Fallback message",
      ),
    ).toBe("Service unavailable");

    expect(
      getApiErrorMessage(
        new ApiError("Invalid request data", 400, { message: "Invalid request data" }),
        "Fallback message",
      ),
    ).toBe("Invalid request data");

    expect(getApiErrorMessage(new Error("Browser failed"), "Fallback message")).toBe(
      "Browser failed",
    );
    expect(getApiErrorMessage("unknown", "Fallback message")).toBe("Fallback message");
  });
});
