import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { ROUTES } from "@/shared/constants";
import { tokenStorage } from "@/shared/utils/token-storage";
import { AuthPageShell } from "../components/shared";
import { AUTH_CONTENT } from "../constants";
import { useExchangeOAuthCode } from "../hooks/useAuthQueries";

export function OAuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mutateAsync: exchangeOAuthCode, isPending } = useExchangeOAuthCode();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    window.history.replaceState({}, document.title, window.location.pathname);

    if (error) {
      toast.error("OAuth sign-in failed");
      navigate(ROUTES.LOGIN, { replace: true });
      return;
    }

    if (!code) {
      navigate(tokenStorage.hasToken() ? ROUTES.DASHBOARD.HOME : ROUTES.LOGIN, { replace: true });
      return;
    }

    let cancelled = false;

    const completeExchange = async () => {
      try {
        await exchangeOAuthCode(code);
        if (cancelled) {
          return;
        }

        toast.success("Signed in successfully");
        navigate(ROUTES.DASHBOARD.HOME, { replace: true });
      } catch (exchangeError) {
        if (cancelled) {
          return;
        }

        const message = exchangeError instanceof Error
          ? exchangeError.message
          : "OAuth sign-in failed";
        toast.error(message);
        navigate(ROUTES.LOGIN, { replace: true });
      }
    };

    void completeExchange();

    return () => {
      cancelled = true;
    };
  }, [exchangeOAuthCode, navigate, searchParams]);

  return (
    <AuthPageShell
      title={AUTH_CONTENT.oauthCallback.title}
      description={AUTH_CONTENT.oauthCallback.description}
    >
      <div className="space-y-3 text-center text-sm text-zinc-600 dark:text-zinc-400">
        <p>{isPending ? "Exchanging your secure login code..." : "Redirecting..."}</p>
      </div>
    </AuthPageShell>
  );
}
