package ai.applysmart.dto.dashboard;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StatCardDto {
    private String title;
    private String value;
    private TrendDto trend;
    private GradientDto gradient;
    private String shadowColor;

    @Data
    @Builder
    public static class TrendDto {
        private String value;
        private Boolean isPositive;
    }

    @Data
    @Builder
    public static class GradientDto {
        private String from;
        private String to;
    }
}
