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
      <div className="flex min-h-[300px] items-center justify-center rounded-[3rem] border-2 border-zinc-100 bg-white/40 dark:border-zinc-800 dark:bg-zinc-900/60 backdrop-blur-xl">
        <div className="flex flex-col items-center gap-6">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-950 shadow-inner">
             <Loader2 className="size-8 animate-spin text-sky-500" />
          </div>
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400">
            Accessing Vault Artifacts...
          </p>
        </div>
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <div className="rounded-[2rem] border-2 border-dashed border-zinc-200 bg-zinc-50/30 px-6 py-12 text-center dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-md sm:rounded-[3rem] sm:px-10 sm:py-16 lg:py-20">
        <div className="text-base font-black tracking-tight text-zinc-900 dark:text-zinc-50 uppercase leading-none sm:text-xl">
          Vault library currently empty
        </div>
        <div className="mt-3 text-sm font-medium text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto sm:mt-4 sm:text-base lg:text-lg">
          Inject an external artifact or save a specimen to the vault to begin neural calibration.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      <div className="space-y-6">
        <div className="relative group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sky-500/20 to-indigo-500/20 blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400 group-focus-within:text-sky-500 transition-colors sm:left-5 sm:size-5" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search artifacts..."
              className="h-12 w-full rounded-xl border-2 border-zinc-100 bg-white/80 pl-11 pr-4 text-sm font-bold shadow-sm backdrop-blur-xl transition-all focus-visible:border-sky-500 focus-visible:ring-4 focus-visible:ring-sky-500/10 dark:border-zinc-800 dark:bg-zinc-900/80 sm:h-16 sm:rounded-2xl sm:pl-14 sm:pr-6 sm:text-base"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 px-1">
          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
          <p className="truncate text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
            {searchQuery.trim()
              ? `${filteredResumes.length} matching`
              : `${Math.min(resumes.length, DEFAULT_VISIBLE_RESUMES)} of ${resumes.length} artifacts`}
          </p>
        </div>
      </div>

      <div className="grid gap-4">
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
        <div className="rounded-[2.5rem] border-2 border-dashed border-zinc-200 bg-zinc-50/30 px-6 py-12 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="text-base font-black tracking-tight text-zinc-900 dark:text-zinc-50 uppercase">
            No matching artifacts found
          </div>
          <div className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Refine search parameters or inject a fresh artifact specimen.
          </div>
        </div>
      ) : null}
    </div>
  );
}
