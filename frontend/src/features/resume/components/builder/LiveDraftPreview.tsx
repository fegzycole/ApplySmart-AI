import type { RefObject } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import type { ResumeData } from "../../types/resume-builder.types";
import { ClassicPreview } from "./previews/ClassicPreview";
import { CreativePreview } from "./previews/CreativePreview";
import { ModernPreview } from "./previews/ModernPreview";
import { ProfessionalPreview } from "./previews/ProfessionalPreview";

interface LiveDraftPreviewProps {
  containerRef: RefObject<HTMLDivElement>;
  contentRef: RefObject<HTMLDivElement>;
  data: ResumeData;
  previewWidth: number;
  scale: number;
  scaledHeight: number;
}

function renderPreviewComponent(data: ResumeData) {
  switch (data.template) {
    case "PROFESSIONAL":
      return <ProfessionalPreview data={data} />;
    case "CLASSIC":
      return <ClassicPreview data={data} />;
    case "CREATIVE":
      return <CreativePreview data={data} />;
    default:
      return <ModernPreview data={data} />;
  }
}

export function LiveDraftPreview({
  containerRef,
  contentRef,
  data,
  previewWidth,
  scale,
  scaledHeight,
}: LiveDraftPreviewProps) {
  return (
    <motion.div
      key="live-preview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="canvas-card relative z-10 min-w-0 overflow-hidden rounded-[2rem] border-2 border-border/50 bg-card/30 p-1.5 shadow-2xl backdrop-blur-3xl sm:rounded-[3rem] sm:p-4 lg:p-6"
      style={{ height: "clamp(22rem, 72vh, calc(100vh - 180px))" }}
    >
      <div className="absolute right-3 top-3 z-20 hidden items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary animate-pulse sm:flex">
        <Sparkles className="size-3" />
        Live Synthesis
      </div>

      <div
        ref={containerRef}
        className="h-full w-full overflow-x-hidden overflow-y-auto rounded-[1.5rem] bg-zinc-50/50 p-2 shadow-inner dark:bg-zinc-950/50 sm:rounded-[2.5rem] sm:p-5 lg:p-6"
      >
        <div
          style={{
            width: `${previewWidth * scale}px`,
            height: scaledHeight > 0 ? `${scaledHeight}px` : "auto",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div
            ref={contentRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${previewWidth}px`,
              transformOrigin: "top left",
              transform: `scale(${scale})`,
            }}
          >
            <div className="shadow-2xl shadow-black/10 overflow-hidden rounded-sm">
              {renderPreviewComponent(data)}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
