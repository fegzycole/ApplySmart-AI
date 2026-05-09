import { DOCUMENT_ARTIFACT_STYLES } from "../constants/documents.constants";
import { cn } from "@/shared/lib/utils";

interface DocumentPdfPreviewProps {
  title: string;
  url: string;
  variant?: "modal" | "thumbnail";
}

export function DocumentPdfPreview({
  title,
  url,
  variant = "thumbnail",
}: DocumentPdfPreviewProps) {
  if (variant === "modal") {
    return (
      <div className="h-full overflow-hidden rounded-[2.5rem] border-4 border-white/40 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
        <iframe
          src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
          title={title}
          className="h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <div className={cn(DOCUMENT_ARTIFACT_STYLES.preview.frame, "relative group/specimen")}>
      {/* Refractive Glow Border */}
      <div className="absolute inset-0 border-2 border-white/60 dark:border-zinc-700/50 rounded-2xl z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/5 to-transparent opacity-0 group-hover/specimen:opacity-100 transition-opacity z-10" />

      <div className="relative h-full w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900/50">
        <iframe
          src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
          title={title}
          className="pointer-events-none absolute left-0 top-0 h-[166.67%] w-[166.67%] origin-top-left scale-[0.6] border-0"
        />
      </div>
      
      {/* Decorative Specimen Labels */}
      <div className="absolute bottom-2 right-2 z-20 px-2 py-0.5 rounded bg-zinc-900/80 text-[8px] font-black text-white uppercase tracking-widest opacity-0 group-hover/specimen:opacity-100 transition-opacity">
        Specimen ID-44
      </div>
    </div>
  );
}
