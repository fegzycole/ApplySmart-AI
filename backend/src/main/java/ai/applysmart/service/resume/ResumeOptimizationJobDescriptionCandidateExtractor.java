package ai.applysmart.service.resume;

import ai.applysmart.util.TextUtils;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

class ResumeOptimizationJobDescriptionCandidateExtractor {

    private static final int MAX_CANDIDATE_LENGTH = 80;
    private static final int POSITION_HEADING_SCAN_LIMIT = 4;

    private static final List<Pattern> COMPANY_PATTERNS = List.of(
            Pattern.compile("(?i)^(?:company|organization|employer)\\s*[:\\-]\\s*(.+)$"),
            Pattern.compile("(?i)^about\\s+([A-Z][\\p{L}0-9&.,'()\\-/ ]{1,80})$"),
            Pattern.compile("(?i)^join\\s+([A-Z][\\p{L}0-9&.,'()\\-/ ]{1,80}?)(?:\\s+as\\b|\\s+to\\b|\\s+in\\b|\\s+for\\b|[.!,:-]|$)"),
            Pattern.compile("(?i)^([A-Z][\\p{L}0-9&.,'()\\-/ ]{1,80}?)\\s+(?:is\\s+hiring|is\\s+looking|seeks|seeking|hiring)\\b"),
            Pattern.compile("(?i)\\bat\\s+([A-Z][\\p{L}0-9&.,'()\\-/ ]{1,80}?)(?:\\s+as\\b|\\s+for\\b|\\s+to\\b|[.!,:;\\n]|$)")
    );

    private static final List<Pattern> POSITION_PATTERNS = List.of(
            Pattern.compile("(?i)^(?:position|role|job title|title)\\s*[:\\-]\\s*(.+)$"),
            Pattern.compile("(?i)^(?:(?:we(?:'|\\u2019)re|we\\s+are)\\s+)?(?:now\\s+)?"
                    + "hiring\\s*[:\\-]\\s*(?:an?\\s+)?"
                    + "([A-Z][\\p{L}0-9/&,.'()\\- ]{2,80})(?:[.!,:;\\n]|$)"),
            Pattern.compile("(?i)^join\\s+[A-Z][\\p{L}0-9&.,'()\\-/ ]{1,80}?\\s+as\\s+(.+?)(?:\\s+to\\b|\\s+in\\b|\\s+for\\b|[.!,:-]|$)"),
            Pattern.compile("(?i)^([A-Z][\\p{L}0-9/&,.'()\\- ]{2,80}?)\\s+at\\s+[A-Z][\\p{L}0-9&.,'()\\-/ ]{1,80}(?:[.!,:;\\n]|$)"),
            Pattern.compile("(?i)(?:looking for|hiring|seeking|seeks)\\s+(?:an?\\s+)?([A-Z][\\p{L}0-9/&,.'()\\- ]{2,80}?)(?:\\s+to\\b|\\s+who\\b|\\s+with\\b|[.!,:;\\n]|$)")
    );

    private static final Pattern POSITION_TITLE_KEYWORD_PATTERN = Pattern.compile(
            "(?i)\\b(engineers?|developers?|designers?|managers?|analysts?|specialists?|coordinators?|directors?|leads?|architects?|consultants?|scientists?|administrators?|product|program|project|marketing|sales|accounts?|operations|recruiters?)\\b"
    );

    private static final List<String> REJECTED_COMPANY_VALUES = List.of(
            "about us",
            "about the role",
            "our team",
            "the company",
            "the role",
            "company",
            "role",
            "we",
            "we're",
            "we\u2019re",
            "we are",
            "now",
            "currently",
            "position",
            "job description",
            "responsibilities",
            "requirements"
    );

    private static final List<String> REJECTED_POSITION_VALUES = List.of(
            "about us",
            "about the role",
            "about you",
            "our team",
            "the company",
            "job description",
            "responsibilities",
            "requirements",
            "qualifications",
            "benefits"
    );

    Optional<String> extractCompanyName(String jobDescription) {
        return extractValue(jobDescription, COMPANY_PATTERNS, REJECTED_COMPANY_VALUES);
    }

    Optional<String> extractPositionTitle(String jobDescription) {
        return extractValue(jobDescription, POSITION_PATTERNS, REJECTED_POSITION_VALUES)
                .or(() -> extractPositionHeading(jobDescription));
    }

    private Optional<String> extractValue(
            String jobDescription,
            List<Pattern> patterns,
            List<String> rejectedValues
    ) {
        return normalizedLines(jobDescription)
                .flatMap(line -> extractFromLine(line, patterns, rejectedValues).stream())
                .findFirst();
    }

    private Optional<String> extractFromLine(
            String line,
            List<Pattern> patterns,
            List<String> rejectedValues
    ) {
        for (Pattern pattern : patterns) {
            Optional<String> candidate = extractWithPattern(line, pattern, rejectedValues);
            if (candidate.isPresent()) {
                return candidate;
            }
        }

        return Optional.empty();
    }

    private Optional<String> extractWithPattern(
            String line,
            Pattern pattern,
            List<String> rejectedValues
    ) {
        Matcher matcher = pattern.matcher(line);
        if (!matcher.find()) {
            return Optional.empty();
        }

        return normalizeCandidate(matcher.group(1), rejectedValues);
    }

    private Optional<String> extractPositionHeading(String jobDescription) {
        return normalizedLines(jobDescription)
                .limit(POSITION_HEADING_SCAN_LIMIT)
                .flatMap(line -> normalizeCandidate(line, REJECTED_POSITION_VALUES).stream())
                .filter(this::looksLikePositionHeading)
                .findFirst();
    }

    private boolean looksLikePositionHeading(String candidate) {
        if (candidate.contains(":") || candidate.matches(".*[.!?]$")) {
            return false;
        }

        int wordCount = candidate.split("\\s+").length;
        return wordCount >= 2
                && wordCount <= 8
                && POSITION_TITLE_KEYWORD_PATTERN.matcher(candidate).find();
    }

    private Stream<String> normalizedLines(String jobDescription) {
        String normalizedDescription = TextUtils.trimToNull(jobDescription);
        if (normalizedDescription == null) {
            return Stream.empty();
        }

        return Arrays.stream(normalizedDescription.split("\\R"))
                .map(this::normalizeLine)
                .flatMap(Optional::stream);
    }

    private Optional<String> normalizeLine(String rawLine) {
        return Optional.ofNullable(TextUtils.trimToNull(rawLine))
                .map(trimmed -> trimmed.replaceFirst("^[\\-•*#>\\s]+", ""));
    }

    private Optional<String> normalizeCandidate(String rawCandidate, List<String> rejectedValues) {
        String candidate = TextUtils.trimToNull(rawCandidate);
        if (candidate == null) {
            return Optional.empty();
        }

        String cleaned = candidate
                .replaceAll("\\s+", " ")
                .replaceAll("^[\"'\u201c\u201d\u2018\u2019]+|[\"'\u201c\u201d\u2018\u2019]+$", "")
                .replaceAll("[\\s,.;:!\\-]+$", "")
                .trim();

        if (cleaned.isBlank() || cleaned.length() > MAX_CANDIDATE_LENGTH) {
            return Optional.empty();
        }

        if (isRejected(cleaned, rejectedValues)) {
            return Optional.empty();
        }

        return Optional.of(cleaned);
    }

    private boolean isRejected(String candidate, List<String> rejectedValues) {
        String normalized = candidate.toLowerCase();
        return rejectedValues.stream().anyMatch(normalized::equals);
    }
}
