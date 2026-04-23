package ai.applysmart.service.ratelimit;

public interface RateLimitService {

    boolean isAllowed(String key);

    long getRemainingRequests(String key);

    long getSecondsUntilReset(String key);
}
