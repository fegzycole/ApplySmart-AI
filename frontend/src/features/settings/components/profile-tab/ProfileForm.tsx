import { Button } from "@/shared/components/ui/button";
import { Check } from "lucide-react";
import { FormField } from "../shared/FormField";
import { PROFILE_FIELDS } from "../../constants/profile.constants";
import type { User } from "@/features/authentication/types/auth.types";

interface ProfileFormProps {
  user?: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="firstName"
          label="First Name"
          defaultValue={user?.firstName || ''}
        />
        <FormField
          id="lastName"
          label="Last Name"
          defaultValue={user?.lastName || ''}
        />
      </div>

      <FormField
        id="email"
        label="Email Address"
        type="email"
        defaultValue={user?.email || ''}
        icon={PROFILE_FIELDS[0].icon}
      />

      {PROFILE_FIELDS.slice(1).map((field) => (
        <FormField key={field.id} {...field} />
      ))}

      <Button className="w-full h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg">
        <Check className="size-4 mr-2" />
        Save Changes
      </Button>
    </>
  );
}
