import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { LoginForm } from "../components/login";
import { DecorativeBackground, AuthNavigation, AuthCardHeader, OAuthButtons, LinkText } from "../components/shared";
import { AUTH_PAGE_STYLES, AUTH_CARD_STYLES, AUTH_CONTENT } from "../constants/authentication.constants";

export function LoginPage() {
  return (
    <div className={AUTH_PAGE_STYLES.container}>
      <DecorativeBackground />
      <AuthNavigation />

      <div className={AUTH_PAGE_STYLES.contentWrapper}>
        <Card className={AUTH_CARD_STYLES.card}>
          <CardHeader>
            <AuthCardHeader
              title={AUTH_CONTENT.login.title}
              description={AUTH_CONTENT.login.description}
            />
          </CardHeader>
          <CardContent>
            <LoginForm />

            <OAuthButtons />

            <LinkText
              text={AUTH_CONTENT.login.footer}
              linkText={AUTH_CONTENT.login.footerLink}
              linkPath={AUTH_CONTENT.login.footerLinkPath}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}