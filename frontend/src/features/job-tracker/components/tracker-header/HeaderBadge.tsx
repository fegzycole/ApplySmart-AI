import { Target } from "lucide-react";
import { TRACKER_HEADER_STYLES, TRACKER_HEADER_CONTENT } from "../../constants/job-tracker.constants";

export function HeaderBadge() {
  return (
    <div className={TRACKER_HEADER_STYLES.badge.container}>
      <Target className={TRACKER_HEADER_STYLES.badge.icon} />
      <span className={TRACKER_HEADER_STYLES.badge.text}>
        {TRACKER_HEADER_CONTENT.badge}
      </span>
    </div>
  );
}
