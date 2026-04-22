import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface PdfPreviewProps {
  fileUrl: string;
}

export function PdfPreview({ fileUrl }: PdfPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="lg:col-span-3 space-y-4"
    >
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
        Your Optimized Resume
      </h2>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
\        <div className="aspect-[8.5/11] bg-zinc-50 dark:bg-zinc-950 relative">
          <iframe
            src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-full"
            title="Resume Preview"
          />
        </div>

\        <div className="p-4 space-y-2 border-t border-zinc-200 dark:border-zinc-800">
          <Button
            asChild
            size="lg"
            className="w-full h-11 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-medium rounded-xl shadow-lg shadow-violet-500/50"
          >
            <a href={fileUrl} download>
              <Download className="size-4 mr-2" />
              Download Resume
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full h-11 rounded-xl border-2"
          >
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="size-4 mr-2" />
              Open in New Tab
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
