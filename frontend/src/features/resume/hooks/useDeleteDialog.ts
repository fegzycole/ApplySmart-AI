import { useState } from "react";
import type { Resume } from "../services/resume.service";

export function useDeleteDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState<Resume | null>(null);

  const openDialog = (resume: Resume) => {
    setResumeToDelete(resume);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setResumeToDelete(null);
  };

  const confirmDelete = (onDelete: (id: number) => void) => {
    if (resumeToDelete) {
      onDelete(resumeToDelete.id);
      closeDialog();
    }
  };

  return {
    isOpen,
    resumeToDelete,
    openDialog,
    closeDialog,
    confirmDelete,
    setIsOpen
  };
}
