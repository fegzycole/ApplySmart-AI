package ai.applysmart.dto.dashboard;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApplicationVelocityDto {
    private String week;
    private String fullWeek;
    private Integer applications;
    private Integer target;
}
