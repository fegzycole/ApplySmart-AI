import { motion } from "framer-motion";
import { FileCheck, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface FileCardProps {
  file: File;
  onRemove: () => void;
}

export function FileCard({ file, onRemove }: FileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative min-w-0 rounded-[1.5rem] border border-violet-200 bg-gradient-to-r from-violet-50 to-cyan-50 p-4 shadow-sm dark:border-violet-900 dark:from-violet-950/40 dark:to-cyan-950/20 sm:p-5"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="absolute right-3 top-3 size-8 rounded-full"
      >
        <X className="size-4" />
      </Button>
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-white/80 text-violet-600 shadow-sm dark:bg-zinc-900/80 dark:text-violet-300">
          <FileCheck className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
            Uploaded Resume
          </p>
          <p className="mt-2 font-medium text-zinc-900 dark:text-white break-words">
            {file.name}
          </p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>
    </motion.div>
  );
}
