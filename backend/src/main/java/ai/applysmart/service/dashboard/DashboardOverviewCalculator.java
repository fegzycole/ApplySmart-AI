package ai.applysmart.service.dashboard;

import ai.applysmart.dto.dashboard.DashboardOverviewDto;
import ai.applysmart.entity.Job;
import ai.applysmart.util.DateUtils;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DashboardOverviewCalculator {

    public DashboardOverviewDto calculate(List<Job> jobs) {
        long totalApplications = jobs.size();
        long activeApplications = DashboardJobMetrics.countActiveApplications(jobs);
        long savedApplications = DashboardJobMetrics.countByStatus(jobs, Job.Status.SAVED);
        long interviews = DashboardJobMetrics.countInterviews(jobs);
        long offers = DashboardJobMetrics.countOffers(jobs);
        long rejections = DashboardJobMetrics.countByStatus(jobs, Job.Status.REJECTED);
        long uniqueCompanies = DashboardJobMetrics.countUniqueCompanies(jobs);
        long staleApplications = DashboardJobMetrics.countStaleActiveApplications(jobs, 14);
        long upcomingDeadlines = DashboardJobMetrics.countUpcomingDeadlines(jobs, 7);
        long applicationsThisWeek = DashboardJobMetrics.countRecentApplications(jobs, 7);
        long applicationsThisMonth = DashboardJobMetrics.countRecentApplications(jobs, 30);
        long submittedApplications = DashboardJobMetrics.countAppliedJobs(jobs);

        return DashboardOverviewDto.builder()
                .totalApplications(totalApplications)
                .activeApplications(activeApplications)
                .savedApplications(savedApplications)
                .interviews(interviews)
                .offers(offers)
                .rejections(rejections)
                .uniqueCompanies(uniqueCompanies)
                .staleApplications(staleApplications)
                .upcomingDeadlines(upcomingDeadlines)
                .applicationsThisWeek(applicationsThisWeek)
                .applicationsThisMonth(applicationsThisMonth)
                .responseRate(DateUtils.calculatePercentage(
                        DashboardJobMetrics.countRespondedApplications(jobs),
                        submittedApplications
                ))
                .offerRate(DateUtils.calculatePercentage(offers, submittedApplications))
                .build();
    }
}
