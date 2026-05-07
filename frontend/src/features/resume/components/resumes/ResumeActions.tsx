import { Link } from "react-router";
import { Button } from "@/shared/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { DownloadResumeButton } from "./DownloadResumeButton";
import { RESUME_CARD_STYLES } from "../../constants/resume-card.constants";
import type { Resume } from "../../services/resume.service";
import { contentToResumeData } from "../../utils/resume-builder-payload";

interface ResumeActionsProps {
  resume: Resume;
  onDelete: () => void;
}

export function ResumeActions({ resume, onDelete }: ResumeActionsProps) {
  const canEditInBuilder = Boolean(resume.content && contentToResumeData(resume.content));

  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {canEditInBuilder ? (
        <Link to={`/app/resume-builder?id=${resume.id}`}>
          <Button className={RESUME_CARD_STYLES.editButtonClassName} size="sm">
            <Edit2 className="mr-1.5 size-3" />
            Edit
          </Button>
        </Link>
      ) : null}
      <DownloadResumeButton resume={resume} />
      <Button
        variant="ghost"
        size="sm"
        className={RESUME_CARD_STYLES.deleteButtonClassName}
        onClick={onDelete}
      >
        <Trash2 className="mr-1.5 size-3" />
        Delete
      </Button>
    </div>
  );
}
