import { useState } from "react";
import {
  OptimizerHeader,
  JobDescriptionCard,
  ResumeUploadCard,
  HowItWorksCard,
  AIAnalysisCard,
  ScoreHeader,
  StrengthsCard,
  ImprovementsCard,
  KeywordAnalysisCard,
  ActionButtons
} from "../components/optimizer";

export function ResumeOptimizerPage() {
  const [optimized, setOptimized] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleOptimize = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setOptimized(true);
    }, 2000);
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <OptimizerHeader />

        {!optimized ? (
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <JobDescriptionCard />
              <ResumeUploadCard
                uploadedFile={uploadedFile}
                analyzing={analyzing}
                onFileSelect={() => setUploadedFile("resume.pdf")}
                onFileRemove={() => setUploadedFile(null)}
                onOptimize={handleOptimize}
              />
            </div>

            <div className="lg:col-span-2 space-y-6">
              <HowItWorksCard />
              <AIAnalysisCard />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <ScoreHeader />

            <div className="grid lg:grid-cols-2 gap-6">
              <StrengthsCard />
              <ImprovementsCard />
            </div>

            <KeywordAnalysisCard />

            <ActionButtons onOptimizeAnother={() => setOptimized(false)} />
          </div>
        )}
      </div>
    </div>
  );
}