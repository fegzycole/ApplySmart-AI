import { useDeferredValue, useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  COVER_LETTER_KEYS,
  useDeleteCoverLetter,
} from "@/features/cover-letter/hooks/useCoverLetterQueries";
import {
  fetchCoverLettersPage,
  type CoverLetter,
  type CoverLetterPageParams,
} from "@/features/cover-letter/services/cover-letter.service";
import { RESUME_KEYS, useDeleteResume } from "@/features/resume/hooks/useResumeQueries";
import {
  fetchResumesPage,
  type Resume,
  type ResumeDocumentKind,
  type ResumePageParams,
} from "@/features/resume/services/resume.service";
import { DOCUMENT_TAB_META, DOCUMENT_TABS } from "../constants/documents.constants";
import type {
  DocumentsOverview,
  DocumentsPreviewTarget,
  DocumentsTabData,
  DocumentsTabId,
  DocumentsTabPaginationState,
} from "../types/documents.types";

const DOCUMENTS_PAGE_SIZE = 8;

function getNextPageParam(lastPage: { last: boolean; number: number }) {
  return lastPage.last ? undefined : lastPage.number + 1;
}

export function useDocumentsManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<DocumentsTabId>("original");
  const [visitedTabs, setVisitedTabs] = useState<Set<DocumentsTabId>>(() => new Set(["original"]));
  const [resumeToDelete, setResumeToDelete] = useState<Resume | null>(null);
  const [coverLetterToDelete, setCoverLetterToDelete] = useState<CoverLetter | null>(null);
  const [previewTarget, setPreviewTarget] = useState<DocumentsPreviewTarget | null>(null);
  const deferredSearchQuery = useDeferredValue(searchQuery.trim());

  const handleSetActiveTab = (tab: DocumentsTabId) => {
    setVisitedTabs((prev) => {
      if (prev.has(tab)) return prev;
      const next = new Set(prev);
      next.add(tab);
      return next;
    });
    setActiveTab(tab);
  };

  const deleteResumeMutation = useDeleteResume();
  const deleteCoverLetterMutation = useDeleteCoverLetter();
  const originalResumesQuery = useResumeDocumentsInfiniteQuery("original", deferredSearchQuery, visitedTabs.has("original"));
  const optimizedResumesQuery = useResumeDocumentsInfiniteQuery("optimized", deferredSearchQuery, visitedTabs.has("optimized"));
  const builtResumesQuery = useResumeDocumentsInfiniteQuery("built", deferredSearchQuery, visitedTabs.has("built"));
  const coverLettersQuery = useCoverLettersInfiniteQuery(deferredSearchQuery, visitedTabs.has("coverLetters"));

  const documentsByTab = useMemo<DocumentsTabData>(
    () => ({
      original: originalResumesQuery.data?.pages.flatMap((page) => page.content) ?? [],
      optimized: optimizedResumesQuery.data?.pages.flatMap((page) => page.content) ?? [],
      built: builtResumesQuery.data?.pages.flatMap((page) => page.content) ?? [],
      coverLetters: coverLettersQuery.data?.pages.flatMap((page) => page.content) ?? [],
    }),
    [
      builtResumesQuery.data,
      coverLettersQuery.data,
      optimizedResumesQuery.data,
      originalResumesQuery.data,
    ],
  );

  const tabCounts = useMemo(
    () => ({
      original: originalResumesQuery.data?.pages[0]?.totalElements ?? 0,
      optimized: optimizedResumesQuery.data?.pages[0]?.totalElements ?? 0,
      built: builtResumesQuery.data?.pages[0]?.totalElements ?? 0,
      coverLetters: coverLettersQuery.data?.pages[0]?.totalElements ?? 0,
    }),
    [
      builtResumesQuery.data,
      coverLettersQuery.data,
      optimizedResumesQuery.data,
      originalResumesQuery.data,
    ],
  );

  const overview = useMemo<DocumentsOverview>(
    () => ({
      originalResumes: tabCounts.original,
      optimizedResumes: tabCounts.optimized,
      builtResumes: tabCounts.built,
      coverLetters: tabCounts.coverLetters,
      totalDocuments:
        tabCounts.original +
        tabCounts.optimized +
        tabCounts.built +
        tabCounts.coverLetters,
    }),
    [tabCounts],
  );

  const tabs = useMemo(
    () =>
      DOCUMENT_TABS.map((id) => ({
        id,
        label: DOCUMENT_TAB_META[id].label,
        description: DOCUMENT_TAB_META[id].description,
        count: tabCounts[id],
      })),
    [tabCounts],
  );

  const paginationByTab = useMemo<Record<DocumentsTabId, DocumentsTabPaginationState>>(
    () => ({
      original: {
        hasNextPage: Boolean(originalResumesQuery.hasNextPage),
        isFetchingNextPage: originalResumesQuery.isFetchingNextPage,
        loadMore: () => {
          if (originalResumesQuery.hasNextPage && !originalResumesQuery.isFetchingNextPage) {
            void originalResumesQuery.fetchNextPage();
          }
        },
      },
      optimized: {
        hasNextPage: Boolean(optimizedResumesQuery.hasNextPage),
        isFetchingNextPage: optimizedResumesQuery.isFetchingNextPage,
        loadMore: () => {
          if (optimizedResumesQuery.hasNextPage && !optimizedResumesQuery.isFetchingNextPage) {
            void optimizedResumesQuery.fetchNextPage();
          }
        },
      },
      built: {
        hasNextPage: Boolean(builtResumesQuery.hasNextPage),
        isFetchingNextPage: builtResumesQuery.isFetchingNextPage,
        loadMore: () => {
          if (builtResumesQuery.hasNextPage && !builtResumesQuery.isFetchingNextPage) {
            void builtResumesQuery.fetchNextPage();
          }
        },
      },
      coverLetters: {
        hasNextPage: Boolean(coverLettersQuery.hasNextPage),
        isFetchingNextPage: coverLettersQuery.isFetchingNextPage,
        loadMore: () => {
          if (coverLettersQuery.hasNextPage && !coverLettersQuery.isFetchingNextPage) {
            void coverLettersQuery.fetchNextPage();
          }
        },
      },
    }),
    [builtResumesQuery, coverLettersQuery, optimizedResumesQuery, originalResumesQuery],
  );

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

  const openResumePreview = (resume: Resume) => {
    setPreviewTarget({ type: "resume", resume });
  };

  const openCoverLetterPreview = (coverLetter: CoverLetter) => {
    setPreviewTarget({ type: "coverLetter", coverLetter });
  };

  const closePreview = () => {
    setPreviewTarget(null);
  };

  const activeTabQueryMap = {
    original: originalResumesQuery,
    optimized: optimizedResumesQuery,
    built: builtResumesQuery,
    coverLetters: coverLettersQuery,
  };

  return {
    activeTab,
    setActiveTab: handleSetActiveTab,
    searchQuery,
    setSearchQuery,
    overview,
    tabs,
    documentsByTab,
    paginationByTab,
    isLoading: activeTabQueryMap[activeTab].isPending,
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
  };
}

function useResumeDocumentsInfiniteQuery(documentKind: ResumeDocumentKind, searchQuery: string, enabled: boolean) {
  return useInfiniteQuery({
    queryKey: [...RESUME_KEYS.lists(), "documents", documentKind, searchQuery],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchResumesPage({
        page: pageParam,
        size: DOCUMENTS_PAGE_SIZE,
        query: searchQuery || undefined,
        documentKind,
      } satisfies ResumePageParams),
    getNextPageParam,
    enabled,
  });
}

function useCoverLettersInfiniteQuery(searchQuery: string, enabled: boolean) {
  return useInfiniteQuery({
    queryKey: [...COVER_LETTER_KEYS.lists(), "documents", searchQuery],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchCoverLettersPage({
        page: pageParam,
        size: DOCUMENTS_PAGE_SIZE,
        query: searchQuery || undefined,
      } satisfies CoverLetterPageParams),
    getNextPageParam,
    enabled,
  });
}
