import { DOCUMENTS_PAGE_STYLES } from "../constants/documents.constants";
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
    <section className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
            {title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        </div>
        <div className="inline-flex w-fit items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          {count} {count === 1 ? "document" : "documents"}
        </div>
      </div>

      <div className={DOCUMENTS_PAGE_STYLES.sectionGrid}>
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
