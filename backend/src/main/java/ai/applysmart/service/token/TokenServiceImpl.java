package ai.applysmart.service.token;

import ai.applysmart.service.token.TokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Date;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {

    private final RedisTemplate<String, Object> redisTemplate;

    private static final String ACTIVE_TOKEN_PREFIX = "token:active:";
    private static final String BLACKLIST_TOKEN_PREFIX = "token:blacklist:";
    private static final String USER_TOKENS_PREFIX = "user:tokens:";

    @Override
    public void storeActiveToken(String jti, Long userId, Date expirationDate) {
        try {
            long ttl = expirationDate.getTime() - System.currentTimeMillis();
            if (ttl <= 0) {
                log.warn("Attempted to store expired token: {}", jti);
                return;
            }

            String tokenKey = ACTIVE_TOKEN_PREFIX + jti;
            redisTemplate.opsForValue().set(tokenKey, userId, ttl, TimeUnit.MILLISECONDS);

            String userTokensKey = USER_TOKENS_PREFIX + userId;
            redisTemplate.opsForSet().add(userTokensKey, jti);
            redisTemplate.expire(userTokensKey, ttl, TimeUnit.MILLISECONDS);

            log.debug("Stored active token {} for user {} with TTL: {} ms", jti, userId, ttl);
        } catch (Exception e) {
            log.error("Failed to store active token: {}", jti, e);
        }
    }

    @Override
    public boolean isTokenRevoked(String jti) {
        try {
            String blacklistKey = BLACKLIST_TOKEN_PREFIX + jti;
            Boolean isBlacklisted = redisTemplate.hasKey(blacklistKey);

            String tokenKey = ACTIVE_TOKEN_PREFIX + jti;
            Boolean isActive = redisTemplate.hasKey(tokenKey);

            boolean revoked = Boolean.TRUE.equals(isBlacklisted) || !Boolean.TRUE.equals(isActive);

            if (revoked) {
                log.debug("Token {} is revoked (blacklisted: {}, active: {})",
                         jti, isBlacklisted, isActive);
            }

            return revoked;
        } catch (Exception e) {
            log.error("Failed to check token revocation status: {}", jti, e);
            return true;
        }
    }

    @Override
    public void revokeToken(String jti, Duration remainingTTL) {
        try {
            String blacklistKey = BLACKLIST_TOKEN_PREFIX + jti;
            redisTemplate.opsForValue().set(blacklistKey, true, remainingTTL);

            String tokenKey = ACTIVE_TOKEN_PREFIX + jti;
            Object userIdObj = redisTemplate.opsForValue().get(tokenKey);

            if (userIdObj != null) {
                Long userId = (userIdObj instanceof Long) ? (Long) userIdObj : Long.valueOf(userIdObj.toString());
                String userTokensKey = USER_TOKENS_PREFIX + userId;
                redisTemplate.opsForSet().remove(userTokensKey, jti);
            }

            redisTemplate.delete(tokenKey);

            log.info("Revoked token: {}", jti);
        } catch (Exception e) {
            log.error("Failed to revoke token: {}", jti, e);
        }
    }

    @Override
    public void revokeAllUserTokens(Long userId) {
        try {
            String userTokensKey = USER_TOKENS_PREFIX + userId;
            Set<Object> userTokensObj = redisTemplate.opsForSet().members(userTokensKey);

            if (userTokensObj == null || userTokensObj.isEmpty()) {
                log.debug("No active tokens found for user: {}", userId);
                return;
            }

            int revokedCount = 0;
            for (Object jtiObj : userTokensObj) {
                String jti = jtiObj instanceof String ? (String) jtiObj : jtiObj.toString();

                String blacklistKey = BLACKLIST_TOKEN_PREFIX + jti;
                redisTemplate.opsForValue().set(blacklistKey, true, 7, TimeUnit.DAYS);

                String tokenKey = ACTIVE_TOKEN_PREFIX + jti;
                redisTemplate.delete(tokenKey);

                revokedCount++;
            }

            redisTemplate.delete(userTokensKey);

            log.info("Revoked {} tokens for user: {}", revokedCount, userId);
        } catch (Exception e) {
            log.error("Failed to revoke all tokens for user: {}", userId, e);
        }
    }

    @Override
    public Long getUserIdFromToken(String jti) {
        try {
            String tokenKey = ACTIVE_TOKEN_PREFIX + jti;
            Object userIdObj = redisTemplate.opsForValue().get(tokenKey);
            if (userIdObj == null) {
                return null;
            }
            return (userIdObj instanceof Long) ? (Long) userIdObj : Long.valueOf(userIdObj.toString());
        } catch (Exception e) {
            log.error("Failed to get user ID from token: {}", jti, e);
            return null;
        }
    }

    @Override
    public void cleanupExpiredTokens() {
        try {
            log.info("Starting cleanup of expired tokens");

            Set<String> activeTokenKeys = redisTemplate.keys(ACTIVE_TOKEN_PREFIX + "*");
            Set<String> blacklistKeys = redisTemplate.keys(BLACKLIST_TOKEN_PREFIX + "*");

            log.info("Cleanup complete. Active tokens: {}, Blacklisted tokens: {}",
                    activeTokenKeys != null ? activeTokenKeys.size() : 0,
                    blacklistKeys != null ? blacklistKeys.size() : 0);
        } catch (Exception e) {
            log.error("Failed to cleanup expired tokens", e);
        }
    }
}
