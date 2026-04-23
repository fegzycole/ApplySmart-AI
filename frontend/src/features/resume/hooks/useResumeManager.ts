import { useState, useMemo } from "react";
import { PAGINATION_CONFIG } from "../constants/pagination.constants";
import { useResumes, useDeleteResume } from "./useResumeQueries";

export function useResumeManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: resumes = [], isLoading } = useResumes();
  const deleteMutation = useDeleteResume();

  const deleteResume = (id: number) => {
    deleteMutation.mutate(id);
  };

  const filteredResumes = useMemo(() =>
    resumes.filter(resume =>
      resume.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [resumes, searchQuery]
  );

  const currentResumes = useMemo(() =>
    filteredResumes.slice(
      (currentPage - 1) * PAGINATION_CONFIG.itemsPerPage,
      currentPage * PAGINATION_CONFIG.itemsPerPage
    ),
    [filteredResumes, currentPage]
  );

  const totalPages = Math.ceil(filteredResumes.length / PAGINATION_CONFIG.itemsPerPage);

  const stats = useMemo(() => ({
    total: resumes.length,
    complete: resumes.filter(r => r.status === "published").length
  }), [resumes]);

  return {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    resumes,
    filteredResumes,
    currentResumes,
    totalPages,
    stats,
    deleteResume,
    isLoading
  };
}
