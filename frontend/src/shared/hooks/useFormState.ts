import { useState } from "react";

export function useFormState<T extends Record<string, string>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [id]: value,
    }));
  };

  const hasEmptyRequiredFields = (fields: Array<keyof T>) => {
    return fields.some((field) => !values[field]);
  };

  return {
    values,
    setValues,
    handleChange,
    hasEmptyRequiredFields,
  };
}
