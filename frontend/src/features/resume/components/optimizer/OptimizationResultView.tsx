import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { ResultHeader } from "./ResultHeader";
import { ScoreComparison } from "./ScoreComparison";
import { ChangesList } from "./ChangesList";
import { PdfPreview } from "./PdfPreview";

interface OptimizationResultProps {
  result: {
    originalScore: number;
    optimizedScore: number;
    changes: string[];
    fileUrl: string;
  };
  onStartOver: () => void;
}

export function OptimizationResultView({ result, onStartOver }: OptimizationResultProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ResultHeader />

      <ScoreComparison
        originalScore={result.originalScore}
        optimizedScore={result.optimizedScore}
      />

      <div className="grid lg:grid-cols-5 gap-6">
        <ChangesList changes={result.changes} />
        <PdfPreview fileUrl={result.fileUrl} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center pt-8"
      >
        <Button
          onClick={onStartOver}
          variant="outline"
          size="lg"
          className="h-11 px-6 rounded-xl"
        >
          <ArrowLeft className="size-4 mr-2" />
          Optimize Another Resume
        </Button>
      </motion.div>
    </div>
  );
}
