import { SignupForm } from "../components/signup";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { DecorativeBackground, AuthNavigation, AuthCardHeader, OAuthButtons, LinkText } from "../components/shared";
import { AUTH_PAGE_STYLES, AUTH_CARD_STYLES, AUTH_CONTENT } from "@/features/authentication/constants";

export function SignupPage() {
  return (
    <div className={AUTH_PAGE_STYLES.container}>
      <DecorativeBackground />
      <AuthNavigation />

      <div className={AUTH_PAGE_STYLES.contentWrapper}>
        <Card className={AUTH_CARD_STYLES.card}>
          <CardHeader>
            <AuthCardHeader
              title={AUTH_CONTENT.signup.title}
              description={AUTH_CONTENT.signup.description}
            />
          </CardHeader>
          <CardContent>
            <SignupForm />

            <OAuthButtons />

            <LinkText
              text={AUTH_CONTENT.signup.footer}
              linkText={AUTH_CONTENT.signup.footerLink}
              linkPath={AUTH_CONTENT.signup.footerLinkPath}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}