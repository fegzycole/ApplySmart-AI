package ai.applysmart.dto.dashboard;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class RecentApplicationDto {
    private Long id;
    private String company;
    private String role;
    private String status;
    private LocalDateTime appliedAt;
}
