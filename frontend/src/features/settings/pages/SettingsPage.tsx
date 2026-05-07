import { Tabs, TabsContent } from "@/shared/components/ui/tabs";
import {
  SettingsHeader,
  SettingsTabs,
  ProfileTab,
  BillingTab,
  SecurityTab,
} from "../components";
import { FEATURE_FLAGS } from "@/shared/config/feature-flags";

export function SettingsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-zinc-50 via-white to-violet-50/30 px-3 py-4 dark:from-zinc-950 dark:via-zinc-900 dark:to-violet-950/20 sm:px-4 sm:py-5 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-7xl min-w-0">
        <SettingsHeader />

        <Tabs
          defaultValue="profile"
          className="w-full gap-4 lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start lg:gap-6"
        >
          <SettingsTabs />

          <TabsContent value="profile" className="min-w-0 space-y-6 mt-0">
            <ProfileTab />
          </TabsContent>

          {FEATURE_FLAGS.SUBSCRIPTIONS_ENABLED && (
            <TabsContent value="billing" className="min-w-0 space-y-6 mt-0">
              <BillingTab />
            </TabsContent>
          )}

          <TabsContent value="security" className="min-w-0 space-y-6 mt-0">
            <SecurityTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
