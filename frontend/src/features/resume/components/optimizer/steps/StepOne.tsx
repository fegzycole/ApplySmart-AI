import { useState } from "react";
import { motion } from "framer-motion";
import { StepHeader } from "../StepHeader";
import { FileUploadZone } from "../FileUploadZone";
import { FileCard } from "../FileCard";

interface StepOneProps {
  file: File | null;
  savedFileName: string | null;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
}

export function StepOne({ file, savedFileName, onFileSelect, onFileRemove }: StepOneProps) {
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
        title="Upload Your Resume"
        description="Start by uploading your current resume in PDF or DOCX format"
      />

      {!file && savedFileName && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
          Draft restored. Re-upload <span className="font-medium">{savedFileName}</span> to continue with your saved job description and template.
        </div>
      )}

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
    </motion.div>
  );
}
