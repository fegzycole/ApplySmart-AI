package ai.applysmart.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "ApplySmart AI API",
        version = "1.0.0",
        description = "AI-powered job application optimization platform API. " +
                     "This API provides endpoints for resume analysis, cover letter generation, " +
                     "job application tracking, and user management.",
        contact = @Contact(
            name = "ApplySmart AI Support",
            email = "support@applysmart-ai.org",
            url = "https://applysmart-ai.org"
        ),
        license = @License(
            name = "Proprietary",
            url = "https://applysmart-ai.org/license"
        )
    ),
    servers = {
        @Server(
            url = "http://localhost:8080",
            description = "Local Development Server"
        ),
        @Server(
            url = "https://api.applysmart-ai.org",
            description = "Production Server"
        )
    },
    security = {
        @SecurityRequirement(name = "Bearer Authentication")
    }
)
@SecurityScheme(
    name = "Bearer Authentication",
    description = "JWT authentication using Bearer token. Add 'Bearer ' prefix before your token.",
    scheme = "bearer",
    type = SecuritySchemeType.HTTP,
    bearerFormat = "JWT",
    in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
}
