import { Button } from "@/shared/components/ui/button";
import {
  JOB_TRACKER_ERROR_STATE_CONTENT,
  JOB_TRACKER_ERROR_STATE_STYLES,
} from "../constants/job-tracker.constants";

interface JobTrackerErrorStateProps {
  onRetry: () => void;
}

export function JobTrackerErrorState({ onRetry }: JobTrackerErrorStateProps) {
  return (
    <div className={JOB_TRACKER_ERROR_STATE_STYLES.wrapper}>
      <h2 className={JOB_TRACKER_ERROR_STATE_STYLES.title}>
        {JOB_TRACKER_ERROR_STATE_CONTENT.title}
      </h2>
      <p className={JOB_TRACKER_ERROR_STATE_STYLES.description}>
        {JOB_TRACKER_ERROR_STATE_CONTENT.description}
      </p>
      <Button 
        variant="outline" 
        onClick={onRetry} 
        className={JOB_TRACKER_ERROR_STATE_STYLES.button}
      >
        Re-establish Connection
      </Button>
    </div>
  );
}
