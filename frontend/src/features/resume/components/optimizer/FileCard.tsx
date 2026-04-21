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
      className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="absolute top-4 right-4 size-8"
      >
        <X className="size-4" />
      </Button>
      <div className="flex items-center gap-4">
        <div className="size-12 rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-950 dark:to-fuchsia-950 flex items-center justify-center">
          <FileCheck className="size-6 text-violet-600 dark:text-violet-400" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-zinc-900 dark:text-white">
            {file.name}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>
    </motion.div>
  );
}
