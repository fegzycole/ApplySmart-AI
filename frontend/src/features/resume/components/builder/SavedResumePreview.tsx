import { Download, ExternalLink, FileCheck2 } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/shared/components/ui/button";

interface SavedResumePreviewProps {
  downloading: boolean;
  fileUrl: string;
  name?: string;
  onDownload: () => void;
}

export function SavedResumePreview({
  downloading,
  fileUrl,
  name,
  onDownload,
}: SavedResumePreviewProps) {
  return (
    <motion.div
      key="saved-preview"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="canvas-card relative z-10 overflow-hidden rounded-[2rem] border-2 border-primary/20 bg-card/50 shadow-2xl backdrop-blur-3xl sm:rounded-[3rem]"
    >
      <div className="flex flex-col gap-4 border-b border-primary/10 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-8">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 sm:px-4 py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            <FileCheck2 className="size-3 sm:size-3.5" />
            Synthesis Verified
          </div>
          <h3 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold tracking-tight text-foreground truncate">
            {name || "Synthesized Output"}
          </h3>
          <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground line-clamp-2">
            Your professional narrative has been successfully committed to the workspace.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 sm:gap-4 sm:w-auto">
          <Button
            type="button"
            onClick={() => void onDownload()}
            disabled={downloading}
            className="h-12 sm:h-14 flex-1 sm:flex-none px-6 sm:px-8 rounded-[1.25rem] sm:rounded-2xl bg-primary text-white font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 text-xs sm:text-base"
          >
            <Download className="mr-2 sm:mr-3 size-4 sm:size-5" />
            {downloading ? "Wait" : "Deploy"}
          </Button>

          <Button
            asChild
            type="button"
            variant="outline"
            className="h-12 sm:h-14 flex-1 sm:flex-none px-6 sm:px-8 rounded-[1.25rem] sm:rounded-2xl border-2 font-bold transition-all hover:bg-background/50 active:scale-95 text-xs sm:text-base"
          >
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 sm:mr-3 size-4 sm:size-5" />
              Inspect
            </a>
          </Button>
        </div>
      </div>

      <div className="p-3 sm:p-8">
        <div className="overflow-hidden rounded-2xl sm:rounded-[2rem] border-2 border-border bg-background shadow-inner">
          <div className="aspect-[8.5/11] bg-zinc-50 dark:bg-zinc-950/50">
            <iframe
              src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              className="h-full w-full"
              title="Saved resume preview"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
