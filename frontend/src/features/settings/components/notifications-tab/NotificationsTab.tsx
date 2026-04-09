import { Bell } from "lucide-react";
import { SectionCard } from "../shared/SectionCard";
import { NotificationToggle } from "./NotificationToggle";
import { NOTIFICATION_SETTINGS } from "../../constants/settings.constants";

export function NotificationsTab() {
  return (
    <SectionCard
      icon={Bell}
      title="Notification Preferences"
      description="Choose what updates you want to receive"
      iconGradient="from-cyan-500 to-teal-500"
    >
      {NOTIFICATION_SETTINGS.map((setting) => (
        <NotificationToggle key={setting.id} {...setting} />
      ))}
    </SectionCard>
  );
}
