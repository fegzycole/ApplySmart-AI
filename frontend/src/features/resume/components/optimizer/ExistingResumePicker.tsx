import { useMemo, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import type { Resume } from "../../services/resume.service";
import { ExistingResumeOptionCard } from "./ExistingResumeOptionCard";

const DEFAULT_VISIBLE_RESUMES = 5;

interface ExistingResumePickerProps {
  loading: boolean;
  onSelect: (resumeId: number) => void;
  resumes: Resume[];
  selectedResumeId: number | null;
}

export function ExistingResumePicker({
  loading,
  onSelect,
  resumes,
  selectedResumeId,
}: ExistingResumePickerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResumes = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return resumes.slice(0, DEFAULT_VISIBLE_RESUMES);
    }

    return resumes.filter((resume) =>
      resume.name.trim().toLowerCase().includes(normalizedQuery)
    );
  }, [resumes, searchQuery]);

  if (loading) {
    return (
      <div className="flex min-h-48 items-center justify-center rounded-[1.5rem] border border-zinc-200/80 bg-white/70 dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
          <Loader2 className="size-4 animate-spin" />
          Loading your resumes...
        </div>
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-zinc-300 bg-zinc-50/80 px-5 py-10 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
        <div className="text-sm font-medium text-zinc-900 dark:text-white">
          No saved resume files yet
        </div>
        <div className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          Upload a new resume instead, or save a resume file to your workspace and come back to optimize it.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search resumes by name..."
            className="h-11 rounded-xl border-zinc-200 bg-white/90 pl-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/80"
          />
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {searchQuery.trim()
            ? `${filteredResumes.length} matching resume${filteredResumes.length === 1 ? "" : "s"}`
            : `Showing ${Math.min(resumes.length, DEFAULT_VISIBLE_RESUMES)} of ${resumes.length} resumes`}
        </p>
      </div>

      <div className="grid gap-3">
        {filteredResumes.map((resume) => (
          <ExistingResumeOptionCard
            key={resume.id}
            resume={resume}
            selected={selectedResumeId === resume.id}
            onSelect={onSelect}
          />
        ))}
      </div>

      {searchQuery.trim() && filteredResumes.length === 0 ? (
        <div className="rounded-[1.25rem] border border-dashed border-zinc-300 bg-zinc-50/80 px-4 py-8 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
          <div className="text-sm font-medium text-zinc-900 dark:text-white">
            No resumes matched that name
          </div>
          <div className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            Try a different keyword or upload a new resume instead.
          </div>
        </div>
      ) : null}
    </div>
  );
}
