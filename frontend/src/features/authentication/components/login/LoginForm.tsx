import { type FormEvent } from "react";
import type { LoginCredentials, LoginStage } from "../../types/auth.types";
import { CredentialsLoginForm } from "./CredentialsLoginForm";
import { TwoFactorLoginForm } from "./TwoFactorLoginForm";

interface LoginFormProps {
  stage: LoginStage;
  credentialValues: LoginCredentials;
  credentialErrors: Partial<Record<keyof LoginCredentials, string>>;
  twoFactorCode: string;
  twoFactorErrors: Partial<Record<"code", string>>;
  formErrors: string[];
  challengeEmail: string | null;
  isSubmittingCredentials: boolean;
  isSubmittingTwoFactor: boolean;
  onCredentialChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTwoFactorCodeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitCredentials: (event: FormEvent) => void;
  onSubmitTwoFactor: (event: FormEvent) => void;
  onBackFromTwoFactor: () => void;
}

export function LoginForm({
  stage,
  credentialValues,
  credentialErrors,
  twoFactorCode,
  twoFactorErrors,
  formErrors,
  challengeEmail,
  isSubmittingCredentials,
  isSubmittingTwoFactor,
  onCredentialChange,
  onTwoFactorCodeChange,
  onSubmitCredentials,
  onSubmitTwoFactor,
  onBackFromTwoFactor,
}: LoginFormProps) {
  if (stage === "twoFactor" && challengeEmail) {
    return (
      <TwoFactorLoginForm
        challengeEmail={challengeEmail}
        code={twoFactorCode}
        errors={twoFactorErrors}
        formErrors={formErrors}
        isSubmitting={isSubmittingTwoFactor}
        onCodeChange={onTwoFactorCodeChange}
        onSubmit={onSubmitTwoFactor}
        onBack={onBackFromTwoFactor}
      />
    );
  }

  return (
    <CredentialsLoginForm
      values={credentialValues}
      errors={credentialErrors}
      formErrors={formErrors}
      isSubmitting={isSubmittingCredentials}
      onChange={onCredentialChange}
      onSubmit={onSubmitCredentials}
    />
  );
}
