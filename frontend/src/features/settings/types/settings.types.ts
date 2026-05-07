import { type LucideIcon } from "lucide-react";

export type SettingsTabId = "profile" | "billing" | "security";

export interface SettingsTab {
  id: SettingsTabId;
  label: string;
  icon: LucideIcon;
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
}

export interface SettingsProfile {
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  emailVerified: boolean;
  authProvider: string;
}

export interface UpdateProfileRequest extends ProfileFormData {}

export interface SettingsSecurity {
  twoFactorEnabled: boolean;
  hasPassword: boolean;
  twoFactorSetupPending: boolean;
}

export interface TwoFactorSetup {
  secret: string;
  otpAuthUri: string;
  issuer: string;
  accountName: string;
}

export interface EnableTwoFactorRequest {
  code: string;
}

export interface TwoFactorSetupFormData {
  code: string;
}

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword?: string;
  newPassword: string;
}

export interface DeleteAccountFormData {
  confirmationText: string;
}

export interface DeleteAccountRequest {
  confirmationText: string;
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
