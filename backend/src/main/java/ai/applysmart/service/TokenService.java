package ai.applysmart.service;

import java.time.Duration;
import java.util.Date;

/**
 * Service for managing JWT token lifecycle including storage and revocation.
 * Uses Redis for blacklist/whitelist management.
 */
public interface TokenService {

    /**
     * Store an active token in Redis with expiration.
     *
     * @param jti JWT ID (unique token identifier)
     * @param userId User ID associated with token
     * @param expirationDate Token expiration date
     */
    void storeActiveToken(String jti, Long userId, Date expirationDate);

    /**
     * Check if a token has been revoked.
     *
     * @param jti JWT ID to check
     * @return true if token is revoked (not in active list)
     */
    boolean isTokenRevoked(String jti);

    /**
     * Revoke a specific token by adding it to blacklist.
     *
     * @param jti JWT ID to revoke
     * @param remainingTTL Remaining time to live for the token
     */
    void revokeToken(String jti, Duration remainingTTL);

    /**
     * Revoke all tokens for a specific user.
     * Called on password change, account deactivation, etc.
     *
     * @param userId User ID whose tokens should be revoked
     */
    void revokeAllUserTokens(Long userId);

    /**
     * Get user ID associated with a token.
     *
     * @param jti JWT ID
     * @return User ID or null if token not found
     */
    Long getUserIdFromToken(String jti);

    /**
     * Clean up expired tokens from storage.
     * Should be called periodically by a scheduled task.
     */
    void cleanupExpiredTokens();
}
