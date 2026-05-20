package ai.applysmart.service.template;

import ai.applysmart.dto.resume.ParsedResumeDto.Education;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static ai.applysmart.util.HtmlEscaper.escape;

final class ResumeTemplateRenderSupport {

    private static final String[] FIELD_FIRST_CREDENTIALS = {
            "certificate",
            "diploma",
            "program",
            "bootcamp",
            "nanodegree",
            "fellowship"
    };

    private ResumeTemplateRenderSupport() {
    }

    static boolean hasText(String value) {
        return value != null && !value.isBlank();
    }

    static String textOrFallback(String value, String fallback) {
        if (hasText(value)) {
            return escape(value.trim());
        }

        return fallback;
    }

    static String formatDateRange(String startDate, String endDate, String fallback) {
        boolean hasStart = hasText(startDate);
        boolean hasEnd = hasText(endDate);

        if (hasStart && hasEnd) {
            return escape(startDate.trim()) + " - " + escape(endDate.trim());
        }

        if (hasStart) {
            return escape(startDate.trim());
        }

        if (hasEnd) {
            return escape(endDate.trim());
        }

        return fallback;
    }

    static String formatEducationDate(Education education) {
        return formatDateRange(education.getStartDate(), education.getGraduationDate(), "Year");
    }

    static String getEducationCredential(Education education) {
        String degree = education.getDegree() != null ? education.getDegree().trim() : "";
        String field = education.getField() != null ? education.getField().trim() : "";

        if (!degree.isEmpty() && !field.isEmpty()) {
            if (isFieldFirstCredential(degree)) {
                return escape(field) + " " + escape(degree);
            }

            return escape(degree) + " in " + escape(field);
        }

        if (!degree.isEmpty()) {
            return escape(degree);
        }

        if (!field.isEmpty()) {
            return escape(field);
        }

        return "Credential";
    }

    static String getEducationTitle(Education education) {
        String credential = getEducationCredential(education);
        String institution = hasText(education.getInstitution()) ? escape(education.getInstitution().trim()) : "Institution";
        return credential + " - " + institution;
    }

    static List<String> filterNonBlank(List<String> values) {
        if (values == null) {
            return List.of();
        }

        return values.stream()
                .filter(Objects::nonNull)
                .map(String::trim)
                .filter(value -> !value.isEmpty())
                .collect(Collectors.toList());
    }

    private static boolean isFieldFirstCredential(String degree) {
        String normalizedDegree = degree.toLowerCase();

        for (String credential : FIELD_FIRST_CREDENTIALS) {
            if (normalizedDegree.contains(credential)) {
                return true;
            }
        }

        return false;
    }
}
