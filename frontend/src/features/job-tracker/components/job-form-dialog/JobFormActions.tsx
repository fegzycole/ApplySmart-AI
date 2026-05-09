import { Button } from "@/shared/components/ui/button";
import { JOB_FORM_DIALOG_STYLES } from "../../constants/job-tracker.constants";

interface JobFormActionsProps {
  isEditing: boolean;
  isPending: boolean;
  onCancel: () => void;
}

export function JobFormActions({ isEditing, isPending, onCancel }: JobFormActionsProps) {
  return (
    <div className={JOB_FORM_DIALOG_STYLES.actions.container}>
      <Button
        type="button"
        variant="ghost"
        onClick={onCancel}
        className={JOB_FORM_DIALOG_STYLES.actions.cancelButton}
        disabled={isPending}
      >
        Discard
      </Button>
      <Button
        type="submit"
        className={JOB_FORM_DIALOG_STYLES.actions.submitButton}
        disabled={isPending}
      >
        {isPending ? "Updating Journey..." : isEditing ? "Save Progress" : "Add Opportunity"}
      </Button>
    </div>
  );
}
