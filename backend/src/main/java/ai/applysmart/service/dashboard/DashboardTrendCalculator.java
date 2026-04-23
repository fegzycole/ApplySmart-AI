package ai.applysmart.service.dashboard;

import ai.applysmart.dto.dashboard.ApplicationVelocityDto;
import ai.applysmart.dto.dashboard.SuccessMetricDto;
import ai.applysmart.entity.Job;
import ai.applysmart.util.DateUtils;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.WeekFields;
import java.util.List;
import java.util.Locale;
import java.util.stream.IntStream;

@Component
public class DashboardTrendCalculator {

    private static final int APPLICATION_TARGET = 5;

    public List<SuccessMetricDto> calculateSuccessMetrics(List<Job> jobs) {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("MMM");

        return IntStream.range(0, 6)
                .mapToObj(i -> calculateSuccessMetricForMonth(jobs, now, i, monthFormatter))
                .toList();
    }

    public List<ApplicationVelocityDto> calculateApplicationVelocity(List<Job> jobs) {
        LocalDateTime now = LocalDateTime.now();
        WeekFields weekFields = WeekFields.of(Locale.getDefault());

        return IntStream.range(0, 12)
                .mapToObj(i -> calculateVelocityForWeek(jobs, now, i, weekFields))
                .toList();
    }

    private SuccessMetricDto calculateSuccessMetricForMonth(List<Job> jobs, LocalDateTime now,
                                                             int monthsBack, DateTimeFormatter formatter) {
        LocalDateTime monthStart = now.minusMonths(5 - monthsBack)
                .withDayOfMonth(1)
                .withHour(0)
                .withMinute(0)
                .withSecond(0);
        LocalDateTime monthEnd = monthStart.plusMonths(1).minusSeconds(1);

        List<Job> monthJobs = DashboardJobMetrics.filterByCreatedAt(jobs, monthStart, monthEnd);
        long totalApplied = DashboardJobMetrics.countAppliedJobs(monthJobs);
        long interviews = DashboardJobMetrics.countInterviewsAndOffers(monthJobs);
        long offers = DashboardJobMetrics.countOffers(monthJobs);

        return SuccessMetricDto.builder()
                .month(formatter.format(monthStart))
                .responseRate(DateUtils.calculatePercentage(interviews, totalApplied))
                .interviewRate(DateUtils.calculatePercentage(interviews, totalApplied))
                .offerRate(DateUtils.calculatePercentage(offers, totalApplied))
                .build();
    }

    private ApplicationVelocityDto calculateVelocityForWeek(List<Job> jobs, LocalDateTime now,
                                                             int weeksBack, WeekFields weekFields) {
        LocalDateTime weekStart = now.minusWeeks(11 - weeksBack).with(weekFields.dayOfWeek(), 1);
        LocalDateTime weekEnd = weekStart.plusWeeks(1);
        int weekNumber = weekStart.get(weekFields.weekOfWeekBasedYear());
        long weekApplications = DashboardJobMetrics.countCreatedBeforeEnd(jobs, weekStart, weekEnd);

        return ApplicationVelocityDto.builder()
                .week("W" + weekNumber)
                .fullWeek("Week " + weekNumber)
                .applications((int) weekApplications)
                .target(APPLICATION_TARGET)
                .build();
    }
}
