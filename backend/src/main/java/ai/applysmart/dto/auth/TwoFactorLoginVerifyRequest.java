package ai.applysmart.dto.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class TwoFactorLoginVerifyRequest {

    @NotBlank(message = "Two-factor challenge is required")
    private String challengeToken;

    @NotBlank(message = "Authenticator code is required")
    @Pattern(regexp = "^\\d{6}$", message = "Authenticator code must be 6 digits")
    private String code;
}
