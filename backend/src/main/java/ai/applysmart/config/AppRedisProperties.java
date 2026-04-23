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
@ConfigurationProperties(prefix = "spring.data.redis")
public class AppRedisProperties {
    @NotBlank
    private String host = "localhost";

    @Positive
    private int port = 6379;

    private String password = "";
}
