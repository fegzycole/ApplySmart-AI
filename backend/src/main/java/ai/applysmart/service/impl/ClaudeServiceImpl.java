package ai.applysmart.service.impl;

import ai.applysmart.dto.resume.ParsedResumeDto;
import ai.applysmart.dto.resume.ResumeAnalysisDto;
import ai.applysmart.dto.resume.ResumeOptimizationDto;
import ai.applysmart.exception.ApiCommunicationException;
import ai.applysmart.service.ClaudeService;
import ai.applysmart.service.PromptBuilder;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClaudeServiceImpl implements ClaudeService {

    private final WebClient.Builder webClientBuilder;
    private final ObjectMapper objectMapper;
    private final PromptBuilder promptBuilder;

    @Value("${anthropic.api-key}")
    private String apiKey;

    @Value("${anthropic.api-url:https://api.anthropic.com/v1}")
    private String apiUrl;

    @Value("${anthropic.model:claude-3-5-sonnet-20241022}")
    private String model;

    @Override
    public ResumeAnalysisDto analyzeResume(String resumeContent, String jobDescription) {
        log.info("Analyzing resume with Claude AI");

        String prompt = promptBuilder.buildAnalysisPrompt(resumeContent, jobDescription);
        String response = callClaudeAPI(prompt);

        return parseAnalysisResponse(response);
    }

    @Override
    public ResumeOptimizationDto optimizeResume(String resumeContent, String jobDescription) {
        log.info("Optimizing resume with Claude AI");

        String prompt = promptBuilder.buildOptimizationPrompt(resumeContent, jobDescription);
        String response = callClaudeAPI(prompt);

        return parseOptimizationResponse(response, resumeContent);
    }

    @Override
    public ParsedResumeDto optimizeStructuredResume(ParsedResumeDto resumeData, String jobDescription) {
        log.info("Optimizing structured resume with Claude AI for: {}",
                resumeData.getPersonalInfo() != null ? resumeData.getPersonalInfo().getName() : "Unknown");

        String prompt = promptBuilder.buildStructuredOptimizationPrompt(resumeData, jobDescription);
        String response = callClaudeAPI(prompt);

        try {
            ParsedResumeDto optimized = objectMapper.readValue(response, ParsedResumeDto.class);
            log.info("Successfully optimized structured resume");
            return optimized;
        } catch (Exception e) {
            log.error("Failed to parse optimized resume data", e);
            throw new ApiCommunicationException("Failed to parse optimized resume data", e);
        }
    }

    private String callClaudeAPI(String prompt) {
        try {
            WebClient webClient = webClientBuilder
                    .baseUrl(apiUrl)
                    .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .defaultHeader("x-api-key", apiKey)
                    .defaultHeader("anthropic-version", "2023-06-01")
                    .build();

            Map<String, Object> requestBody = Map.of(
                    "model", model,
                    "max_tokens", 4096,
                    "messages", List.of(
                            Map.of("role", "user", "content", prompt)
                    )
            );

            String responseJson = webClient.post()
                    .uri("/messages")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonNode root = objectMapper.readTree(responseJson);
            JsonNode contentArray = root.get("content");

            if (contentArray != null && contentArray.isArray() && contentArray.size() > 0) {
                String responseText = contentArray.get(0).get("text").asText();
                return stripMarkdownCodeFences(responseText);
            }

            throw new ApiCommunicationException("Invalid response format from Claude API");

        } catch (ApiCommunicationException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error calling Claude API", e);
            throw new ApiCommunicationException("Failed to communicate with AI service", e);
        }
    }

    private String stripMarkdownCodeFences(String text) {
        if (text == null) {
            return null;
        }

        // Remove markdown code fences (```json ... ``` or ``` ... ```)
        String cleaned = text.trim();
        if (cleaned.startsWith("```")) {
            // Remove opening fence
            int firstNewline = cleaned.indexOf('\n');
            if (firstNewline > 0) {
                cleaned = cleaned.substring(firstNewline + 1);
            }

            // Remove closing fence
            if (cleaned.endsWith("```")) {
                cleaned = cleaned.substring(0, cleaned.length() - 3).trim();
            }
        }

        return cleaned;
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
        String response = callClaudeAPI(prompt);

        return response; // Claude will return the formatted cover letter directly
    }

    private List<String> parseJsonArray(JsonNode arrayNode) {
        if (arrayNode == null || !arrayNode.isArray()) {
            return List.of();
        }

        return StreamSupport.stream(arrayNode.spliterator(), false)
                .map(JsonNode::asText)
                .collect(Collectors.toList());
    }
}
