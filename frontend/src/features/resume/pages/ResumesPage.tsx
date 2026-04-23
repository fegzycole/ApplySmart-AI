import {
  PageHeader,
  ResumeStats,
  EmptyState,
  ResumeTable,
  ResumeCardList,
  Pagination,
  DeleteDialog,
} from "../components";
import { ResumesPageSkeleton } from "../components/skeletons";
import { useResumeManager, useDeleteDialog } from "../hooks";
import { PAGINATION_CONFIG } from "../constants/pagination.constants";

export function ResumesPage() {
  const {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    filteredResumes,
    currentResumes,
    totalPages,
    stats,
    deleteResume,
    isLoading
  } = useResumeManager();

  const deleteDialog = useDeleteDialog();

  if (isLoading) {
    return <ResumesPageSkeleton />;
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <ResumeStats
          total={stats.total}
          complete={stats.complete}
        />

        {filteredResumes.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <ResumeTable
              resumes={currentResumes}
              onDelete={deleteDialog.openDialog}
            />

            <ResumeCardList
              resumes={currentResumes}
              onDelete={deleteDialog.openDialog}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredResumes.length}
              itemsPerPage={PAGINATION_CONFIG.itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}

        <DeleteDialog
          open={deleteDialog.isOpen}
          resume={deleteDialog.resumeToDelete}
          onOpenChange={deleteDialog.setIsOpen}
          onConfirm={() => deleteDialog.confirmDelete(deleteResume)}
        />
      </div>
    </div>
  );
}
