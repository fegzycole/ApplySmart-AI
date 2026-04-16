import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { ControlledFormField } from "../shared";
import { FORM_STYLES, VERIFY_EMAIL_FIELD, AUTH_CONTENT } from "../../constants";
import { useVerifyEmail, useResendVerification } from "../../hooks/useAuthQueries";

interface VerifyEmailFormProps {
  email: string;
}

export function VerifyEmailForm({ email }: VerifyEmailFormProps) {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const verifyEmailMutation = useVerifyEmail();
  const resendVerificationMutation = useResendVerification();

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email not found. Please sign up again.");
      navigate("/signup");
      return;
    }

    if (!code || code.length !== 6) {
      toast.error("Please enter a valid 6-digit verification code");
      return;
    }

    try {
      await verifyEmailMutation.mutateAsync({ email, code });
      toast.success("Email verified successfully. Please log in to continue.");
      navigate("/login", { state: { email } });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Invalid or expired verification code");
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error("Email not found. Please sign up again.");
      return;
    }

    try {
      await resendVerificationMutation.mutateAsync(email);
      toast.success("A new verification code has been sent to your email.");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to resend verification code");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={FORM_STYLES.form}>
        <ControlledFormField
          {...VERIFY_EMAIL_FIELD}
          value={code}
          onChange={handleCodeChange}
        />

        <Button
          type="submit"
          className={FORM_STYLES.submitButton}
          disabled={verifyEmailMutation.isPending}
        >
          {verifyEmailMutation.isPending ? "Verifying..." : AUTH_CONTENT.verifyEmail.submitButton}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Button
          type="button"
          variant="ghost"
          onClick={handleResendCode}
          disabled={resendVerificationMutation.isPending}
          className="text-sm bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent hover:from-violet-700 hover:to-fuchsia-700 font-semibold cursor-pointer"
        >
          {resendVerificationMutation.isPending ? "Sending..." : AUTH_CONTENT.verifyEmail.resendButton}
        </Button>
      </div>
    </>
  );
}
