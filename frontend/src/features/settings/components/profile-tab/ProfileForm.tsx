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

      <div className="pt-8 flex flex-col sm:flex-row sm:justify-end">
        <Button
          type="submit"
          disabled={isLoading || isSaving || !profile}
          className="relative h-16 px-10 rounded-2xl bg-zinc-900 dark:bg-sky-600 text-white font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-zinc-900/20 dark:shadow-sky-900/20 hover:scale-105 active:scale-95 transition-all overflow-hidden group/btn"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
          <Check className="size-4 mr-3" />
          {isSaving ? "Updating Identity..." : "Commit Changes"}
        </Button>
      </div>
    </form>
  );
}
