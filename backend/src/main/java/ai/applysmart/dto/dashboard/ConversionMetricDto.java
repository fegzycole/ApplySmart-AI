package ai.applysmart.dto.dashboard;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ConversionMetricDto {
    private String metric;
    private Double value;
    private String unit; // percentage, count, etc
}
