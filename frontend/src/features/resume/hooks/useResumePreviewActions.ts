import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { invalidateQueries } from "@/shared/lib/query-cache";
import {
  buildResumeFromData,
  downloadResumeFile,
  type Resume,
} from "../services/resume.service";
import type { ResumeData } from "../types/resume-builder.types";
import { buildResumePayload } from "../utils/resume-builder-payload";
import { getResumeDownloadFilename, triggerBrowserDownload } from "../utils/resume-download";
import { RESUME_KEYS } from "./useResumeQueries";

interface UseResumePreviewActionsOptions {
  resumeData: ResumeData;
  resetResumeData: () => void;
}

export function useResumePreviewActions({
  resumeData,
  resetResumeData,
}: UseResumePreviewActionsOptions) {
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [savedResume, setSavedResume] = useState<Resume | null>(null);
  const [downloadingSavedResume, setDownloadingSavedResume] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const name = resumeData.personalInfo.name.replace(/\s+/g, "_") + "_Resume";
      const createdResume = await buildResumeFromData(buildResumePayload(resumeData, name));
      await invalidateQueries(queryClient, RESUME_KEYS.lists());
      setSavedResume(createdResume);
      resetResumeData();
      toast.success("Resume saved.");
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save resume. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSavedResumeDownload = async () => {
    if (!savedResume?.fileUrl) {
      toast.error("No saved resume file is available to download.");
      return;
    }

    setDownloadingSavedResume(true);

    try {
      const blob = await downloadResumeFile(savedResume.fileUrl);
      triggerBrowserDownload(blob, getResumeDownloadFilename(savedResume.fileUrl));
    } catch (error) {
      console.error("Saved resume download failed:", error);
      toast.error("Failed to download resume. Please try again.");
    } finally {
      setDownloadingSavedResume(false);
    }
  };

  return {
    downloadingSavedResume,
    handleSave,
    handleSavedResumeDownload,
    savedResume,
    saving,
  };
}
