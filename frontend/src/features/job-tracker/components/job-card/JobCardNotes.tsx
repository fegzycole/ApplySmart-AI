import { JOB_CARD_STYLES } from "../../constants/job-tracker.constants";

interface JobCardNotesProps {
  notes: string;
}

export function JobCardNotes({ notes }: JobCardNotesProps) {
  if (!notes) return null;

  return (
    <p className={JOB_CARD_STYLES.notes}>
      {notes}
    </p>
  );
}
