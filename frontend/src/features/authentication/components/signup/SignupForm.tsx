import { FormEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { useFormState } from "@/shared/hooks/useFormState";
import { ControlledFormField } from "../shared";
import { FORM_STYLES, SIGNUP_FIELDS } from "../../constants";
import { useSignup } from "../../hooks/useAuthQueries";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export function SignupForm() {
  const navigate = useNavigate();
  const { values, handleChange, hasEmptyRequiredFields } = useFormState(initialValues);
  const signupMutation = useSignup();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (hasEmptyRequiredFields(["firstName", "lastName", "email", "password"])) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await signupMutation.mutateAsync(values);
      toast.success(response.message);
      navigate("/verify-email", { state: { email: values.email } });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create account");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={FORM_STYLES.form}>
      {SIGNUP_FIELDS.map((field) => (
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
        disabled={signupMutation.isPending}
      >
        {signupMutation.isPending ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
