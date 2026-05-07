import { type FormEvent } from "react";
import { Button } from "@/shared/components/ui/button";
import { AuthFormErrorSummary, ControlledFormField, PasswordFieldWithForgot } from "../shared";
import { AUTH_CONTENT, FORM_STYLES, LOGIN_FIELDS } from "../../constants";
import type { LoginCredentials } from "../../types/auth.types";

interface CredentialsLoginFormProps {
  values: LoginCredentials;
  errors: Partial<Record<keyof LoginCredentials, string>>;
  formErrors: string[];
  isSubmitting: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent) => void;
}

export function CredentialsLoginForm({
  values,
  errors,
  formErrors,
  isSubmitting,
  onChange,
  onSubmit,
}: CredentialsLoginFormProps) {
  return (
    <form noValidate onSubmit={onSubmit} className={FORM_STYLES.form}>
      <AuthFormErrorSummary messages={formErrors} />

      <ControlledFormField
        {...LOGIN_FIELDS[0]}
        value={values.email}
        onChange={onChange}
        error={errors.email}
      />

      <PasswordFieldWithForgot
        id={LOGIN_FIELDS[1].id}
        placeholder={LOGIN_FIELDS[1].placeholder}
        value={values.password}
        onChange={onChange}
        error={errors.password}
      />

      <Button
        type="submit"
        className={FORM_STYLES.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in..." : AUTH_CONTENT.login.submitButton}
      </Button>
    </form>
  );
}
