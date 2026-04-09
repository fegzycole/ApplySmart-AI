import { Shield } from "lucide-react";
import { SectionCard } from "../shared/SectionCard";
import { SecuritySection } from "./SecuritySection";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { TwoFactorAuthToggle } from "./TwoFactorAuthToggle";
import { ActiveSessionsList } from "./ActiveSessionsList";
import { DangerZone } from "../danger-zone/DangerZone";
import { SECURITY_SECTIONS } from "../../constants/security.constants";

export function SecurityTab() {
  return (
    <>
      <SectionCard
        icon={Shield}
        title="Security Settings"
        description="Manage your account security"
        iconGradient="from-emerald-500 to-teal-500"
      >
        <SecuritySection {...SECURITY_SECTIONS[0]}>
          <ChangePasswordForm />
        </SecuritySection>

        <SecuritySection {...SECURITY_SECTIONS[1]}>
          <TwoFactorAuthToggle
            title={SECURITY_SECTIONS[1].title}
            description={SECURITY_SECTIONS[1].description!}
          />
        </SecuritySection>

        <SecuritySection {...SECURITY_SECTIONS[2]}>
          <ActiveSessionsList />
        </SecuritySection>
      </SectionCard>

      <DangerZone />
    </>
  );
}
