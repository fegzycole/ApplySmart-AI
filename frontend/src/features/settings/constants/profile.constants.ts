import { Mail, Phone, MapPin } from "lucide-react";

export const PROFILE_DATA = {
  initials: "JD",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",
  location: "San Francisco, CA"
};

export const NAME_FIELDS = [
  { id: "firstName", label: "First Name", defaultValue: PROFILE_DATA.firstName },
  { id: "lastName", label: "Last Name", defaultValue: PROFILE_DATA.lastName }
];

export const PROFILE_FIELDS = [
  {
    id: "email",
    label: "Email Address",
    type: "email",
    defaultValue: PROFILE_DATA.email,
    icon: Mail
  },
  {
    id: "phone",
    label: "Phone Number",
    type: "tel",
    defaultValue: PROFILE_DATA.phone,
    icon: Phone
  },
  {
    id: "location",
    label: "Location",
    defaultValue: PROFILE_DATA.location,
    icon: MapPin
  }
];
