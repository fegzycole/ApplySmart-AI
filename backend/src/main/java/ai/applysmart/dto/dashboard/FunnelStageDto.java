package ai.applysmart.dto.dashboard;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FunnelStageDto {
    private String name;
    private Integer value;
    private String color;
    private Double percentage;
}
