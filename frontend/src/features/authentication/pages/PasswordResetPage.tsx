import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { DecorativeBackground, AuthNavigation, AuthCardHeader, FormField, LinkText } from "../components/shared";
import { AUTH_PAGE_STYLES, AUTH_CARD_STYLES, FORM_STYLES, PASSWORD_RESET_FIELDS, AUTH_CONTENT } from "../constants/authentication.constants";

export function PasswordResetPage() {
  return (
    <div className={AUTH_PAGE_STYLES.container}>
      <DecorativeBackground />
      <AuthNavigation />

      <div className={AUTH_PAGE_STYLES.contentWrapper}>
        <Card className={AUTH_CARD_STYLES.card}>
          <CardHeader>
            <AuthCardHeader
              title={AUTH_CONTENT.passwordReset.title}
              description={AUTH_CONTENT.passwordReset.description}
            />
          </CardHeader>
          <CardContent>
            <form className={FORM_STYLES.form}>
              {PASSWORD_RESET_FIELDS.map((field) => (
                <FormField key={field.id} {...field} />
              ))}
              <Button className={FORM_STYLES.submitButton}>
                {AUTH_CONTENT.passwordReset.submitButton}
              </Button>
            </form>

            <LinkText
              text={AUTH_CONTENT.passwordReset.footer}
              linkText={AUTH_CONTENT.passwordReset.footerLink}
              linkPath={AUTH_CONTENT.passwordReset.footerLinkPath}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
