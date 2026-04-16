import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { ControlledFormField } from "../shared";
import { FORM_STYLES, SIGNUP_FIELDS } from "../../constants";
import { useSignup } from "../../hooks/useAuthQueries";

export function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const signupMutation = useSignup();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await signupMutation.mutateAsync(formData);
      toast.success(response.message);
      navigate("/verify-email", { state: { email: formData.email } });
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
          value={formData[field.id as keyof typeof formData]}
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
