import { JOB_CARD_STYLES } from "../../constants/job-tracker.constants";
import { formatJobTimestamp } from "../../utils/job-tracker";

interface JobCardMetaProps {
  salary: string | null;
  applicationDeadline: string | null;
}

export function JobCardMeta({ salary, applicationDeadline }: JobCardMetaProps) {
  const deadline = formatJobTimestamp(applicationDeadline);

  if (!salary && !deadline) {
    return null;
  }

  return (
    <div className={JOB_CARD_STYLES.meta.list}>
      {salary ? (
        <p className={JOB_CARD_STYLES.meta.item}>
          {salary}
        </p>
      ) : null}
      {salary && deadline ? <span className={JOB_CARD_STYLES.meta.separator}>•</span> : null}
      {deadline ? <p className={JOB_CARD_STYLES.meta.item}>{deadline}</p> : null}
    </div>
  );
}
