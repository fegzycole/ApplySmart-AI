import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Upload, X, ShieldCheck } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { SYNTHESIS_STAGE_STYLES } from "../../constants/cover-letter.constants";

interface ResumeUploadSectionProps {
  uploadedFile: File | null;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDrop: (file: File) => void;
  onRemoveFile: () => void;
}

export function ResumeUploadSection({ uploadedFile, onFileUpload, onFileDrop, onRemoveFile }: ResumeUploadSectionProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileDrop(file);
    }
  };

  return (
    <div className="space-y-4">
      <Label className={SYNTHESIS_STAGE_STYLES.label}>
        Source Artifact Injection (Optional)
      </Label>

      {!uploadedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "group relative overflow-hidden rounded-[1.75rem] border-2 border-dashed bg-zinc-50/50 transition-all duration-500 sm:rounded-[2.5rem]",
            isDragOver
              ? "border-amber-500 bg-white scale-[1.01] dark:bg-zinc-900/50"
              : "border-zinc-200 dark:border-zinc-800 hover:border-amber-500 hover:bg-white dark:hover:bg-zinc-900/50"
          )}
        >
          <input
            type="file"
            id="resume-upload"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={onFileUpload}
          />
          <label htmlFor="resume-upload" className="flex cursor-pointer flex-col items-center justify-center p-7 text-center sm:p-12">
            <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 shadow-sm group-hover:scale-110 transition-transform duration-500 dark:bg-amber-900/20 dark:text-amber-400 sm:mb-6 sm:h-20 sm:w-20 sm:rounded-3xl">
              <Upload className="size-7 sm:size-10" />
              <motion.div 
                className="absolute inset-0 rounded-3xl bg-amber-200/20"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
            <h4 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-lg">
              Inject Source Data
            </h4>
            <p className="mt-1.5 text-sm font-medium text-zinc-500 leading-relaxed dark:text-zinc-400 sm:mt-2">
              Drag and drop your professional artifact or click to browse.
            </p>
            <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-zinc-300 dark:text-zinc-600">
              Supported: PDF, DOC, DOCX • MAX 5MB
            </p>
          </label>
          {/* Ambient Aura */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      ) : (
        <div className="relative group overflow-hidden rounded-[1.75rem] border-2 border-emerald-500/20 bg-emerald-50/10 p-4 dark:bg-emerald-950/5 sm:rounded-[2.5rem] sm:p-6">
          {/* Success Aura */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent blur-3xl opacity-50" />

          <div className="relative z-10 flex items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3 min-w-0 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 sm:h-14 sm:w-14 sm:rounded-2xl">
                <ShieldCheck className="size-6 sm:size-8" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-lg">
                  {uploadedFile.name}
                </p>
                <div className="mt-1 flex items-start gap-2.5">
                  <div className="mt-[0.18rem] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[10px] font-black uppercase tracking-widest leading-[1.1] text-emerald-600 dark:text-emerald-400">
                    Verified Source Artifact
                  </p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemoveFile}
              className="h-12 w-12 rounded-2xl bg-white/50 backdrop-blur-xl border border-emerald-100 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 transition-all dark:bg-zinc-900/50 dark:border-zinc-800"
            >
              <X className="size-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
