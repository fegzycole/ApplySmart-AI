package ai.applysmart.service.resume;

import ai.applysmart.dto.file.FileUploadResult;
import ai.applysmart.dto.resume.OptimizeResumeRequest;
import ai.applysmart.dto.resume.ParsedResumeDto;
import ai.applysmart.dto.resume.ResumeOptimizationDto;
import ai.applysmart.dto.resume.ResumeTemplate;
import ai.applysmart.entity.Resume;
import ai.applysmart.entity.User;
import ai.applysmart.service.ai.ClaudeService;
import ai.applysmart.service.file.FileStorageService;
import ai.applysmart.service.resume.ResumeChangeDetector;
import ai.applysmart.service.scoring.ResumeMatchScorer;
import ai.applysmart.service.resume.ResumeParserService;
import ai.applysmart.service.template.ResumeTemplateService;
import ai.applysmart.util.TextUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class ResumeOptimizationWorkflow {

    private final ClaudeService claudeService;
    private final ResumeParserService resumeParserService;
    private final ResumeTemplateService resumeTemplateService;
    private final FileStorageService fileStorageService;
    private final ResumeMatchScorer matchScorer;
    private final ResumeChangeDetector changeDetector;
    private final ResumeFileValidator validator;

    public ResumeOptimizationDto optimizeStoredResume(Resume resume, OptimizeResumeRequest request) {
        ResumeOptimizationDto optimization = claudeService.optimizeResume(
                resume.getContent(),
                request.getJobDescription()
        );

        resume.setContent(optimization.getContent());
        resume.setScore(optimization.getOptimizedScore());
        resume.setStatus(Resume.Status.OPTIMIZED);
        resume.setWordCount(TextUtils.calculateWordCount(optimization.getContent()));

        return optimization;
    }

    public ResumeOptimizationDto optimizeUploadedFile(MultipartFile file, String jobDescription,
                                                       String template, User user) {
        log.info("Optimizing uploaded file for user: {} with template: {}", user.getId(), template);
        validator.requireOptimizationInput(file, jobDescription);

        try {
            ParsedResumeDto parsedResume = parseResume(file);
            ParsedResumeDto optimizedResume = optimizeStructuredResume(parsedResume, jobDescription);
            ResumeTemplate selectedTemplate = selectTemplate(template);
            String fileUrl = generateAndUploadPdf(optimizedResume, selectedTemplate, file.getOriginalFilename());

            return buildOptimizationResult(parsedResume, optimizedResume, jobDescription, fileUrl);
        } catch (Exception e) {
            log.error("Error during optimization process for user {}", user.getId(), e);
            throw e;
        }
    }

    private ParsedResumeDto parseResume(MultipartFile file) {
        log.info("Parsing resume PDF: {}", file.getOriginalFilename());
        ParsedResumeDto parsed = resumeParserService.parseResume(file);
        log.info("Successfully parsed resume for: {}",
                parsed.getPersonalInfo() != null ? parsed.getPersonalInfo().getName() : "Unknown");
        return parsed;
    }

    private ParsedResumeDto optimizeStructuredResume(ParsedResumeDto resume, String jobDescription) {
        log.info("Optimizing structured resume data with AI");
        ParsedResumeDto optimized = claudeService.optimizeStructuredResume(resume, jobDescription);
        log.info("AI optimization completed successfully");
        return optimized;
    }

    private ResumeTemplate selectTemplate(String template) {
        try {
            return template != null ? ResumeTemplate.valueOf(template.toUpperCase()) : ResumeTemplate.MODERN;
        } catch (IllegalArgumentException e) {
            log.warn("Invalid template '{}', using MODERN as default", template);
            return ResumeTemplate.MODERN;
        }
    }

    private String generateAndUploadPdf(ParsedResumeDto resume, ResumeTemplate template, String originalFilename) {
        log.info("Generating PDF using template: {}", template.getDisplayName());
        byte[] pdfBytes = resumeTemplateService.generatePdf(resume, template);
        log.info("PDF generation completed. Size: {} bytes", pdfBytes.length);

        FileUploadResult uploadResult = fileStorageService.uploadFileBytes(pdfBytes, createOptimizedFilename(originalFilename));
        log.info("Optimized PDF uploaded successfully. URL: {}", uploadResult.getUrl());
        return uploadResult.getUrl();
    }

    private String createOptimizedFilename(String originalFilename) {
        if (originalFilename != null) {
            return originalFilename.replace(".pdf", "-optimized.pdf");
        }
        return "resume-optimized.pdf";
    }

    private ResumeOptimizationDto buildOptimizationResult(ParsedResumeDto original, ParsedResumeDto optimized,
                                                          String jobDescription, String fileUrl) {
        List<String> changes = changeDetector.detectChanges(original, optimized);
        int originalScore = matchScorer.calculateScore(original, jobDescription);
        int optimizedScore = matchScorer.calculateScore(optimized, jobDescription);

        return ResumeOptimizationDto.builder()
                .originalScore(originalScore)
                .optimizedScore(matchScorer.capScoreImprovement(originalScore, optimizedScore))
                .changes(changes)
                .content("")
                .fileUrl(fileUrl)
                .build();
    }
}
