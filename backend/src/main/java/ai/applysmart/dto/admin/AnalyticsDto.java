package ai.applysmart.dto.admin;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class AnalyticsDto {
    private OverviewStats overviewStats;
    private UserGrowthData userGrowthData;
    private SubscriptionData subscriptionData;
    private AIUsageData aiUsageData;
    private RevenueData revenueData;

    @Data
    @Builder
    public static class OverviewStats {
        private Long totalUsers;
        private Long activeUsers;
        private Long totalRevenue;
        private Long totalResumes;
        private Long totalCoverLetters;
        private Long totalJobs;
    }

    @Data
    @Builder
    public static class UserGrowthData {
        private List<String> labels;
        private List<Long> data;
    }

    @Data
    @Builder
    public static class SubscriptionData {
        private Long freeUsers;
        private Long proUsers;
        private Long enterpriseUsers;
    }

    @Data
    @Builder
    public static class AIUsageData {
        private Long resumeAnalyses;
        private Long resumeOptimizations;
        private Long coverLettersGenerated;
    }

    @Data
    @Builder
    public static class RevenueData {
        private List<String> labels;
        private List<Long> data;
    }
}
