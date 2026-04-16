package ai.applysmart.dto.dashboard;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ConversionMetricDto {
    private String label;
    private String value;
    private String gradient;
}
