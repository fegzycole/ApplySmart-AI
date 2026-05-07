import { Link } from "react-router";
import { FileText, PenSquare, Search, Sparkles } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { WorkspacePageHeader } from "@/shared/components/WorkspacePageHeader";

interface DocumentsPageHeaderProps {
  onSearchChange: (value: string) => void;
  searchQuery: string;
}

export function DocumentsPageHeader({
  onSearchChange,
  searchQuery,
}: DocumentsPageHeaderProps) {
  return (
    <WorkspacePageHeader
      badge="Document Library"
      badgeIcon={FileText}
      title="My Documents"
      description="Original resumes, optimized versions, builder outputs, and cover letters in one clean workspace."
      actions={(
        <>
          <Link to="/app/resume-builder" className="w-full sm:w-auto">
            <Button className="w-full rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 px-5 text-white shadow-lg shadow-violet-500/30 hover:from-violet-700 hover:via-fuchsia-700 hover:to-cyan-700">
              <PenSquare className="mr-2 size-4" />
              Build Resume
            </Button>
          </Link>
          <Link to="/app/cover-letter" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full rounded-xl border-zinc-300 bg-white/80 px-5 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950/70 dark:hover:bg-zinc-900"
            >
              <Sparkles className="mr-2 size-4" />
              Generate Cover Letter
            </Button>
          </Link>
        </>
      )}
      footerClassName="relative max-w-xl"
      footer={(
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4.5 -translate-y-1/2 text-zinc-400" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search resumes and cover letters..."
            className="h-12 rounded-xl border-zinc-200 bg-white/90 pl-10 shadow-sm focus-visible:ring-1 focus-visible:ring-zinc-950 dark:border-zinc-800 dark:bg-zinc-950/80 dark:focus-visible:ring-white"
          />
        </div>
      )}
    />
  );
}
