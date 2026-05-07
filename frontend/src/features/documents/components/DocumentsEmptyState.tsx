import { Link } from "react-router";
import { FileText, PenSquare, Sparkles } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface DocumentsEmptyStateProps {
  hasSearchQuery: boolean;
}

export function DocumentsEmptyState({
  hasSearchQuery,
}: DocumentsEmptyStateProps) {
  return (
    <div className="rounded-[2rem] border border-dashed border-zinc-300 bg-white/80 px-6 py-12 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950/70">
      <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
        <FileText className="size-6" />
      </div>
      <h2 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-zinc-950 dark:text-white">
        {hasSearchQuery ? "No documents match your search" : "No documents yet"}
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
        {hasSearchQuery
          ? "Try a different keyword or clear the search to see the rest of your document library."
          : "Build a new resume, upload an original resume, or generate a cover letter to start filling this workspace."}
      </p>

      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/app/resume-builder">
          <Button className="w-full rounded-xl bg-zinc-950 px-5 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">
            <PenSquare className="mr-2 size-4" />
            Build Resume
          </Button>
        </Link>
        <Link to="/app/cover-letter">
          <Button
            variant="outline"
            className="w-full rounded-xl border-zinc-300 bg-white/80 px-5 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:bg-zinc-900"
          >
            <Sparkles className="mr-2 size-4" />
            Generate Cover Letter
          </Button>
        </Link>
      </div>
    </div>
  );
}
