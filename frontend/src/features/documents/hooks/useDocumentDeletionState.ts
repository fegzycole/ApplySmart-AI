import { useState } from "react";
import type { CoverLetter } from "@/features/cover-letter/services/cover-letter.service";
import { useDeleteCoverLetter } from "@/features/cover-letter/hooks/useCoverLetterQueries";
import type { Resume } from "@/features/resume/services/resume.service";
import { useDeleteResume } from "@/features/resume/hooks/useResumeQueries";

export function useDocumentDeletionState() {
  const [resumeToDelete, setResumeToDelete] = useState<Resume | null>(null);
  const [coverLetterToDelete, setCoverLetterToDelete] = useState<CoverLetter | null>(null);
  const deleteResumeMutation = useDeleteResume();
  const deleteCoverLetterMutation = useDeleteCoverLetter();

  const deleteResume = () => {
    if (!resumeToDelete) {
      return;
    }

    deleteResumeMutation.mutate(resumeToDelete.id, {
      onSuccess: () => setResumeToDelete(null),
    });
  };

  const deleteCoverLetter = () => {
    if (!coverLetterToDelete) {
      return;
    }

    deleteCoverLetterMutation.mutate(coverLetterToDelete.id, {
      onSuccess: () => setCoverLetterToDelete(null),
    });
  };

  return {
    resumeToDelete,
    setResumeToDelete,
    deleteResume,
    coverLetterToDelete,
    setCoverLetterToDelete,
    deleteCoverLetter,
  };
}
