package ai.applysmart.dto.dashboard;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SuccessMetricDto {
    private String month;
    private Double responseRate;
    private Double interviewRate;
    private Double offerRate;
}
