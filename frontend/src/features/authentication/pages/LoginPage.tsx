import { Link } from "react-router";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { DecorativeBackground, AuthNavigation, AuthCardHeader, FormField, PasswordFieldWithForgot, OAuthButtons, LinkText } from "../components/shared";
import { AUTH_PAGE_STYLES, AUTH_CARD_STYLES, FORM_STYLES, LOGIN_FIELDS, AUTH_CONTENT } from "../constants/authentication.constants";

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
            <form className={FORM_STYLES.form}>
              <FormField {...LOGIN_FIELDS[0]} />
              <PasswordFieldWithForgot
                id={LOGIN_FIELDS[1].id}
                placeholder={LOGIN_FIELDS[1].placeholder}
              />
              <Link to="/app">
                <Button className={FORM_STYLES.submitButton}>
                  {AUTH_CONTENT.login.submitButton}
                </Button>
              </Link>
            </form>

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