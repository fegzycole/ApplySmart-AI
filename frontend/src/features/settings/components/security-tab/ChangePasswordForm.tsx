import { Button } from "@/shared/components/ui/button";
import { PasswordField } from "./PasswordField";
import { PASSWORD_FIELDS } from "../../constants/security.constants";

export function ChangePasswordForm() {
  return (
    <div className="space-y-4">
      {PASSWORD_FIELDS.map((field) => (
        <PasswordField key={field.id} {...field} />
      ))}
      <Button className="w-full h-11 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg">
        Update Password
      </Button>
    </div>
  );
}
