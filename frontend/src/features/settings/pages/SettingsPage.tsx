import { Tabs, TabsContent } from "@/shared/components/ui/tabs";
import {
  SettingsHeader,
  SettingsTabs,
  ProfileTab,
  NotificationsTab,
  BillingTab,
  SecurityTab,
} from "../components";
import { FEATURE_FLAGS } from "@/shared/config/feature-flags";

const TAB_CONTENT_STYLES = "space-y-6 mt-6";

export function SettingsPage() {
  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <SettingsHeader />

        <Tabs defaultValue="profile" className="w-full">
          <SettingsTabs />

          <TabsContent value="profile" className={TAB_CONTENT_STYLES}>
            <ProfileTab />
          </TabsContent>

          <TabsContent value="notifications" className={TAB_CONTENT_STYLES}>
            <NotificationsTab />
          </TabsContent>

          {FEATURE_FLAGS.SUBSCRIPTIONS_ENABLED && (
            <TabsContent value="billing" className={TAB_CONTENT_STYLES}>
              <BillingTab />
            </TabsContent>
          )}

          <TabsContent value="security" className={TAB_CONTENT_STYLES}>
            <SecurityTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
