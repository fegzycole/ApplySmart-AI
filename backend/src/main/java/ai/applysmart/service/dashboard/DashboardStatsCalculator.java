package ai.applysmart.service.dashboard;

import ai.applysmart.dto.dashboard.StatCardDto;
import ai.applysmart.entity.Job;
import ai.applysmart.mapper.DashboardDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DashboardStatsCalculator {

    private final DashboardDtoMapper dtoMapper;

    public List<StatCardDto> calculate(List<Job> jobs) {
        long totalApplications = jobs.size();
        long activeApplications = DashboardJobMetrics.countActiveApplications(jobs);
        long interviews = DashboardJobMetrics.countInterviews(jobs);
        long offers = DashboardJobMetrics.countOffers(jobs);
        long recentApplications = DashboardJobMetrics.countRecentApplications(jobs, 30);

        return List.of(
                dtoMapper.createTotalApplicationsStat(totalApplications, recentApplications),
                dtoMapper.createActiveApplicationsStat(activeApplications, totalApplications),
                dtoMapper.createInterviewsStat(interviews, totalApplications),
                dtoMapper.createOffersStat(offers, totalApplications)
        );
    }
}
