package ai.applysmart.service.dashboard;

import ai.applysmart.dto.dashboard.DashboardOverviewDto;
import ai.applysmart.entity.Job;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class DashboardOverviewCalculatorTest {

    private final DashboardOverviewCalculator calculator = new DashboardOverviewCalculator();

    @Test
    void calculatesPipelineHealthCountsAndRates() {
        LocalDateTime now = LocalDateTime.now();
        List<Job> jobs = List.of(
                createJob("Acme", Job.Status.SAVED, now.minusDays(2), now.minusDays(2), null),
                createJob("Acme", Job.Status.APPLIED, now.minusDays(5), now.minusDays(5), now.plusDays(3)),
                createJob("Bravo", Job.Status.INTERVIEW, now.minusDays(12), now.minusDays(16), null),
                createJob("Coda", Job.Status.OFFER, now.minusDays(20), now.minusDays(4), null),
                createJob("Delta", Job.Status.REJECTED, now.minusDays(15), now.minusDays(10), null)
        );

        DashboardOverviewDto overview = calculator.calculate(jobs);

        assertEquals(5L, overview.getTotalApplications());
        assertEquals(2L, overview.getActiveApplications());
        assertEquals(1L, overview.getSavedApplications());
        assertEquals(1L, overview.getInterviews());
        assertEquals(1L, overview.getOffers());
        assertEquals(1L, overview.getRejections());
        assertEquals(4L, overview.getUniqueCompanies());
        assertEquals(1L, overview.getStaleApplications());
        assertEquals(1L, overview.getUpcomingDeadlines());
        assertEquals(2L, overview.getApplicationsThisWeek());
        assertEquals(5L, overview.getApplicationsThisMonth());
        assertEquals(75.0, overview.getResponseRate());
        assertEquals(25.0, overview.getOfferRate());
    }

    private Job createJob(
            String company,
            Job.Status status,
            LocalDateTime createdAt,
            LocalDateTime updatedAt,
            LocalDateTime deadline
    ) {
        Job job = Job.builder()
                .company(company)
                .role("Engineer")
                .status(status)
                .applicationDeadline(deadline)
                .build();
        job.setCreatedAt(createdAt);
        job.setUpdatedAt(updatedAt);
        return job;
    }
}
