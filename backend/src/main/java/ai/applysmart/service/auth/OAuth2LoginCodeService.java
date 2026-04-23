package ai.applysmart.service.auth;

import ai.applysmart.config.ApplicationOAuth2Properties;
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
public class OAuth2LoginCodeService {

    private static final String OAUTH_EXCHANGE_CODE_PREFIX = "oauth:exchange:";
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    private final RedisTemplate<String, Object> redisTemplate;
    private final ApplicationOAuth2Properties oAuth2Properties;

    public String issueCode(User user) {
        String code = generateCode();
        redisTemplate.opsForValue().set(
                exchangeKey(code),
                user.getId(),
                Duration.ofSeconds(oAuth2Properties.getExchangeCodeTtlSeconds())
        );

        log.info("Issued OAuth exchange code for user: {}", user.getId());
        return code;
    }

    public Long consumeUserId(String code) {
        if (code == null || code.isBlank()) {
            throw new UnauthorizedException("OAuth exchange code is required");
        }

        Object userIdObject = redisTemplate.opsForValue().getAndDelete(exchangeKey(code));
        if (userIdObject == null) {
            throw new UnauthorizedException("OAuth exchange code is invalid or expired");
        }

        Long userId = userIdObject instanceof Long
                ? (Long) userIdObject
                : Long.valueOf(userIdObject.toString());

        log.info("Consumed OAuth exchange code for user: {}", userId);
        return userId;
    }

    private String generateCode() {
        byte[] bytes = new byte[32];
        SECURE_RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private String exchangeKey(String code) {
        return OAUTH_EXCHANGE_CODE_PREFIX + code;
    }
}
