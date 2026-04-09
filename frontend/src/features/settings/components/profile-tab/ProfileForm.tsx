import { Button } from "@/shared/components/ui/button";
import { Check } from "lucide-react";
import { FormField } from "../shared/FormField";
import { NAME_FIELDS, PROFILE_FIELDS } from "../../constants/profile.constants";

export function ProfileForm() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {NAME_FIELDS.map((field) => (
          <FormField key={field.id} {...field} />
        ))}
      </div>

      {PROFILE_FIELDS.map((field) => (
        <FormField key={field.id} {...field} />
      ))}

      <Button className="w-full h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg">
        <Check className="size-4 mr-2" />
        Save Changes
      </Button>
    </>
  );
}
