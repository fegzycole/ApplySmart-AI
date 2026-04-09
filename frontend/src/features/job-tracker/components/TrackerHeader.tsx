import { TRACKER_HEADER_STYLES } from "../constants/job-tracker.constants";
import {
  HeaderBadge,
  HeaderTitle,
  HeaderDescription,
  AddApplicationButton,
} from "./tracker-header";

interface TrackerHeaderProps {
  onAddClick: () => void;
}

export function TrackerHeader({ onAddClick }: TrackerHeaderProps) {
  return (
    <div className={TRACKER_HEADER_STYLES.container}>
      <div className={TRACKER_HEADER_STYLES.wrapper}>
        <div className={TRACKER_HEADER_STYLES.contentSection}>
          <HeaderBadge />
          <HeaderTitle />
          <HeaderDescription />
        </div>

        <AddApplicationButton onClick={onAddClick} />
      </div>
    </div>
  );
}
