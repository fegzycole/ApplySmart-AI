package ai.applysmart.config;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "app.jwt")
public class JwtProperties {
    @NotBlank
    private String secret;

    @Positive
    private long expirationMs = 86_400_000L;

    @Positive
    private long refreshExpirationMs = 604_800_000L;
}
