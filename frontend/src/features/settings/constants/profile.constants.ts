import { Mail } from "lucide-react";

export const PROFILE_EDITABLE_FIELDS = [
  {
    id: "firstName",
    label: "First Name",
    placeholder: "John",
  },
  {
    id: "lastName",
    label: "Last Name",
    placeholder: "Doe",
  },
];

export const PROFILE_EMAIL_FIELD = {
  id: "email",
  label: "Email Address",
  type: "email",
  icon: Mail,
} as const;
