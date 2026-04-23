package ai.applysmart.service.admin;

import ai.applysmart.dto.admin.AnalyticsDto;
import ai.applysmart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class UserGrowthMetrics {

    private static final int MONTH_WINDOW = 12;
    private static final DateTimeFormatter MONTH_LABEL_FORMAT = DateTimeFormatter.ofPattern("MMM");

    private final UserRepository userRepository;

    public AnalyticsDto.UserGrowthData forLastTwelveMonths() {
        List<String> labels = new ArrayList<>();
        List<Long> data = new ArrayList<>();
        YearMonth currentMonth = YearMonth.now();

        for (int offset = MONTH_WINDOW - 1; offset >= 0; offset--) {
            YearMonth month = currentMonth.minusMonths(offset);
            LocalDateTime monthStart = month.atDay(1).atStartOfDay();
            LocalDateTime monthEnd = month.plusMonths(1).atDay(1).atStartOfDay();

            labels.add(monthStart.format(MONTH_LABEL_FORMAT));
            data.add(userRepository.countByCreatedAtBetween(monthStart, monthEnd));
        }

        return AnalyticsDto.UserGrowthData.builder()
                .labels(labels)
                .data(data)
                .build();
    }
}
