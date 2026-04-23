package ai.applysmart.service.ratelimit;

import io.github.bucket4j.Bucket;
import io.github.bucket4j.ConsumptionProbe;
import io.github.bucket4j.EstimationProbe;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RateLimitServiceImpl implements RateLimitService {

    private static final long RATE_LIMIT_INACTIVE = -1L;

    private final RateLimitProxyManagerProvider proxyManagerProvider;
    private final RateLimitBucketFactory bucketFactory;

    @Override
    public boolean isAllowed(String key) {
        if (!proxyManagerProvider.isActive()) {
            return true;
        }

        try {
            ConsumptionProbe probe = resolveBucket(key).tryConsumeAndReturnRemaining(1);

            if (probe.isConsumed()) {
                log.debug("Rate limit check passed for key: {}, remaining: {}",
                        key, probe.getRemainingTokens());
                return true;
            } else {
                log.warn("Rate limit exceeded for key: {}, retry after: {} seconds",
                        key, probe.getNanosToWaitForRefill() / 1_000_000_000);
                return false;
            }
        } catch (Exception e) {
            log.error("Error checking rate limit for key: {}", key, e);
            return true;
        }
    }

    @Override
    public long getRemainingRequests(String key) {
        if (!proxyManagerProvider.isActive()) {
            return RATE_LIMIT_INACTIVE;
        }

        try {
            return resolveBucket(key).getAvailableTokens();
        } catch (Exception e) {
            log.error("Error getting remaining requests for key: {}", key, e);
            return RATE_LIMIT_INACTIVE;
        }
    }

    @Override
    public long getSecondsUntilReset(String key) {
        if (!proxyManagerProvider.isActive()) {
            return RATE_LIMIT_INACTIVE;
        }

        try {
            EstimationProbe probe = resolveBucket(key).estimateAbilityToConsume(1);
            if (probe.canBeConsumed()) {
                return 0L;
            }

            return nanosToSeconds(probe.getNanosToWaitForRefill());
        } catch (Exception e) {
            log.error("Error getting reset time for key: {}", key, e);
            return RATE_LIMIT_INACTIVE;
        }
    }

    private Bucket resolveBucket(String key) {
        return bucketFactory.create(proxyManagerProvider.getProxyManager(), key);
    }

    private long nanosToSeconds(long nanosToWaitForRefill) {
        if (nanosToWaitForRefill <= 0) {
            return 0L;
        }

        return (nanosToWaitForRefill + 999_999_999L) / 1_000_000_000L;
    }
}
