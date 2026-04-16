import { User } from "lucide-react";
import { SectionCard } from "../shared/SectionCard";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileForm } from "./ProfileForm";
import { useCurrentUser } from "@/features/authentication/hooks/useAuthQueries";
import { getInitials } from "@/shared/utils/user.utils";

export function ProfileTab() {
  const { data: user } = useCurrentUser();
  const initials = user ? getInitials(user.firstName, user.lastName) : 'U';

  return (
    <SectionCard
      icon={User}
      title="Profile Information"
      description="Update your personal details"
    >
      <ProfileAvatar initials={initials} />
      <ProfileForm user={user} />
    </SectionCard>
  );
}
