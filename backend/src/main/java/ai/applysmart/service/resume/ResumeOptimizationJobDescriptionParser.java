package ai.applysmart.service.resume;

import ai.applysmart.service.ai.AnthropicClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Slf4j
@Component
public class ResumeOptimizationJobDescriptionParser {

    private static final ResumeOptimizationJobDescriptionCandidateExtractor CANDIDATE_EXTRACTOR =
            new ResumeOptimizationJobDescriptionCandidateExtractor();

    private final AnthropicClient anthropicClient;
    private final ResumeOptimizationJobTargetAiResponseParser aiResponseParser;

    public ResumeOptimizationJobDescriptionParser(AnthropicClient anthropicClient, ObjectMapper objectMapper) {
        this.anthropicClient = anthropicClient;
        this.aiResponseParser = new ResumeOptimizationJobTargetAiResponseParser(objectMapper);
    }

    public Optional<String> extractCompanyName(String jobDescription) {
        return CANDIDATE_EXTRACTOR.extractCompanyName(jobDescription);
    }

    public Optional<String> extractPositionTitle(String jobDescription) {
        return CANDIDATE_EXTRACTOR.extractPositionTitle(jobDescription);
    }

    public Optional<ResumeOptimizationJobTarget> extractTarget(String jobDescription) {
        Optional<String> company = extractCompanyName(jobDescription);
        Optional<String> position = extractPositionTitle(jobDescription);

        if (company.isEmpty() || position.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(new ResumeOptimizationJobTarget(company.get(), position.get()));
    }

    public Optional<ResumeOptimizationJobTarget> extractTargetWithAI(String jobDescription) {
        try {
            String response = anthropicClient.complete(buildExtractionPrompt(jobDescription));
            return aiResponseParser.parsePartialTarget(response)
                    .map(ResumeOptimizationJobTargetAiResponseParser.PartialJobTarget::toJobTarget);
        } catch (Exception e) {
            log.warn("AI-based job description parsing failed", e);
        }

        return Optional.empty();
    }

    private String buildExtractionPrompt(String jobDescription) {
        return "Extract the company name and job position/title from the following job description.\n"
                + "Return ONLY a JSON object with exactly two fields: \"company\" and \"position\".\n"
                + "If either cannot be determined, use null for that field.\n"
                + "Do not include any explanation, markdown, or extra text.\n\n"
                + "Example output:\n"
                + "{\"company\": \"Acme Corp\", \"position\": \"Senior Software Engineer\"}\n\n"
                + "Job description:\n"
                + jobDescription;
    }
}
