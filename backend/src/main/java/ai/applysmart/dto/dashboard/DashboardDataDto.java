package ai.applysmart.dto.dashboard;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DashboardDataDto {
    private DashboardOverviewDto overview;
    private DashboardDocumentStatsDto documents;
    private List<RecentApplicationDto> recentApplications;
    private List<FunnelStageDto> funnel;
    private List<SuccessMetricDto> successMetrics;
    private List<ApplicationVelocityDto> applicationVelocity;
}
