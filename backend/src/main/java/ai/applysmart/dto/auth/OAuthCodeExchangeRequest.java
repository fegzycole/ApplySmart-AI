package ai.applysmart.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OAuthCodeExchangeRequest {

    @NotBlank(message = "OAuth exchange code is required")
    private String code;
}
