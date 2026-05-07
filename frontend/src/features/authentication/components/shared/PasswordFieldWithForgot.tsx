import { Link } from "react-router";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { FORM_FIELD_STYLES, LINK_TEXT_STYLES } from "../../constants/authentication.constants";

interface PasswordFieldWithForgotProps {
  id: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function PasswordFieldWithForgot({
  id,
  placeholder,
  value,
  onChange,
  error,
}: PasswordFieldWithForgotProps) {
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
          value={value}
          onChange={onChange}
          className={FORM_FIELD_STYLES.input}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <div className={FORM_FIELD_STYLES.focusGlow} />
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
