import { Mail, Phone, MapPin } from "lucide-react";

export const PROFILE_FIELDS = [
  {
    id: "email",
    label: "Email Address",
    type: "email",
    defaultValue: "",
    icon: Mail
  },
  {
    id: "phone",
    label: "Phone Number",
    type: "tel",
    defaultValue: "",
    icon: Phone
  },
  {
    id: "location",
    label: "Location",
    defaultValue: "",
    icon: MapPin
  }
];
