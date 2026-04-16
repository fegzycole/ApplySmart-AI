import { useLocation } from "react-router";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { VerifyEmailForm } from "../components/verify-email";
import { DecorativeBackground, AuthNavigation, AuthCardHeader, LinkText } from "../components/shared";
import { AUTH_PAGE_STYLES, AUTH_CARD_STYLES, AUTH_CONTENT } from "@/features/authentication/constants";

export function VerifyEmailPage() {
  const location = useLocation();
  const email = location.state?.email || "";

  return (
    <div className={AUTH_PAGE_STYLES.container}>
      <DecorativeBackground />
      <AuthNavigation />

      <div className={AUTH_PAGE_STYLES.contentWrapper}>
        <Card className={AUTH_CARD_STYLES.card}>
          <CardHeader>
            <AuthCardHeader
              title={AUTH_CONTENT.verifyEmail.title}
              description={email ? `${AUTH_CONTENT.verifyEmail.description}: ${email}` : AUTH_CONTENT.verifyEmail.description}
            />
          </CardHeader>
          <CardContent>
            <VerifyEmailForm email={email} />

            <LinkText
              text={AUTH_CONTENT.verifyEmail.footer}
              linkText={AUTH_CONTENT.verifyEmail.footerLink}
              linkPath={AUTH_CONTENT.verifyEmail.footerLinkPath}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
