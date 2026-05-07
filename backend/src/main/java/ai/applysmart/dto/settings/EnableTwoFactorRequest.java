package ai.applysmart.dto.settings;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class EnableTwoFactorRequest {

    @NotBlank(message = "Authenticator code is required")
    @Pattern(regexp = "^\\d{6}$", message = "Authenticator code must be 6 digits")
    private String code;
}
