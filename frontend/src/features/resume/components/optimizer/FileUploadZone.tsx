import { useRef } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  dragActive: boolean;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export function FileUploadZone({
  onFileSelect,
  dragActive,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
}: FileUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
      className={cn(
        "relative min-w-0 cursor-pointer rounded-[1.75rem] border-2 border-dashed px-4 py-10 text-center transition-all sm:px-8 sm:py-14 lg:p-16",
        dragActive
          ? "border-violet-500 bg-violet-50 dark:bg-violet-950/30"
          : "border-zinc-200 bg-gradient-to-br from-white to-zinc-50/80 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 hover:border-violet-300 dark:hover:border-violet-700"
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.docx"
        onChange={handleFileChange}
      />
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300 sm:size-16">
        <Upload className="size-7 sm:size-8" />
      </div>
      <p className="text-sm sm:text-lg font-medium text-zinc-900 dark:text-white mb-1">
        Drop your resume here
      </p>
      <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 break-words">
        or click to browse • PDF or DOCX • Max 10MB
      </p>
    </div>
  );
}
