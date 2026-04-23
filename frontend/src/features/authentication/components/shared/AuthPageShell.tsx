import type { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { AUTH_CARD_STYLES, AUTH_PAGE_STYLES } from "../../constants";
import { AuthCardHeader } from "./AuthCardHeader";
import { AuthNavigation } from "./AuthNavigation";
import { DecorativeBackground } from "./DecorativeBackground";
import { LinkText } from "./LinkText";
import { OAuthButtons } from "./OAuthButtons";

interface AuthPageShellProps {
  title: string;
  description: string;
  footerText?: string;
  footerLinkText?: string;
  footerLinkPath?: string;
  showOAuth?: boolean;
  children: ReactNode;
}

export function AuthPageShell({
  title,
  description,
  footerText,
  footerLinkText,
  footerLinkPath,
  showOAuth = false,
  children,
}: AuthPageShellProps) {
  return (
    <div className={AUTH_PAGE_STYLES.container}>
      <DecorativeBackground />
      <AuthNavigation />

      <div className={AUTH_PAGE_STYLES.contentWrapper}>
        <Card className={AUTH_CARD_STYLES.card}>
          <CardHeader>
            <AuthCardHeader title={title} description={description} />
          </CardHeader>
          <CardContent>
            {children}
            {showOAuth && <OAuthButtons />}
            {footerText && footerLinkText && footerLinkPath && (
              <LinkText
                text={footerText}
                linkText={footerLinkText}
                linkPath={footerLinkPath}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
