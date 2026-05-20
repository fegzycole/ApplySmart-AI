import { useDeferredValue, useMemo, useState } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { COVER_LETTER_KEYS } from "@/features/cover-letter/hooks/useCoverLetterQueries";
import {
  fetchCoverLettersPage,
  type CoverLetter,
  type CoverLetterPageParams,
} from "@/features/cover-letter/services/cover-letter.service";
import { RESUME_KEYS } from "@/features/resume/hooks/useResumeQueries";
import {
  fetchResumesPage,
  type Resume,
  type ResumeDocumentKind,
  type ResumePageParams,
} from "@/features/resume/services/resume.service";
import { DOCUMENT_TAB_META, DOCUMENT_TABS } from "../constants/documents.constants";
import type {
  DocumentsOverview,
  DocumentsTabData,
  DocumentsTabId,
  DocumentsTabPaginationState,
} from "../types/documents.types";
import { useDocumentDeletionState } from "./useDocumentDeletionState";
import { useDocumentPreviewState } from "./useDocumentPreviewState";
import { shouldShowDocumentsPageSkeleton } from "../utils/documents-query-state";

const DOCUMENTS_PAGE_SIZE = 8;

function getNextPageParam(lastPage: { last: boolean; number: number }) {
  return lastPage.last ? undefined : lastPage.number + 1;
}

interface PaginationQuery {
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function useDocumentsManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<DocumentsTabId>("original");
  const deferredSearchQuery = useDeferredValue(searchQuery.trim());
  const deletionState = useDocumentDeletionState();
  const previewState = useDocumentPreviewState();

  const handleSetActiveTab = (tab: DocumentsTabId) => {
    setActiveTab(tab);
  };

  const originalResumesQuery = useResumeDocumentsInfiniteQuery("original", deferredSearchQuery);
  const optimizedResumesQuery = useResumeDocumentsInfiniteQuery("optimized", deferredSearchQuery);
  const builtResumesQuery = useResumeDocumentsInfiniteQuery("built", deferredSearchQuery);
  const coverLettersQuery = useCoverLettersInfiniteQuery(deferredSearchQuery);

  const documentsByTab = useMemo<DocumentsTabData>(
    () => buildDocumentsByTab(
      originalResumesQuery,
      optimizedResumesQuery,
      builtResumesQuery,
      coverLettersQuery,
    ),
    [
      builtResumesQuery.data,
      coverLettersQuery.data,
      optimizedResumesQuery.data,
      originalResumesQuery.data,
    ],
  );

  const tabCounts = useMemo(
    () => buildTabCounts(originalResumesQuery, optimizedResumesQuery, builtResumesQuery, coverLettersQuery),
    [
      builtResumesQuery.data,
      coverLettersQuery.data,
      optimizedResumesQuery.data,
      originalResumesQuery.data,
    ],
  );

  const overview = useMemo<DocumentsOverview>(
    () => buildOverview(tabCounts),
    [tabCounts],
  );

  const tabs = useMemo(
    () => buildTabs(tabCounts),
    [tabCounts],
  );

  const paginationByTab = useMemo<Record<DocumentsTabId, DocumentsTabPaginationState>>(
    () => ({
      original: createPaginationState(originalResumesQuery),
      optimized: createPaginationState(optimizedResumesQuery),
      built: createPaginationState(builtResumesQuery),
      coverLetters: createPaginationState(coverLettersQuery),
    }),
    [builtResumesQuery, coverLettersQuery, optimizedResumesQuery, originalResumesQuery],
  );

  return {
    activeTab,
    setActiveTab: handleSetActiveTab,
    searchQuery,
    setSearchQuery,
    overview,
    tabs,
    documentsByTab,
    paginationByTab,
    isLoading: shouldShowDocumentsPageSkeleton([
      originalResumesQuery,
      optimizedResumesQuery,
      builtResumesQuery,
      coverLettersQuery,
    ]),
    ...deletionState,
    ...previewState,
  };
}

function buildDocumentsByTab(
  originalResumesQuery: { data?: { pages: Array<{ content: Resume[] }> } },
  optimizedResumesQuery: { data?: { pages: Array<{ content: Resume[] }> } },
  builtResumesQuery: { data?: { pages: Array<{ content: Resume[] }> } },
  coverLettersQuery: { data?: { pages: Array<{ content: CoverLetter[] }> } },
): DocumentsTabData {
  return {
    original: getPageContent(originalResumesQuery),
    optimized: getPageContent(optimizedResumesQuery),
    built: getPageContent(builtResumesQuery),
    coverLetters: getPageContent(coverLettersQuery),
  };
}

function buildTabCounts(
  originalResumesQuery: { data?: { pages: Array<{ totalElements: number }> } },
  optimizedResumesQuery: { data?: { pages: Array<{ totalElements: number }> } },
  builtResumesQuery: { data?: { pages: Array<{ totalElements: number }> } },
  coverLettersQuery: { data?: { pages: Array<{ totalElements: number }> } },
): Record<DocumentsTabId, number> {
  return {
    original: getTotalElements(originalResumesQuery),
    optimized: getTotalElements(optimizedResumesQuery),
    built: getTotalElements(builtResumesQuery),
    coverLetters: getTotalElements(coverLettersQuery),
  };
}

function buildOverview(tabCounts: Record<DocumentsTabId, number>): DocumentsOverview {
  return {
    originalResumes: tabCounts.original,
    optimizedResumes: tabCounts.optimized,
    builtResumes: tabCounts.built,
    coverLetters: tabCounts.coverLetters,
    totalDocuments: sumDocumentCounts(tabCounts),
  };
}

function buildTabs(tabCounts: Record<DocumentsTabId, number>) {
  return DOCUMENT_TABS.map((id) => ({
    id,
    label: DOCUMENT_TAB_META[id].label,
    description: DOCUMENT_TAB_META[id].description,
    count: tabCounts[id],
  }));
}

function createPaginationState(query: PaginationQuery): DocumentsTabPaginationState {
  return {
    hasNextPage: Boolean(query.hasNextPage),
    isFetchingNextPage: query.isFetchingNextPage,
    loadMore: () => {
      if (query.hasNextPage && !query.isFetchingNextPage) {
        void query.fetchNextPage();
      }
    },
  };
}

function getPageContent<T>(query: { data?: { pages: Array<{ content: T[] }> } }) {
  return query.data?.pages.flatMap((page) => page.content) ?? [];
}

function getTotalElements(query: { data?: { pages: Array<{ totalElements: number }> } }) {
  return query.data?.pages[0]?.totalElements ?? 0;
}

function sumDocumentCounts(tabCounts: Record<DocumentsTabId, number>) {
  return DOCUMENT_TABS.reduce((total, tab) => total + tabCounts[tab], 0);
}

function useResumeDocumentsInfiniteQuery(documentKind: ResumeDocumentKind, searchQuery: string) {
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
    placeholderData: keepPreviousData,
  });
}

function useCoverLettersInfiniteQuery(searchQuery: string) {
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
    placeholderData: keepPreviousData,
  });
}
