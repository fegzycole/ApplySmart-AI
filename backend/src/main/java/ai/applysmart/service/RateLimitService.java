package ai.applysmart.service;

/**
 * Service for managing rate limiting using Bucket4j.
 * Protects authentication endpoints from brute force attacks.
 */
public interface RateLimitService {

    /**
     * Check if request is allowed based on rate limit for the given key.
     *
     * @param key unique identifier for rate limiting (e.g., IP address or email)
     * @return true if request is allowed, false if rate limit exceeded
     */
    boolean isAllowed(String key);

    /**
     * Get remaining requests available for the given key.
     *
     * @param key unique identifier for rate limiting
     * @return number of remaining requests, or -1 if key doesn't exist
     */
    long getRemainingRequests(String key);

    /**
     * Get time in seconds until rate limit resets for the given key.
     *
     * @param key unique identifier for rate limiting
     * @return seconds until reset, or -1 if key doesn't exist
     */
    long getSecondsUntilReset(String key);
}
