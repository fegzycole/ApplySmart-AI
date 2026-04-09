package ai.applysmart.dto.dashboard;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FunnelStageDto {
    private String stage;
    private Integer count;
    private Double percentage;
}
