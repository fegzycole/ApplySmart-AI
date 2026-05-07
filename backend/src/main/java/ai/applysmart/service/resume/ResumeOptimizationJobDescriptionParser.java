package ai.applysmart.service.resume;

import ai.applysmart.util.TextUtils;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class ResumeOptimizationJobDescriptionParser {

    private static final List<Pattern> COMPANY_PATTERNS = List.of(
            Pattern.compile("(?i)^(?:company|organization|employer)\\s*[:\\-]\\s*(.+)$"),
            Pattern.compile("(?i)^about\\s+([A-Z][\\p{L}0-9&.,'()\\-/ ]{1,80})$"),
            Pattern.compile("(?i)^join\\s+([A-Z][\\p{L}0-9&.,'()\\-/ ]{1,80}?)(?:\\s+as\\b|\\s+to\\b|\\s+in\\b|\\s+for\\b|[.!,:-]|$)"),
            Pattern.compile("(?i)^([A-Z][\\p{L}0-9&.,'()\\-/ ]{1,80}?)\\s+(?:is\\s+hiring|is\\s+looking|seeks|seeking|hiring)\\b"),
            Pattern.compile("(?i)\\bat\\s+([A-Z][\\p{L}0-9&.,'()\\-/ ]{1,80}?)(?:\\s+as\\b|\\s+for\\b|\\s+to\\b|[.!,:;\\n]|$)")
    );

    private static final List<Pattern> POSITION_PATTERNS = List.of(
            Pattern.compile("(?i)^(?:position|role|job title|title)\\s*[:\\-]\\s*(.+)$"),
            Pattern.compile("(?i)^join\\s+[A-Z][\\p{L}0-9&.,'()\\-/ ]{1,80}?\\s+as\\s+(.+?)(?:\\s+to\\b|\\s+in\\b|\\s+for\\b|[.!,:-]|$)"),
            Pattern.compile("(?i)^([A-Z][\\p{L}0-9/&,.'()\\- ]{2,80}?)\\s+at\\s+[A-Z][\\p{L}0-9&.,'()\\-/ ]{1,80}(?:[.!,:;\\n]|$)"),
            Pattern.compile("(?i)(?:looking for|hiring|seeking|seeks)\\s+(?:an?\\s+)?([A-Z][\\p{L}0-9/&,.'()\\- ]{2,80}?)(?:\\s+to\\b|\\s+who\\b|\\s+with\\b|[.!,:;\\n]|$)")
    );

    private static final List<String> REJECTED_COMPANY_VALUES = List.of(
            "about us",
            "about the role",
            "our team",
            "the company",
            "company",
            "role",
            "position",
            "job description",
            "responsibilities",
            "requirements"
    );

    private static final List<String> REJECTED_POSITION_VALUES = List.of(
            "about us",
            "about the role",
            "our team",
            "the company",
            "job description",
            "responsibilities",
            "requirements",
            "qualifications"
    );

    public Optional<String> extractCompanyName(String jobDescription) {
        return extractValue(jobDescription, COMPANY_PATTERNS, REJECTED_COMPANY_VALUES, 80);
    }

    public Optional<String> extractPositionTitle(String jobDescription) {
        return extractValue(jobDescription, POSITION_PATTERNS, REJECTED_POSITION_VALUES, 80);
    }

    public Optional<ResumeOptimizationJobTarget> extractTarget(String jobDescription) {
        Optional<String> company = extractCompanyName(jobDescription);
        Optional<String> position = extractPositionTitle(jobDescription);

        if (company.isEmpty() || position.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(new ResumeOptimizationJobTarget(company.get(), position.get()));
    }

    private Optional<String> extractValue(
            String jobDescription,
            List<Pattern> patterns,
            List<String> rejectedValues,
            int maxLength
    ) {
        String normalizedDescription = TextUtils.trimToNull(jobDescription);
        if (normalizedDescription == null) {
            return Optional.empty();
        }

        String[] lines = normalizedDescription.split("\\R");
        for (String rawLine : lines) {
            String line = normalizeLine(rawLine);
            if (line == null) {
                continue;
            }

            for (Pattern pattern : patterns) {
                Matcher matcher = pattern.matcher(line);
                if (!matcher.find()) {
                    continue;
                }

                String candidate = normalizeCandidate(matcher.group(1), rejectedValues, maxLength);
                if (candidate != null) {
                    return Optional.of(candidate);
                }
            }
        }

        return Optional.empty();
    }

    private String normalizeLine(String rawLine) {
        String trimmed = TextUtils.trimToNull(rawLine);
        if (trimmed == null) {
            return null;
        }

        return trimmed.replaceFirst("^[\\-•*#>\\s]+", "");
    }

    private String normalizeCandidate(String rawCandidate, List<String> rejectedValues, int maxLength) {
        String candidate = TextUtils.trimToNull(rawCandidate);
        if (candidate == null) {
            return null;
        }

        String cleaned = candidate
                .replaceAll("\\s+", " ")
                .replaceAll("^[\"'“”‘’]+|[\"'“”‘’]+$", "")
                .replaceAll("[\\s,.;:!\\-]+$", "")
                .trim();

        if (cleaned.isBlank() || cleaned.length() > maxLength) {
            return null;
        }

        String normalized = cleaned.toLowerCase();
        for (String rejectedValue : rejectedValues) {
            if (normalized.equals(rejectedValue)) {
                return null;
            }
        }

        return cleaned;
    }
}
