import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { TRACKER_HEADER_STYLES, TRACKER_HEADER_CONTENT } from "../../constants/job-tracker.constants";

interface AddApplicationButtonProps {
  onClick: () => void;
}

export function AddApplicationButton({ onClick }: AddApplicationButtonProps) {
  return (
    <Button onClick={onClick} className={TRACKER_HEADER_STYLES.button.base}>
      <Plus className={TRACKER_HEADER_STYLES.button.icon} />
      <span className={TRACKER_HEADER_STYLES.button.text}>
        {TRACKER_HEADER_CONTENT.buttonText}
      </span>
    </Button>
  );
}
