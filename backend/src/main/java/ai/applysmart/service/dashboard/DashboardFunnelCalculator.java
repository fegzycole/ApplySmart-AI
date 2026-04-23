package ai.applysmart.service.dashboard;

import ai.applysmart.dto.dashboard.FunnelStageDto;
import ai.applysmart.entity.Job;
import ai.applysmart.mapper.DashboardDtoMapper;
import ai.applysmart.util.DateUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DashboardFunnelCalculator {

    private final DashboardDtoMapper dtoMapper;

    public List<FunnelStageDto> calculate(List<Job> jobs) {
        int totalJobs = jobs.size();

        if (totalJobs == 0) {
            return createEmptyFunnelStages();
        }

        Map<Job.Status, Long> statusCounts = jobs.stream()
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
}
