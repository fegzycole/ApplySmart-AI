import { TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import {
  SETTINGS_TABS,
  SETTINGS_TAB_LIST_STYLES,
} from "../../constants/settings.constants";

export function SettingsTabs() {
  return (
    <div className={SETTINGS_TAB_LIST_STYLES.wrapper}>
      <TabsList className={SETTINGS_TAB_LIST_STYLES.list}>
        {SETTINGS_TABS.map(({ id, label, icon: Icon }) => (
          <TabsTrigger key={id} value={id} className={SETTINGS_TAB_LIST_STYLES.trigger}>
            <Icon className={SETTINGS_TAB_LIST_STYLES.icon} />
            <span className={SETTINGS_TAB_LIST_STYLES.label}>{label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}
