interface DocumentsQueryState {
  data?: unknown;
  isPending: boolean;
}

export function shouldShowDocumentsPageSkeleton(queries: DocumentsQueryState[]) {
  return queries.some((query) => query.isPending && !query.data);
}
