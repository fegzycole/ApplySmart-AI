import { Button } from "@/shared/components/ui/button";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { JOB_CARD_STYLES } from "../../constants/job-tracker.constants";

interface JobCardActionsProps {
  link: string | null;
  onEdit: () => void;
  onDelete: () => void;
}

export function JobCardActions({ link, onEdit, onDelete }: JobCardActionsProps) {
  return (
    <div className={JOB_CARD_STYLES.actions.container}>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={JOB_CARD_STYLES.actions.linkWrapper}
        >
          <Button
            variant="outline"
            size="sm"
            className={JOB_CARD_STYLES.actions.viewButton}
          >
            <ExternalLink className={JOB_CARD_STYLES.actions.icon} />
            Open
          </Button>
        </a>
      ) : null}
      <Button
        variant="ghost"
        size="icon"
        className={JOB_CARD_STYLES.actions.editButton}
        onClick={onEdit}
      >
        <Pencil className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={JOB_CARD_STYLES.actions.deleteButton}
        onClick={onDelete}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
