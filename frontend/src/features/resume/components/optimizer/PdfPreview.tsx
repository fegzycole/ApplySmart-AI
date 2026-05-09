import { Download, ExternalLink, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { downloadResumeFile } from "../../services/resume.service";
import { getResumeDownloadFilename, triggerBrowserDownload } from "../../utils/resume-download";

interface PdfPreviewProps {
  fileUrl: string;
  hideHeader?: boolean;
}

export function PdfPreview({ fileUrl, hideHeader = false }: PdfPreviewProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const blob = await downloadResumeFile(fileUrl);
      triggerBrowserDownload(blob, getResumeDownloadFilename(fileUrl));
      toast.success("Artifact exported successfully.");
    } catch (error) {
      toast.error("Failed to export professional artifact.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-10">
      {!hideHeader && (
        <div className="flex items-center gap-6">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-xl dark:bg-sky-600">
            <FileText className="size-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase leading-none">
              Optimized <span className="text-sky-600 dark:text-sky-400">Artifact</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mt-2">Final Neural Synthesis Render</p>
          </div>
        </div>
      )}

      <div className="relative group">
        <div className="absolute -inset-1 rounded-[3rem] bg-gradient-to-b from-sky-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100 blur-[80px]" />
        
        <div className="relative rounded-[2.5rem] border-2 border-zinc-100 bg-white overflow-hidden shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
          <div className="aspect-[8.5/11] bg-zinc-50 dark:bg-zinc-950/50 relative">
            <iframe
              src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full"
              title="Resume Preview"
            />
            
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-zinc-900 via-white/90 to-transparent pointer-events-none" />
          </div>

          {!hideHeader && (
            <div className="p-8 grid grid-cols-2 gap-6 border-t border-zinc-100 bg-white/40 dark:bg-zinc-800/40 backdrop-blur-xl dark:border-zinc-800">
              <Button
                size="lg"
                className="h-16 bg-zinc-900 dark:bg-sky-600 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-2xl shadow-zinc-900/20 dark:shadow-sky-900/20 transition-all hover:scale-105 active:scale-95"
                onClick={handleDownload}
                disabled={downloading}
              >
                <Download className="size-5 mr-3" />
                {downloading ? "Exporting..." : "Deploy PDF"}
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-16 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 font-black uppercase tracking-widest text-[11px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all active:scale-95"
              >
                <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-5 mr-3" />
                  Inspect Render
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
