package ai.applysmart.service.dashboard;

import ai.applysmart.dto.dashboard.*;
import ai.applysmart.entity.Job;
import ai.applysmart.entity.User;
import ai.applysmart.mapper.DashboardDtoMapper;
import ai.applysmart.repository.JobRepository;
import ai.applysmart.service.dashboard.DashboardService;
import ai.applysmart.service.dashboard.DashboardConversionCalculator;
import ai.applysmart.service.dashboard.DashboardFunnelCalculator;
import ai.applysmart.service.dashboard.DashboardStatsCalculator;
import ai.applysmart.service.dashboard.DashboardTrendCalculator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {

    private final JobRepository jobRepository;
    private final DashboardDtoMapper dtoMapper;
    private final DashboardStatsCalculator statsCalculator;
    private final DashboardFunnelCalculator funnelCalculator;
    private final DashboardConversionCalculator conversionCalculator;
    private final DashboardTrendCalculator trendCalculator;

    @Override
    public DashboardDataDto getDashboardData(User user) {
        log.info("Fetching dashboard data for user: {}", user.getId());
        List<Job> jobs = findJobsForUser(user);

        return DashboardDataDto.builder()
                .stats(statsCalculator.calculate(jobs))
                .recentApplications(mapRecentApplications(jobs))
                .funnel(funnelCalculator.calculate(jobs))
                .metrics(conversionCalculator.calculate(jobs))
                .build();
    }

    @Override
    public List<StatCardDto> getStats(User user) {
        log.info("Calculating stats for user: {}", user.getId());
        return statsCalculator.calculate(findJobsForUser(user));
    }

    @Override
    public List<RecentApplicationDto> getRecentApplications(User user) {
        log.info("Fetching recent applications for user: {}", user.getId());
        return mapRecentApplications(findJobsForUser(user));
    }

    private List<RecentApplicationDto> mapRecentApplications(List<Job> jobs) {
        return jobs.stream()
                .limit(5)
                .map(dtoMapper::mapToRecentApplicationDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<FunnelStageDto> getFunnelData(User user) {
        log.info("Calculating funnel data for user: {}", user.getId());
        return funnelCalculator.calculate(findJobsForUser(user));
    }

    @Override
    public List<ConversionMetricDto> getMetrics(User user) {
        log.info("Calculating conversion metrics for user: {}", user.getId());
        return conversionCalculator.calculate(findJobsForUser(user));
    }

    @Override
    public List<SuccessMetricDto> getSuccessMetrics(User user) {
        log.info("Calculating success metrics for user: {}", user.getId());
        return trendCalculator.calculateSuccessMetrics(findJobsForUser(user));
    }

    @Override
    public List<ApplicationVelocityDto> getApplicationVelocity(User user) {
        log.info("Calculating application velocity for user: {}", user.getId());
        return trendCalculator.calculateApplicationVelocity(findJobsForUser(user));
    }

    private List<Job> findJobsForUser(User user) {
        return jobRepository.findByUserOrderByUpdatedAtDesc(user);
    }
}
