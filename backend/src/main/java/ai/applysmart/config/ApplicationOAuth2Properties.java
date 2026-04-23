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
@ConfigurationProperties(prefix = "app.oauth2")
public class ApplicationOAuth2Properties {
    @NotBlank
    private String authorizedRedirectUri;

    @Positive
    private long exchangeCodeTtlSeconds = 120;
}
