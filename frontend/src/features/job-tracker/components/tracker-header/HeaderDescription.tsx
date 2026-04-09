import { TRACKER_HEADER_STYLES, TRACKER_HEADER_CONTENT } from "../../constants/job-tracker.constants";

export function HeaderDescription() {
  return (
    <p className={TRACKER_HEADER_STYLES.description}>
      {TRACKER_HEADER_CONTENT.description}
    </p>
  );
}
