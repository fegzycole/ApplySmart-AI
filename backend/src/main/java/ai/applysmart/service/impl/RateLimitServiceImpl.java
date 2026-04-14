package ai.applysmart.service.impl;

import ai.applysmart.service.RateLimitService;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.BucketConfiguration;
import io.github.bucket4j.ConsumptionProbe;
import io.github.bucket4j.distributed.proxy.ProxyManager;
import io.github.bucket4j.redis.lettuce.cas.LettuceBasedProxyManager;
import io.github.bucket4j.redis.lettuce.cas.expiration.AfterWriteExpirationAfterWriteStrategy;
import io.lettuce.core.RedisClient;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.codec.ByteArrayCodec;
import io.lettuce.core.codec.RedisCodec;
import io.lettuce.core.codec.StringCodec;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import java.time.Duration;
import java.util.function.Supplier;

@Slf4j
@Service
public class RateLimitServiceImpl implements RateLimitService {

    @Value("${app.rate-limit.capacity:10}")
    private int capacity;

    @Value("${app.rate-limit.refill-tokens:10}")
    private int refillTokens;

    @Value("${app.rate-limit.refill-duration-minutes:1}")
    private int refillDurationMinutes;

    @Value("${spring.data.redis.host:localhost}")
    private String redisHost;

    @Value("${spring.data.redis.port:6379}")
    private int redisPort;

    @Value("${spring.data.redis.password:}")
    private String redisPassword;

    private RedisClient redisClient;
    private StatefulRedisConnection<String, byte[]> connection;
    private ProxyManager<String> proxyManager;

    @PostConstruct
    public void init() {
        try {
            String redisUri = (redisPassword != null && !redisPassword.isEmpty())
                    ? String.format("redis://:%s@%s:%d", redisPassword, redisHost, redisPort)
                    : String.format("redis://%s:%d", redisHost, redisPort);

            redisClient = RedisClient.create(redisUri);

            RedisCodec<String, byte[]> codec =
                    RedisCodec.of(StringCodec.UTF8, ByteArrayCodec.INSTANCE);

            connection = redisClient.connect(codec);

            proxyManager = LettuceBasedProxyManager.builderFor(connection)
                    .withExpirationStrategy(
                            AfterWriteExpirationAfterWriteStrategy.builder()
                                    .timeToLive(Duration.ofMinutes(refillDurationMinutes))
                                    .build()
                    )
                    .build();

            log.info("Rate limiting initialized: {} requests per {} minutes",
                    capacity, refillDurationMinutes);

        } catch (Exception e) {
            log.error("Failed to initialize rate limiting with Redis", e);
            throw new RuntimeException("Rate limiting initialization failed", e);
        }
    }

    @PreDestroy
    public void cleanup() {
        try {
            if (connection != null) connection.close();
            if (redisClient != null) redisClient.shutdown();
            log.info("Rate limiting resources cleaned up");
        } catch (Exception e) {
            log.error("Error cleaning up rate limiting resources", e);
        }
    }

    @Override
    public boolean isAllowed(String key) {
        try {
            Bucket bucket = getBucket(key);
            ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);

            if (probe.isConsumed()) {
                return true;
            }

            log.warn("Rate limit exceeded for key: {}", key);
            return false;

        } catch (Exception e) {
            log.error("Rate limit error for key: {}", key, e);
            return true;
        }
    }

    @Override
    public long getRemainingRequests(String key) {
        try {
            Bucket bucket = getBucket(key);
            return bucket.getAvailableTokens();
        } catch (Exception e) {
            return -1;
        }
    }

    @Override
    public long getSecondsUntilReset(String key) {
        try {
            Bucket bucket = getBucket(key);
            ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(0);
            return probe.getNanosToWaitForRefill() / 1_000_000_000;
        } catch (Exception e) {
            return -1;
        }
    }

    private Bucket getBucket(String key) {
        String bucketKey = "rate_limit:" + key;

        Supplier<BucketConfiguration> configSupplier = () -> {
            Bandwidth limit = Bandwidth.builder()
                    .capacity(capacity)
                    .refillIntervally(refillTokens, Duration.ofMinutes(refillDurationMinutes))
                    .build();

            return BucketConfiguration.builder()
                    .addLimit(limit)
                    .build();
        };

        return proxyManager.getProxy(bucketKey, configSupplier);
    }
}
