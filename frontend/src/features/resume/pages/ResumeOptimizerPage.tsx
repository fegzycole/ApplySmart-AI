import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { OptimizerHeader } from "../components/optimizer/OptimizerHeader";
import { OptimizationUploadView } from "../components/optimizer/OptimizationUploadView";
import { OptimizationResultView } from "../components/optimizer/OptimizationResultView";
import { uploadAndOptimizeResume } from "../services/resume.service";

interface OptimizationResult {
  originalScore: number;
  optimizedScore: number;
  changes: string[];
  fileUrl: string;
}

export function ResumeOptimizerPage() {
  const [view, setView] = useState<"upload" | "result">("upload");
  const [optimizing, setOptimizing] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);

  const handleOptimize = async (file: File, jobDescription: string, template: 'MODERN' | 'PROFESSIONAL' | 'CLASSIC' | 'CREATIVE' = 'MODERN') => {
    setOptimizing(true);

    try {
      // Upload and optimize in one step
      const optimizationResult = await uploadAndOptimizeResume(file, jobDescription, template);

      setResult({
        originalScore: optimizationResult.originalScore,
        optimizedScore: optimizationResult.optimizedScore,
        changes: optimizationResult.changes,
        fileUrl: optimizationResult.fileUrl,
      });

      setView("result");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to optimize resume. Please try again."
      );
    } finally {
      setOptimizing(false);
    }
  };

  const handleStartOver = () => {
    setView("upload");
    setResult(null);
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <OptimizerHeader />

        <AnimatePresence mode="wait">
          {view === "upload" ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OptimizationUploadView
                onOptimize={handleOptimize}
                optimizing={optimizing}
              />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OptimizationResultView
                result={result!}
                onStartOver={handleStartOver}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
