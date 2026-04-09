import { Link } from "react-router";
import { Button } from "@/shared/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { ExportDropdown } from "./ExportDropdown";
import { RESUME_CARD_STYLES } from "../../constants/resume-card.constants";

interface ResumeActionsProps {
  resumeId: string;
  onDelete: () => void;
}

export function ResumeActions({ resumeId, onDelete }: ResumeActionsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 pt-1">
        <Link to={`/app/resume-builder?id=${resumeId}`} className="flex-1">
          <Button
            className={RESUME_CARD_STYLES.editButtonClassName}
            size="sm"
          >
            <Edit2 className="size-3 mr-1.5" />
            Edit
          </Button>
        </Link>
        <ExportDropdown />
      </div>

      <Button
        variant="ghost"
        size="sm"
        className={RESUME_CARD_STYLES.deleteButtonClassName}
        onClick={onDelete}
      >
        <Trash2 className="size-3 mr-1.5" />
        Delete Resume
      </Button>
    </>
  );
}
