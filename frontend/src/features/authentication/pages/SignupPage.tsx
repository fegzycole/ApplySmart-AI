import { SignupForm } from "../components/signup";
import { AuthPageShell } from "../components/shared";
import { AUTH_CONTENT } from "@/features/authentication/constants";

export function SignupPage() {
  return (
    <AuthPageShell
      title={AUTH_CONTENT.signup.title}
      description={AUTH_CONTENT.signup.description}
      footerText={AUTH_CONTENT.signup.footer}
      footerLinkText={AUTH_CONTENT.signup.footerLink}
      footerLinkPath={AUTH_CONTENT.signup.footerLinkPath}
      showOAuth
    >
      <SignupForm />
    </AuthPageShell>
  );
}
