import { useState } from "react";
import type { CoverLetter } from "@/features/cover-letter/services/cover-letter.service";
import type { Resume } from "@/features/resume/services/resume.service";
import type { DocumentsPreviewTarget } from "../types/documents.types";

export function useDocumentPreviewState() {
  const [previewTarget, setPreviewTarget] = useState<DocumentsPreviewTarget | null>(null);

  return {
    previewTarget,
    openResumePreview: (resume: Resume) => {
      setPreviewTarget({ type: "resume", resume });
    },
    openCoverLetterPreview: (coverLetter: CoverLetter) => {
      setPreviewTarget({ type: "coverLetter", coverLetter });
    },
    closePreview: () => {
      setPreviewTarget(null);
    },
  };
}
