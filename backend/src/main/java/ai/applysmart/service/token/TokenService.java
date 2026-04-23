package ai.applysmart.service.token;

import java.time.Duration;
import java.util.Date;

public interface TokenService {

    void storeActiveToken(String jti, Long userId, Date expirationDate);

    boolean isTokenRevoked(String jti);

    void revokeToken(String jti, Duration remainingTTL);

    void revokeAllUserTokens(Long userId);

    Long getUserIdFromToken(String jti);

    void cleanupExpiredTokens();
}
