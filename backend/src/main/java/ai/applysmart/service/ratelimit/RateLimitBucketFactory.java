package ai.applysmart.service.ratelimit;

import ai.applysmart.config.RateLimitProperties;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.BucketConfiguration;
import io.github.bucket4j.distributed.proxy.ProxyManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
@RequiredArgsConstructor
public class RateLimitBucketFactory {

    private static final String BUCKET_KEY_PREFIX = "rate_limit:";

    private final RateLimitProperties rateLimitProperties;

    public Bucket create(ProxyManager<String> proxyManager, String key) {
        return proxyManager.builder().build(bucketKey(key), this::createConfiguration);
    }

    private BucketConfiguration createConfiguration() {
        Bandwidth limit = Bandwidth.builder()
                .capacity(rateLimitProperties.getCapacity())
                .refillIntervally(
                        rateLimitProperties.getRefillTokens(),
                        Duration.ofMinutes(rateLimitProperties.getRefillDurationMinutes())
                )
                .build();

        return BucketConfiguration.builder()
                .addLimit(limit)
                .build();
    }

    private String bucketKey(String key) {
        return BUCKET_KEY_PREFIX + key;
    }
}
