import { Button } from "@/shared/components/ui/button";
import {
  JOB_TRACKER_EMPTY_STATE_CONTENT,
  JOB_TRACKER_EMPTY_STATE_STYLES,
  JOB_TRACKER_ICONS,
} from "../constants/job-tracker.constants";

interface JobTrackerEmptyStateProps {
  onAddClick: () => void;
}

export function JobTrackerEmptyState({ onAddClick }: JobTrackerEmptyStateProps) {
  const EmptyIcon = JOB_TRACKER_ICONS.empty;

  return (
    <div className={JOB_TRACKER_EMPTY_STATE_STYLES.wrapper}>
      <div className={JOB_TRACKER_EMPTY_STATE_STYLES.iconWrapper}>
        <EmptyIcon className={JOB_TRACKER_EMPTY_STATE_STYLES.icon} />
      </div>
      <h2 className={JOB_TRACKER_EMPTY_STATE_STYLES.title}>
        {JOB_TRACKER_EMPTY_STATE_CONTENT.title}
      </h2>
      <p className={JOB_TRACKER_EMPTY_STATE_STYLES.description}>
        {JOB_TRACKER_EMPTY_STATE_CONTENT.description}
      </p>
      <Button onClick={onAddClick} className={JOB_TRACKER_EMPTY_STATE_STYLES.button}>
        Add your first application
      </Button>
    </div>
  );
}
