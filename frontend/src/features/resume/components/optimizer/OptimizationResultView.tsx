import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import type { CoverLetter } from "@/features/cover-letter/services/cover-letter.service";
import { CoverLetterResultCard } from "./CoverLetterResultCard";
import { ResultHeader } from "./ResultHeader";
import { ScoreComparison } from "./ScoreComparison";
import { ChangesList } from "./ChangesList";
import { PdfPreview } from "./PdfPreview";

interface OptimizationResultProps {
  result: {
    originalScore: number;
    optimizedScore: number;
    changes: string[];
    fileUrl?: string;
    coverLetter?: CoverLetter;
  };
  onStartOver: () => void;
}

export function OptimizationResultView({ result, onStartOver }: OptimizationResultProps) {
  return (
    <div className="min-w-0 max-w-6xl mx-auto space-y-6 sm:space-y-8">
      <ResultHeader includesCoverLetter={Boolean(result.coverLetter)} />

      <ScoreComparison
        originalScore={result.originalScore}
        optimizedScore={result.optimizedScore}
      />

      <div className="grid min-w-0 gap-6 lg:grid-cols-5">
        <ChangesList changes={result.changes} />
        {result.fileUrl ? <PdfPreview fileUrl={result.fileUrl} /> : null}
      </div>

      {result.coverLetter ? (
        <CoverLetterResultCard coverLetter={result.coverLetter} />
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center pt-4 sm:pt-8"
      >
        <Button
          onClick={onStartOver}
          variant="outline"
          size="lg"
          className="h-11 w-full sm:w-auto px-6 rounded-xl"
        >
          <ArrowLeft className="size-4 mr-2" />
          Optimize Another Resume
        </Button>
      </motion.div>
    </div>
  );
}
