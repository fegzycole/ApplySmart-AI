package ai.applysmart.service;

import ai.applysmart.dto.resume.ParsedResumeDto;
import ai.applysmart.dto.resume.ResumeAnalysisDto;
import ai.applysmart.dto.resume.ResumeOptimizationDto;

public interface ClaudeService {
    ResumeAnalysisDto analyzeResume(String resumeContent, String jobDescription);
    ResumeOptimizationDto optimizeResume(String resumeContent, String jobDescription);
    ParsedResumeDto optimizeStructuredResume(ParsedResumeDto resumeData, String jobDescription);
    String generateCoverLetter(String resumeContent, String jobDescription, String companyName,
                              String positionTitle, String tone, String keyAchievements);
}
