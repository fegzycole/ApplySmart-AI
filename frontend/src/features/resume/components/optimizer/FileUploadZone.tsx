import { useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Microscope, Zap } from "lucide-react";
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
        "group relative overflow-hidden cursor-pointer rounded-[2rem] border-2 border-dashed transition-all duration-700 sm:rounded-[3rem] lg:rounded-[4rem]",
        dragActive
          ? "border-sky-500 bg-sky-50/20 shadow-2xl shadow-sky-500/10 scale-[1.01]"
          : "border-zinc-200 bg-white/40 backdrop-blur-3xl hover:border-sky-400 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/40"
      )}
    >
      {/* Dynamic Aura Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-200/20 via-transparent to-indigo-200/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      {/* Premium Artifact Aura on Drag */}
      {dragActive && (
        <motion.div 
          className="absolute inset-0 pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-sky-500 to-transparent"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.docx"
        onChange={handleFileChange}
      />

      <div className="relative z-10 px-6 py-10 flex flex-col items-center text-center sm:px-8 sm:py-16 lg:py-24">
        <div className="relative mb-6 sm:mb-8 lg:mb-10">
          <div className={cn(
            "flex h-16 w-16 items-center justify-center rounded-[2rem] transition-all duration-700 group-hover:scale-110 sm:h-24 sm:w-24 sm:rounded-[2.5rem]",
            "bg-zinc-900 text-white shadow-2xl dark:bg-sky-600 shadow-zinc-900/20 dark:shadow-sky-900/20"
          )}>
            <Microscope className="size-7 sm:size-10" />
            <motion.div
              className="absolute inset-0 rounded-[2rem] bg-white/20 sm:rounded-[2.5rem]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-white border-2 border-zinc-100 text-emerald-500 shadow-xl dark:bg-zinc-900 dark:border-zinc-800 sm:-bottom-3 sm:-right-3 sm:h-10 sm:w-10 sm:rounded-2xl">
            <ShieldCheck className="size-4 sm:size-5" />
          </div>
        </div>

        <div className="space-y-2 sm:space-y-4">
          <h3 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase leading-none sm:text-3xl">
            Inject <span className="text-sky-600 dark:text-sky-400">Specimen</span> Artifact
          </h3>
          <p className="max-w-sm mx-auto text-sm font-medium leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-lg">
            Drag and drop your professional record or click to browse the system library.
          </p>
        </div>

        <div className="mt-6 flex items-center gap-4 sm:mt-10 sm:gap-6 lg:mt-12">
          <div className="h-px w-8 bg-zinc-100 dark:bg-zinc-800 sm:w-12" />
          <div className="flex items-center gap-2">
            <Zap className="size-3 text-amber-500 sm:size-3.5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 sm:text-[11px] sm:tracking-[0.4em]">
              Encryption Protocol 44
            </span>
          </div>
          <div className="h-px w-8 bg-zinc-100 dark:bg-zinc-800 sm:w-12" />
        </div>
      </div>
    </div>
  );
}
