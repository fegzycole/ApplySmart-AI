import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useDeleteAccount } from "./useSettingsAccount";
import type { DeleteAccountFormData, DeleteAccountRequest } from "../types/settings.types";
import { getSettingsServerFeedback } from "../utils/settings-security.errors";
import { getSettingsErrorSummary, validateDeleteAccountForm } from "../utils/settings-account.validation";

const EMPTY_FORM: DeleteAccountFormData = {
  confirmationText: "",
};

export function useDeleteAccountFlow() {
  const navigate = useNavigate();
  const deleteAccountMutation = useDeleteAccount();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<DeleteAccountFormData>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof DeleteAccountFormData, string>>>({});
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const reset = () => {
    setValues(EMPTY_FORM);
    setFieldErrors({});
    setFormErrors([]);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      reset();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.id as keyof DeleteAccountFormData;
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

    const validation = validateDeleteAccountForm(values);
    if (validation) {
      setFieldErrors(validation.fieldErrors);
      setFormErrors(getSettingsErrorSummary(validation));
      return;
    }

    try {
      const request: DeleteAccountRequest = { confirmationText: values.confirmationText };
      await deleteAccountMutation.mutateAsync(request);
      toast.success("Your account has been deleted.");
      navigate("/", { replace: true });
    } catch (error) {
      const serverFeedback = getSettingsServerFeedback<DeleteAccountFormData>(
        error,
        ["confirmationText"],
      );
      setFieldErrors(serverFeedback.fieldErrors);
      setFormErrors(serverFeedback.formErrors);
    }
  };

  return {
    open,
    values,
    fieldErrors,
    formErrors,
    isDeleting: deleteAccountMutation.isPending,
    handleOpenChange,
    handleChange,
    handleSubmit,
  };
}
