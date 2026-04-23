package ai.applysmart.config;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "anthropic")
public class AnthropicProperties {

    @NotBlank
    private String apiKey;

    @NotBlank
    private String apiUrl = "https://api.anthropic.com/v1";

    @NotBlank
    private String model = "claude-3-5-sonnet-20241022";

    @Positive
    private int maxTokens = 4096;

    @Min(0)
    @Max(1)
    private double temperature = 0.7;

    @Positive
    private int timeout = 180000;
}
