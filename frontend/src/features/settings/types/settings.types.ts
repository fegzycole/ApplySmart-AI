import { type LucideIcon } from "lucide-react";

export interface SettingsTab {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  defaultChecked: boolean;
  gradient: string;
  border: string;
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
}

export interface BillingPlan {
  name: string;
  price: string;
  period: string;
  status: string;
  renewalDate: string;
}

export interface Invoice {
  date: string;
  amount: string;
  status: string;
  description: string;
}
