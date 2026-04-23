import { AnimatePresence, motion } from "framer-motion";
import { OptimizationResultView } from "./OptimizationResultView";
import { OptimizationUploadView } from "./OptimizationUploadView";
import type { ResumeOptimization } from "../../services/resume.service";
import type { ResumeTemplate } from "../../types/resume-builder.types";
import type { ReactNode } from "react";

interface OptimizerWorkspaceProps {
  onOptimize: (file: File, jobDescription: string, template: ResumeTemplate) => void;
  onStartOver: () => void;
  optimizing: boolean;
  result: ResumeOptimization | null;
  view: "upload" | "result";
}

export function OptimizerWorkspace({
  onOptimize,
  onStartOver,
  optimizing,
  result,
  view,
}: OptimizerWorkspaceProps) {
  return (
    <AnimatePresence mode="wait">
      {view === "upload" ? (
        <OptimizerViewFrame key="upload">
          <OptimizationUploadView onOptimize={onOptimize} optimizing={optimizing} />
        </OptimizerViewFrame>
      ) : result ? (
        <OptimizerViewFrame key="result">
          <OptimizationResultView result={result} onStartOver={onStartOver} />
        </OptimizerViewFrame>
      ) : null}
    </AnimatePresence>
  );
}

function OptimizerViewFrame({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
