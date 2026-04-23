import { FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { useFormState } from "@/shared/hooks/useFormState";
import { AUTH_CONTENT, FORM_STYLES, PASSWORD_RESET_FIELDS } from "../../constants";
import { useResetPassword } from "../../hooks/useAuthQueries";
import { ControlledFormField } from "../shared";

const initialValues = {
  email: "",
};

export function PasswordResetForm() {
  const { values, handleChange, hasEmptyRequiredFields } = useFormState(initialValues);
  const resetPasswordMutation = useResetPassword();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (hasEmptyRequiredFields(["email"])) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync(values);
      toast.success("Password reset instructions have been sent to your email.");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to send reset instructions");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={FORM_STYLES.form}>
      {PASSWORD_RESET_FIELDS.map((field) => (
        <ControlledFormField
          key={field.id}
          {...field}
          value={values[field.id as keyof typeof values]}
          onChange={handleChange}
        />
      ))}
      <Button
        type="submit"
        className={FORM_STYLES.submitButton}
        disabled={resetPasswordMutation.isPending}
      >
        {resetPasswordMutation.isPending ? "Sending..." : AUTH_CONTENT.passwordReset.submitButton}
      </Button>
    </form>
  );
}
