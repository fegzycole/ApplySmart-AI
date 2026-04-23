package ai.applysmart.config;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "cloudinary")
public class CloudinaryProperties {
    @NotBlank
    private String cloudName;

    @NotBlank
    private String apiKey;

    @NotBlank
    private String apiSecret;

    @NotBlank
    private String folder = "applysmart";

    private boolean secure = true;
}
