import { LoginForm } from "../components/login";
import { AuthPageShell } from "../components/shared";
import { AUTH_CONTENT } from "../constants";

export function LoginPage() {
  return (
    <AuthPageShell
      title={AUTH_CONTENT.login.title}
      description={AUTH_CONTENT.login.description}
      footerText={AUTH_CONTENT.login.footer}
      footerLinkText={AUTH_CONTENT.login.footerLink}
      footerLinkPath={AUTH_CONTENT.login.footerLinkPath}
      showOAuth
    >
      <LoginForm />
    </AuthPageShell>
  );
}
