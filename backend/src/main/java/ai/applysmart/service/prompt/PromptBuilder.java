package ai.applysmart.service.prompt;

import ai.applysmart.dto.resume.ParsedResumeDto;

public interface PromptBuilder {

    String buildAnalysisPrompt(String resumeContent, String jobDescription);

    String buildOptimizationPrompt(String resumeContent, String jobDescription);

    String buildStructuredOptimizationPrompt(ParsedResumeDto resumeData, String jobDescription);

    String buildCoverLetterPrompt(String resumeContent, String jobDescription,
                                  String company, String position, String tone,
                                  String keyAchievements);
}
