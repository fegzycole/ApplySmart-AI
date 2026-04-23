package ai.applysmart.config;

import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "app.rate-limit")
public class RateLimitProperties {
    private boolean enabled = true;

    @Positive
    private int capacity = 10;

    @Positive
    private int refillTokens = 10;

    @Positive
    private int refillDurationMinutes = 1;
}
