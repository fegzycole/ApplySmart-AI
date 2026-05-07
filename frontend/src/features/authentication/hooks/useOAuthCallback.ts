import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { ROUTES } from "@/shared/constants";
import { tokenStorage } from "@/shared/utils/token-storage";
import * as authService from "../services/auth.service";
import { AUTH_KEYS } from "./useAuthQueries";
import type { AuthResponse } from "../types/auth.types";

const oauthExchangeRequests = new Map<string, Promise<AuthResponse>>();

function getOrStartOAuthExchange(code: string): Promise<AuthResponse> {
  const existingRequest = oauthExchangeRequests.get(code);
  if (existingRequest) {
    return existingRequest;
  }

  const request = authService.exchangeOAuthCode(code).finally(() => {
    oauthExchangeRequests.delete(code);
  });

  oauthExchangeRequests.set(code, request);
  return request;
}

export function useOAuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const code = searchParams.get("code");
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      toast.error("OAuth sign-in failed");
      navigate(ROUTES.LOGIN, { replace: true });
      return;
    }

    if (!code) {
      navigate(tokenStorage.hasToken() ? ROUTES.DASHBOARD.HOME : ROUTES.LOGIN, { replace: true });
      return;
    }

    if (tokenStorage.hasToken()) {
      navigate(ROUTES.DASHBOARD.HOME, { replace: true });
      return;
    }

    let active = true;

    const completeExchange = async () => {
      try {
        const response = await getOrStartOAuthExchange(code);
        if (!active) {
          return;
        }

        queryClient.setQueryData(AUTH_KEYS.currentUser(), response.user);
        toast.success("Signed in successfully");
        navigate(ROUTES.DASHBOARD.HOME, { replace: true });
      } catch (exchangeError) {
        if (!active) {
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
      active = false;
    };
  }, [code, error, navigate, queryClient]);
}
