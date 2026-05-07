import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent } from "@/shared/components/ui/tabs";
import { StepHeader } from "../StepHeader";
import { ExistingResumePicker } from "../ExistingResumePicker";
import { FileUploadZone } from "../FileUploadZone";
import { FileCard } from "../FileCard";
import { ResumeSourceTabs } from "../ResumeSourceTabs";
import { SelectedResumeCard } from "../SelectedResumeCard";
import type { Resume } from "../../../services/resume.service";
import type { ResumeOptimizerSourceMode } from "../../../types/resume-optimizer.types";

interface StepOneProps {
  file: File | null;
  existingResumes: Resume[];
  existingResumesLoading: boolean;
  selectedResume: Resume | null;
  sourceMode: ResumeOptimizerSourceMode;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  onResumeSelect: (resumeId: number) => void;
  onSelectedResumeClear: () => void;
  onSourceModeChange: (mode: ResumeOptimizerSourceMode) => void;
}

export function StepOne({
  file,
  existingResumes,
  existingResumesLoading,
  selectedResume,
  sourceMode,
  onFileSelect,
  onFileRemove,
  onResumeSelect,
  onSelectedResumeClear,
  onSourceModeChange,
}: StepOneProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (
        droppedFile.type === "application/pdf" ||
        droppedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        onFileSelect(droppedFile);
      }
    }
  };

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <StepHeader
        title="Choose Your Resume Source"
        description="Select a saved resume from your workspace or upload a fresh file to optimize"
      />

      <Tabs value={sourceMode} onValueChange={(value) => onSourceModeChange(value as ResumeOptimizerSourceMode)}>
        <ResumeSourceTabs />

        <TabsContent value="upload" className="mt-5 space-y-4">
          {!file ? (
            <FileUploadZone
              onFileSelect={onFileSelect}
              dragActive={dragActive}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          ) : (
            <FileCard file={file} onRemove={onFileRemove} />
          )}
        </TabsContent>

        <TabsContent value="existing" className="mt-5 space-y-4">
          {selectedResume ? (
            <SelectedResumeCard
              resume={selectedResume}
              onClear={onSelectedResumeClear}
            />
          ) : null}

          <ExistingResumePicker
            resumes={existingResumes}
            loading={existingResumesLoading}
            selectedResumeId={selectedResume?.id ?? null}
            onSelect={onResumeSelect}
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
