package ai.applysmart.service.resume;

import ai.applysmart.dto.file.FileUploadResult;
import ai.applysmart.dto.resume.OptimizeResumeRequest;
import ai.applysmart.dto.resume.ParsedResumeDto;
import ai.applysmart.dto.resume.ResumeAnalysisDto;
import ai.applysmart.dto.resume.ResumeOptimizationDto;
import ai.applysmart.dto.resume.ResumeTemplate;
import ai.applysmart.entity.Resume;
import ai.applysmart.entity.User;
import ai.applysmart.exception.FileProcessingException;
import ai.applysmart.service.ai.ClaudeService;
import ai.applysmart.service.file.FileDeletionScheduler;
import ai.applysmart.service.file.FileStorageService;
import ai.applysmart.service.template.ResumeTemplateService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.ArgumentMatchers.same;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ResumeOptimizationWorkflowTest {

    private static final String JOB_DESCRIPTION = "Position: Backend Engineer\nCompany: Acme";

    @Mock
    private ClaudeService claudeService;

    @Mock
    private ResumeParserService resumeParserService;

    @Mock
    private ResumeTemplateService resumeTemplateService;

    @Mock
    private FileStorageService fileStorageService;

    @Mock
    private FileDeletionScheduler fileDeletionScheduler;

    @Mock
    private ResumeChangeDetector changeDetector;

    @Mock
    private ResumeFileValidator validator;

    @Mock
    private ResumeTemplateSelector resumeTemplateSelector;

    @Mock
    private ResumeFileFactory resumeFileFactory;

    @Mock
    private ResumeOptimizationNamer resumeOptimizationNamer;

    @Mock
    private MultipartFile multipartFile;

    private ObjectMapper objectMapper;
    private ResumeOptimizationWorkflow workflow;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        workflow = new ResumeOptimizationWorkflow(
                claudeService,
                resumeParserService,
                resumeTemplateService,
                fileStorageService,
                fileDeletionScheduler,
                changeDetector,
                validator,
                resumeTemplateSelector,
                resumeFileFactory,
                resumeOptimizationNamer,
                objectMapper
        );
    }

    @Test
    void optimizeStoredResumeBuildsArtifactsWithSelectedTemplateAndUploadedPdf() throws Exception {
        User user = user();
        ParsedResumeDto originalResume = resumeData("Original summary");
        ParsedResumeDto optimizedResume = resumeData("Optimized summary");
        Resume storedResume = Resume.builder()
                .user(user)
                .content(objectMapper.writeValueAsString(originalResume))
                .build();
        OptimizeResumeRequest request = request(null);
        byte[] pdfBytes = "pdf".getBytes(StandardCharsets.UTF_8);
        FileUploadResult uploadResult = FileUploadResult.builder()
                .url("https://example.com/optimized.pdf")
                .publicId("resumes/optimized")
                .build();
        Resume optimizedRecord = Resume.builder()
                .name("Ada Lovelace - Acme Optimized Resume")
                .user(user)
                .build();

        when(claudeService.optimizeStructuredResume(any(ParsedResumeDto.class), eq(JOB_DESCRIPTION)))
                .thenReturn(optimizedResume);
        when(resumeTemplateSelector.select((ResumeTemplate) null)).thenReturn(ResumeTemplate.MODERN);
        when(resumeTemplateService.generatePdf(optimizedResume, ResumeTemplate.MODERN)).thenReturn(pdfBytes);
        when(resumeOptimizationNamer.buildOptimizedPdfFilename(user, JOB_DESCRIPTION))
                .thenReturn("ada-lovelace-acme-optimized-resume.pdf");
        when(fileStorageService.uploadFileBytes(pdfBytes, "ada-lovelace-acme-optimized-resume.pdf"))
                .thenReturn(uploadResult);
        when(resumeOptimizationNamer.buildOptimizedResumeName(user, JOB_DESCRIPTION))
                .thenReturn("Ada Lovelace - Acme Optimized Resume");
        when(resumeFileFactory.createOptimizedResume(
                eq("Ada Lovelace - Acme Optimized Resume"),
                any(String.class),
                isNull(),
                same(user),
                same(uploadResult)
        )).thenReturn(optimizedRecord);
        when(changeDetector.detectChanges(any(ParsedResumeDto.class), same(optimizedResume)))
                .thenReturn(List.of("Improved summary"));
        when(claudeService.analyzeStructuredResume(any(ParsedResumeDto.class), eq(JOB_DESCRIPTION)))
                .thenReturn(analysis(58), analysis(91));

        ResumeOptimizationArtifacts artifacts = workflow.optimizeStoredResume(storedResume, request);

        assertSame(optimizedRecord, artifacts.getOptimizedResume());
        assertEquals(91, artifacts.getOptimizedResume().getScore());
        ResumeOptimizationDto optimization = artifacts.getOptimization();
        assertEquals(58, optimization.getOriginalScore());
        assertEquals(91, optimization.getOptimizedScore());
        assertEquals("https://example.com/optimized.pdf", optimization.getFileUrl());
        assertEquals(List.of("Improved summary"), optimization.getChanges());
        verify(fileDeletionScheduler).deleteAfterRollback("resumes/optimized");
        verify(resumeTemplateService).generatePdf(optimizedResume, ResumeTemplate.MODERN);
    }

    @Test
    void optimizeUploadedFileWrapsUnexpectedFailuresAfterValidation() {
        User user = user();
        OptimizeResumeRequest request = request(ResumeTemplate.CLASSIC);
        when(multipartFile.getOriginalFilename()).thenReturn("resume.pdf");
        when(resumeParserService.parseResume(multipartFile)).thenThrow(new IllegalStateException("parse failed"));

        FileProcessingException exception = assertThrows(
                FileProcessingException.class,
                () -> workflow.optimizeUploadedFile(multipartFile, request, user)
        );

        assertEquals("Failed to optimize uploaded resume", exception.getMessage());
        verify(validator).requireOptimizationInput(multipartFile, JOB_DESCRIPTION);
    }

    private OptimizeResumeRequest request(ResumeTemplate template) {
        OptimizeResumeRequest request = new OptimizeResumeRequest();
        request.setJobDescription(JOB_DESCRIPTION);
        request.setTemplate(template);
        return request;
    }

    private ParsedResumeDto resumeData(String summary) {
        return ParsedResumeDto.builder()
                .personalInfo(ParsedResumeDto.PersonalInfo.builder()
                        .name("Ada Lovelace")
                        .email("ada@example.com")
                        .build())
                .summary(summary)
                .skills(List.of("Java", "Spring"))
                .build();
    }

    private ResumeAnalysisDto analysis(int score) {
        return ResumeAnalysisDto.builder()
                .score(score)
                .atsCompatibility(score - 5)
                .build();
    }

    private User user() {
        User user = User.builder()
                .email("ada@example.com")
                .firstName("Ada")
                .lastName("Lovelace")
                .build();
        user.setId(7L);
        return user;
    }
}
