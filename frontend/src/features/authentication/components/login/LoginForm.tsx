import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { ControlledFormField, PasswordFieldWithForgot } from "../shared";
import { FORM_STYLES, LOGIN_FIELDS } from "../../constants";
import { useLogin } from "../../hooks/useAuthQueries";

export function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await loginMutation.mutateAsync(formData);
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
        value={formData.email}
        onChange={handleChange}
      />

      <PasswordFieldWithForgot
        id={LOGIN_FIELDS[1].id}
        placeholder={LOGIN_FIELDS[1].placeholder}
        value={formData.password}
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
