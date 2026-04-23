export const FEATURE_FLAGS = {
  SUBSCRIPTIONS_ENABLED: false,
  ADMIN_SUBSCRIPTION_ANALYTICS: false,
} as const;

export const isFeatureEnabled = (feature: keyof typeof FEATURE_FLAGS): boolean => {
  return FEATURE_FLAGS[feature];
};

export type FeatureFlag = keyof typeof FEATURE_FLAGS;
