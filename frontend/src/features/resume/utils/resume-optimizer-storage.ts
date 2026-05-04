import type { ResumeOptimization } from "../services/resume.service";
import type { ResumeTemplate } from "../types/resume-builder.types";
import type {
  ResumeOptimizerDraft,
  StoredResumeOptimizerState,
} from "../types/resume-optimizer.types";

const RESUME_OPTIMIZER_STORAGE_KEY = "applysmart.resume-optimizer-draft";
const DEFAULT_TEMPLATE: ResumeTemplate = "MODERN";

function getDefaultDraft(): ResumeOptimizerDraft {
  return {
    jobDescription: "",
    template: DEFAULT_TEMPLATE,
    fileName: null,
  };
}

function isResumeTemplate(value: unknown): value is ResumeTemplate {
  return value === "MODERN" || value === "PROFESSIONAL" || value === "CLASSIC" || value === "CREATIVE";
}

function sanitizeDraft(value: unknown): ResumeOptimizerDraft {
  if (!value || typeof value !== "object") {
    return getDefaultDraft();
  }

  const draft = value as Partial<ResumeOptimizerDraft>;

  return {
    jobDescription: typeof draft.jobDescription === "string" ? draft.jobDescription : "",
    template: isResumeTemplate(draft.template) ? draft.template : DEFAULT_TEMPLATE,
    fileName: typeof draft.fileName === "string" ? draft.fileName : null,
  };
}

function sanitizeResult(value: unknown): ResumeOptimization | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const result = value as Partial<ResumeOptimization>;
  if (
    typeof result.originalScore !== "number" ||
    typeof result.optimizedScore !== "number" ||
    !Array.isArray(result.changes) ||
    typeof result.content !== "string" ||
    typeof result.fileUrl !== "string"
  ) {
    return null;
  }

  return {
    originalScore: result.originalScore,
    optimizedScore: result.optimizedScore,
    changes: result.changes.filter((change): change is string => typeof change === "string"),
    content: result.content,
    fileUrl: result.fileUrl,
  };
}

export function loadResumeOptimizerState(): StoredResumeOptimizerState {
  if (typeof window === "undefined") {
    return { draft: getDefaultDraft(), result: null };
  }

  try {
    const rawState = window.localStorage.getItem(RESUME_OPTIMIZER_STORAGE_KEY);
    if (!rawState) {
      return { draft: getDefaultDraft(), result: null };
    }

    const parsedState = JSON.parse(rawState) as Partial<StoredResumeOptimizerState>;
    return {
      draft: sanitizeDraft(parsedState.draft),
      result: sanitizeResult(parsedState.result),
    };
  } catch {
    return { draft: getDefaultDraft(), result: null };
  }
}

function saveResumeOptimizerState(state: StoredResumeOptimizerState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(RESUME_OPTIMIZER_STORAGE_KEY, JSON.stringify(state));
}

export function saveResumeOptimizerDraft(draft: ResumeOptimizerDraft) {
  const currentState = loadResumeOptimizerState();
  saveResumeOptimizerState({
    draft,
    result: currentState.result,
  });
}

export function saveResumeOptimizerResult(result: ResumeOptimization | null) {
  const currentState = loadResumeOptimizerState();
  saveResumeOptimizerState({
    draft: currentState.draft,
    result,
  });
}

export function clearResumeOptimizerState() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(RESUME_OPTIMIZER_STORAGE_KEY);
}
