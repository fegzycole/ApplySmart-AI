import { type FormEvent } from "react";
import { Button } from "@/shared/components/ui/button";
import { AuthFormErrorSummary, ControlledFormField } from "../shared";
import { AUTH_CONTENT, FORM_STYLES, TWO_FACTOR_LOGIN_FIELD } from "../../constants";

interface TwoFactorLoginFormProps {
  challengeEmail: string;
  code: string;
  errors: Partial<Record<"code", string>>;
  formErrors: string[];
  isSubmitting: boolean;
  onCodeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent) => void;
  onBack: () => void;
}

export function TwoFactorLoginForm({
  challengeEmail,
  code,
  errors,
  formErrors,
  isSubmitting,
  onCodeChange,
  onSubmit,
  onBack,
}: TwoFactorLoginFormProps) {
  return (
    <form noValidate onSubmit={onSubmit} className={FORM_STYLES.form}>
      <AuthFormErrorSummary messages={formErrors} />

      <div className="rounded-xl sm:rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm leading-6 text-foreground dark:text-foreground">
        Enter the 6-digit code from your authenticator app for <span className="font-medium">{challengeEmail}</span>.
      </div>

      <ControlledFormField
        {...TWO_FACTOR_LOGIN_FIELD}
        value={code}
        onChange={onCodeChange}
        error={errors.code}
      />

      <Button
        type="submit"
        className={FORM_STYLES.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Verifying..." : AUTH_CONTENT.loginTwoFactor.submitButton}
      </Button>

      <Button
        type="button"
        variant="ghost"
        className="w-full cursor-pointer rounded-xl"
        onClick={onBack}
      >
        {AUTH_CONTENT.loginTwoFactor.backButton}
      </Button>
    </form>
  );
}
