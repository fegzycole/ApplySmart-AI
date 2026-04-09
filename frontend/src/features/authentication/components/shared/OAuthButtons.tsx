import { Button } from "@/shared/components/ui/button";
import { OAUTH_STYLES, AUTH_CONTENT, GOOGLE_ICON_SVG, GITHUB_ICON_SVG } from "../../constants/authentication.constants";

export function OAuthButtons() {
  return (
    <div className={OAUTH_STYLES.wrapper}>
      <div className={OAUTH_STYLES.divider.container}>
        <div className={OAUTH_STYLES.divider.line}>
          <div className={OAUTH_STYLES.divider.border} />
        </div>
        <div className={OAUTH_STYLES.divider.textWrapper}>
          <span className={OAUTH_STYLES.divider.text}>
            {AUTH_CONTENT.oauth.dividerText}
          </span>
        </div>
      </div>

      <div className={OAUTH_STYLES.buttons.container}>
        <Button variant="outline" className={OAUTH_STYLES.buttons.button}>
          {GOOGLE_ICON_SVG}
          Google
        </Button>
        <Button variant="outline" className={OAUTH_STYLES.buttons.button}>
          {GITHUB_ICON_SVG}
          GitHub
        </Button>
      </div>
    </div>
  );
}
