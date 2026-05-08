import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ResumeActions } from "@/features/resume/components/resumes/ResumeActions";
import { ResumeScoreBadge } from "@/features/resume/components/resumes/ResumeScoreBadge";
import type { Resume } from "@/features/resume/services/resume.service";
import { DOCUMENT_CARD_STYLES } from "../constants/documents.constants";
import {
  formatDocumentDate,
  getResumeDocumentLabel,
  getResumeStorageLabel,
} from "../utils/documents.utils";
import { ResumeDocumentPreview } from "./ResumeDocumentPreview";

interface ResumeDocumentCardProps {
  onDelete: (resume: Resume) => void;
  onPreview: (resume: Resume) => void;
  resume: Resume;
}

export function ResumeDocumentCard({
  onDelete,
  onPreview,
  resume,
}: ResumeDocumentCardProps) {
  return (
    <Card className={DOCUMENT_CARD_STYLES.card}>
      <div className={DOCUMENT_CARD_STYLES.layout}>
        <CardContent className={DOCUMENT_CARD_STYLES.body}>
          <CardHeader className={DOCUMENT_CARD_STYLES.header}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 space-y-1.5">
                <p className={DOCUMENT_CARD_STYLES.eyebrow}>
                  {getResumeDocumentLabel(resume)}
                </p>
                <CardTitle className={`${DOCUMENT_CARD_STYLES.title} truncate`}>
                  {resume.name}
                </CardTitle>
                <p className={DOCUMENT_CARD_STYLES.subtitle}>
                  Updated {formatDocumentDate(resume.lastModified)}
                </p>
              </div>
              {resume.score > 0 ? (
                <ResumeScoreBadge score={resume.score} showLabel />
              ) : null}
            </div>

            <div className={DOCUMENT_CARD_STYLES.metaRow}>
              <span className={DOCUMENT_CARD_STYLES.metaPill}>
                {getResumeStorageLabel(resume)}
              </span>
            </div>
          </CardHeader>

          <div className={DOCUMENT_CARD_STYLES.footer}>
            <ResumeActions
              resume={resume}
              onDelete={() => onDelete(resume)}
            />
          </div>
        </CardContent>

        <div className={DOCUMENT_CARD_STYLES.previewShell}>
          <button
            type="button"
            className={DOCUMENT_CARD_STYLES.previewButton}
            onClick={() => onPreview(resume)}
            aria-label={`Open preview for ${resume.name}`}
          >
            <ResumeDocumentPreview resume={resume} />
          </button>
        </div>
      </div>
    </Card>
  );
}
