package ai.applysmart.service.dashboard;

import ai.applysmart.dto.dashboard.ConversionMetricDto;
import ai.applysmart.entity.Job;
import ai.applysmart.mapper.DashboardDtoMapper;
import ai.applysmart.util.DateUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DashboardConversionCalculator {

    private final DashboardDtoMapper dtoMapper;

    public List<ConversionMetricDto> calculate(List<Job> jobs) {
        long applied = DashboardJobMetrics.countAppliedJobs(jobs);
        long interviews = DashboardJobMetrics.countInterviewsAndOffers(jobs);
        long offers = DashboardJobMetrics.countOffers(jobs);

        double appToInterview = DateUtils.calculatePercentage(interviews, applied);
        double interviewToOffer = DateUtils.calculatePercentage(offers, interviews);

        return List.of(
                dtoMapper.createConversionMetric("Application to Interview", appToInterview),
                dtoMapper.createConversionMetric("Interview to Offer", interviewToOffer)
        );
    }
}
