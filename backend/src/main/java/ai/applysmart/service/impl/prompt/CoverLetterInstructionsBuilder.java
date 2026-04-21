package ai.applysmart.service.impl.prompt;

import ai.applysmart.util.TextUtils;
import org.springframework.stereotype.Component;

@Component
public class CoverLetterInstructionsBuilder {

    private static final String BASE_TEMPLATE = """
        Return a JSON object with:
        {
          "content": "<complete cover letter text>",
          "tone": "<actual tone used>",
          "highlights": ["<key point 1>", "<key point 2>", ...]
        }

        Requirements:
        - %s
        - 3-4 paragraphs, approximately 250-400 words
        - Opening: Express enthusiasm and explain why you're applying
        - Body: Highlight 2-3 key qualifications from resume/achievements
        - Closing: Express interest in next steps
        - Professional formatting suitable for PDF generation
        - Do not include address headers (will be added separately)
        """;

    public String build(String tone) {
        String toneInstruction = getToneInstruction(tone);
        return String.format(BASE_TEMPLATE, toneInstruction);
    }

    private String getToneInstruction(String tone) {
        if (TextUtils.isBlank(tone)) {
            return "Use a professional, enthusiastic tone";
        }

        return switch (tone.toLowerCase()) {
            case "formal" -> "Use a formal, highly professional tone";
            case "enthusiastic" -> "Use an enthusiastic, energetic tone while maintaining professionalism";
            case "confident" -> "Use a confident, assertive tone highlighting strong qualifications";
            case "creative" -> "Use a creative, engaging tone that shows personality";
            default -> "Use a professional, enthusiastic tone";
        };
    }
}
