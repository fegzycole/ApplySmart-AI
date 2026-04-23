package ai.applysmart.service.dashboard;

import ai.applysmart.dto.dashboard.*;
import ai.applysmart.entity.User;

import java.util.List;

public interface DashboardService {
    DashboardDataDto getDashboardData(User user);
    List<StatCardDto> getStats(User user);
    List<RecentApplicationDto> getRecentApplications(User user);
    List<FunnelStageDto> getFunnelData(User user);
    List<ConversionMetricDto> getMetrics(User user);
    List<SuccessMetricDto> getSuccessMetrics(User user);
    List<ApplicationVelocityDto> getApplicationVelocity(User user);
}
