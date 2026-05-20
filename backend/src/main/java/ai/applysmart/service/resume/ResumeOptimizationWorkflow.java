package ai.applysmart.service.resume;

import ai.applysmart.dto.file.FileUploadResult;
import ai.applysmart.dto.resume.BuildResumeFromDataRequest;
import ai.applysmart.dto.resume.OptimizeResumeRequest;
import ai.applysmart.dto.resume.ParsedResumeDto;
import ai.applysmart.dto.resume.ResumeOptimizationDto;
import ai.applysmart.dto.resume.ResumeTemplate;
import ai.applysmart.entity.Resume;
import ai.applysmart.entity.User;
import ai.applysmart.exception.FileProcessingException;
import ai.applysmart.service.ai.ClaudeService;
import ai.applysmart.service.file.FileDeletionScheduler;
import ai.applysmart.service.file.FileStorageService;
import ai.applysmart.dto.resume.ResumeAnalysisDto;
import ai.applysmart.service.template.ResumeTemplateService;
import com.fasterxml.jackson.databind.ObjectMapper;
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
    private final FileDeletionScheduler fileDeletionScheduler;
    private final ResumeChangeDetector changeDetector;
    private final ResumeFileValidator validator;
    private final ResumeTemplateSelector resumeTemplateSelector;
    private final ResumeFileFactory resumeFileFactory;
    private final ResumeOptimizationNamer resumeOptimizationNamer;
    private final ObjectMapper objectMapper;

    public ResumeOptimizationArtifacts optimizeStoredResume(Resume resume, OptimizeResumeRequest request) {
        ParsedResumeDto originalResume = resolveStructuredResume(resume);
        return buildOptimizationArtifacts(originalResume, request, resume.getUser());
    }

    public ResumeOptimizationArtifacts optimizeUploadedFile(MultipartFile file, OptimizeResumeRequest request, User user) {
        log.info("Optimizing uploaded file for user: {} with template: {}", user.getId(), request.getTemplate());
        validator.requireOptimizationInput(file, request.getJobDescription());

        try {
            ParsedResumeDto parsedResume = parseResume(file);
            return buildOptimizationArtifacts(parsedResume, request, user);
        } catch (Exception e) {
            log.error("Error during optimization process for user {}", user.getId(), e);
            throw new FileProcessingException("Failed to optimize uploaded resume", e);
        }
    }

    private ResumeOptimizationArtifacts buildOptimizationArtifacts(
            ParsedResumeDto originalResume,
            OptimizeResumeRequest request,
            User user
    ) {
        String jobDescription = request.getJobDescription();
        ParsedResumeDto optimizedResumeData = optimizeStructuredResume(originalResume, jobDescription);
        ResumeTemplate selectedTemplate = resumeTemplateSelector.select(request.getTemplate());
        FileUploadResult uploadResult = generateAndUploadPdf(
                optimizedResumeData,
                selectedTemplate,
                user,
                jobDescription
        );
        Resume optimizedResumeRecord = buildOptimizedResumeRecord(
                optimizedResumeData,
                user,
                jobDescription,
                uploadResult
        );
        ResumeOptimizationDto optimization = buildOptimizationResult(
                originalResume,
                optimizedResumeData,
                jobDescription,
                uploadResult.getUrl()
        );
        optimizedResumeRecord.setScore(optimization.getOptimizedScore());

        return ResumeOptimizationArtifacts.builder()
                .optimization(optimization)
                .optimizedResume(optimizedResumeRecord)
                .build();
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

    private FileUploadResult generateAndUploadPdf(ParsedResumeDto resume, ResumeTemplate template,
                                                  User user, String jobDescription) {
        log.info("Generating PDF using template: {}", template.getDisplayName());
        byte[] pdfBytes = resumeTemplateService.generatePdf(resume, template);
        log.info("PDF generation completed. Size: {} bytes", pdfBytes.length);

        FileUploadResult uploadResult = fileStorageService.uploadFileBytes(
                pdfBytes,
                resumeOptimizationNamer.buildOptimizedPdfFilename(user, jobDescription)
        );
        fileDeletionScheduler.deleteAfterRollback(uploadResult.getPublicId());
        log.info("Optimized PDF uploaded successfully. URL: {}", uploadResult.getUrl());
        return uploadResult;
    }

    private Resume buildOptimizedResumeRecord(
            ParsedResumeDto optimizedResume,
            User user,
            String jobDescription,
            FileUploadResult uploadResult
    ) {
        return resumeFileFactory.createOptimizedResume(
                resumeOptimizationNamer.buildOptimizedResumeName(user, jobDescription),
                serializeResumeData(optimizedResume),
                null,
                user,
                uploadResult
        );
    }

    private ParsedResumeDto resolveStructuredResume(Resume resume) {
        String content = resume.getContent();

        try {
            BuildResumeFromDataRequest builtResume = objectMapper.readValue(content, BuildResumeFromDataRequest.class);
            if (builtResume.getResumeData() != null) {
                return builtResume.getResumeData();
            }
        } catch (Exception ignored) {
            // Fall through to other supported persisted resume formats.
        }

        try {
            ParsedResumeDto parsedResume = objectMapper.readValue(content, ParsedResumeDto.class);
            if (parsedResume.getPersonalInfo() != null
                    || parsedResume.getSummary() != null
                    || parsedResume.getWorkExperience() != null
                    || parsedResume.getEducation() != null
                    || parsedResume.getSkills() != null) {
                return parsedResume;
            }
        } catch (Exception ignored) {
            // Fall through to text parsing for uploaded resumes.
        }

        return resumeParserService.parseResumeText(content);
    }

    private String serializeResumeData(ParsedResumeDto resumeData) {
        try {
            return objectMapper.writeValueAsString(resumeData);
        } catch (Exception e) {
            throw new FileProcessingException("Failed to serialize optimized resume", e);
        }
    }

    private ResumeOptimizationDto buildOptimizationResult(ParsedResumeDto original, ParsedResumeDto optimized,
                                                          String jobDescription, String fileUrl) {
        List<String> changes = changeDetector.detectChanges(original, optimized);

        ResumeAnalysisDto originalAnalysis = claudeService.analyzeStructuredResume(original, jobDescription);
        ResumeAnalysisDto optimizedAnalysis = claudeService.analyzeStructuredResume(optimized, jobDescription);

        return ResumeOptimizationDto.builder()
                .originalScore(originalAnalysis.getScore())
                .optimizedScore(optimizedAnalysis.getScore())
                .changes(changes)
                .analysis(optimizedAnalysis)
                .content("")
                .fileUrl(fileUrl)
                .build();
    }
}
