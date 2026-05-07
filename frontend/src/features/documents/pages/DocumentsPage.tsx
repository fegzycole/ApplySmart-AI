import { Tabs, TabsContent } from "@/shared/components/ui/tabs";
import { DeleteDialog } from "@/features/resume/components/resumes/DeleteDialog";
import { useDocumentsManager } from "../hooks/useDocumentsManager";
import {
  DOCUMENTS_PAGE_STYLES,
  DOCUMENT_TAB_STYLES,
} from "../constants/documents.constants";
import {
  CoverLetterDeleteDialog,
  DocumentsEmptyState,
  DocumentsOverviewCards,
  DocumentsPageHeader,
  DocumentsPageSkeleton,
  DocumentsTabPanel,
  DocumentsTabs,
} from "../components";

export function DocumentsPage() {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    overview,
    tabs,
    documentsByTab,
    paginationByTab,
    isLoading,
    resumeToDelete,
    setResumeToDelete,
    deleteResume,
    coverLetterToDelete,
    setCoverLetterToDelete,
    deleteCoverLetter,
  } = useDocumentsManager();

  if (isLoading) {
    return <DocumentsPageSkeleton />;
  }

  return (
    <div className={DOCUMENTS_PAGE_STYLES.container}>
      <div className={DOCUMENTS_PAGE_STYLES.wrapper}>
        <DocumentsPageHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {overview.totalDocuments === 0 ? (
          <DocumentsEmptyState hasSearchQuery={Boolean(searchQuery.trim())} />
        ) : (
          <>
            <DocumentsOverviewCards overview={overview} />

            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as keyof typeof documentsByTab)}
              className={DOCUMENT_TAB_STYLES.layout}
            >
              <DocumentsTabs tabs={tabs} />

              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="min-w-0 space-y-6 mt-0">
                  {tab.count > 0 ? (
                    <DocumentsTabPanel
                      title={tab.label}
                      description={tab.description}
                      count={tab.count}
                      hasNextPage={paginationByTab[tab.id].hasNextPage}
                      isFetchingNextPage={paginationByTab[tab.id].isFetchingNextPage}
                      onLoadMore={paginationByTab[tab.id].loadMore}
                      resumes={tab.id === "coverLetters" ? undefined : documentsByTab[tab.id]}
                      coverLetters={tab.id === "coverLetters" ? documentsByTab.coverLetters : undefined}
                      onDeleteResume={setResumeToDelete}
                      onDeleteCoverLetter={setCoverLetterToDelete}
                    />
                  ) : (
                    <DocumentsEmptyState hasSearchQuery={Boolean(searchQuery.trim())} />
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </>
        )}

        <DeleteDialog
          open={Boolean(resumeToDelete)}
          resume={resumeToDelete}
          onOpenChange={(open) => {
            if (!open) {
              setResumeToDelete(null);
            }
          }}
          onConfirm={deleteResume}
        />

        <CoverLetterDeleteDialog
          open={Boolean(coverLetterToDelete)}
          coverLetter={coverLetterToDelete}
          onOpenChange={(open) => {
            if (!open) {
              setCoverLetterToDelete(null);
            }
          }}
          onConfirm={deleteCoverLetter}
        />
      </div>
    </div>
  );
}
