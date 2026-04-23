import { Button } from "@/shared/components/ui/button";
import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";
import { resolveBackendUrl } from "@/shared/services/api-client";
import { OAUTH_STYLES, AUTH_CONTENT, GOOGLE_ICON_SVG, GITHUB_ICON_SVG } from "../../constants/authentication.constants";

export function OAuthButtons() {
  const redirectToProvider = (path: string) => {
    window.location.assign(resolveBackendUrl(path));
  };

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
        <Button
          type="button"
          variant="outline"
          className={OAUTH_STYLES.buttons.button}
          onClick={() => redirectToProvider(API_ENDPOINTS.AUTH.OAUTH_GOOGLE_AUTHORIZE)}
        >
          {GOOGLE_ICON_SVG}
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className={OAUTH_STYLES.buttons.button}
          onClick={() => redirectToProvider(API_ENDPOINTS.AUTH.OAUTH_GITHUB_AUTHORIZE)}
        >
          {GITHUB_ICON_SVG}
          GitHub
        </Button>
      </div>
    </div>
  );
}
