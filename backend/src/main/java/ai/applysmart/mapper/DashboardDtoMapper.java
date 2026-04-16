package ai.applysmart.mapper;

import ai.applysmart.dto.dashboard.*;
import ai.applysmart.entity.Job;
import ai.applysmart.util.DateUtils;
import org.springframework.stereotype.Component;

@Component
public class DashboardDtoMapper {

    private static final String VIOLET_GRADIENT_FROM = "from-violet-600";
    private static final String VIOLET_GRADIENT_TO = "to-violet-50/30";
    private static final String VIOLET_SHADOW = "shadow-violet-500/10";

    private static final String FUCHSIA_GRADIENT_FROM = "from-fuchsia-600";
    private static final String FUCHSIA_GRADIENT_TO = "to-fuchsia-50/30";
    private static final String FUCHSIA_SHADOW = "shadow-fuchsia-500/10";

    private static final String CYAN_GRADIENT_FROM = "from-cyan-600";
    private static final String CYAN_GRADIENT_TO = "to-cyan-50/30";
    private static final String CYAN_SHADOW = "shadow-cyan-500/10";

    private static final String EMERALD_GRADIENT_FROM = "from-emerald-600";
    private static final String EMERALD_GRADIENT_TO = "to-emerald-50/30";
    private static final String EMERALD_SHADOW = "shadow-emerald-500/10";

    private static final String DEFAULT_GRADIENT = "bg-gradient-to-br from-violet-50/50 to-fuchsia-50/50 dark:from-violet-950/20 dark:to-fuchsia-950/20";

    public StatCardDto createTotalApplicationsStat(long total, long recentCount) {
        return StatCardDto.builder()
                .title("Total Applications")
                .value(String.valueOf(total))
                .trend(createTrend(
                        recentCount > 0 ? "+" + recentCount + " this month" : "No change",
                        recentCount > 0
                ))
                .gradient(createGradient(VIOLET_GRADIENT_FROM, VIOLET_GRADIENT_TO))
                .shadowColor(VIOLET_SHADOW)
                .build();
    }

    public StatCardDto createActiveApplicationsStat(long active, long total) {
        double percentage = DateUtils.calculatePercentage(active, total);
        return StatCardDto.builder()
                .title("Active Applications")
                .value(String.valueOf(active))
                .trend(createTrend(
                        String.format("%.0f%% of total", percentage),
                        active > 0
                ))
                .gradient(createGradient(FUCHSIA_GRADIENT_FROM, FUCHSIA_GRADIENT_TO))
                .shadowColor(FUCHSIA_SHADOW)
                .build();
    }

    public StatCardDto createInterviewsStat(long interviews, long total) {
        double percentage = DateUtils.calculatePercentage(interviews, total);
        return StatCardDto.builder()
                .title("Interviews")
                .value(String.valueOf(interviews))
                .trend(createTrend(
                        String.format("%.0f%% interview rate", percentage),
                        interviews > 0
                ))
                .gradient(createGradient(CYAN_GRADIENT_FROM, CYAN_GRADIENT_TO))
                .shadowColor(CYAN_SHADOW)
                .build();
    }

    public StatCardDto createOffersStat(long offers, long total) {
        double percentage = DateUtils.calculatePercentage(offers, total);
        return StatCardDto.builder()
                .title("Offers")
                .value(String.valueOf(offers))
                .trend(createTrend(
                        String.format("%.0f%% offer rate", percentage),
                        offers > 0
                ))
                .gradient(createGradient(EMERALD_GRADIENT_FROM, EMERALD_GRADIENT_TO))
                .shadowColor(EMERALD_SHADOW)
                .build();
    }

    public RecentApplicationDto mapToRecentApplicationDto(Job job) {
        return RecentApplicationDto.builder()
                .id(job.getId())
                .company(job.getCompany())
                .role(job.getRole())
                .status(job.getStatus().name().toLowerCase())
                .date(DateUtils.formatRelativeDate(job.getCreatedAt()))
                .build();
    }

    public FunnelStageDto createFunnelStage(String name, Integer value, String color, Double percentage) {
        return FunnelStageDto.builder()
                .name(name)
                .value(value)
                .color(color)
                .percentage(percentage)
                .build();
    }

    public ConversionMetricDto createConversionMetric(String label, Double percentage) {
        return ConversionMetricDto.builder()
                .label(label)
                .value(String.format("%.1f%%", percentage))
                .gradient(DEFAULT_GRADIENT)
                .build();
    }

    private StatCardDto.TrendDto createTrend(String value, Boolean isPositive) {
        return StatCardDto.TrendDto.builder()
                .value(value)
                .isPositive(isPositive)
                .build();
    }

    private StatCardDto.GradientDto createGradient(String from, String to) {
        return StatCardDto.GradientDto.builder()
                .from(from)
                .to(to)
                .build();
    }
}
