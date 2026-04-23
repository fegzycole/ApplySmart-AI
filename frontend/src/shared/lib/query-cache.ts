import type { QueryClient, QueryKey } from "@tanstack/react-query";

export function invalidateQueries(queryClient: QueryClient, ...queryKeys: QueryKey[]) {
  return Promise.all(
    queryKeys.map((queryKey) => queryClient.invalidateQueries({ queryKey }))
  );
}

export function invalidateDetailAndList(
  queryClient: QueryClient,
  detailKey: QueryKey,
  listKey: QueryKey
) {
  return invalidateQueries(queryClient, detailKey, listKey);
}

export function removeDetailAndInvalidateList(
  queryClient: QueryClient,
  detailKey: QueryKey,
  listKey: QueryKey
) {
  queryClient.removeQueries({ queryKey: detailKey });
  return queryClient.invalidateQueries({ queryKey: listKey });
}
