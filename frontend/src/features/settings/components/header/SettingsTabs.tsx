import { TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import {
  SETTINGS_TABS,
  TRIGGER_STYLES,
} from "../../constants/settings.constants";

export function SettingsTabs() {
  return (
    <TabsList className="grid w-full grid-cols-4 h-14 bg-gradient-to-r from-violet-100/50 via-fuchsia-100/50 to-cyan-100/50 dark:from-violet-950/30 dark:via-fuchsia-950/30 dark:to-cyan-950/30 p-1 rounded-xl">
      {SETTINGS_TABS.map(({ id, label, icon: Icon }) => (
        <TabsTrigger key={id} value={id} className={TRIGGER_STYLES}>
          <Icon className="size-4" />
          <span className="hidden sm:inline">{label}</span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
