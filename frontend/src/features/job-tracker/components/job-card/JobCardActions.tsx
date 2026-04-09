import { Button } from "@/shared/components/ui/button";
import { ExternalLink, Trash2 } from "lucide-react";
import { JOB_CARD_STYLES } from "../../constants/job-tracker.constants";

interface JobCardActionsProps {
  link: string;
  onDelete: () => void;
}

export function JobCardActions({ link, onDelete }: JobCardActionsProps) {
  return (
    <div className={JOB_CARD_STYLES.actions.container}>
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
          View Job
        </Button>
      </a>
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
