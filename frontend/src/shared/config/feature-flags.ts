/**
 * Feature Flags Configuration
 *
 * Centralized feature flag management for toggling features on/off
 * without code changes in production.
 */

export const FEATURE_FLAGS = {
  /**
   * Subscription & Billing Features
   * Controls all subscription-related functionality including:
   * - Pricing page and plans
   * - Billing settings
   * - Subscription badges and displays
   * - Plan-based restrictions
   */
  SUBSCRIPTIONS_ENABLED: false,

  /**
   * Admin Panel Subscription Analytics
   * Controls subscription-related data in admin dashboard
   */
  ADMIN_SUBSCRIPTION_ANALYTICS: false,
} as const;

/**
 * Check if a feature is enabled
 */
export const isFeatureEnabled = (feature: keyof typeof FEATURE_FLAGS): boolean => {
  return FEATURE_FLAGS[feature];
};

/**
 * Utility type for feature flag keys
 */
export type FeatureFlag = keyof typeof FEATURE_FLAGS;
