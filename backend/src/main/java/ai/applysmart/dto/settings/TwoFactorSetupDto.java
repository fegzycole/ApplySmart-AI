package ai.applysmart.dto.settings;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TwoFactorSetupDto {
    private String secret;
    private String otpAuthUri;
    private String issuer;
    private String accountName;
}
