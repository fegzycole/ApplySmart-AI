package ai.applysmart.service.ratelimit;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.distributed.proxy.ProxyManager;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RateLimitServiceImplTest {

    @Mock
    private RateLimitProxyManagerProvider proxyManagerProvider;

    @Mock
    private RateLimitBucketFactory bucketFactory;

    @Mock
    private ProxyManager<String> proxyManager;

    @Test
    void returnsFallbackValuesWhenRateLimitingIsInactive() {
        RateLimitServiceImpl service = new RateLimitServiceImpl(proxyManagerProvider, bucketFactory);
        when(proxyManagerProvider.isActive()).thenReturn(false);

        assertTrue(service.isAllowed("auth:127.0.0.1"));
        assertEquals(-1L, service.getRemainingRequests("auth:127.0.0.1"));
        assertEquals(-1L, service.getSecondsUntilReset("auth:127.0.0.1"));
    }

    @Test
    void consumesBucketTokensWhenRateLimitingIsActive() {
        RateLimitServiceImpl service = new RateLimitServiceImpl(proxyManagerProvider, bucketFactory);
        Bucket bucket = Bucket.builder()
                .addLimit(Bandwidth.simple(1, Duration.ofMinutes(1)))
                .build();

        when(proxyManagerProvider.isActive()).thenReturn(true);
        when(proxyManagerProvider.getProxyManager()).thenReturn(proxyManager);
        when(bucketFactory.create(proxyManager, "auth:127.0.0.1")).thenReturn(bucket);

        assertTrue(service.isAllowed("auth:127.0.0.1"));
        assertEquals(0L, service.getRemainingRequests("auth:127.0.0.1"));
        assertFalse(service.isAllowed("auth:127.0.0.1"));
        assertTrue(service.getSecondsUntilReset("auth:127.0.0.1") >= 0);
    }
}
