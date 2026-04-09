import { Button } from "@/shared/components/ui/button";
import { ADD_JOB_DIALOG_STYLES } from "../../constants/job-tracker.constants";

interface DialogActionsProps {
  onCancel: () => void;
}

export function DialogActions({ onCancel }: DialogActionsProps) {
  return (
    <div className={ADD_JOB_DIALOG_STYLES.actions.container}>
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className={ADD_JOB_DIALOG_STYLES.actions.cancelButton}
      >
        Cancel
      </Button>
      <Button type="submit" className={ADD_JOB_DIALOG_STYLES.actions.submitButton}>
        Add Job
      </Button>
    </div>
  );
}
