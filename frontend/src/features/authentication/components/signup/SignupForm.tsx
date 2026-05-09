import { FormEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { useFormState } from "@/shared/hooks/useFormState";
import { AuthFormErrorSummary, ControlledFormField } from "../shared";
import { FORM_STYLES, SIGNUP_FIELDS } from "../../constants";
import { useSignup } from "../../hooks/useAuthQueries";
import { getAuthServerFeedback } from "../../utils/auth-errors";
import { getAuthErrorSummary, validateSignupData } from "../../utils/auth-validation";
import { useState } from "react";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export function SignupForm() {
  const navigate = useNavigate();
  const { values, handleChange } = useFormState(initialValues);
  const signupMutation = useSignup();
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof typeof initialValues, string>>>({});
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const field = event.target.id as keyof typeof initialValues;
    handleChange(event);
    setFieldErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
    setFormErrors([]);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const validation = validateSignupData(values);
    if (validation) {
      setFieldErrors(validation.fieldErrors);
      setFormErrors(getAuthErrorSummary(validation));
      return;
    }

    try {
      const response = await signupMutation.mutateAsync(values);
      toast.success(response.message);
      navigate("/verify-email", { state: { email: values.email } });
    } catch (error) {
      const serverFeedback = getAuthServerFeedback(error, ["firstName", "lastName", "email", "password"]);
      setFieldErrors(serverFeedback.fieldErrors);
      setFormErrors(serverFeedback.formErrors);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className={FORM_STYLES.form}>
      <AuthFormErrorSummary messages={formErrors} />

      {/* First + Last name side by side */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {SIGNUP_FIELDS.slice(0, 2).map((field) => (
          <ControlledFormField
            key={field.id}
            {...field}
            value={values[field.id as keyof typeof values]}
            onChange={handleFieldChange}
            error={fieldErrors[field.id as keyof typeof fieldErrors]}
          />
        ))}
      </div>

      {/* Email + Password */}
      {SIGNUP_FIELDS.slice(2).map((field) => (
        <ControlledFormField
          key={field.id}
          {...field}
          value={values[field.id as keyof typeof values]}
          onChange={handleFieldChange}
          error={fieldErrors[field.id as keyof typeof fieldErrors]}
        />
      ))}

      <Button
        type="submit"
        className={FORM_STYLES.submitButton}
        disabled={signupMutation.isPending}
      >
        {signupMutation.isPending ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
