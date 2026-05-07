import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { useFormState } from "@/shared/hooks/useFormState";
import type { LoginStage, TwoFactorLoginVerifyRequest } from "../types/auth.types";
import {
  useLogin,
  useVerifyTwoFactorLogin,
} from "./useAuthQueries";
import { getAuthServerFeedback } from "../utils/auth-errors";
import {
  getAuthErrorSummary,
  validateLoginCredentials,
  validateTwoFactorLogin,
} from "../utils/auth-validation";

const INITIAL_CREDENTIALS = {
  email: "",
  password: "",
};

export function useLoginFlow() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { values, handleChange } = useFormState(INITIAL_CREDENTIALS);
  const loginMutation = useLogin();
  const verifyTwoFactorMutation = useVerifyTwoFactorLogin();
  const [credentialErrors, setCredentialErrors] = useState<
    Partial<Record<keyof typeof INITIAL_CREDENTIALS, string>>
  >({});
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [twoFactorErrors, setTwoFactorErrors] = useState<
    Partial<Record<keyof Pick<TwoFactorLoginVerifyRequest, "code">, string>>
  >({});
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [challengeEmail, setChallengeEmail] = useState<string | null>(null);
  const [challengeToken, setChallengeToken] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("passwordChanged") !== "1") {
      return;
    }

    toast.success("Password changed. Please sign in with your new password.");
    navigate("/login", { replace: true });
  }, [navigate, searchParams]);

  const stage: LoginStage = challengeEmail ? "twoFactor" : "credentials";

  const handleCredentialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const field = event.target.id as keyof typeof INITIAL_CREDENTIALS;
    handleChange(event);
    setCredentialErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
    setFormErrors([]);
  };

  const handleTwoFactorCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTwoFactorCode(event.target.value);
    setTwoFactorErrors({});
    setFormErrors([]);
  };

  const submitCredentials = async () => {
    const validation = validateLoginCredentials(values);
    if (validation) {
      setCredentialErrors(validation.fieldErrors);
      setFormErrors(getAuthErrorSummary(validation));
      return;
    }

    try {
      const response = await loginMutation.mutateAsync(values);

      if (response.requiresTwoFactor && response.challengeEmail && response.twoFactorChallengeToken) {
        setChallengeEmail(response.challengeEmail);
        setChallengeToken(response.twoFactorChallengeToken);
        setTwoFactorCode("");
        setTwoFactorErrors({});
        setFormErrors([]);
        toast.success("Open your authenticator app to continue.");
        return;
      }

      toast.success("Logged in successfully");
      navigate("/app");
    } catch (error) {
      const serverFeedback = getAuthServerFeedback(error, ["email", "password"]);
      setCredentialErrors(serverFeedback.fieldErrors);
      setFormErrors(serverFeedback.formErrors);
    }
  };

  const submitTwoFactorChallenge = async () => {
    if (!challengeToken) {
      return;
    }

    const verificationValues: TwoFactorLoginVerifyRequest = {
      challengeToken,
      code: twoFactorCode,
    };
    const validation = validateTwoFactorLogin(verificationValues);

    if (validation) {
      setTwoFactorErrors(validation.fieldErrors);
      setFormErrors(getAuthErrorSummary(validation));
      return;
    }

    try {
      await verifyTwoFactorMutation.mutateAsync(verificationValues);
      toast.success("Logged in successfully");
      navigate("/app");
    } catch (error) {
      const serverFeedback = getAuthServerFeedback(error, ["code"]);
      setTwoFactorErrors(serverFeedback.fieldErrors);
      setFormErrors(serverFeedback.formErrors);
    }
  };

  const resetTwoFactorChallenge = () => {
    setChallengeEmail(null);
    setChallengeToken(null);
    setTwoFactorCode("");
    setTwoFactorErrors({});
    setFormErrors([]);
  };

  return {
    stage,
    challengeEmail,
    credentialValues: values,
    credentialErrors,
    twoFactorCode,
    twoFactorErrors,
    formErrors,
    isSubmittingCredentials: loginMutation.isPending,
    isSubmittingTwoFactor: verifyTwoFactorMutation.isPending,
    handleCredentialChange,
    handleTwoFactorCodeChange,
    submitCredentials,
    submitTwoFactorChallenge,
    resetTwoFactorChallenge,
  };
}
