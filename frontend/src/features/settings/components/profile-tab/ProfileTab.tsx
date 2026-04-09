import { User } from "lucide-react";
import { SectionCard } from "../shared/SectionCard";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileForm } from "./ProfileForm";
import { PROFILE_DATA } from "../../constants/profile.constants";

export function ProfileTab() {
  return (
    <SectionCard
      icon={User}
      title="Profile Information"
      description="Update your personal details"
    >
      <ProfileAvatar initials={PROFILE_DATA.initials} />
      <ProfileForm />
    </SectionCard>
  );
}
