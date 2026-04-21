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
        "relative border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all",
        dragActive
          ? "border-violet-500 bg-violet-50 dark:bg-violet-950/30"
          : "border-zinc-200 dark:border-zinc-800 hover:border-violet-300 dark:hover:border-violet-700"
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.docx"
        onChange={handleFileChange}
      />
      <Upload className="size-16 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
      <p className="text-lg font-medium text-zinc-900 dark:text-white mb-1">
        Drop your resume here
      </p>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        or click to browse • PDF or DOCX • Max 10MB
      </p>
    </div>
  );
}
