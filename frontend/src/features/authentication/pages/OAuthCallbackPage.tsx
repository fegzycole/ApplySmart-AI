import { AuthPageShell } from "../components/shared";
import { AUTH_CONTENT } from "../constants";
import { useOAuthCallback } from "../hooks/useOAuthCallback";

export function OAuthCallbackPage() {
  useOAuthCallback();

  return (
    <AuthPageShell
      title={AUTH_CONTENT.oauthCallback.title}
      description={AUTH_CONTENT.oauthCallback.description}
    >
      <div className="space-y-3 text-center text-sm text-zinc-600 dark:text-zinc-400">
        <p>Exchanging your secure login code...</p>
      </div>
    </AuthPageShell>
  );
}
