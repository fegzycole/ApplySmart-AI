package ai.applysmart.dto.settings;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class SessionDto {
    private String deviceName;
    private String browser;
    private String location;
    private LocalDateTime lastActive;
    private Boolean current;
}
