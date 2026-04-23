package ai.applysmart.service.ratelimit;

import ai.applysmart.config.AppRedisProperties;
import ai.applysmart.config.RateLimitProperties;
import ai.applysmart.exception.RateLimitInitializationException;
import io.github.bucket4j.distributed.ExpirationAfterWriteStrategy;
import io.github.bucket4j.distributed.proxy.ProxyManager;
import io.github.bucket4j.redis.lettuce.cas.LettuceBasedProxyManager;
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.codec.ByteArrayCodec;
import io.lettuce.core.codec.RedisCodec;
import io.lettuce.core.codec.StringCodec;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.time.Duration;

@Slf4j
@Component
@RequiredArgsConstructor
public class RateLimitProxyManagerProvider {

    private final RateLimitProperties rateLimitProperties;
    private final AppRedisProperties redisProperties;

    private RedisClient redisClient;
    private StatefulRedisConnection<String, byte[]> connection;
    private ProxyManager<String> proxyManager;

    @PostConstruct
    public void init() {
        if (!rateLimitProperties.isEnabled()) {
            log.info("Rate limiting disabled by configuration");
            return;
        }

        try {
            redisClient = RedisClient.create(createRedisUri());
            connection = redisClient.connect(RedisCodec.of(StringCodec.UTF8, ByteArrayCodec.INSTANCE));
            proxyManager = LettuceBasedProxyManager.builderFor(connection)
                    .withExpirationStrategy(ExpirationAfterWriteStrategy.basedOnTimeForRefillingBucketUpToMax(refillWindow()))
                    .build();

            log.info("Rate limiting initialized: {} requests per {} minutes",
                    rateLimitProperties.getCapacity(), rateLimitProperties.getRefillDurationMinutes());
        } catch (Exception e) {
            log.error("Failed to initialize rate limiting with Redis", e);
            throw new RateLimitInitializationException("Rate limiting initialization failed", e);
        }
    }

    @PreDestroy
    public void cleanup() {
        try {
            if (connection != null) {
                connection.close();
            }
            if (redisClient != null) {
                redisClient.shutdown();
            }
            log.info("Rate limiting resources cleaned up");
        } catch (Exception e) {
            log.error("Error cleaning up rate limiting resources", e);
        }
    }

    public boolean isActive() {
        return rateLimitProperties.isEnabled() && proxyManager != null;
    }

    public ProxyManager<String> getProxyManager() {
        return proxyManager;
    }

    private Duration refillWindow() {
        return Duration.ofMinutes(rateLimitProperties.getRefillDurationMinutes());
    }

    private RedisURI createRedisUri() {
        RedisURI.Builder builder = RedisURI.builder()
                .withHost(redisProperties.getHost())
                .withPort(redisProperties.getPort());

        if (StringUtils.hasText(redisProperties.getPassword())) {
            builder.withPassword(redisProperties.getPassword().toCharArray());
        }

        return builder.build();
    }
}
