import { TRACKER_HEADER_STYLES, TRACKER_HEADER_CONTENT } from "../../constants/job-tracker.constants";

export function HeaderTitle() {
  return (
    <h1 className={TRACKER_HEADER_STYLES.title.container}>
      <span className={TRACKER_HEADER_STYLES.title.gradient}>
        {TRACKER_HEADER_CONTENT.title}
      </span>
    </h1>
  );
}
