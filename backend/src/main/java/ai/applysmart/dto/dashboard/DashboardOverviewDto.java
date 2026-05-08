package ai.applysmart.dto.dashboard;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardOverviewDto {
    private Long totalApplications;
    private Long activeApplications;
    private Long savedApplications;
    private Long interviews;
    private Long offers;
    private Long rejections;
    private Long uniqueCompanies;
    private Long staleApplications;
    private Long upcomingDeadlines;
    private Long applicationsThisWeek;
    private Long applicationsThisMonth;
    private Double responseRate;
    private Double offerRate;
}
