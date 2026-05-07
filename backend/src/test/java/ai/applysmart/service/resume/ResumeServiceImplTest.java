package ai.applysmart.service.resume;

import ai.applysmart.dto.coverletter.CoverLetterRequest;
import ai.applysmart.dto.coverletter.CoverLetterResponseDto;
import ai.applysmart.dto.resume.OptimizeResumeRequest;
import ai.applysmart.dto.resume.ResumeOptimizationDto;
import ai.applysmart.entity.Resume;
import ai.applysmart.entity.User;
import ai.applysmart.repository.ResumeRepository;
import ai.applysmart.service.ai.ClaudeService;
import ai.applysmart.service.coverletter.CoverLetterService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ResumeServiceImplTest {

    @Mock
    private ResumeRepository resumeRepository;

    @Mock
    private ClaudeService claudeService;

    @Mock
    private ResumeFileFactory resumeFileFactory;

    @Mock
    private ResumeBuildWorkflow resumeBuildWorkflow;

    @Mock
    private ResumeOptimizationWorkflow optimizationWorkflow;

    @Mock
    private ResumeDtoMapper resumeDtoMapper;

    @Mock
    private ResumeOptimizationCoverLetterRequestFactory optimizationCoverLetterRequestFactory;

    @Mock
    private CoverLetterService coverLetterService;

    @Mock
    private MultipartFile multipartFile;

    private ResumeServiceImpl resumeService;

    @BeforeEach
    void setUp() {
        resumeService = new ResumeServiceImpl(
                resumeRepository,
                claudeService,
                resumeFileFactory,
                resumeBuildWorkflow,
                optimizationWorkflow,
                optimizationCoverLetterRequestFactory,
                coverLetterService,
                resumeDtoMapper,
                new ObjectMapper()
        );
    }

    @Test
    void optimizeUploadedFilePersistsOriginalAndOptimizedResumes() {
        User user = User.builder().email("user@example.com").firstName("Ada").lastName("Lovelace").build();
        OptimizeResumeRequest request = new OptimizeResumeRequest();
        request.setJobDescription("JD");
        request.setTemplate(ai.applysmart.dto.resume.ResumeTemplate.MODERN);
        Resume originalResume = Resume.builder().name("ada-resume.pdf").status(Resume.Status.DRAFT).build();
        Resume optimizedResume = Resume.builder().name("ada-resume (Optimized)").status(Resume.Status.OPTIMIZED).build();
        ResumeOptimizationDto optimizationDto = ResumeOptimizationDto.builder()
                .originalScore(55)
                .optimizedScore(88)
                .fileUrl("https://example.com/optimized.pdf")
                .build();

        when(resumeFileFactory.createUploadedResume(multipartFile, user)).thenReturn(originalResume);
        when(optimizationWorkflow.optimizeUploadedFile(multipartFile, request, user))
                .thenReturn(ResumeOptimizationArtifacts.builder()
                        .optimization(optimizationDto)
                        .optimizedResume(optimizedResume)
                        .build());

        ResumeOptimizationDto result = resumeService.optimizeUploadedFile(multipartFile, request, user);

        ArgumentCaptor<Resume> savedResumes = ArgumentCaptor.forClass(Resume.class);
        verify(resumeRepository, times(2)).save(savedResumes.capture());
        assertEquals(originalResume, savedResumes.getAllValues().get(0));
        assertEquals(optimizedResume, savedResumes.getAllValues().get(1));
        assertEquals(88, result.getOptimizedScore());
    }

    @Test
    void optimizeResumeAttachesGeneratedCoverLetterWhenRequested() {
        User user = User.builder().email("user@example.com").firstName("Ada").lastName("Lovelace").build();
        user.setId(4L);
        Resume storedResume = Resume.builder().content("stored").user(user).build();
        storedResume.setId(2L);
        Resume optimizedResume = Resume.builder().name("optimized").user(user).build();
        optimizedResume.setId(8L);
        Resume savedOptimizedResume = Resume.builder().name("optimized").user(user).build();
        savedOptimizedResume.setId(8L);
        ai.applysmart.dto.resume.OptimizeCoverLetterRequest coverLetterOptions =
                new ai.applysmart.dto.resume.OptimizeCoverLetterRequest();
        coverLetterOptions.setEnabled(true);

        OptimizeResumeRequest request = new OptimizeResumeRequest();
        request.setJobDescription("""
                Position: Designer
                Company: Stripe
                JD
                """);
        request.setTemplate(ai.applysmart.dto.resume.ResumeTemplate.MODERN);
        request.setCoverLetter(coverLetterOptions);

        ResumeOptimizationDto optimizationDto = ResumeOptimizationDto.builder()
                .originalScore(44)
                .optimizedScore(91)
                .fileUrl("https://example.com/resume.pdf")
                .build();
        CoverLetterRequest coverLetterRequest = new CoverLetterRequest();
        coverLetterRequest.setCompany("Stripe");
        coverLetterRequest.setPosition("Designer");
        coverLetterRequest.setResumeId(8L);
        CoverLetterResponseDto coverLetterResponse = CoverLetterResponseDto.builder()
                .id(11L)
                .company("Stripe")
                .position("Designer")
                .pdfUrl("https://example.com/cover-letter.pdf")
                .content("content")
                .build();

        when(resumeRepository.findByIdAndUser(2L, user)).thenReturn(java.util.Optional.of(storedResume));
        when(optimizationWorkflow.optimizeStoredResume(storedResume, request))
                .thenReturn(ResumeOptimizationArtifacts.builder()
                        .optimization(optimizationDto)
                        .optimizedResume(optimizedResume)
                        .build());
        when(resumeRepository.save(optimizedResume)).thenReturn(savedOptimizedResume);
        when(optimizationCoverLetterRequestFactory.build(request, savedOptimizedResume)).thenReturn(coverLetterRequest);
        when(coverLetterService.generateCoverLetter(coverLetterRequest, user)).thenReturn(coverLetterResponse);

        ResumeOptimizationDto result = resumeService.optimizeResume(2L, request, user);

        assertNotNull(result.getCoverLetter());
        assertEquals(11L, result.getCoverLetter().getId());
        assertEquals("https://example.com/cover-letter.pdf", result.getCoverLetter().getPdfUrl());
    }
}
