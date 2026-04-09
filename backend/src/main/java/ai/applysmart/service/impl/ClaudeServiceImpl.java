package ai.applysmart.service.impl;

import ai.applysmart.dto.resume.ResumeAnalysisDto;
import ai.applysmart.dto.resume.ResumeOptimizationDto;
import ai.applysmart.service.ClaudeService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
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

    @Value("${anthropic.api-key}")
    private String apiKey;

    @Value("${anthropic.api-url:https://api.anthropic.com/v1}")
    private String apiUrl;

    @Value("${anthropic.model:claude-3-5-sonnet-20241022}")
    private String model;

    @Override
    public ResumeAnalysisDto analyzeResume(String resumeContent, String jobDescription) {
        log.info("Analyzing resume with Claude AI");

        String prompt = buildAnalysisPrompt(resumeContent, jobDescription);
        String response = callClaudeAPI(prompt);

        return parseAnalysisResponse(response);
    }

    @Override
    public ResumeOptimizationDto optimizeResume(String resumeContent, String jobDescription) {
        log.info("Optimizing resume with Claude AI");

        String prompt = buildOptimizationPrompt(resumeContent, jobDescription);
        String response = callClaudeAPI(prompt);

        return parseOptimizationResponse(response, resumeContent);
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

            throw new RuntimeException("Invalid response format from Claude API");

        } catch (Exception e) {
            log.error("Error calling Claude API", e);
            throw new RuntimeException("Failed to process resume with AI", e);
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

    private String buildAnalysisPrompt(String resumeContent, String jobDescription) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are an expert resume analyst and ATS (Applicant Tracking System) specialist. ");
        prompt.append("Analyze the following resume");

        if (jobDescription != null && !jobDescription.isBlank()) {
            prompt.append(" against this job description:\n\nJOB DESCRIPTION:\n")
                    .append(jobDescription)
                    .append("\n\n");
        } else {
            prompt.append(":\n\n");
        }

        prompt.append("RESUME:\n")
                .append(resumeContent)
                .append("\n\n");

        prompt.append("Provide a comprehensive analysis in the following JSON format:\n");
        prompt.append("{\n");
        prompt.append("  \"score\": <integer 0-100>,\n");
        prompt.append("  \"strengths\": [\"list of 3-5 key strengths\"],\n");
        prompt.append("  \"improvements\": [\"list of 3-5 specific areas for improvement\"],\n");
        prompt.append("  \"keywords\": [\"list of 5-10 important keywords found or missing\"],\n");
        prompt.append("  \"atsCompatibility\": <integer 0-100 for ATS compatibility score>\n");
        prompt.append("}\n\n");
        prompt.append("Respond ONLY with the JSON object, no additional text.");

        return prompt.toString();
    }

    private String buildOptimizationPrompt(String resumeContent, String jobDescription) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are an expert resume optimizer specializing in ATS (Applicant Tracking System) optimization. ");
        prompt.append("Your goal is to transform this resume to achieve an optimized score of 85-95 out of 100.\n\n");
        prompt.append("JOB DESCRIPTION:\n")
                .append(jobDescription)
                .append("\n\n");
        prompt.append("CURRENT RESUME:\n")
                .append(resumeContent)
                .append("\n\n");

        prompt.append("STRICT RULES - EDUCATION SECTION:\n");
        prompt.append("1. First, locate the EDUCATION section in the original resume\n");
        prompt.append("2. Copy the EDUCATION section EXACTLY as it appears - WORD FOR WORD, CHARACTER FOR CHARACTER\n");
        prompt.append("3. Do NOT change: degree names, university names, dates, GPAs, locations, honors, coursework, or ANY text\n");
        prompt.append("4. Do NOT reformat, reword, or improve the EDUCATION section in ANY way\n");
        prompt.append("5. If there is no EDUCATION section, do not add one\n\n");

        prompt.append("Optimize the resume by:\n");
        prompt.append("1. Incorporating relevant keywords from the job description naturally throughout EXPERIENCE and SKILLS\n");
        prompt.append("2. Improving formatting for maximum ATS compatibility (clean structure, standard headings)\n");
        prompt.append("3. Strengthening bullet points with strong action verbs and quantifiable achievements (numbers, percentages, scale)\n");
        prompt.append("4. Enhancing overall clarity and impact - make every word count\n");
        prompt.append("5. PRESERVING the original structure and section order\n");
        prompt.append("6. KEEPING the resume to 2 pages maximum (~500-600 words)\n");
        prompt.append("7. Limiting to 3-5 bullet points per job role (only the most impactful achievements)\n");
        prompt.append("8. Ensuring the resume is highly tailored to the job description to achieve 85+ score\n\n");

        prompt.append("CRITICAL REMINDERS:\n");
        prompt.append("- EDUCATION section: Copy exactly, change nothing\n");
        prompt.append("- Target optimized score: 85-95 out of 100\n");
        prompt.append("- Focus optimization efforts on EXPERIENCE and SKILLS sections only\n\n");

        prompt.append("IMPORTANT: Format the optimized resume content using markdown:\n");
        prompt.append("- Use # for the candidate name (main heading)\n");
        prompt.append("- Use ## for section headers (EXPERIENCE, EDUCATION, SKILLS, etc.)\n");
        prompt.append("- Use **bold** for job titles, company names, and degrees\n");
        prompt.append("- Use bullet points (- ) for lists\n");
        prompt.append("- Limit to 3-5 bullet points per job to keep resume concise\n");
        prompt.append("- Preserve phone numbers, emails, and links exactly as formatted\n");
        prompt.append("- Maintain the original section order and structure\n");
        prompt.append("- Keep EDUCATION section exactly as it was in the original\n\n");

        prompt.append("Provide your response in the following JSON format:\n");
        prompt.append("{\n");
        prompt.append("  \"originalScore\": <integer 0-100>,\n");
        prompt.append("  \"optimizedScore\": <integer 0-100>,\n");
        prompt.append("  \"changes\": [\"list of 5-7 specific changes made\"],\n");
        prompt.append("  \"content\": \"<the complete optimized resume with markdown formatting>\"\n");
        prompt.append("}\n\n");
        prompt.append("Respond ONLY with the JSON object, no additional text.");

        return prompt.toString();
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
            throw new RuntimeException("Failed to parse AI analysis response", e);
        }
    }

    private ResumeOptimizationDto parseOptimizationResponse(String response, String originalContent) {
        try {
            JsonNode json = objectMapper.readTree(response);

            return ResumeOptimizationDto.builder()
                    .originalScore(json.get("originalScore").asInt())
                    .optimizedScore(json.get("optimizedScore").asInt())
                    .changes(parseJsonArray(json.get("changes")))
                    .content(json.get("content").asText())
                    .build();

        } catch (Exception e) {
            log.error("Error parsing Claude optimization response", e);
            throw new RuntimeException("Failed to parse AI optimization response", e);
        }
    }

    @Override
    public String generateCoverLetter(String resumeContent, String jobDescription, String companyName,
                                     String positionTitle, String tone, String keyAchievements) {
        log.info("Generating cover letter with Claude AI - Company: {}, Position: {}, Tone: {}",
                 companyName, positionTitle, tone);

        String prompt = buildCoverLetterPrompt(resumeContent, jobDescription, companyName,
                                              positionTitle, tone, keyAchievements);
        String response = callClaudeAPI(prompt);

        return response; // Claude will return the formatted cover letter directly
    }

    private String buildCoverLetterPrompt(String resumeContent, String jobDescription, String companyName,
                                         String positionTitle, String tone, String keyAchievements) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are an expert cover letter writer. Generate a professional, compelling cover letter that sounds HUMAN-WRITTEN, not AI-generated.\n\n");

        // Add company and position details if provided
        if (companyName != null && !companyName.isBlank()) {
            prompt.append("COMPANY: ").append(companyName).append("\n");
        }
        if (positionTitle != null && !positionTitle.isBlank()) {
            prompt.append("POSITION: ").append(positionTitle).append("\n");
        }
        if ((companyName != null && !companyName.isBlank()) || (positionTitle != null && !positionTitle.isBlank())) {
            prompt.append("\n");
        }

        prompt.append("JOB DESCRIPTION:\n")
                .append(jobDescription)
                .append("\n\n");

        if (resumeContent != null && !resumeContent.isBlank()) {
            prompt.append("CANDIDATE'S RESUME:\n")
                    .append(resumeContent)
                    .append("\n\n");
        }

        if (keyAchievements != null && !keyAchievements.isBlank()) {
            prompt.append("KEY ACHIEVEMENTS TO HIGHLIGHT:\n")
                    .append(keyAchievements)
                    .append("\n\n");
        }

        // Determine tone
        String toneDescription = determineTone(tone);
        prompt.append("TONE: ").append(toneDescription).append("\n\n");

        prompt.append("WRITING STYLE REQUIREMENTS:\n");
        prompt.append("1. Write like a human professional, not an AI\n");
        prompt.append("2. NO em dashes (—), use regular dashes (-) or commas instead\n");
        prompt.append("3. NO overly formal or flowery language\n");
        prompt.append("4. Use simple, direct sentences with active voice\n");
        prompt.append("5. Avoid cliches like 'I am writing to express my interest' or 'proven track record'\n");
        prompt.append("6. Be specific and concrete, not vague and generic\n");
        prompt.append("7. Vary sentence structure naturally\n");
        prompt.append("8. Use contractions occasionally (I'm, I've) for natural tone\n");
        prompt.append("9. Match the specified tone: ").append(toneDescription).append("\n\n");

        prompt.append("CONTENT REQUIREMENTS:\n");
        prompt.append("1. Write 3-4 concise paragraphs (~250-350 words total)\n");
        if (companyName != null && !companyName.isBlank()) {
            prompt.append("2. Address the letter to ").append(companyName).append("\n");
        } else {
            prompt.append("2. If company name is mentioned in job description, use it in the letter\n");
        }
        if (positionTitle != null && !positionTitle.isBlank()) {
            prompt.append("3. Explicitly mention you're applying for the ").append(positionTitle).append(" position\n");
        } else {
            prompt.append("3. Reference the specific position from the job description\n");
        }
        prompt.append("4. Highlight 2-3 specific, relevant achievements with concrete numbers\n");
        prompt.append("5. Show genuine enthusiasm without being over-the-top\n");
        prompt.append("6. Connect your experience directly to the job requirements\n");
        prompt.append("7. Keep it conversational yet professional\n\n");

        prompt.append("FORMAT:\n");
        prompt.append("- Use markdown formatting\n");
        prompt.append("- Do not include [Your Name], [Date], or [Company Name] placeholders\n");
        prompt.append("- Extract actual information from the resume when available\n");
        if (companyName != null && !companyName.isBlank()) {
            prompt.append("- Use '").append(companyName).append("' as the company name\n");
        }
        if (positionTitle != null && !positionTitle.isBlank()) {
            prompt.append("- Mention '").append(positionTitle).append("' as the position you're applying for\n");
        }
        prompt.append("- Opening: Start directly with why you're interested (skip 'I am writing to...')\n");
        prompt.append("- Body: 1-2 paragraphs with specific achievements and relevance to the role\n");
        prompt.append("- Closing: Brief, confident close with next steps\n\n");

        prompt.append("CRITICAL: Make this sound like it was written by a real person, not an AI. Use simple, natural language.\n\n");

        prompt.append("Respond with ONLY the cover letter text in markdown format, no additional commentary.");

        return prompt.toString();
    }

    private String determineTone(String tone) {
        if (tone == null || tone.isBlank()) {
            return "Professional - balanced, confident, and polished";
        }

        return switch (tone.toLowerCase()) {
            case "formal" -> "Formal - highly polished, respectful, traditional business language";
            case "friendly" -> "Friendly - warm, approachable, personable while maintaining professionalism";
            case "enthusiastic" -> "Enthusiastic - energetic, passionate, showing strong interest and excitement";
            case "professional" -> "Professional - balanced, confident, and polished";
            default -> "Professional - balanced, confident, and polished (default)";
        };
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
