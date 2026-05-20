import { getApiServerFeedback } from "@/shared/utils/api-error-feedback";
import type { UpdateProfileRequest } from "../types/settings.types";

export function getProfileServerFeedback(error: unknown) {
  return getApiServerFeedback<UpdateProfileRequest>(error, ["firstName", "lastName"]);
}
