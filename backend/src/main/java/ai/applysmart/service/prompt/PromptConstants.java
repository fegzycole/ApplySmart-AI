package ai.applysmart.service.prompt;

public final class PromptConstants {

    private PromptConstants() {
        throw new UnsupportedOperationException("Utility class");
    }

    public static final String RESUME_REVIEWER_ROLE = "You are an expert resume reviewer and career coach with expertise across all industries and professions. ";
    public static final String RESUME_WRITER_ROLE = "You are an expert resume writer and ATS optimization specialist with experience in all industries and career fields. ";
    public static final String COVER_LETTER_WRITER_ROLE = "You are an expert cover letter writer with cross-industry expertise. ";

    public static final String RESUME_HEADER = "RESUME:\n";
    public static final String JOB_DESCRIPTION_HEADER = "JOB DESCRIPTION:\n";
    public static final String ORIGINAL_RESUME_HEADER = "ORIGINAL RESUME:\n";
    public static final String TARGET_JOB_HEADER = "TARGET JOB DESCRIPTION:\n";
    public static final String ORIGINAL_RESUME_DATA_HEADER = "ORIGINAL RESUME DATA (JSON):\n";

    public static final String NO_EM_DASHES_RULE = """
        FORMATTING RULES - CRITICAL:
        - DO NOT use em dashes (—) anywhere in the resume
        - DO NOT use en dashes (–) anywhere in the resume
        - Use regular hyphens (-) for date ranges: "2020 - 2023" NOT "2020 — 2023"
        - Use commas or periods for sentence breaks, NEVER em dashes
        - Use simple, clean punctuation only: periods, commas, hyphens, colons
        """;

    public static final String JSON_OUTPUT_REQUIREMENT = """
        FINAL OUTPUT REQUIREMENTS:
        - Return ONLY the JSON object (no markdown, no code fences, no explanations)
        - Ensure all fields are properly escaped for JSON
        """;

    public static final String TARGET_SCORE = "TARGET SCORE: 95-100 (MANDATORY)";
}
