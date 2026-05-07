import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { Check } from "lucide-react";
import { FormField, SettingsFormErrorSummary } from "../shared";
import { PROFILE_EDITABLE_FIELDS, PROFILE_EMAIL_FIELD } from "../../constants/profile.constants";
import type {
  ProfileFormData,
  SettingsProfile,
  UpdateProfileRequest,
} from "../../types/settings.types";
import { getProfileServerFeedback } from "../../utils/settings-errors";
import {
  getSettingsErrorSummary,
  validateProfileForm,
} from "../../utils/settings-profile.validation";

interface ProfileFormProps {
  profile?: SettingsProfile;
  isLoading: boolean;
  isSaving: boolean;
  onSubmit: (data: UpdateProfileRequest) => Promise<void>;
}

const EMPTY_PROFILE_FORM: ProfileFormData = {
  firstName: "",
  lastName: "",
};

export function ProfileForm({
  profile,
  isLoading,
  isSaving,
  onSubmit,
}: ProfileFormProps) {
  const [values, setValues] = useState<ProfileFormData>(EMPTY_PROFILE_FORM);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ProfileFormData, string>>>({});
  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!profile) {
      return;
    }

    setValues({
      firstName: profile.firstName,
      lastName: profile.lastName,
    });
    setFieldErrors({});
    setFormErrors([]);
  }, [profile]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const field = event.target.id as keyof ProfileFormData;
    const nextValue = event.target.value;

    setValues((currentValues) => ({
      ...currentValues,
      [field]: nextValue,
    }));

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

    const validation = validateProfileForm(values);
    if (validation) {
      setFieldErrors(validation.fieldErrors);
      setFormErrors(getSettingsErrorSummary(validation));
      return;
    }

    try {
      await onSubmit(values);
      setFieldErrors({});
      setFormErrors([]);
      toast.success("Profile updated successfully.");
    } catch (error) {
      const serverFeedback = getProfileServerFeedback(error);
      setFieldErrors(serverFeedback.fieldErrors);
      setFormErrors(serverFeedback.formErrors);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5">
      <SettingsFormErrorSummary messages={formErrors} />

      <div className="grid gap-4 md:grid-cols-2">
        {PROFILE_EDITABLE_FIELDS.map((field) => (
          <FormField
            key={field.id}
            id={field.id}
            label={field.label}
            value={values[field.id as keyof ProfileFormData]}
            onChange={handleChange}
            placeholder={field.placeholder}
            error={fieldErrors[field.id as keyof ProfileFormData]}
            disabled={isLoading || isSaving}
          />
        ))}
      </div>

      <FormField
        id={PROFILE_EMAIL_FIELD.id}
        label={PROFILE_EMAIL_FIELD.label}
        type={PROFILE_EMAIL_FIELD.type}
        value={profile?.email ?? ""}
        icon={PROFILE_EMAIL_FIELD.icon}
        disabled
      />

      <Button
        type="submit"
        disabled={isLoading || isSaving || !profile}
        className="h-12 w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg hover:from-violet-700 hover:to-fuchsia-700 md:w-auto"
      >
        <Check className="size-4 mr-2" />
        {isSaving ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
