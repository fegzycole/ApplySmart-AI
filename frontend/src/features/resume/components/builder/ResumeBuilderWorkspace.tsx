import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { BuilderPanel } from "./BuilderPanel";
import { LiveResumePreview } from "./LiveResumePreview";
import { ResumeBuilderFormColumn } from "./ResumeBuilderFormColumn";
import { ResumeBuilderPageHeader } from "./ResumeBuilderPageHeader";
import { ThemeSelector } from "./ThemeSelector";
import { MISSION_CONTROL_ANIMATIONS } from "@/shared/constants/animations";
import { BUILDER_LAYOUT_STYLES } from "../../constants/resume-builder.constants";

export function ResumeBuilderWorkspace() {
  return (
    <motion.div 
      variants={MISSION_CONTROL_ANIMATIONS.stagger.container}
      initial="hidden"
      animate="visible"
      className={BUILDER_LAYOUT_STYLES.container}
    >
      <div className={BUILDER_LAYOUT_STYLES.wrapper}>
        <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item} className={BUILDER_LAYOUT_STYLES.heroSection}>
          <ResumeBuilderPageHeader />
        </motion.div>

        <div className={cn(BUILDER_LAYOUT_STYLES.bentoGrid, "gap-6 sm:gap-8 lg:gap-10")}>
          <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item} className="col-span-12 min-w-0">
            <BuilderPanel className="bg-primary/5 border-primary/10 p-6 sm:p-8 lg:p-10">
              <ThemeSelector />
            </BuilderPanel>
          </motion.div>

          <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item} className={cn(BUILDER_LAYOUT_STYLES.mainStage, "col-span-12 min-w-0 space-y-6 sm:space-y-10 xl:col-span-6")}>
            <ResumeBuilderFormColumn />
          </motion.div>

          <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item} className={cn(BUILDER_LAYOUT_STYLES.sideStage, "col-span-12 min-w-0 space-y-6 sm:space-y-10 xl:col-span-6")}>
            <div className="w-full overflow-hidden xl:sticky xl:top-8">
              <LiveResumePreview />
            </div>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
