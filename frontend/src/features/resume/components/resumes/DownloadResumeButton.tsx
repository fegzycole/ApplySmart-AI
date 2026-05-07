import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { downloadResumeFile } from "../../services/resume.service";
import { triggerBrowserDownload, getResumeDownloadFilename } from "../../utils/resume-download";
import { RESUME_CARD_STYLES } from "../../constants/resume-card.constants";
import type { Resume } from "../../services/resume.service";

export function DownloadResumeButton({ resume }: { resume: Resume }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!resume.fileUrl) return;
    setDownloading(true);
    try {
      const blob = await downloadResumeFile(resume.fileUrl);
      triggerBrowserDownload(blob, getResumeDownloadFilename(resume.fileUrl));
      toast.success("Resume downloaded.");
    } catch {
      toast.error("Failed to download resume. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={RESUME_CARD_STYLES.exportButtonClassName}
      onClick={handleDownload}
      disabled={!resume.fileUrl || downloading}
    >
      {downloading
        ? <><Loader2 className="mr-1.5 size-3 animate-spin" />Downloading...</>
        : <><Download className="mr-1.5 size-3" />Download</>}
    </Button>
  );
}
