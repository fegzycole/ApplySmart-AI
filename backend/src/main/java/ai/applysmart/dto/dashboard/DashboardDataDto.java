package ai.applysmart.dto.dashboard;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DashboardDataDto {
    private List<StatCardDto> stats;
    private List<RecentApplicationDto> recentApplications;
    private List<FunnelStageDto> funnel;
    private List<ConversionMetricDto> metrics;
}
