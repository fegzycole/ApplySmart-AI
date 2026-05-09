import { motion } from "framer-motion";
import { Tabs, TabsContent } from "@/shared/components/ui/tabs";
import { DeleteDialog } from "@/features/resume/components/resumes/DeleteDialog";
import { cn } from "@/shared/lib/utils";
import { useDocumentsManager } from "../hooks/useDocumentsManager";
import {
  DOCUMENTS_PAGE_STYLES,
  VAULT_STYLES,
} from "../constants/documents.constants";
import {
  CoverLetterDeleteDialog,
  DocumentPreviewDialog,
  DocumentsEmptyState,
  DocumentsOverviewCards,
  DocumentsPageHeader,
  DocumentsPageSkeleton,
  DocumentsTabPanel,
  DocumentsTabs,
} from "../components";
import { MISSION_CONTROL_ANIMATIONS } from "@/shared/constants/animations";

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
    previewTarget,
    openResumePreview,
    openCoverLetterPreview,
    closePreview,
  } = useDocumentsManager();

  if (isLoading) {
    return <DocumentsPageSkeleton />;
  }

  return (
    <motion.div 
      variants={MISSION_CONTROL_ANIMATIONS.stagger.container}
      initial="hidden"
      animate="visible"
      className={DOCUMENTS_PAGE_STYLES.container}
    >
      <div className={cn(DOCUMENTS_PAGE_STYLES.wrapper, "space-y-10 sm:space-y-16 pt-8 sm:pt-12")}>
        <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
          <DocumentsPageHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </motion.div>

        {overview.totalDocuments === 0 ? (
          <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
            <DocumentsEmptyState hasSearchQuery={Boolean(searchQuery.trim())} />
          </motion.div>
        ) : (
          <>
            <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item} className="px-4">
              <DocumentsOverviewCards overview={overview} />
            </motion.div>

            <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item} className="px-4">
              <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as keyof typeof documentsByTab)}
                className={cn(VAULT_STYLES.tabs.layout, "gap-6 sm:gap-10")}
              >
                <div className="xl:sticky xl:top-8">
                  <DocumentsTabs tabs={tabs} />
                </div>

                <div className="min-w-0">
                  {tabs.map((tab) => (
                    <TabsContent key={tab.id} value={tab.id} className="mt-4 min-w-0 space-y-10 outline-none sm:mt-0">
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
                          onPreviewResume={openResumePreview}
                          onPreviewCoverLetter={openCoverLetterPreview}
                        />
                      ) : (
                        <DocumentsEmptyState hasSearchQuery={Boolean(searchQuery.trim())} />
                      )}
                    </TabsContent>
                  ))}
                </div>
              </Tabs>
            </motion.div>
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

        <DocumentPreviewDialog
          previewTarget={previewTarget}
          onOpenChange={(open) => {
            if (!open) {
              closePreview();
            }
          }}
        />
      </div>
    </motion.div>
  );
}
