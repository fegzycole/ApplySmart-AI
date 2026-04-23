package ai.applysmart.config;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "app.email")
public class EmailProperties {
    @NotBlank
    @Email
    private String from = "support@applysmart-ai.org";

    @NotBlank
    @Email
    private String support = "support@applysmart-ai.org";
}
