package ai.applysmart.service.impl;

import ai.applysmart.dto.dashboard.*;
import ai.applysmart.entity.Job;
import ai.applysmart.entity.User;
import ai.applysmart.mapper.DashboardDtoMapper;
import ai.applysmart.repository.JobRepository;
import ai.applysmart.service.DashboardService;
import ai.applysmart.util.DateUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.time.temporal.WeekFields;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final JobRepository jobRepository;
    private final DashboardDtoMapper dtoMapper;

    @Override
    public DashboardDataDto getDashboardData(User user) {
        log.info("Fetching dashboard data for user: {}", user.getId());

        return DashboardDataDto.builder()
                .stats(getStats(user))
                .recentApplications(getRecentApplications(user))
                .funnel(getFunnelData(user))
                .metrics(getMetrics(user))
                .build();
    }

    @Override
    public List<StatCardDto> getStats(User user) {
        log.info("Calculating stats for user: {}", user.getId());

        List<Job> allJobs = jobRepository.findByUserOrderByUpdatedAtDesc(user);

        long totalApplications = allJobs.size();
        long activeApplications = countActiveApplications(allJobs);
        long interviews = countInterviews(allJobs);
        long offers = countOffers(allJobs);
        long recentApplications = countRecentApplications(allJobs, 30);

        return List.of(
                dtoMapper.createTotalApplicationsStat(totalApplications, recentApplications),
                dtoMapper.createActiveApplicationsStat(activeApplications, totalApplications),
                dtoMapper.createInterviewsStat(interviews, totalApplications),
                dtoMapper.createOffersStat(offers, totalApplications)
        );
    }

    private long countActiveApplications(List<Job> jobs) {
        return jobs.stream()
                .filter(job -> job.getStatus() == Job.Status.APPLIED || job.getStatus() == Job.Status.INTERVIEW)
                .count();
    }

    private long countInterviews(List<Job> jobs) {
        return jobs.stream()
                .filter(job -> job.getStatus() == Job.Status.INTERVIEW)
                .count();
    }

    private long countOffers(List<Job> jobs) {
        return jobs.stream()
                .filter(job -> job.getStatus() == Job.Status.OFFER)
                .count();
    }

    private long countRecentApplications(List<Job> jobs, int daysAgo) {
        LocalDateTime cutoffDate = LocalDateTime.now().minus(daysAgo, ChronoUnit.DAYS);
        return jobs.stream()
                .filter(job -> job.getCreatedAt().isAfter(cutoffDate))
                .count();
    }

    @Override
    public List<RecentApplicationDto> getRecentApplications(User user) {
        log.info("Fetching recent applications for user: {}", user.getId());

        return jobRepository.findByUserOrderByUpdatedAtDesc(user).stream()
                .limit(5)
                .map(dtoMapper::mapToRecentApplicationDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<FunnelStageDto> getFunnelData(User user) {
        log.info("Calculating funnel data for user: {}", user.getId());

        List<Job> allJobs = jobRepository.findByUserOrderByUpdatedAtDesc(user);
        int totalJobs = allJobs.size();

        if (totalJobs == 0) {
            return createEmptyFunnelStages();
        }

        Map<Job.Status, Long> statusCounts = allJobs.stream()
                .collect(Collectors.groupingBy(Job::getStatus, Collectors.counting()));

        return List.of(
                createFunnelStageForStatus("Saved", Job.Status.SAVED, "violet", statusCounts, totalJobs),
                createFunnelStageForStatus("Applied", Job.Status.APPLIED, "fuchsia", statusCounts, totalJobs),
                createFunnelStageForStatus("Interview", Job.Status.INTERVIEW, "cyan", statusCounts, totalJobs),
                createFunnelStageForStatus("Offer", Job.Status.OFFER, "emerald", statusCounts, totalJobs)
        );
    }

    private List<FunnelStageDto> createEmptyFunnelStages() {
        return List.of(
                dtoMapper.createFunnelStage("Saved", 0, "violet", 0.0),
                dtoMapper.createFunnelStage("Applied", 0, "fuchsia", 0.0),
                dtoMapper.createFunnelStage("Interview", 0, "cyan", 0.0),
                dtoMapper.createFunnelStage("Offer", 0, "emerald", 0.0)
        );
    }

    private FunnelStageDto createFunnelStageForStatus(String name, Job.Status status, String color,
                                                       Map<Job.Status, Long> statusCounts, int totalJobs) {
        long count = statusCounts.getOrDefault(status, 0L);
        double percentage = DateUtils.calculatePercentage(count, totalJobs);
        return dtoMapper.createFunnelStage(name, (int) count, color, percentage);
    }

    @Override
    public List<ConversionMetricDto> getMetrics(User user) {
        log.info("Calculating conversion metrics for user: {}", user.getId());

        List<Job> allJobs = jobRepository.findByUserOrderByUpdatedAtDesc(user);

        long applied = countAppliedJobs(allJobs);
        long interviews = countInterviewsAndOffers(allJobs);
        long offers = countOffers(allJobs);

        double appToInterview = DateUtils.calculatePercentage(interviews, applied);
        double interviewToOffer = DateUtils.calculatePercentage(offers, interviews);

        return List.of(
                dtoMapper.createConversionMetric("Application to Interview", appToInterview),
                dtoMapper.createConversionMetric("Interview to Offer", interviewToOffer)
        );
    }

    private long countAppliedJobs(List<Job> jobs) {
        return jobs.stream()
                .filter(job -> job.getStatus() != Job.Status.SAVED)
                .count();
    }

    private long countInterviewsAndOffers(List<Job> jobs) {
        return jobs.stream()
                .filter(job -> job.getStatus() == Job.Status.INTERVIEW || job.getStatus() == Job.Status.OFFER)
                .count();
    }

    @Override
    public List<SuccessMetricDto> getSuccessMetrics(User user) {
        log.info("Calculating success metrics for user: {}", user.getId());

        List<Job> allJobs = jobRepository.findByUserOrderByUpdatedAtDesc(user);
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("MMM");

        return IntStream.range(0, 6)
                .mapToObj(i -> calculateSuccessMetricForMonth(allJobs, now, i, monthFormatter))
                .collect(Collectors.toList());
    }

    private SuccessMetricDto calculateSuccessMetricForMonth(List<Job> allJobs, LocalDateTime now,
                                                             int monthsBack, DateTimeFormatter formatter) {
        LocalDateTime monthStart = now.minusMonths(5 - monthsBack)
                .withDayOfMonth(1)
                .withHour(0)
                .withMinute(0)
                .withSecond(0);
        LocalDateTime monthEnd = monthStart.plusMonths(1).minusSeconds(1);

        List<Job> monthJobs = filterJobsByDateRange(allJobs, monthStart, monthEnd);

        long totalApplied = countAppliedJobs(monthJobs);
        long interviews = countInterviewsAndOffers(monthJobs);
        long offers = countOffers(monthJobs);

        return SuccessMetricDto.builder()
                .month(formatter.format(monthStart))
                .responseRate(DateUtils.calculatePercentage(interviews, totalApplied))
                .interviewRate(DateUtils.calculatePercentage(interviews, totalApplied))
                .offerRate(DateUtils.calculatePercentage(offers, totalApplied))
                .build();
    }

    private List<Job> filterJobsByDateRange(List<Job> jobs, LocalDateTime start, LocalDateTime end) {
        return jobs.stream()
                .filter(job -> !job.getCreatedAt().isBefore(start) && !job.getCreatedAt().isAfter(end))
                .collect(Collectors.toList());
    }

    @Override
    public List<ApplicationVelocityDto> getApplicationVelocity(User user) {
        log.info("Calculating application velocity for user: {}", user.getId());

        List<Job> allJobs = jobRepository.findByUserOrderByUpdatedAtDesc(user);
        LocalDateTime now = LocalDateTime.now();
        WeekFields weekFields = WeekFields.of(Locale.getDefault());

        return IntStream.range(0, 12)
                .mapToObj(i -> calculateVelocityForWeek(allJobs, now, i, weekFields))
                .collect(Collectors.toList());
    }

    private ApplicationVelocityDto calculateVelocityForWeek(List<Job> allJobs, LocalDateTime now,
                                                             int weeksBack, WeekFields weekFields) {
        LocalDateTime weekStart = now.minusWeeks(11 - weeksBack).with(weekFields.dayOfWeek(), 1);
        LocalDateTime weekEnd = weekStart.plusWeeks(1);

        int weekNumber = weekStart.get(weekFields.weekOfWeekBasedYear());
        long weekApplications = countJobsInWeek(allJobs, weekStart, weekEnd);

        return ApplicationVelocityDto.builder()
                .week("W" + weekNumber)
                .fullWeek("Week " + weekNumber)
                .applications((int) weekApplications)
                .target(5)
                .build();
    }

    private long countJobsInWeek(List<Job> jobs, LocalDateTime weekStart, LocalDateTime weekEnd) {
        return jobs.stream()
                .filter(job -> !job.getCreatedAt().isBefore(weekStart) && job.getCreatedAt().isBefore(weekEnd))
                .count();
    }
}
