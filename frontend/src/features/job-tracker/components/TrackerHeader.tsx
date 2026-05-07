import { Plus, Target } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { WorkspacePageHeader } from "@/shared/components/WorkspacePageHeader";
import { TRACKER_HEADER_CONTENT } from "../constants/job-tracker.constants";

interface TrackerHeaderProps {
  onAddClick: () => void;
}

export function TrackerHeader({ onAddClick }: TrackerHeaderProps) {
  return (
    <WorkspacePageHeader
      className="mb-8"
      badge={TRACKER_HEADER_CONTENT.badge}
      badgeIcon={Target}
      title={TRACKER_HEADER_CONTENT.title}
      description={TRACKER_HEADER_CONTENT.description}
      actions={(
        <Button
          onClick={onAddClick}
          className="w-full rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 px-5 text-white shadow-lg shadow-violet-500/30 hover:from-violet-700 hover:via-fuchsia-700 hover:to-cyan-700 sm:w-auto"
        >
          <Plus className="mr-2 size-4" />
          {TRACKER_HEADER_CONTENT.buttonText}
        </Button>
      )}
    />
  );
}
