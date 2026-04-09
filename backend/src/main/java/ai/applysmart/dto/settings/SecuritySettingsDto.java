package ai.applysmart.dto.settings;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SecuritySettingsDto {
    private Boolean twoFactorEnabled;
    private Boolean hasPassword;
    private Integer activeSessions;
}
