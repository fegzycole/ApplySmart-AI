import { FormEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { useFormState } from "@/shared/hooks/useFormState";
import { ControlledFormField, PasswordFieldWithForgot } from "../shared";
import { FORM_STYLES, LOGIN_FIELDS } from "../../constants";
import { useLogin } from "../../hooks/useAuthQueries";

const initialValues = {
  email: "",
  password: "",
};

export function LoginForm() {
  const navigate = useNavigate();
  const { values, handleChange, hasEmptyRequiredFields } = useFormState(initialValues);
  const loginMutation = useLogin();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (hasEmptyRequiredFields(["email", "password"])) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await loginMutation.mutateAsync(values);
      toast.success("Logged in successfully");
      navigate("/app");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={FORM_STYLES.form}>
      <ControlledFormField
        {...LOGIN_FIELDS[0]}
        value={values.email}
        onChange={handleChange}
      />

      <PasswordFieldWithForgot
        id={LOGIN_FIELDS[1].id}
        placeholder={LOGIN_FIELDS[1].placeholder}
        value={values.password}
        onChange={handleChange}
      />

      <Button
        type="submit"
        className={FORM_STYLES.submitButton}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
