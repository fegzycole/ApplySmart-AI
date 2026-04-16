package ai.applysmart.util;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

public final class DateUtils {

    private DateUtils() {}

    private static final List<TimeUnit> TIME_UNITS = List.of(
            new TimeUnit(365, ChronoUnit.YEARS, "year"),
            new TimeUnit(30, ChronoUnit.MONTHS, "month"),
            new TimeUnit(7, ChronoUnit.WEEKS, "week"),
            new TimeUnit(1, ChronoUnit.DAYS, "day")
    );

    public static String formatRelativeDate(LocalDateTime dateTime) {
        LocalDateTime now = LocalDateTime.now();
        long daysBetween = ChronoUnit.DAYS.between(dateTime, now);

        if (daysBetween == 0) {
            return "Today";
        }
        if (daysBetween == 1) {
            return "Yesterday";
        }

        for (TimeUnit unit : TIME_UNITS) {
            if (daysBetween >= unit.threshold) {
                long value = unit.chronoUnit.between(dateTime, now);
                return formatTimeUnit(value, unit.name);
            }
        }

        return formatTimeUnit(daysBetween, "day");
    }

    public static double calculatePercentage(long numerator, long denominator) {
        return denominator > 0 ? (numerator * 100.0 / denominator) : 0.0;
    }

    private static String formatTimeUnit(long value, String unit) {
        return value + " " + unit + (value == 1 ? " ago" : "s ago");
    }

    private record TimeUnit(int threshold, ChronoUnit chronoUnit, String name) {
    }
}
