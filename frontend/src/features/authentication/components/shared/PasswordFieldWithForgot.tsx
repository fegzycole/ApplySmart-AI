import { Link } from "react-router";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { FORM_FIELD_STYLES, LINK_TEXT_STYLES } from "../../constants/authentication.constants";

interface PasswordFieldWithForgotProps {
  id: string;
  placeholder: string;
}

export function PasswordFieldWithForgot({ id, placeholder }: PasswordFieldWithForgotProps) {
  return (
    <div className={FORM_FIELD_STYLES.wrapper}>
      <div className="flex justify-between items-center mb-2">
        <Label htmlFor={id} className={FORM_FIELD_STYLES.label}>
          Password
        </Label>
        <Link to="/password-reset" className={LINK_TEXT_STYLES.link}>
          Forgot password?
        </Link>
      </div>
      <div className={FORM_FIELD_STYLES.inputWrapper}>
        <Input
          id={id}
          type="password"
          placeholder={placeholder}
          className={FORM_FIELD_STYLES.input}
        />
        <div className={FORM_FIELD_STYLES.focusGlow} />
      </div>
    </div>
  );
}
