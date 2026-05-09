import { motion } from "framer-motion";
import { Tabs, TabsContent } from "@/shared/components/ui/tabs";
import { cn } from "@/shared/lib/utils";
import {
  SettingsHeader,
  SettingsTabs,
  ProfileTab,
  BillingTab,
  SecurityTab,
} from "../components";
import { FEATURE_FLAGS } from "@/shared/config/feature-flags";
import { TERMINAL_STYLES } from "../constants/settings.constants";
import { MISSION_CONTROL_ANIMATIONS } from "@/shared/constants/animations";

export function SettingsPage() {
  return (
    <motion.div 
      variants={MISSION_CONTROL_ANIMATIONS.stagger.container}
      initial="hidden"
      animate="visible"
      className="min-h-screen pb-12 sm:pb-20 bg-[#fafafa] dark:bg-zinc-950"
    >
      <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 pt-8 sm:pt-12">
        <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
          <SettingsHeader />
        </motion.div>

        <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
          <Tabs
            defaultValue="profile"
            className={cn(TERMINAL_STYLES.rail.layout, "gap-6 sm:gap-10")}
          >
            <div className="xl:sticky xl:top-8">
              <SettingsTabs />
            </div>

            <div className="min-w-0 space-y-8 sm:space-y-12">
              <TabsContent value="profile" className="mt-0 outline-none">
                <ProfileTab />
              </TabsContent>

              {FEATURE_FLAGS.SUBSCRIPTIONS_ENABLED && (
                <TabsContent value="billing" className="mt-0 outline-none">
                  <BillingTab />
                </TabsContent>
              )}

              <TabsContent value="security" className="mt-0 outline-none">
                <SecurityTab />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
}
