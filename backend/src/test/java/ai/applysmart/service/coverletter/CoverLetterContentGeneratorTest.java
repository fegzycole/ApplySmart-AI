package ai.applysmart.service.coverletter;

import ai.applysmart.dto.coverletter.CoverLetterRequest;
import ai.applysmart.entity.User;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.repository.ResumeRepository;
import ai.applysmart.service.ai.ClaudeService;
import ai.applysmart.service.file.FileParserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CoverLetterContentGeneratorTest {

    @Mock
    private ResumeRepository resumeRepository;

    @Mock
    private ClaudeService claudeService;

    @Mock
    private FileParserService fileParserService;

    private CoverLetterContentGenerator coverLetterContentGenerator;

    @BeforeEach
    void setUp() {
        coverLetterContentGenerator = new CoverLetterContentGenerator(
                resumeRepository,
                claudeService,
                fileParserService
        );
    }

    @Test
    void generateReplacesUnicodeDashesInGeneratedContent() {
        CoverLetterRequest request = new CoverLetterRequest();
        request.setCompany("Stripe");
        request.setPosition("Backend Engineer");
        request.setJobDescription("Build resilient APIs");
        request.setTone("professional");
        request.setHighlights("Improved reliability");

        User user = User.builder()
                .email("user@example.com")
                .firstName("Ada")
                .lastName("Lovelace")
                .build();

        when(claudeService.generateCoverLetter(
                eq(null),
                eq("Build resilient APIs"),
                eq("Stripe"),
                eq("Backend Engineer"),
                eq("professional"),
                eq("Improved reliability")
        )).thenReturn("I led platform work — across payments – and reliability.");

        String content = coverLetterContentGenerator.generate(request, user);

        assertEquals("I led platform work - across payments - and reliability.", content);
    }

    @Test
    void generateRejectsMissingCompanyBeforeCallingClaude() {
        CoverLetterRequest request = new CoverLetterRequest();
        request.setCompany("  ");
        request.setPosition("Backend Engineer");
        request.setJobDescription("Build resilient APIs");

        User user = User.builder()
                .email("user@example.com")
                .firstName("Ada")
                .lastName("Lovelace")
                .build();

        assertThrows(BadRequestException.class, () -> coverLetterContentGenerator.generate(request, user));
        verifyNoInteractions(claudeService);
    }
}
