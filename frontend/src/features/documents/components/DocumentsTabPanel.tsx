import type { CoverLetter } from "@/features/cover-letter/services/cover-letter.service";
import type { Resume } from "@/features/resume/services/resume.service";
import { CoverLetterDocumentCard } from "./CoverLetterDocumentCard";
import { DocumentsLoadMoreTrigger } from "./DocumentsLoadMoreTrigger";
import { ResumeDocumentCard } from "./ResumeDocumentCard";

interface DocumentsTabPanelProps {
  count: number;
  coverLetters?: CoverLetter[];
  description: string;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
  onDeleteCoverLetter: (coverLetter: CoverLetter) => void;
  onDeleteResume: (resume: Resume) => void;
  onPreviewCoverLetter: (coverLetter: CoverLetter) => void;
  onPreviewResume: (resume: Resume) => void;
  resumes?: Resume[];
  title: string;
}

export function DocumentsTabPanel({
  count,
  coverLetters = [],
  description,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  onDeleteCoverLetter,
  onDeleteResume,
  onPreviewCoverLetter,
  onPreviewResume,
  resumes = [],
  title,
}: DocumentsTabPanelProps) {
  const hasResumes = resumes.length > 0;
  const hasCoverLetters = coverLetters.length > 0;

  return (
    <section className="space-y-6 sm:space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-zinc-100 dark:border-zinc-800 pb-6 sm:pb-8">
        <div className="space-y-1 sm:space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
            {title}
          </h2>
          <p className="text-sm sm:text-lg font-medium text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
        </div>
        <div className="flex h-8 sm:h-10 w-fit items-center px-3 sm:px-4 rounded-full bg-zinc-900 text-white dark:bg-sky-600 text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-xl">
          {count} {count === 1 ? "Artifact" : "Artifacts"}
        </div>
      </div>

      <div className="grid gap-6 sm:gap-10">
        {hasResumes
          ? resumes.map((resume) => (
              <ResumeDocumentCard
                key={resume.id}
                resume={resume}
                onDelete={onDeleteResume}
                onPreview={onPreviewResume}
              />
            ))
          : null}

        {hasCoverLetters
          ? coverLetters.map((coverLetter) => (
              <CoverLetterDocumentCard
                key={coverLetter.id}
                coverLetter={coverLetter}
                onDelete={onDeleteCoverLetter}
                onPreview={onPreviewCoverLetter}
              />
            ))
          : null}
      </div>

      <DocumentsLoadMoreTrigger
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={onLoadMore}
      />
    </section>
  );
}
