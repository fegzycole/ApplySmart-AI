import { PasswordResetForm } from "../components/password-reset";
import { AuthPageShell } from "../components/shared";
import { AUTH_CONTENT } from "../constants";

export function PasswordResetPage() {
  return (
    <AuthPageShell
      title={AUTH_CONTENT.passwordReset.title}
      description={AUTH_CONTENT.passwordReset.description}
      footerText={AUTH_CONTENT.passwordReset.footer}
      footerLinkText={AUTH_CONTENT.passwordReset.footerLink}
      footerLinkPath={AUTH_CONTENT.passwordReset.footerLinkPath}
    >
      <PasswordResetForm />
    </AuthPageShell>
  );
}
