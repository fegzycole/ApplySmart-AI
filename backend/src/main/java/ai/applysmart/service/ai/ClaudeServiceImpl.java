package ai.applysmart.service.ai;

import ai.applysmart.dto.resume.ParsedResumeDto;
import ai.applysmart.dto.resume.ResumeAnalysisDto;
import ai.applysmart.dto.resume.ResumeOptimizationDto;
import ai.applysmart.exception.ApiCommunicationException;
import ai.applysmart.service.ai.ClaudeService;
import ai.applysmart.service.prompt.PromptBuilder;
import ai.applysmart.service.ai.AnthropicClient;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClaudeServiceImpl implements ClaudeService {

    private final ObjectMapper objectMapper;
    private final PromptBuilder promptBuilder;
    private final AnthropicClient anthropicClient;

    @Override
    public ResumeAnalysisDto analyzeResume(String resumeContent, String jobDescription) {
        log.info("Analyzing resume with Claude AI");

        String prompt = promptBuilder.buildAnalysisPrompt(resumeContent, jobDescription);
        String response = anthropicClient.complete(prompt);

        return parseAnalysisResponse(response);
    }

    @Override
    public ResumeOptimizationDto optimizeResume(String resumeContent, String jobDescription) {
        log.info("Optimizing resume with Claude AI");

        String prompt = promptBuilder.buildOptimizationPrompt(resumeContent, jobDescription);
        String response = anthropicClient.complete(prompt);

        return parseOptimizationResponse(response, resumeContent);
    }

    @Override
    public ParsedResumeDto optimizeStructuredResume(ParsedResumeDto resumeData, String jobDescription) {
        log.info("Optimizing structured resume with Claude AI for: {}",
                resumeData.getPersonalInfo() != null ? resumeData.getPersonalInfo().getName() : "Unknown");

        String prompt = promptBuilder.buildStructuredOptimizationPrompt(resumeData, jobDescription);
        String response = anthropicClient.complete(prompt);

        try {
            ParsedResumeDto optimized = objectMapper.readValue(response, ParsedResumeDto.class);
            log.info("Successfully optimized structured resume");
            return optimized;
        } catch (Exception e) {
            log.error("Failed to parse optimized resume data", e);
            throw new ApiCommunicationException("Failed to parse optimized resume data", e);
        }
    }

    private ResumeAnalysisDto parseAnalysisResponse(String response) {
        try {
            JsonNode json = objectMapper.readTree(response);

            return ResumeAnalysisDto.builder()
                    .score(json.get("score").asInt())
                    .strengths(parseJsonArray(json.get("strengths")))
                    .improvements(parseJsonArray(json.get("improvements")))
                    .keywords(parseJsonArray(json.get("keywords")))
                    .atsCompatibility(json.get("atsCompatibility").asInt())
                    .build();

        } catch (Exception e) {
            log.error("Error parsing Claude analysis response", e);
            throw new ApiCommunicationException("Failed to parse AI analysis response", e);
        }
    }

    private ResumeOptimizationDto parseOptimizationResponse(String response, String originalContent) {
        try {
            log.info("Parsing Claude optimization response. Response length: {} characters", response.length());
            log.debug("Claude response: {}", response);

            JsonNode json = objectMapper.readTree(response);

            ResumeOptimizationDto result = ResumeOptimizationDto.builder()
                    .originalScore(json.get("originalScore").asInt())
                    .optimizedScore(json.get("optimizedScore").asInt())
                    .changes(parseJsonArray(json.get("changes")))
                    .content(json.get("content").asText())
                    .build();

            log.info("Successfully parsed optimization response. Original: {}, Optimized: {}, Changes: {}",
                    result.getOriginalScore(), result.getOptimizedScore(), result.getChanges().size());

            return result;

        } catch (Exception e) {
            log.error("Error parsing Claude optimization response. Response: {}", response, e);
            throw new ApiCommunicationException("Failed to parse AI optimization response", e);
        }
    }

    @Override
    public String generateCoverLetter(String resumeContent, String jobDescription, String companyName,
                                     String positionTitle, String tone, String keyAchievements) {
        log.info("Generating cover letter with Claude AI - Company: {}, Position: {}, Tone: {}",
                 companyName, positionTitle, tone);

        String prompt = promptBuilder.buildCoverLetterPrompt(resumeContent, jobDescription, companyName,
                                              positionTitle, tone, keyAchievements);
        String response = anthropicClient.complete(prompt);

        return parseCoverLetterResponse(response);
    }

    private List<String> parseJsonArray(JsonNode arrayNode) {
        if (arrayNode == null || !arrayNode.isArray()) {
            return List.of();
        }

        return StreamSupport.stream(arrayNode.spliterator(), false)
                .map(JsonNode::asText)
                .collect(Collectors.toList());
    }

    private String parseCoverLetterResponse(String response) {
        if (response == null || response.isBlank()) {
            throw new ApiCommunicationException("AI cover letter response was empty");
        }

        try {
            JsonNode json = objectMapper.readTree(response);

            if (json.isTextual()) {
                return json.asText();
            }

            JsonNode content = json.get("content");
            if (content != null && content.isTextual() && !content.asText().isBlank()) {
                return content.asText();
            }

            throw new ApiCommunicationException("AI cover letter response did not include content");
        } catch (JsonProcessingException ex) {
            log.debug("Claude cover letter response was plain text; using raw response");
            return response;
        }
    }
}
