import { describe, expect, it } from "vitest";
import { shouldShowDocumentsPageSkeleton } from "./documents-query-state";

describe("documents query state", () => {
  it("shows the page skeleton while any document count query has no data", () => {
    expect(shouldShowDocumentsPageSkeleton([
      { isPending: false, data: { pages: [] } },
      { isPending: true },
    ])).toBe(true);
  });

  it("keeps the page mounted while queries refetch with previous data", () => {
    expect(shouldShowDocumentsPageSkeleton([
      { isPending: false, data: { pages: [] } },
      { isPending: true, data: { pages: [{ totalElements: 2 }] } },
    ])).toBe(false);
  });
});
