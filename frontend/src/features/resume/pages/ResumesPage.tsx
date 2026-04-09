import {
  PageHeader,
  ResumeStats,
  EmptyState,
  ResumeTable,
  ResumeCardList,
  Pagination,
  DeleteDialog,
} from "../components";
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
    toggleFavorite,
    deleteResume,
    isLoading
  } = useResumeManager();

  const deleteDialog = useDeleteDialog();

  if (isLoading) {
    return (
      <div className="p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-zinc-500">Loading resumes...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <ResumeStats
          total={stats.total}
          complete={stats.complete}
          favorites={stats.favorites}
        />

        {filteredResumes.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <ResumeTable
              resumes={currentResumes}
              onToggleFavorite={toggleFavorite}
              onDelete={deleteDialog.openDialog}
            />

            <ResumeCardList
              resumes={currentResumes}
              onToggleFavorite={toggleFavorite}
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
