package ai.applysmart.service.impl;

import ai.applysmart.dto.resume.ParsedResumeDto;
import ai.applysmart.exception.FileProcessingException;
import ai.applysmart.service.PdfManipulationService;
import ai.applysmart.service.ResumeParserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ResumeParserServiceImpl implements ResumeParserService {

    private final PdfManipulationService pdfManipulationService;
    private final WebClient.Builder webClientBuilder;
    private final ObjectMapper objectMapper;

    @Value("${anthropic.api-key}")
    private String apiKey;

    @Value("${anthropic.api-url:https://api.anthropic.com/v1}")
    private String apiUrl;

    @Value("${anthropic.model:claude-3-5-sonnet-20241022}")
    private String model;

    @Override
    public ParsedResumeDto parseResume(MultipartFile file) {
        log.info("Parsing resume from file: {}", file.getOriginalFilename());

        String resumeText = pdfManipulationService.extractText(file);
        return parseResumeText(resumeText);
    }

    @Override
    public ParsedResumeDto parseResumeText(String resumeText) {
        log.info("Parsing resume text ({} characters) into structured data", resumeText.length());

        String prompt = buildParsingPrompt(resumeText);
        String responseJson = callClaudeAPI(prompt);

        try {
            ParsedResumeDto parsed = objectMapper.readValue(responseJson, ParsedResumeDto.class);
            log.info("Successfully parsed resume: {} work experiences, {} education entries, {} skills",
                    parsed.getWorkExperience() != null ? parsed.getWorkExperience().size() : 0,
                    parsed.getEducation() != null ? parsed.getEducation().size() : 0,
                    parsed.getSkills() != null ? parsed.getSkills().size() : 0);
            return parsed;
        } catch (Exception e) {
            log.error("Failed to parse Claude response into structured resume data", e);
            throw new FileProcessingException("Failed to parse resume into structured format", e);
        }
    }

    private String buildParsingPrompt(String resumeText) {
        return """
                Parse the following resume into structured JSON format. Extract all relevant information and organize it clearly.

                Return ONLY valid JSON in this exact format (no markdown, no code fences, no explanations):

                {
                  "personalInfo": {
                    "name": "Full Name",
                    "email": "email@example.com",
                    "phone": "+1234567890",
                    "location": "City, State",
                    "linkedin": "linkedin.com/in/username",
                    "github": "github.com/username",
                    "website": "website.com"
                  },
                  "summary": "Professional summary or objective",
                  "workExperience": [
                    {
                      "company": "Company Name",
                      "position": "Job Title",
                      "location": "City, State",
                      "startDate": "Jan 2020",
                      "endDate": "Present",
                      "responsibilities": [
                        "Achievement 1",
                        "Achievement 2"
                      ]
                    }
                  ],
                  "education": [
                    {
                      "institution": "University Name",
                      "degree": "Bachelor of Science",
                      "field": "Computer Science",
                      "location": "City, State",
                      "startDate": "Aug 2016",
                      "graduationDate": "May 2020",
                      "gpa": "3.8/4.0"
                    }
                  ],
                  "skills": ["Skill 1", "Skill 2", "Skill 3"],
                  "certifications": [
                    {
                      "name": "Certification Name",
                      "issuer": "Issuing Organization",
                      "date": "Jan 2021"
                    }
                  ],
                  "projects": [
                    {
                      "name": "Project Name",
                      "description": "Brief description",
                      "technologies": ["Tech 1", "Tech 2"],
                      "link": "github.com/project"
                    }
                  ]
                }

                Important rules:
                1. Return ONLY the JSON object, no markdown formatting
                2. Use null for missing fields, don't omit them
                3. Preserve the original text as much as possible
                4. Use empty arrays [] for sections that don't exist
                5. Extract dates in a consistent format (MMM YYYY)

                Resume text:

                """ + resumeText;
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

            var root = objectMapper.readTree(responseJson);
            var contentArray = root.get("content");

            if (contentArray != null && contentArray.isArray() && contentArray.size() > 0) {
                String responseText = contentArray.get(0).get("text").asText();
                return stripMarkdownCodeFences(responseText);
            }

            throw new FileProcessingException("Invalid response format from Claude API");

        } catch (Exception e) {
            log.error("Error calling Claude API for resume parsing", e);
            throw new FileProcessingException("Failed to parse resume with AI", e);
        }
    }

    private String stripMarkdownCodeFences(String text) {
        if (text == null) return null;

        String cleaned = text.trim();
        if (cleaned.startsWith("```")) {
            int firstNewline = cleaned.indexOf('\n');
            if (firstNewline > 0) {
                cleaned = cleaned.substring(firstNewline + 1);
            }
            if (cleaned.endsWith("```")) {
                cleaned = cleaned.substring(0, cleaned.length() - 3).trim();
            }
        }
        return cleaned;
    }
}
