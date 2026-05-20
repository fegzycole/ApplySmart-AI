import { motion } from "framer-motion";
import { BuilderPanel } from "./BuilderPanel";
import { CertificationsSection } from "./CertificationsSection";
import { EducationSection } from "./EducationSection";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { ProjectsSection } from "./ProjectsSection";
import { SkillsSection } from "./SkillsSection";
import { SummarySection } from "./SummarySection";
import { WorkExperienceSection } from "./WorkExperienceSection";
import { MISSION_CONTROL_ANIMATIONS } from "@/shared/constants/animations";

export function ResumeBuilderFormColumn() {
  return (
    <motion.div 
      variants={MISSION_CONTROL_ANIMATIONS.stagger.container}
      initial="hidden"
      animate="visible"
      className="min-w-0 space-y-5 sm:space-y-8"
    >
      <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
        <BuilderPanel>
          <PersonalInfoSection />
        </BuilderPanel>
      </motion.div>

      <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
        <BuilderPanel>
          <SummarySection />
        </BuilderPanel>
      </motion.div>

      <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
        <BuilderPanel>
          <WorkExperienceSection />
        </BuilderPanel>
      </motion.div>

      <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
        <BuilderPanel>
          <EducationSection />
        </BuilderPanel>
      </motion.div>

      <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
        <BuilderPanel>
          <SkillsSection />
        </BuilderPanel>
      </motion.div>

      <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
        <BuilderPanel>
          <ProjectsSection />
        </BuilderPanel>
      </motion.div>

      <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
        <BuilderPanel>
          <CertificationsSection />
        </BuilderPanel>
      </motion.div>
    </motion.div>
  );
}
