package ai.applysmart.config;

/**
 * Feature Flags Configuration
 *
 * Centralized feature flag management for toggling features on/off
 * without code changes in production.
 */
public final class FeatureFlags {

    /**
     * Subscription & Billing Features
     * Controls all subscription-related functionality including:
     * - Subscription plans and restrictions
     * - Billing endpoints
     * - Plan-based access control
     */
    public static final boolean SUBSCRIPTIONS_ENABLED = false;

    /**
     * Admin Panel Subscription Analytics
     * Controls subscription-related data in admin dashboard
     */
    public static final boolean ADMIN_SUBSCRIPTION_ANALYTICS = false;

    // Private constructor to prevent instantiation
    private FeatureFlags() {
        throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
    }
}
