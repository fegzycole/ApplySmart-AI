import { useLocation } from "react-router";
import { VerifyEmailForm } from "../components/verify-email";
import { AuthPageShell } from "../components/shared";
import { AUTH_CONTENT } from "@/features/authentication/constants";

export function VerifyEmailPage() {
  const location = useLocation();
  const email = location.state?.email || "";
  const description = email
    ? `${AUTH_CONTENT.verifyEmail.description}: ${email}`
    : AUTH_CONTENT.verifyEmail.description;

  return (
    <AuthPageShell
      title={AUTH_CONTENT.verifyEmail.title}
      description={description}
      footerText={AUTH_CONTENT.verifyEmail.footer}
      footerLinkText={AUTH_CONTENT.verifyEmail.footerLink}
      footerLinkPath={AUTH_CONTENT.verifyEmail.footerLinkPath}
    >
      <VerifyEmailForm email={email} />
    </AuthPageShell>
  );
}
