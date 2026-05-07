package ai.applysmart.service.auth;

import ai.applysmart.entity.User;
import ai.applysmart.exception.UnauthorizedException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.time.Duration;
import java.util.Base64;

@Slf4j
@Component
@RequiredArgsConstructor
public class TwoFactorLoginChallengeService {

    private static final String CHALLENGE_PREFIX = "auth:2fa:challenge:";
    private static final Duration CHALLENGE_TTL = Duration.ofMinutes(5);
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    private final RedisTemplate<String, Object> redisTemplate;

    public String issueChallenge(User user) {
        String token = generateToken();
        redisTemplate.opsForValue().set(challengeKey(token), user.getId(), CHALLENGE_TTL);
        log.info("Issued two-factor login challenge for user: {}", user.getId());
        return token;
    }

    public Long getUserId(String challengeToken) {
        if (challengeToken == null || challengeToken.isBlank()) {
            throw new UnauthorizedException("Two-factor challenge is required");
        }

        Object userIdObject = redisTemplate.opsForValue().get(challengeKey(challengeToken));
        if (userIdObject == null) {
            throw new UnauthorizedException("Two-factor challenge is invalid or expired");
        }

        return userIdObject instanceof Long
                ? (Long) userIdObject
                : Long.valueOf(userIdObject.toString());
    }

    public void consumeChallenge(String challengeToken) {
        redisTemplate.delete(challengeKey(challengeToken));
    }

    private String challengeKey(String token) {
        return CHALLENGE_PREFIX + token;
    }

    private String generateToken() {
        byte[] bytes = new byte[32];
        SECURE_RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
