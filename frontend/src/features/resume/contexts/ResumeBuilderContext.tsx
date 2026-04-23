import { createContext, useContext, type ReactNode } from "react";
import { useResumeBuilderState } from "../hooks/useResumeBuilderState";
import type { ResumeBuilderContextValue } from "../types/resume-builder.types";

export type {
  Certification,
  Education,
  PersonalInfo,
  Project,
  ResumeData,
  ResumeTemplate,
  WorkExperience,
} from "../types/resume-builder.types";

const ResumeBuilderContext = createContext<ResumeBuilderContextValue | undefined>(undefined);

export function ResumeBuilderProvider({ children }: { children: ReactNode }) {
  const value = useResumeBuilderState();

  return (
    <ResumeBuilderContext.Provider value={value}>
      {children}
    </ResumeBuilderContext.Provider>
  );
}

export function useResumeBuilder() {
  const context = useContext(ResumeBuilderContext);

  if (!context) {
    throw new Error("useResumeBuilder must be used within ResumeBuilderProvider");
  }

  return context;
}
