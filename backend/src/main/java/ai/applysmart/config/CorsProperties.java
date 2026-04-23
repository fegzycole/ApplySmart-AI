package ai.applysmart.config;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "app.cors")
public class CorsProperties {
    @NotEmpty
    private List<String> allowedOrigins = List.of(
            "http://localhost:3000",
            "http://localhost:5173",
            "http://localhost:5174",
            "https://applysmart-ai.vercel.app",
            "https://applysmart-ai.org",
            "http://applysmart-ai.org",
            "https://www.applysmart-ai.org",
            "http://www.applysmart-ai.org"
    );

    @NotEmpty
    private List<String> allowedMethods = List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS");

    @NotEmpty
    private List<String> allowedHeaders = List.of("*");

    private Boolean allowCredentials = true;
    private Long maxAge = 3600L;
}
